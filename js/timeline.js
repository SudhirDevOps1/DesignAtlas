/**
 * Design Atlas — Interactive Design Movement Timeline (1920s - 2026+)
 * Shows historical lineages, aesthetic roots, and evolution of modern digital UI design.
 */

const TIMELINE_DATA = [
  // ── NEW: pre-machine-age lineage (original eras below are untouched) ──
  {
    era: "Pre-1920 · Ornament & Craft",
    title: "Baroque Ornament, Japonisme, Papercraft & Pastoral Hand-Making",
    desc: "Before industrial modernism: gilded Baroque surface decoration, Japanese woodblock composition, hand-cut paper, and the pastoral Arts & Crafts rejection of the machine.",
    styles: ["baroque", "ukiyoe", "tactilepaper", "cottagecore", "organic", "nature", "zenminimal"]
  },
  {
    era: "1920s — 1930s",
    title: "Modernist Foundations & Constructivism",
    desc: "The birth of modern functional design: form follows function, primary colors, mathematical grids, and industrial materials.",
    styles: ["bauhaus", "destijl", "constructivism", "artdeco", "bauhausdark"]
  },
  // ── NEW: mass-media print era ──
  {
    era: "1940s — 1960s · Mass Media",
    title: "Magazine Grids, Advertising Boom & Pop Print",
    desc: "The golden age of print advertising and magazine spreads: loud poster maximalism, comic-book ink outlines, and the editorial headline as the primary visual event.",
    styles: ["editorial", "maximalism", "comicretro", "scandinavian", "japandi"]
  },
  {
    era: "1950s — 1960s",
    title: "International Typographic Style & Mid-Century",
    desc: "Rigid Swiss grid systems, objective asymmetric layouts, Akzidenz-Grotesk, alongside optimistic American mid-century organic forms.",
    styles: ["swiss", "midcenturymodern", "weimar", "linearmodern"]
  },
  // ── NEW: brutalist architecture lineage ──
  {
    era: "1960s — 1970s · Concrete",
    title: "Brutalist Architecture, Raw Structure & Anti-Design",
    desc: "Béton brut: unpainted concrete, monumental massing and honest structure — later re-read as monolithic dark UI, and finally as acid-graphic anti-design.",
    styles: ["brutalism", "monolith", "darkbrutalism", "acidbrutalist"]
  },
  {
    era: "1970s — 1980s",
    title: "Post-Modernism, Memphis & 8-Bit Arcade",
    desc: "Rebellion against rigid grids! Memphis confetti patterns, psychedelic lava waves, synthwave neon, and the first pixel gaming displays.",
    styles: ["memphis", "psychedelic", "pixel", "retrofuturism"]
  },
  {
    era: "1990s — 2000s",
    title: "Cyberpunk, Terminal CLI, Y2K & Skeuomorphism",
    desc: "Early web dial-up, hacker green CRTs, glossy bubble Y2K aesthetics, leading to physical textures (leather, brushed metal) on touchscreens.",
    styles: ["retroterminal", "cyberpunk", "y2k", "skeuomorphism", "frutigeraero", "analogtape"]
  },
  // ── NEW: underground print & rave ──
  {
    era: "1990s — 2000s · Underground",
    title: "Grunge Print, Rave Flyers, Hand Scrawl & Zine Culture",
    desc: "Xeroxed zine layouts, photocopier grain, marker scrawl, rave and goth flyer graphics — plus the Macintosh GUI and VHS tape wobble that raised the first web generation.",
    styles: ["postdigitalgrunge", "cybergoth", "humanscribble", "retrocomputing"]
  },
  {
    era: "2010s — 2018",
    title: "The Great Flattening & Design Systems",
    desc: "Rejection of realistic textures in favor of Flat Design, Material Design elevation cards, pure typography Minimalism, and Corporate Memphis.",
    styles: ["flatdesign", "materialdesign", "minimalism", "corporatememphis", "monochrome", "darkluxe", "darkcinema", "archival", "motionnarrative", "highdensity", "typefirst", "kinetictype"]
  },
  // ── NEW: experimental web / anti-design ──
  {
    era: "2015 — 2020 · Experimental Web",
    title: "Anti-Grid, Deconstruction, Scroll Narrative & WebGL",
    desc: "Deliberately broken grids, exposed wireframe scaffolding, endless scroll storytelling, and GPU-rendered 3D running straight in the browser.",
    styles: ["antigrid", "deconstructedwire", "scrollytelling", "webgl3d", "vaporwave"]
  },
  {
    era: "2020s — Present",
    title: "Expressive Tactility & The New Morphisms",
    desc: "Re-emergence of optical physical realism through digital glass, clay 3D, Gumroad Neo-Brutalism, and Bento modular cards.",
    styles: ["neobrutalism", "glassmorphism", "claymorphism", "neumorphism", "bentogrid", "cardplay", "dopamine", "lego"]
  },
  // ── NEW: physical compute & material rendering ──
  {
    era: "2020s · Physical Compute",
    title: "Ray Tracing, Cyber-Physical Systems & Material Rendering",
    desc: "Real-time path-traced lighting, sensor-fused cyber-physical interfaces, and photoreal chrome/clay material studies bleeding out of engines into the browser.",
    styles: ["raytracing", "cyberphysical", "chromemetal", "claydark", "glitchhologram"]
  },
  {
    era: "2025 — 2026+",
    title: "Spatial, Ambient Light & Solarpunk Futures",
    desc: "Vision Pro spatial depth, dynamic Liquid Glass, ambient aurora gradients, biological fluid meshes, and eco-utopian Solarpunk systems.",
    styles: ["liquidglass", "spatialui", "aurora", "solarpunk", "biomorphicdigital", "glassnoir", "darkcosmic"]
  }
];

