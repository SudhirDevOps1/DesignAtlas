/**
 * Design Atlas — Production-Grade AI Prompt Studio & Customizer
 * Generates ultra-precise, bulletproof prompts for:
 * 1. Claude 3.7 Sonnet (Artifacts Mode)
 * 2. ChatGPT (GPT-4o / o3 Chain-of-Thought)
 * 3. v0.dev / Bolt.new / Lovable (Prompt-to-App Engines)
 * 4. Cursor IDE & Windsurf Composer (.cursorrules format)
 */

function renderPromptBuilderView(containerId, initialStyleId = 'glassmorphism') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div class="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold text-sky-500 uppercase tracking-widest">Enterprise AI Prompt Studio</span>
          <h2 class="text-2xl font-black text-slate-900 dark:text-white">Production AI Prompt Generator</h2>
          <p class="text-xs text-slate-500 mt-1">Generates comprehensive, multi-layer prompts that ensure AI models deliver exact design tokens, zero-generic UI, and production-grade code on the first shot.</p>
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            ★ Optimized for Claude 3.7, o3, v0 & Cursor
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
        
        <!-- Controls Column -->
        <div class="space-y-4 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-2">⚙️ Prompt Architecture</h3>

          <!-- Design Style -->
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Target Design Language:</label>
            <select id="pb-style" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold outline-none">
              ${STYLES_DATA.map(s => `<option value="${s.id}" ${s.id === initialStyleId ? 'selected' : ''}>${s.name} (${s.category})</option>`).join('')}
            </select>
          </div>

          <!-- Target AI Engine Format -->
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Target AI Engine / Prompt Mode:</label>
            <select id="pb-ai" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold outline-none">
              <option value="claude">Claude 3.7 Sonnet (Interactive Artifact)</option>
              <option value="chatgpt">ChatGPT (o3 / GPT-4o Deep CoT Spec)</option>
              <option value="gemini">Gemini 2.5 Pro (Long-Context Spec)</option>
              <option value="v0">v0.dev / Bolt.new / Lovable (Prompt-to-App)</option>
              <option value="cursor">Cursor IDE / Windsurf (.cursorrules format)</option>
              <option value="rules">Reusable Design Brief / AGENTS.md</option>
            </select>
          </div>

          <!-- Project Type -->
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Application Type:</label>
            <select id="pb-project" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold outline-none">
              <option value="SaaS Enterprise Analytics Dashboard">SaaS Enterprise Analytics Dashboard</option>
              <option value="iOS & Android Mobile App Kit">iOS & Android Mobile App Kit</option>
              <option value="High-Converting E-Commerce Storefront">High-Converting E-Commerce Storefront</option>
              <option value="AI Autonomous Agent Workspace & Chat Studio">AI Autonomous Agent Workspace & Chat Studio</option>
              <option value="Developer Platform, CLI Console & Cloud Monitoring">Developer Platform, CLI Console & Cloud Monitoring</option>
              <option value="Creative Agency & High-End Portfolio">Creative Agency & High-End Portfolio</option>
              <option value="Web3 DeFi Trading & Wallet Portal">Web3 DeFi Trading & Wallet Portal</option>
              <option value="Healthcare / Fintech Compliance Console">Healthcare / Fintech Compliance Console</option>
              <option value="Education Platform & Course Dashboard">Education Platform & Course Dashboard</option>
              <option value="Marketing Site with Pricing & Testimonials">Marketing Site with Pricing & Testimonials</option>
              <option value="Internal Admin Panel & CRUD Toolkit">Internal Admin Panel & CRUD Toolkit</option>
            </select>
          </div>

          <!-- Target Tech Stack -->
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Frontend Architecture Stack:</label>
            <select id="pb-stack" class="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold outline-none">
              <option value="Next.js 15 (App Router) + Tailwind CSS + Lucide Icons + Framer Motion">Next.js 15 + Tailwind + Framer Motion</option>
              <option value="React 19 + Vite + Tailwind CSS + Lucide Icons">React 19 + Vite + Tailwind CSS</option>
              <option value="Single-File HTML + Tailwind CDN + Vanilla JS (Zero Build)">Single-File HTML + Tailwind CDN (Zero Build)</option>
              <option value="Vue 3 + Tailwind CSS + Pinia">Vue 3 + Tailwind CSS + Pinia</option>
              <option value="Svelte 5 + Skeleton CSS + Runes">Svelte 5 + Runes</option>
              <option value="Astro 5 + Tailwind CSS + View Transitions">Astro 5 + Tailwind + View Transitions</option>
              <option value="React Native + Expo + NativeWind">React Native + Expo</option>
              <option value="Flutter + Material 3">Flutter + Material 3</option>
            </select>
          </div>

          <!-- Components to Include -->
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-2">Required Architectural Modules:</label>
            <div class="grid grid-cols-2 gap-2 text-[11px]">
              <label class="flex items-center gap-1.5"><input type="checkbox" id="pb-c-nav" checked class="accent-sky-500"> Top Navigation Bar</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" id="pb-c-bento" checked class="accent-sky-500"> Bento Metrics Grid</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" id="pb-c-charts" checked class="accent-sky-500"> Interactive Charts</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" id="pb-c-table" checked class="accent-sky-500"> Records Data Table</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" id="pb-c-modal" checked class="accent-sky-500"> Modal / Dialog</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" id="pb-c-dark" checked class="accent-sky-500"> Dark/Light Mode</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" id="pb-c-filter" checked class="accent-sky-500"> Search & Filter Bar</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" id="pb-c-a11y" checked class="accent-sky-500"> WCAG AA Accessibility</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" id="pb-c-empty" checked class="accent-sky-500"> Empty & Error States</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" id="pb-c-load" checked class="accent-sky-500"> Skeleton Loading</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" id="pb-c-toast" checked class="accent-sky-500"> Toast Notifications</label>
              <label class="flex items-center gap-1.5"><input type="checkbox" id="pb-c-resp" checked class="accent-sky-500"> Mobile Responsive</label>
            </div>
          </div>
        </div>

        <!-- Generated Output Column -->
        <div class="lg:col-span-2 flex flex-col justify-between gap-5">
          <div class="bg-slate-950 text-slate-100 p-6 rounded-2xl border border-slate-800 font-mono text-xs flex flex-col flex-1 shadow-inner">
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <span class="text-emerald-400 font-bold">⚡ Ready-to-Execute Production Prompt</span>
                <span id="pb-format-badge" class="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800 font-sans">Claude Mode</span>
                <span id="pb-stats" class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-sans tnum">0 words</span>
              </div>
              <div class="flex gap-2">
                <button id="pb-download-btn" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition">
                  ⬇ Download Prompt
                </button>
                <button id="pb-copy-btn" class="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition shadow-md shadow-emerald-500/20">
                  📋 Copy Prompt
                </button>
              </div>
            </div>

            <!-- Output Text Area -->
            <textarea
              id="pb-output-text"
              readonly
              class="w-full flex-1 bg-transparent resize-none outline-none leading-relaxed text-slate-200 text-xs font-mono select-all h-[420px]"
            ></textarea>
          </div>

          <!-- Quality Guarantee Banner -->
          <div class="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
            <div>
              <strong class="text-slate-900 dark:text-white">🛡️ Production Guarantee:</strong>
              <span>Includes explicit anti-generic constraints, color tokens, elevation rules, micro-interactions, and component hierarchies.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  const styleSelect = document.getElementById('pb-style');
  const aiSelect = document.getElementById('pb-ai');
  const projectSelect = document.getElementById('pb-project');
  const stackSelect = document.getElementById('pb-stack');
  const outputText = document.getElementById('pb-output-text');
  const copyBtn = document.getElementById('pb-copy-btn');
  const downloadBtn = document.getElementById('pb-download-btn');
  const formatBadge = document.getElementById('pb-format-badge');

  function generatePrompt() {
    const style = STYLES_DATA.find(s => s.id === styleSelect.value) || STYLES_DATA[0];
    const project = projectSelect.value;
    const stack = stackSelect.value;
    const aiMode = aiSelect.value;

    const components = [];
    if (document.getElementById('pb-c-nav')?.checked) components.push('Responsive Header & Navigation bar with brand logo, breadcrumb, search input, and user profile avatar');
    if (document.getElementById('pb-c-bento')?.checked) components.push('Bento Grid Metrics section with 4 high-impact KPI stat cards (Value, delta %, sparkline, trend badge)');
    if (document.getElementById('pb-c-charts')?.checked) components.push('Interactive Data Visualization area showing performance curves or bar breakdown across time ranges');
    if (document.getElementById('pb-c-table')?.checked) components.push('Structured Transactions / Records Data Table with multi-column sorting, pagination, and status pills');
    if (document.getElementById('pb-c-modal')?.checked) components.push('Tactile Interactive Workflow Modal Dialog triggered on action');
    if (document.getElementById('pb-c-filter')?.checked) components.push('Real-time Search & Filter Chip toolbar with category counters');
    if (document.getElementById('pb-c-dark')?.checked) components.push('Complete Dark Mode and Light Mode support with seamless contrast adaptation');
    if (document.getElementById('pb-c-a11y')?.checked) components.push('WCAG AA compliant focus rings, accessible color contrast ratios, and semantic HTML5 landmark tags');
    if (document.getElementById('pb-c-empty')?.checked) components.push('Thoughtful Empty, No-Results and Error states with a clear recovery action');
    if (document.getElementById('pb-c-load')?.checked) components.push('Skeleton loading placeholders that match the final layout geometry');
    if (document.getElementById('pb-c-toast')?.checked) components.push('Toast / snackbar notification system for success, warning and error feedback');
    if (document.getElementById('pb-c-resp')?.checked) components.push('Fully responsive layout from 360px mobile through 1440px+ desktop with no horizontal scroll');

    let promptText = '';

    if (aiMode === 'cursor') {
      formatBadge.textContent = 'Cursor .cursorrules Mode';
      promptText = `# .cursorrules / AGENTS.md — Design System Specification

## Target Design Language: ${style.name} (${style.category})
- Vibe & Visual Persona: ${style.vibe}
- Primary Use-Cases: ${style.bestFit}

## Color Tokens Specification
- Background: ${style.palette[0]}
- Surface Container: ${style.palette[1]}
- Primary Accent: ${style.palette[2]}
- Text & Iconography: ${style.palette[3]}

## Strict Design System Constraints
1. STRICTLY EMBODY "${style.name}". Never revert to default generic gray-box Tailwind UI.
2. Surfaces & Borders: Implement ${style.name} surface rules:
\`\`\`css
${style.cssSnippet}
\`\`\`
3. Do NOT use placeholder images, external mock services, or broken links. Use inline SVG or pure CSS primitives.
4. Stack: ${stack}
5. Application: ${project}

## Required Component Modules
${components.map(c => `- [ ] ${c}`).join('\n')}

## Micro-Interactions & Feel
- Interactive elements must include tactile hover, active, and focus states consistent with ${style.name}.
- Audio Tone Persona: ${style.audioTone}.
`;
    } else if (aiMode === 'v0') {
      formatBadge.textContent = 'v0 / Bolt / Lovable Mode';
      promptText = `Build a complete, stunning ${project} in "${style.name}" UI design language using ${stack}.

DESIGN SPECIFICATIONS:
- Aesthetic: ${style.name} (${style.vibe})
- Color Palette: ${style.palette.join(', ')}
- Core CSS Rule:
${style.cssSnippet}

COMPONENTS TO BUILD:
${components.map(c => `• ${c}`).join('\n')}

QUALITY STANDARDS:
- Avoid generic plain UI. Make every button, card, and input feel like high-end ${style.name}.
- Provide full, responsive, working code with realistic mock data and interactive state handlers.
- Ensure every interactive button and toggle is clickable and functional in the preview.`;
    } else if (aiMode === 'chatgpt') {
      formatBadge.textContent = 'ChatGPT o3 / 4o Deep CoT Mode';
      promptText = `You are a Principal Frontend Architect and World-Class Design Technologist.

Task: Architect and build a complete, production-grade ${project} meticulously styled in the "${style.name}" design language.

## Step 1: Design System & Tokens
- Style: ${style.name} (${style.category})
- Characteristic Persona: ${style.vibe}
- Palette Tokens: ${style.palette.join(', ')}
- Elevation & Physics:
${style.cssSnippet}

## Step 2: Implementation Stack
- Architecture: ${stack}
- Strict Requirement: No generic styles. All typography, shadows, borders, and animations must strictly follow ${style.name}.

## Step 3: Required UI Modules
${components.map(c => `1. ${c}`).join('\n')}

## Step 4: Deliverable
Generate the complete, runnable frontend code with clean component boundaries, complete state management, and zero placeholders.`;
    } else if (aiMode === 'gemini') {
      formatBadge.textContent = 'Gemini 2.5 Pro Long-Context Mode';
      promptText = `You are a senior product designer-engineer hybrid.

CONTEXT
- Application: ${project}
- Design language: ${style.name} (${style.category})
- Vibe: ${style.vibe}
- Target use-cases: ${style.bestFit}
- Stack: ${stack}

DESIGN TOKENS (authoritative — never invent alternatives)
${style.palette.map((c, i) => `- palette[${i}]: ${c}`).join('\n')}

AUTHENTIC SURFACE RULES FOR ${style.name.toUpperCase()}
\`\`\`css
${style.cssSnippet}
\`\`\`

REQUIREMENTS
${components.map((c, i) => `${i + 1}. ${c}`).join('\n')}

EXECUTION NOTES
- If you are unsure about a visual detail, choose the option that is MORE ${style.name}, never less.
- Return runnable code only: no prose, no pseudo-code, no placeholders.
- Include realistic mock data and complete interaction state handling.`;
    } else if (aiMode === 'rules') {
      formatBadge.textContent = 'Reusable Design Brief / AGENTS.md';
      promptText = `# Design System Brief — ${style.name}

> Paste this into AGENTS.md, CLAUDE.md, .cursorrules or a project README so every future
> generation keeps using the same visual language.

## Identity
- Design language: **${style.name}**
- Category: ${style.category}
- Vibe: ${style.vibe}
- Best fit: ${style.bestFit}

## Color tokens
| Token | Value |
| --- | --- |
| background | ${style.palette[0]} |
| surface | ${style.palette[1]} |
| accent | ${style.palette[2]} |
| text | ${style.palette[3]} |

## Non-negotiable CSS
\`\`\`css
${style.cssSnippet}
\`\`\`

## Tailwind reference markup
\`\`\`html
${style.tailwindSnippet}
\`\`\`

## Rules for any new UI
1. Every new screen must feel unmistakably ${style.name}.
2. Reuse the tokens above; do not introduce ad-hoc hex values.
3. Never fall back to default gray-box UI.
4. Keep interactions tactile: hover, active and focus states on every control.
5. Required modules: ${components.join('; ')}.

## Audio / motion persona
- Tone: ${style.audioTone}
`;
    } else {
      formatBadge.textContent = 'Claude 3.7 Sonnet Artifact Mode';
      promptText = `Act as an elite UI/UX Principal Designer & Creative Technologist.

Build a self-contained, fully interactive ${project} rendered with extraordinary craft in the "${style.name}" UI design language.

## 1. Visual Identity & Design DNA
- Style Name: ${style.name} (${style.category})
- Vibe & Aura: ${style.vibe}
- Best Fit Category: ${style.bestFit}
- Color Palette: ${style.palette.join(', ')}

## 2. Elevation, Depth & CSS Tokens
Apply the authentic mathematical physics of ${style.name}:
\`\`\`css
${style.cssSnippet}
\`\`\`

## 3. Tech Stack & Execution
- Implementation Framework: ${stack}
- Deliver complete, beautiful, working code inside a single interactive artifact.
- Absolutely NO generic UI cards or default gray boxes. Every pixel must feel distinctly ${style.name}.

## 4. Required Components
${components.map(c => `- ${c}`).join('\n')}

## 5. Micro-Interactions & Polish
- Smooth hover and pressed active states for all interactive elements.
- Realistic sample data and stats.
- Provide the complete code ready to run immediately.`;
    }

    outputText.value = promptText;

    // NEW: live prompt statistics
    const statsEl = document.getElementById('pb-stats');
    if (statsEl) {
      const words = promptText.trim() ? promptText.trim().split(/\s+/).length : 0;
      statsEl.textContent = `${words} words · ${promptText.length} chars`;
    }
  }

  // Event Listeners
  [styleSelect, aiSelect, projectSelect, stackSelect].forEach(el => {
    el.addEventListener('change', () => {
      soundManager.play('click');
      generatePrompt();
    });
  });

  ['pb-c-nav', 'pb-c-bento', 'pb-c-charts', 'pb-c-table', 'pb-c-modal', 'pb-c-dark', 'pb-c-filter', 'pb-c-a11y',
   'pb-c-empty', 'pb-c-load', 'pb-c-toast', 'pb-c-resp'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', generatePrompt);
  });

  copyBtn.addEventListener('click', () => {
    const done = (ok) => {
      if (typeof soundManager !== 'undefined') soundManager.play(ok ? 'success' : 'heavy');
      if (typeof showToast === 'function') {
        showToast(ok ? '✔ Production Prompt copied to clipboard!' : '⚠ Copy blocked — use Ctrl+C');
      }
    };
    if (typeof copyText === 'function') copyText(outputText.value).then(done);
    else navigator.clipboard.writeText(outputText.value).then(() => done(true)).catch(() => done(false));
  });

  downloadBtn.addEventListener('click', () => {
    const filename = aiSelect.value === 'cursor' ? '.cursorrules'
      : aiSelect.value === 'rules' ? 'DESIGN-SYSTEM.md'
      : `prompt-${styleSelect.value}-${aiSelect.value}.md`;
    TokenExporter.downloadFile(filename, outputText.value, 'text/markdown');
    soundManager.play('success');
    showToast(`✔ Downloaded ${filename}!`);
  });

  generatePrompt();
}
