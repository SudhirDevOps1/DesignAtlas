/**
 * Design Atlas — Favorites & Client Moodboard Engine
 * Manages saved bookmark styles, favorites filtering, and executive presentation exports.
 */

class FavoritesManager {
  constructor() {
    this.storageKey = 'designatlas_favorites';
    this.favorites = this.load();
  }

  load() {
    if (typeof safeLS === 'object') return safeLS.getJSON(this.storageKey, []);
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  save() {
    if (typeof safeLS === 'object') { safeLS.setJSON(this.storageKey, this.favorites); return; }
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.favorites));
    } catch (e) {}
  }

  isFavorite(id) {
    return this.favorites.includes(id);
  }

  toggle(id) {
    if (this.isFavorite(id)) {
      this.favorites = this.favorites.filter(item => item !== id);
    } else {
      this.favorites.push(id);
    }
    this.save();
    return this.isFavorite(id);
  }

  getCount() {
    return this.favorites.length;
  }

  getFavoriteStyles() {
    return STYLES_DATA.filter(s => this.favorites.includes(s.id));
  }
}

const favManager = new FavoritesManager();

function exportClientMoodboard() {
  const styles = favManager.getCount() > 0 ? favManager.getFavoriteStyles() : STYLES_DATA.slice(0, 6);
  
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export the Client Spec Sheet & Moodboard.');
    return;
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Design Atlas — Client UI Design Brief & Specification</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="css/styles.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Playfair+Display:wght@700&family=Space+Mono&display=swap" rel="stylesheet">
  <style>
    @media print {
      .no-print { display: none !important; }
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 p-8 font-sans">
  <div class="max-w-5xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between border-b pb-6 mb-8">
      <div>
        <span class="text-xs font-bold uppercase tracking-widest text-sky-600">Executive Design Brief</span>
        <h1 class="text-3xl font-extrabold tracking-tight mt-1">Design Style Moodboard & AI Specifications</h1>
        <p class="text-sm text-slate-500 mt-1">Curated options ready for stakeholder review and AI engineering handoff.</p>
      </div>
      <div class="no-print flex gap-3">
        <button onclick="window.print()" class="px-5 py-2.5 bg-sky-600 text-white rounded-xl font-bold text-sm shadow hover:bg-sky-700">🖨️ Print / Save as PDF</button>
        <button onclick="window.close()" class="px-4 py-2.5 bg-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-300">Close</button>
      </div>
    </div>

    <!-- Style Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      ${styles.map(s => `
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-xl font-black text-slate-900">${s.name}</h2>
              <span class="text-xs px-2.5 py-1 rounded-full bg-slate-100 font-semibold text-slate-700 border">${s.category}</span>
            </div>
            <p class="text-xs text-slate-600 mb-2"><strong>Vibe:</strong> ${s.vibe}</p>
            <p class="text-xs text-slate-500 mb-4"><strong>Best Fit:</strong> ${s.bestFit}</p>

            <!-- Color Palette Swatches -->
            <div class="mb-4">
              <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Color Tokens:</span>
              <div class="flex gap-2">
                ${s.palette.map(c => `
                  <div class="flex items-center gap-1.5 text-[10px] font-mono bg-slate-50 border rounded px-1.5 py-0.5">
                    <span class="w-3.5 h-3.5 rounded border border-black/10 inline-block" style="background-color: ${c}"></span>
                    <span>${c}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Mini Live Preview Box -->
            <div class="h-32 p-4 rounded-xl ${s.cssClass} flex flex-col justify-between mb-4">
              <span class="text-xs font-bold opacity-80 uppercase">${s.name} Sample</span>
              <div class="demo-box p-3 rounded-lg flex items-center justify-between text-xs">
                <span class="font-bold">Metric Panel</span>
                <button class="demo-btn px-3 py-1 text-xs">Action</button>
              </div>
            </div>
          </div>

          <!-- AI Engineering Prompt -->
          <div class="bg-slate-900 text-slate-200 p-3.5 rounded-xl font-mono text-[11px] leading-relaxed">
            <div class="flex items-center justify-between gap-2 mb-1">
              <span class="text-emerald-400 font-bold">🤖 AI Prompt Specification:</span>
              <button onclick="copyStylePrompt('${s.id}', event)"
                class="shrink-0 px-2 py-1 rounded bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition">
                Copy 📋
              </button>
            </div>
            <pre class="whitespace-pre-wrap font-mono text-[11px] leading-relaxed m-0">${(typeof buildDetailedPrompt === 'function' ? buildDetailedPrompt(s).split('\n').slice(0, 12).join('\n') + '\n…' : s.prompt)}</pre>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Footer -->
    <div class="mt-12 pt-6 border-t text-xs text-slate-400 flex justify-between">
      <span>Generated via Design Atlas Workbench</span>
      <span>Date: ${new Date().toLocaleDateString()}</span>
    </div>
  </div>
</body>
</html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
