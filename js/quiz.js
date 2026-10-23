/**
 * Design Atlas — Style Matchmaker Quiz Engine
 * Interactive questionnaire that matches product goals to the ideal UI design style.
 */

const QUIZ_QUESTIONS = [
  {
    id: "q1",
    question: "What type of product are you designing?",
    options: [
      { label: "B2B SaaS, Analytics or Documentation", score: { minimalism: 3, swiss: 2, bentogrid: 3, flatdesign: 2 } },
      { label: "Developer Tools, Hacker Console or Crypto", score: { brutalism: 3, neobrutalism: 2, retroterminal: 3, cyberpunk: 3, glassnoir: 2 } },
      { label: "Modern Consumer App, Social or Gen-Z", score: { neobrutalism: 3, dopamine: 3, y2k: 2, cardplay: 3, corporatememphis: 2 } },
      { label: "Luxury Brand, Fashion, Wine or Editorial", score: { editorial: 3, darkluxe: 3, baroque: 3, artdeco: 3, monochrome: 2 } },
      { label: "Wellness, Eco, Slow Living or Craft", score: { organic: 3, cottagecore: 3, japandi: 3, nature: 3, solarpunk: 2 } },
      { label: "Next-Gen VisionOS, 3D or Frontier AI", score: { liquidglass: 3, spatialui: 3, aurora: 3, darkcosmic: 2, biomorphicdigital: 2 } }
    ]
  },
  {
    id: "q2",
    question: "What emotional vibe should users feel first?",
    options: [
      { label: "Quiet clarity, hyper-focused and distraction-free", score: { minimalism: 3, scandinavian: 3, monochrome: 2, swiss: 2 } },
      { label: "Playful, rebellious and high-voltage energy", score: { neobrutalism: 3, maximalism: 3, memphis: 3, dopamine: 3, comicretro: 2 } },
      { label: "Futuristic, luminous and cutting-edge optical depth", score: { liquidglass: 3, glassmorphism: 3, spatialui: 3, aurora: 3, glassnoir: 2 } },
      { label: "Warm, tactile, grounded and artisanal", score: { cottagecore: 3, organic: 3, humanscribble: 3, claymorphism: 2, ukiyoe: 2 } },
      { label: "Nostalgic retro, arcade or analog warmth", score: { pixel: 3, vaporwave: 3, retrofuturism: 3, frutigeraero: 3, analogtape: 3 } }
    ]
  },
  {
    id: "q3",
    question: "How should borders and shadows behave?",
    options: [
      { label: "Heavy 3-4px solid black borders with offset drop shadows", score: { neobrutalism: 3, brutalism: 3, comicretro: 2, destijl: 2 } },
      { label: "Frosted translucent glass, high backdrop-blur and 1px borders", score: { glassmorphism: 3, liquidglass: 3, glassnoir: 3, spatialui: 2 } },
      { label: "Zero drop shadows, razor-sharp clean flat edges", score: { flatdesign: 3, swiss: 3, minimalism: 2, typefirst: 3 } },
      { label: "Tactile inflated clay or soft dual extruded shadows", score: { claymorphism: 3, neumorphism: 3, cardplay: 2, lego: 2 } },
      { label: "Gilded metallic rims or luminous glowing neon neon halos", score: { cyberpunk: 3, darkluxe: 3, vaporwave: 2, artdeco: 3, aurora: 2 } }
    ]
  },
  // ── NEW: 4 additional questions so every style in the atlas is reachable ──
  {
    id: "q4",
    question: "Which era's spirit should the product consciously echo?",
    options: [
      { label: "Bauhaus / Swiss machine-age geometry & primary color blocks", score: { bauhaus: 3, bauhausdark: 3, weimar: 3, constructivism: 3, linearmodern: 3, midcenturymodern: 2 } },
      { label: "Hand-made paper, archival dossiers and physical material", score: { tactilepaper: 3, archival: 3, skeuomorphism: 3, retrocomputing: 2 } },
      { label: "CRT terminals, photocopy grain and machine noise", score: { retrocomputing: 3, glitchhologram: 3, postdigitalgrunge: 3, highdensity: 2 } },
      { label: "Radical anti-design, broken grids & raw concrete", score: { antigrid: 3, deconstructedwire: 3, acidbrutalist: 3, darkbrutalism: 3, monolith: 2 } },
      { label: "Cinematic darkness, film grain & moody vignettes", score: { darkcinema: 3, monolith: 2, darkluxe: 2, glassnoir: 2 } }
    ]
  },
  {
    id: "q5",
    question: "How should content move and be consumed?",
    options: [
      { label: "Scroll-driven narrative chapters that reveal themselves", score: { scrollytelling: 3, motionnarrative: 3, kinetictype: 3 } },
      { label: "Terminal-grade density — as much data as the screen allows", score: { highdensity: 3, cyberphysical: 3, archival: 2, retroterminal: 2 } },
      { label: "Still and print-quiet — no motion, pure typography", score: { zenminimal: 3, linearmodern: 2, typefirst: 3, swiss: 2 } },
      { label: "Real-time 3D, GPU render and spatial depth", score: { webgl3d: 3, raytracing: 3, cyberphysical: 3, chromemetal: 2, glitchhologram: 2 } },
      { label: "Tactile micro-interactions on every single control", score: { materialdesign: 3, skeuomorphism: 3, claydark: 2, neumorphism: 2 } }
    ]
  },
  {
    id: "q6",
    question: "What should the color strategy be?",
    options: [
      { label: "Almost no color — white, ink black and one quiet accent", score: { zenminimal: 3, monochrome: 3, linearmodern: 3, typefirst: 2 } },
      { label: "UV acid neons, rave flyers and hallucinatory gradients", score: { acidbrutalist: 3, cybergoth: 3, psychedelic: 3, vaporwave: 2 } },
      { label: "Cold chrome, brushed steel and specular highlights", score: { chromemetal: 3, raytracing: 3, materialdesign: 2, skeuomorphism: 2 } },
      { label: "Warm paper, cream, earth and faded archival tones", score: { tactilepaper: 3, archival: 3, midcenturymodern: 3, cottagecore: 2 } },
      { label: "Pure primaries — red, blue, yellow on hard geometry", score: { bauhaus: 3, bauhausdark: 3, constructivism: 3, weimar: 3, destijl: 2 } }
    ]
  },
  {
    id: "q7",
    question: "What structural rule should the whole layout obey?",
    options: [
      { label: "A rigid mathematical grid — every element snapped to it", score: { bauhaus: 3, weimar: 3, constructivism: 3, swiss: 3, linearmodern: 2 } },
      { label: "A deliberately broken, collaged, anti-grid composition", score: { antigrid: 3, deconstructedwire: 3, postdigitalgrunge: 3, maximalism: 2 } },
      { label: "Modular bento tiles with consistent gutters", score: { bentogrid: 3, cardplay: 2, highdensity: 2, bauhausdark: 2 } },
      { label: "Immersive full-bleed canvas with almost no chrome", score: { webgl3d: 3, scrollytelling: 3, darkcinema: 3, spatialui: 2 } },
      { label: "Layered dossier, index cards and stacked records", score: { archival: 3, motionnarrative: 2, materialdesign: 2, retrocomputing: 2 } }
    ]
  }
];

