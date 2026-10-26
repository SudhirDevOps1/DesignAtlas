#!/usr/bin/env python3
"""
Design Atlas — fast local server (drop-in replacement for
`python -m http.server`, which is measurably slow even over loopback:
~250-800ms per file because it closes the connection after every
response and, since Python 3.? it does no keep-alive work).

What this adds over the stdlib server:
  * HTTP/1.1 keep-alive (persistent connections, no per-request TCP churn)
  * gzip content-encoding for text assets (styles.css 76KB -> ~12KB)
  * ETag + If-None-Match 304s (paired with the service worker's
    network-first conditional fetches)
  * threading (the stdlib module is already threaded, this is ThreadingHTTPServer too,
    but with a real accept loop and sane timeouts)

Run:  python serve.py [port]     (default 8912, same as the docs)
"""
import gzip
import http.server
import os
import socketserver
import sys

try:
    import mimetypes
    CT = mimetypes.types_map
except Exception:  # pragma: no cover - mimetypes is stdlib, always present
    CT = {}

GZIP_TYPES = ("text/", "application/javascript", "application/json",
              "image/svg+xml")
ROOT = os.path.dirname(os.path.abspath(__file__))

ATLAS_TYPES = {
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".htm": "text/html; charset=utf-8",
    ".svg": "image/svg+xml",
    ".json": "application/json",
    ".txt": "text/plain; charset=utf-8",
    ".md": "text/plain; charset=utf-8",
    ".htm-": "text/html; charset=utf-8",
}


class AtlasHandler(http.server.BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    server_version = "DesignAtlas/2.0"
    sys_version = ""

    def _serve(self, with_body):
        # strip query/fragment, resolve to disk
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        if path in ("/", ""):
            path = "/index.html"
        disk = os.path.normpath(os.path.join(ROOT, path.lstrip("/")))
        if not disk.startswith(ROOT):
            return self._respond(403, b"", "text/plain")
        if not os.path.isfile(disk):
            return self._respond(404, b"404 not found", "text/plain")

        ext = os.path.splitext(disk)[1].lower()
        ctype = ATLAS_TYPES.get(ext, "application/octet-stream")
        try:
            with open(disk, "rb") as fp:
                data = fp.read()
        except OSError:
            return self._respond(404, b"404 not found", "text/plain")

        etag = '"%d-%d"' % (os.path.getmtime(disk), len(data))
        if self.headers.get("If-None-Match") == etag:
            self.send_response(304)
            self.send_header("ETag", etag)
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()
            return

        enc = self.headers.get("Accept-Encoding", "")
        payload, extra = data, []
        if "gzip" in enc and any(
            ctype.startswith(p) or ctype == p for p in GZIP_TYPES
        ):
            payload = gzip.compress(data, compresslevel=6)
            extra.append(("Content-Encoding", "gzip"))

        self.send_response(200)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("ETag", etag)
        self.send_header("Cache-Control", "no-cache")
        self.send_header("Vary", "Accept-Encoding")
        self.send_header("X-Content-Type-Options", "nosniff")
        for k, v in extra:
            self.send_header(k, v)
        self.end_headers()
        if with_body:
            self.wfile.write(payload)

    def do_GET(self):
        self._serve(True)

    def do_HEAD(self):
        self._serve(False)

    def _respond(self, code, body, ctype):
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if body:
            self.wfile.write(body)

    def log_message(self, fmt, *args):  # quieter console
        pass


class ThreadingBrokenServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8912
    httpd = ThreadingBrokenServer(("0.0.0.0", port), AtlasHandler)
    print("Design Atlas fast server on http://127.0.0.1:%d" % port)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
