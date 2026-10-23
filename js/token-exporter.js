/**
 * Design Atlas — Token Exporter & Boilerplate Generator
 * Generates DTCG standard JSON, CSS Custom Properties, Tailwind Config, and full Starter Boilerplates.
 */

class TokenExporter {
  // Generate CSS Custom Properties (:root)
  static generateCSSVariables(style) {
    return `:root {
  /* Color Palette Tokens */
  --color-bg-primary: ${style.palette[0]};
  --color-surface: ${style.palette[1]};
  --color-accent: ${style.palette[2]};
  --color-text-main: ${style.palette[3]};

  /* Style DNA Tokens */
  --style-name: "${style.name}";
  --style-category: "${style.category}";
}

/* Base Card Specification */
${style.cssSnippet}
`;
  }

  // Generate Design Tokens Community Group (DTCG) Standard JSON
  static generateDTCGJSON(style) {
    const tokens = {
      "$schema": "https://design-tokens.github.io/community-group/format/",
      "color": {
        "background": { "$value": style.palette[0], "$type": "color" },
        "surface": { "$value": style.palette[1], "$type": "color" },
        "accent": { "$value": style.palette[2], "$type": "color" },
        "text": { "$value": style.palette[3], "$type": "color" }
      },
      "style": {
        "name": { "$value": style.name, "$type": "string" },
        "category": { "$value": style.category, "$type": "string" },
        "vibe": { "$value": style.vibe, "$type": "string" },
        "bestFit": { "$value": style.bestFit, "$type": "string" }
      }
    };
    return JSON.stringify(tokens, null, 2);
  }

  // Generate Tailwind Config Extension
  static generateTailwindConfig(style) {
    return `// tailwind.config.js - Theme Extension for ${style.name}
module.exports = {
  theme: {
    extend: {
      colors: {
        '${style.id}-bg': '${style.palette[0]}',
        '${style.id}-surface': '${style.palette[1]}',
        '${style.id}-accent': '${style.palette[2]}',
        '${style.id}-text': '${style.palette[3]}',
      }
    }
  }
};
`;
  }

  // Generate Complete, Self-Contained Starter Boilerplate HTML
  static generateStarterBoilerplate(style) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${style.name} — Production Starter Template</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Cinzel:wght@600;800&family=Inter:wght@400;600;800&family=Playfair+Display:wght@700&family=Space+Mono&family=Syne:wght@800&family=VT323&display=swap" rel="stylesheet">
  <style>
    /* 76 UI Styles Pure-CSS Rule for ${style.name} */
    ${style.cssSnippet}
    body { font-family: 'Inter', system-ui, sans-serif; }
  </style>
</head>
<body class="min-h-screen p-6 sm:p-12 flex flex-col justify-between" style="background-color: ${style.palette[0]}; color: ${style.palette[3]};">

  <!-- Header -->
  <header class="max-w-5xl mx-auto w-full flex items-center justify-between pb-8 border-b border-current/20">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl border border-current flex items-center justify-center font-bold">◈</div>
      <div>
        <h1 class="text-xl font-extrabold uppercase tracking-tight">${style.name} Starter</h1>
        <p class="text-xs opacity-75">${style.vibe}</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs px-2.5 py-1 rounded-full border border-current font-mono">${style.category}</span>
    </div>
  </header>

  <!-- Main Hero & Component Playground -->
  <main class="max-w-5xl mx-auto w-full my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="p-8 rounded-2xl border border-current/20 flex flex-col justify-between" style="background-color: ${style.palette[1]};">
      <div>
        <span class="text-xs font-bold uppercase tracking-wider opacity-75">Production Ready</span>
        <h2 class="text-2xl font-black mt-2 mb-3">Build with ${style.name}</h2>
        <p class="text-sm opacity-80 leading-relaxed mb-6">
          This project template is optimized for ${style.bestFit}. Everything has been pre-configured using pure CSS tokens and responsive layout.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <button class="px-5 py-2.5 rounded-xl font-bold text-sm shadow transition" style="background-color: ${style.palette[2]}; color: #ffffff;">
          Get Started
        </button>
        <button class="px-4 py-2.5 rounded-xl border border-current text-sm font-semibold opacity-80 hover:opacity-100">
          Documentation
        </button>
      </div>
    </div>

    <!-- Live Card & Input Demonstration -->
    <div class="p-8 rounded-2xl border border-current/20 flex flex-col justify-between" style="background-color: ${style.palette[1]};">
      <div>
        <div class="flex items-center justify-between mb-4">
          <span class="text-xs font-bold opacity-75">Interactive Sample</span>
          <span class="text-xs font-mono opacity-80">$24,900.00</span>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-semibold mb-1 opacity-75">Component Input</label>
            <input type="text" value="Sample query..." class="w-full px-3 py-2 text-xs rounded-lg border border-current/40 bg-transparent outline-none">
          </div>
          <div>
            <label class="block text-xs font-semibold mb-1 opacity-75">Design Palette</label>
            <div class="flex gap-2">
              ${style.palette.map(c => `<span class="w-6 h-6 rounded-md border border-current/20" style="background-color: ${c}" title="${c}"></span>`).join('')}
            </div>
          </div>
        </div>
      </div>
      <div class="pt-6 border-t border-current/20 text-xs opacity-70">
        <div class="font-bold mb-1">AI Production Brief:</div>
        <pre class="whitespace-pre-wrap font-mono text-[10px] leading-relaxed opacity-90 m-0 max-h-64 overflow-auto">${(typeof buildDetailedPrompt === 'function' ? buildDetailedPrompt(style) : style.prompt)}</pre>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="max-w-5xl mx-auto w-full pt-8 border-t border-current/20 flex items-center justify-between text-xs opacity-75">
    <span>Generated by Design Atlas</span>
    <span>Ready for Claude, ChatGPT, v0 & Cursor</span>
  </footer>

</body>
</html>`;
  }

  // Trigger File Download
  static downloadFile(filename, content, type = 'text/plain') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TokenExporter };
}