let quizState = {
  currentQuestion: 0,
  scores: {},
  history: []
};

function renderQuizView(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  quizState = { currentQuestion: 0, scores: {}, history: [] };
  renderQuizStep(containerId);
}

function renderQuizStep(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (quizState.currentQuestion >= QUIZ_QUESTIONS.length) {
    renderQuizResult(containerId);
    return;
  }

  const q = QUIZ_QUESTIONS[quizState.currentQuestion];
  const answered = quizState.currentQuestion;
  const pct = Math.round((answered / QUIZ_QUESTIONS.length) * 100);
  const hasBack = quizState.currentQuestion > 0;

  container.innerHTML = `
    <div class="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
      <!-- Progress Bar -->
      <div class="flex items-center justify-between text-xs font-bold text-slate-400 mb-4">
        <span>Question ${quizState.currentQuestion + 1} of ${QUIZ_QUESTIONS.length}</span>
        <span class="text-sky-500">${pct}% Complete</span>
      </div>
      <div class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-8" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
        <div class="bg-gradient-to-r from-sky-500 to-indigo-600 h-full transition-all duration-300" style="width: ${pct}%"></div>
      </div>

      <h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-6 leading-snug">
        ${q.question}
      </h3>

      <div class="space-y-3">
        ${q.options.map((opt, idx) => `
          <button
            onclick="selectQuizOption(${idx}, '${containerId}')"
            class="w-full text-left p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500 bg-slate-50 dark:bg-slate-800/40 hover:bg-sky-50/50 dark:hover:bg-sky-950/30 transition-all font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center justify-between group active:scale-[0.99]"
          >
            <span>${opt.label}</span>
            <span class="text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        `).join('')}
      </div>

      <!-- Navigation -->
      <div class="flex items-center justify-between mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
        <button
          onclick="quizBack('${containerId}')"
          class="px-4 py-2 rounded-xl text-xs font-bold transition ${hasBack
            ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            : 'opacity-40 cursor-not-allowed bg-slate-50 dark:bg-slate-800/40 text-slate-400'}"
          ${hasBack ? '' : 'disabled'}
        >
          ← Previous question
        </button>
        <span class="text-[11px] text-slate-400">${answered} answered · ${QUIZ_QUESTIONS.length - answered} left</span>
      </div>
    </div>
  `;
}

/** NEW: step back one question and roll its scores out of the running total. */
function quizBack(containerId) {
  const last = quizState.history.pop();
  if (!last) return;
  Object.entries(last).forEach(([styleId, val]) => {
    quizState.scores[styleId] = (quizState.scores[styleId] || 0) - val;
    if (quizState.scores[styleId] <= 0) delete quizState.scores[styleId];
  });
  quizState.currentQuestion = Math.max(0, quizState.currentQuestion - 1);
  soundManager.play('click');
  renderQuizStep(containerId);
}

function selectQuizOption(optionIdx, containerId) {
  soundManager.play('pop');
  const q = QUIZ_QUESTIONS[quizState.currentQuestion];
  const selected = q.options[optionIdx];

  // Accumulate scores
  Object.entries(selected.score).forEach(([styleId, val]) => {
    quizState.scores[styleId] = (quizState.scores[styleId] || 0) + val;
  });
  quizState.history.push({ ...selected.score });

  quizState.currentQuestion++;
  renderQuizStep(containerId);
}

function renderQuizResult(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Find top score
  let bestStyleId = "minimalism";
  let maxScore = -1;

  Object.entries(quizState.scores).forEach(([sId, score]) => {
    if (score > maxScore) {
      maxScore = score;
      bestStyleId = sId;
    }
  });

  const matched = STYLES_DATA.find(s => s.id === bestStyleId) || STYLES_DATA[0];
  soundManager.play('success');

  // NEW: runner-up recommendations (top 4 after the winner)
  const ranked = Object.entries(quizState.scores)
    .filter(([sId]) => sId !== matched.id)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([sId, sc]) => ({ style: STYLES_DATA.find(s => s.id === sId), score: sc }))
    .filter(r => r.style);
  const maxAlt = ranked.length ? ranked[0].score : 1;

  container.innerHTML = `
    <div class="max-w-2xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-center">
      <div class="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-400 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center text-3xl mb-4">
        ✨
      </div>

      <span class="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Match Found!</span>
      <h3 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 mb-2">
        Your Ideal Match: ${matched.name}
      </h3>
      <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-6">
        Based on your requirements, <strong class="text-slate-900 dark:text-slate-100">${matched.name}</strong> (${matched.category}) delivers the exact visual tension and user sentiment your project needs.
      </p>

      <!-- Live Mini Showcase Box -->
      <div class="h-40 rounded-2xl p-4 ${matched.cssClass} flex flex-col justify-between mb-6 text-left shadow-lg">
        <div class="flex items-center justify-between text-xs font-bold opacity-90">
          <span>${matched.name} Sample Preview</span>
          <span class="text-[10px] px-2 py-0.5 rounded-full bg-black/20 text-white">${matched.category}</span>
        </div>
        <div class="demo-box p-3 rounded-xl flex items-center justify-between">
          <span class="text-xs font-bold">Recommended Component</span>
          <button class="demo-btn px-3 py-1 text-xs">Action</button>
        </div>
      </div>

      <!-- Generated AI Prompt -->
      <div class="bg-slate-900 text-slate-200 p-4 rounded-2xl text-left font-mono text-xs mb-6 relative">
        <div class="flex items-center justify-between mb-2">
          <span class="text-emerald-400 font-bold">🤖 Prompt Ready for AI:</span>
          <button
            onclick="copyStylePrompt('${escapeJSString(matched.id)}', event)"
            class="px-2.5 py-1 text-[11px] bg-emerald-500 hover:bg-emerald-600 text-white rounded font-bold transition"
          >
            Copy Prompt 📋
          </button>
        </div>
        <p class="text-[11px] text-slate-300 leading-relaxed">${escapeHTML(typeof buildDetailedPrompt === 'function' ? buildDetailedPrompt(matched).split('\n').slice(0, 4).join(' ') : matched.prompt)}</p>
      </div>

      <!-- NEW: Runner-up matches -->
      ${ranked.length ? `
        <div class="text-left mb-6">
          <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Also worth considering</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${ranked.map(r => `
              <button
                onclick="openDashboardModal('${r.style.id}')"
                class="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:border-sky-400 hover:bg-white dark:hover:bg-slate-800 transition text-left group"
              >
                <span class="w-8 h-8 rounded-lg shrink-0 border border-black/10" style="background:${r.style.palette[0]}"></span>
                <span class="min-w-0 flex-1">
                  <span class="block text-xs font-bold text-slate-800 dark:text-slate-200 truncate">${r.style.name}</span>
                  <span class="block text-[10px] text-slate-500 truncate">${r.style.category} · score ${r.score}</span>
                </span>
                <span class="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                  <span class="block h-full bg-sky-400" style="width:${Math.round((r.score / maxAlt) * 100)}%"></span>
                </span>
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-3">
        <button
          onclick="openDashboardModal('${matched.id}')"
          class="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md transition"
        >
          Open Full Dashboard ↗
        </button>
        <button
          onclick="switchView('playground', '${matched.id}')"
          class="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition"
        >
          Test in Playground 🎛️
        </button>
        <button
          onclick="renderQuizView('${containerId}')"
          class="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition"
        >
          Retake Quiz ↺
        </button>
      </div>
    </div>
  `;
}