function renderTimelineView(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
      <div class="max-w-3xl mb-8">
        <span class="text-xs font-bold text-sky-500 uppercase tracking-widest">Historical Lineage</span>
        <h2 class="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">Design Movements & Evolution Timeline</h2>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">Trace how 100 years of visual art transformed from 1920s Bauhaus geometric primitives into modern 2026 Spatial UI and Liquid Glass interfaces.</p>
      </div>

      <div class="relative border-l-2 border-sky-400 dark:border-sky-600 ml-4 sm:ml-8 space-y-12">
        ${TIMELINE_DATA.map((item, idx) => `
          <div class="relative pl-6 sm:pl-10 group">
            <!-- Timeline Node Dot -->
            <div class="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-4 border-sky-500 flex items-center justify-center text-[10px] font-black text-sky-600 dark:text-sky-400 shadow-md">
              ${idx + 1}
            </div>

            <!-- Era Header -->
            <div class="flex flex-wrap items-center gap-2 mb-1.5">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                ${item.era}
              </span>
              <h3 class="text-lg font-black text-slate-900 dark:text-white">
                ${item.title}
              </h3>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-400 mb-4 max-w-2xl leading-relaxed">
              ${item.desc}
            </p>

            <!-- Cards Row for this Era -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              ${item.styles.map(sId => {
                const style = STYLES_DATA.find(s => s.id === sId);
                if (!style) return '';
                return `
                  <div
                    onclick="openDashboardModal('${style.id}')"
                    class="cursor-pointer bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-400 rounded-xl p-3.5 transition-all hover:-translate-y-1 shadow-xs hover:shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div class="flex items-center justify-between mb-1.5">
                        <span class="text-xs font-bold text-slate-900 dark:text-white truncate">${style.name}</span>
                        <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">${style.category}</span>
                      </div>
                      <p class="text-[11px] text-slate-500 line-clamp-2">${style.vibe}</p>
                    </div>

                    <!-- Mini color strip -->
                    <div class="flex items-center gap-1 mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      ${style.palette.map(c => `
                        <span class="w-2.5 h-2.5 rounded-full border border-black/10 inline-block" style="background-color: ${c}"></span>
                      `).join('')}
                      <span class="text-[10px] text-sky-500 font-bold ml-auto hover:underline">Preview ↗</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
