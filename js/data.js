/**
 * Design Atlas — 76 UI Styles Complete Database
 * Contains metadata, vibes, best fit, prompts, raw CSS snippets, Tailwind classes & color palettes.
 */

const STYLES_DATA = [
  {
    id: "minimalism",
    name: "Minimalism",
    category: "Minimal",
    cssClass: "style-minimalism",
    vibe: "Saaf, kam elements, zyada whitespace, typography-focused",
    bestFit: "SaaS, docs, portfolio, blogs",
    prompt: "Design a [project] in Minimalism style: clean layout, generous whitespace, monochrome + one subtle accent, clean sans-serif typography, no decorative clutter, focus on content hierarchy.",
    palette: ["#fafafa", "#ffffff", "#e4e4e7", "#18181b"],
    tags: ["clean", "whitespace", "saas", "subtle", "simple"],
    audioTone: "subtle",
    cssSnippet: `.minimalism-card {
  background: #ffffff;
  border: 1px solid #e4e4e7;
  color: #18181b;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.minimalism-btn {
  background: #18181b;
  color: #fafafa;
  border-radius: 6px;
  padding: 8px 16px;
}`,
    tailwindSnippet: `<div class="bg-white border border-zinc-200 text-zinc-900 shadow-sm p-6 rounded-lg">
  <button class="bg-zinc-900 text-zinc-50 hover:bg-zinc-800 px-4 py-2 rounded-md font-medium">Button</button>
</div>`
  },
  {
    id: "maximalism",
    name: "Maximalism",
    category: "Bold",
    cssClass: "style-maximalism",
    vibe: "Collage, bright colors, zyada elements, bold patterns",
    bestFit: "Fashion, music, events, entertainment",
    prompt: "Design a [project] in Maximalism style: layered collage, vibrant loud colors, overlapping elements, bold expressive typography, dense visual rhythm, expressive textures, high visual excitement.",
    palette: ["#ff007f", "#7928ca", "#ffe600", "#00f0ff"],
    tags: ["loud", "collage", "colorful", "party", "overlap"],
    audioTone: "arcade",
    cssSnippet: `.maximalism-card {
  background: #ffe600;
  color: #000;
  border: 3px dashed #ff0055;
  box-shadow: 6px 6px 0px #00f0ff, -4px -4px 0px #ff007f;
  transform: rotate(-1.5deg);
}
.maximalism-btn {
  background: #00f0ff;
  border: 3px solid #000;
  box-shadow: 4px 4px 0px #ff007f;
  font-weight: 900;
}`,
    tailwindSnippet: `<div class="bg-yellow-300 text-black border-4 border-dashed border-pink-600 shadow-[6px_6px_0px_#00f0ff] -rotate-1 p-6">
  <button class="bg-cyan-400 border-2 border-black font-black shadow-[4px_4px_0px_#ff007f] px-5 py-2">Action</button>
</div>`
  },
  {
    id: "brutalism",
    name: "Brutalism",
    category: "Bold",
    cssClass: "style-brutalism",
    vibe: "Raw, naked HTML look, bold borders, no polish",
    bestFit: "Art, experimental, dev tools, underground culture",
    prompt: "Design a [project] in Brutalism style: raw HTML aesthetic, system monospace fonts, thick black solid borders, zero shadows, exposed layout structure, unapologetic utilitarian feel.",
    palette: ["#ffffff", "#000000", "#e5e5e5", "#000000"],
    tags: ["raw", "monospace", "hard", "solid", "unfiltered"],
    audioTone: "heavy",
    cssSnippet: `.brutalist-card {
  background: #ffffff;
  color: #000000;
  border: 4px solid #000000;
  font-family: monospace;
}
.brutalist-btn {
  border: 3px solid #000000;
  background: #ffffff;
  color: #000000;
  font-weight: 800;
}`,
    tailwindSnippet: `<div class="bg-white text-black border-4 border-black font-mono p-6">
  <button class="bg-white text-black border-2 border-black font-black hover:bg-black hover:text-white px-4 py-2">SUBMIT</button>
</div>`
  },
  {
    id: "neobrutalism",
    name: "Neo-Brutalism",
    category: "Bold",
    cssClass: "style-neobrutalism",
    vibe: "Bold borders, hard offset shadows, stark vivid colors",
    bestFit: "Dev tools, indie products, modern fintech, newsletters",
    prompt: "Design a [project] in Neo-Brutalism style: thick 3-4px solid black borders, zero-blur hard offset shadows (4px 4px), high-contrast playful colors, pressed active hover states, rounded chunky cards.",
    palette: ["#fef08a", "#a7f3d0", "#f43f5e", "#000000"],
    tags: ["trendy", "gumroad", "figma", "bold", "chunky"],
    audioTone: "pop",
    cssSnippet: `.neobrutal-card {
  background: #a7f3d0;
  border: 3px solid #000000;
  box-shadow: 5px 5px 0px #000000;
  border-radius: 8px;
}
.neobrutal-btn {
  background: #f43f5e;
  color: #ffffff;
  border: 3px solid #000000;
  box-shadow: 4px 4px 0px #000000;
  border-radius: 8px;
  font-weight: 800;
  transition: transform 0.1s, box-shadow 0.1s;
}
.neobrutal-btn:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #000000;
}`,
    tailwindSnippet: `<div class="bg-emerald-200 border-2 border-black shadow-[5px_5px_0px_#000] rounded-lg p-6">
  <button class="bg-rose-500 text-white font-bold border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] px-4 py-2 rounded-lg">Click Me</button>
</div>`
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    logoSvg: `<svg class="demo-logo-mark" viewBox="0 0 32 32" role="img" aria-label="Glassmorphism logo"><rect x="1" y="1" width="30" height="30" rx="9" fill="#0f172a" fill-opacity=".88"/><circle cx="12" cy="12" r="7.5" fill="#a5b4fc" fill-opacity=".8"/><circle cx="21" cy="21" r="6.5" fill="#f472b6" fill-opacity=".72"/><rect x="1.5" y="1.5" width="29" height="29" rx="8.5" fill="none" stroke="#ffffff" stroke-opacity=".6"/></svg>`,
    category: "Futuristic",
    cssClass: "style-glassmorphism",
    vibe: "Frosted glass, blur, translucency, floating depth",
    bestFit: "SaaS dashboards, headers, crypto wallets, modern web apps",
    prompt: "Design a [project] in Glassmorphism style: translucent panels with backdrop-filter blur (14px+), subtle 1px white border highlights, frosted glass cards, layered depth over vivid gradient background.",
    palette: ["#8b5cf6", "#ec4899", "rgba(255,255,255,0.2)", "#3b82f6"],
    tags: ["frosted", "blur", "translucent", "modern", "gradient"],
    audioTone: "chime",
    cssSnippet: `.glass-card {
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.25);
  border-radius: 16px;
}`,
    tailwindSnippet: `<div class="bg-white/20 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-6 text-white">
  <button class="bg-white/25 hover:bg-white/40 border border-white/40 px-4 py-2 rounded-xl backdrop-blur-sm">Action</button>
</div>`
  },
  {
    id: "claymorphism",
    name: "Claymorphism",
    category: "Bold",
    cssClass: "style-claymorphism",
    vibe: "Soft, 3D floating clay elements, inner & outer shadows",
    bestFit: "Kids apps, gaming, fintech, friendly dashboards",
    prompt: "Design a [project] in Claymorphism style: soft tactile 3D rounded shapes, double inner shadows for inflated clay volume, soft outer drop shadow, friendly pastel palette, playful pill buttons.",
    palette: ["#e0e7ff", "#c7d2fe", "#818cf8", "#4338ca"],
    tags: ["soft", "3d", "inflated", "cute", "tactile"],
    audioTone: "pop",
    cssSnippet: `.clay-card {
  background: #c7d2fe;
  border-radius: 24px;
  box-shadow: 
    inset -6px -6px 12px rgba(99, 102, 241, 0.35),
    inset 6px 6px 12px rgba(255, 255, 255, 0.9),
    10px 14px 20px rgba(79, 70, 229, 0.2);
}`,
    tailwindSnippet: `<div class="bg-indigo-200 rounded-3xl p-6 shadow-[inset_-6px_-6px_12px_rgba(99,102,241,0.35),inset_6px_6px_12px_rgba(255,255,255,0.9),10px_14px_20px_rgba(79,70,229,0.2)]">
  <button class="bg-indigo-400 text-white font-bold rounded-2xl px-5 py-2.5">Clay Button</button>
</div>`
  },
  {
    id: "neumorphism",
    name: "Neumorphism",
    category: "Minimal",
    cssClass: "style-neumorphism",
    vibe: "Soft UI, extruded elements from same background, dual shadows",
    bestFit: "Smart home controllers, audio sliders, calculators",
    prompt: "Design a [project] in Neumorphism (Soft UI) style: elements extruded from the same background color, paired light and dark soft drop shadows, concave/convex button states, monochromatic tactile palette.",
    palette: ["#e0e5ec", "#bec3c9", "#ffffff", "#4b5563"],
    tags: ["soft-ui", "extruded", "monochrome", "emboss"],
    audioTone: "click",
    cssSnippet: `.neumorphic-card {
  background: #e0e5ec;
  border-radius: 20px;
  box-shadow: 8px 8px 16px #bec3c9, -8px -8px 16px #ffffff;
}
.neumorphic-btn:active {
  box-shadow: inset 4px 4px 8px #bec3c9, inset -4px -4px 8px #ffffff;
}`,
    tailwindSnippet: `<div class="bg-[#e0e5ec] shadow-[8px_8px_16px_#bec3c9,-8px_-8px_16px_#ffffff] rounded-2xl p-6">
  <button class="bg-[#e0e5ec] shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_#ffffff] active:shadow-[inset_4px_4px_8px_#bec3c9,inset_-4px_-4px_8px_#ffffff] px-4 py-2 rounded-xl text-gray-700">Toggle</button>
</div>`
  },
  {
    id: "skeuomorphism",
    name: "Skeuomorphism",
    category: "Retro",
    cssClass: "style-skeuomorphism",
    vibe: "Real-world textures, gradients, 3D bevels, physical realism",
    bestFit: "Gaming, music instruments, audio DAWs, vintage tools",
    prompt: "Design a [project] in Skeuomorphism style: realistic physical textures (leather, brushed metal, wood), bevel and emboss gradients, inner specular highlights, deep drop shadows, physical knob/toggle switches.",
    palette: ["#3e3223", "#ded6c9", "#d44a2b", "#6b533d"],
    tags: ["realistic", "wood", "bevel", "texture", "physical"],
    audioTone: "heavy",
    cssSnippet: `.skeuo-card {
  background: linear-gradient(to bottom, #ded6c9 0%, #b8ab97 100%);
  border: 2px solid #6b533d;
  border-top: 2px solid #ffffff;
  box-shadow: 0 6px 14px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.7);
  border-radius: 10px;
}`,
    tailwindSnippet: `<div class="bg-gradient-to-b from-stone-300 to-stone-400 border-2 border-stone-700 border-t-white shadow-xl rounded-xl p-6 text-stone-900">
  <button class="bg-gradient-to-b from-red-600 to-red-800 border border-red-950 border-t-red-400 text-white font-bold px-4 py-2 rounded shadow-md">Switch</button>
</div>`
  },
  {
    id: "liquidglass",
    name: "Liquid Glass",
    category: "Futuristic",
    cssClass: "style-liquidglass",
    vibe: "Apple's new material, dynamic glass, specular highlights, dark edges",
    bestFit: "iOS/macOS apps, premium SaaS, luxury fintech",
    prompt: "Design a [project] in Liquid Glass style: dynamic translucent material, specular edge highlights, darkened borders, chromatic aberration glow, ultra-fine blur, fluid light refraction.",
    palette: ["#090e1a", "#172554", "#0369a1", "rgba(255,255,255,0.4)"],
    tags: ["apple", "vision", "specular", "fluid", "luxury"],
    audioTone: "chime",
    cssSnippet: `.liquid-glass-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.04) 100%);
  backdrop-filter: blur(20px);
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-top: 2px solid rgba(255, 255, 255, 0.75);
  border-left: 2px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 0 16px rgba(255, 255, 255, 0.2);
  border-radius: 18px;
}`,
    tailwindSnippet: `<div class="bg-gradient-to-br from-white/25 to-white/5 backdrop-blur-xl border border-white/40 border-t-white/70 shadow-2xl rounded-2xl p-6 text-white">
  <button class="bg-sky-500/60 hover:bg-sky-500/80 border border-white/50 px-4 py-2 rounded-xl backdrop-blur-md">Explore</button>
</div>`
  },
  {
    id: "spatialui",
    name: "Spatial UI",
    category: "Futuristic",
    cssClass: "style-spatialui",
    vibe: "3D space, depth, infinite canvas, floating glass panels",
    bestFit: "Vision Pro, AR/VR, immersive apps, next-gen interfaces",
    prompt: "Design a [project] in Spatial UI style: 3D floating glass layers, deep perspective offsets, immersive dark cosmos canvas, ambient lighting reflections, eye/pinch interaction cues, curved spatial panels.",
    palette: ["#1b2735", "#090a0f", "#38bdf8", "rgba(148,163,184,0.3)"],
    tags: ["spatial", "ar", "vr", "visionpro", "depth"],
    audioTone: "chime",
    cssSnippet: `.spatial-card {
  perspective: 800px;
  background: rgba(30, 41, 59, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.25);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 25px rgba(56, 189, 248, 0.15);
  transform: rotateX(8deg) rotateY(-6deg) translateZ(10px);
  border-radius: 20px;
}`,
    tailwindSnippet: `<div class="bg-slate-800/80 border border-slate-400/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),0_0_25px_rgba(56,189,248,0.2)] rounded-3xl p-6 text-white">
  <button class="bg-sky-500/20 text-sky-400 border border-sky-400/50 rounded-full px-5 py-2">Pinch Select</button>
</div>`
  },
  {
    id: "bentogrid",
    name: "Bento Grid",
    category: "Minimal",
    cssClass: "style-bentogrid",
    vibe: "Modular varied-size cells, Apple keynote style, organized blocks",
    bestFit: "Feature sections, dashboards, landing page showcases",
    prompt: "Design a [project] in Bento Grid style: modular CSS grid with varied column/row spans, tight consistent gutters, rounded border cards with micro-illustrations and metrics, visual hierarchy across 6-9 tiles.",
    palette: ["#0f172a", "#1e293b", "#334155", "#38bdf8"],
    tags: ["bento", "modular", "grid", "apple", "showcase"],
    audioTone: "subtle",
    cssSnippet: `.bento-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.bento-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 24px;
}`,
    tailwindSnippet: `<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div class="col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6">Feature Main</div>
  <div class="bg-slate-800 border border-slate-700 rounded-2xl p-6">Stat 1</div>
</div>`
  },
  {
    id: "flatdesign",
    name: "Flat Design",
    category: "Minimal",
    cssClass: "style-flatdesign",
    vibe: "Clean, bold solid colors, no depth or shadows, crisp shapes",
    bestFit: "Mobile apps, Microsoft Metro UI, productivity tools",
    prompt: "Design a [project] in Flat Design 2.0 style: crisp solid color blocks, zero drop shadows or gradients, simple geometric icons, high contrast, clean typography, unambiguous touch targets.",
    palette: ["#2c3e50", "#34495e", "#e74c3c", "#ecf0f1"],
    tags: ["flat", "2d", "metro", "solid", "simple"],
    audioTone: "click",
    cssSnippet: `.flat-card {
  background: #34495e;
  color: #ecf0f1;
  border-radius: 4px;
  border: none;
  box-shadow: none;
}
.flat-btn {
  background: #e74c3c;
  color: #ffffff;
  font-weight: 700;
  border-radius: 4px;
  border: none;
}`,
    tailwindSnippet: `<div class="bg-slate-700 text-slate-100 rounded p-6">
  <button class="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded">Submit</button>
</div>`
  },
  {
    id: "materialdesign",
    name: "Material Design",
    category: "Minimal",
    cssClass: "style-materialdesign",
    vibe: "Physics-based depth, elevation z-index, surface ripples",
    bestFit: "Android apps, Google ecosystem, enterprise workflows",
    prompt: "Design a [project] in Material Design 3 style: surface elevation hierarchy with tinted shadows, dynamic color extraction, pill buttons, floating action buttons (FAB), ripple interaction feedback.",
    palette: ["#f5f5f5", "#ffffff", "#6200ee", "#03dac6"],
    tags: ["google", "android", "elevation", "ripple", "fab"],
    audioTone: "click",
    cssSnippet: `.material-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
.material-btn {
  background: #6200ee;
  color: #ffffff;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0,0,0,0.26);
}`,
    tailwindSnippet: `<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-gray-900">
  <button class="bg-indigo-600 hover:bg-indigo-700 text-white uppercase text-sm font-semibold tracking-wider px-4 py-2 rounded shadow">Action</button>
</div>`
  },
  {
    id: "swiss",
    name: "Swiss / International",
    category: "Editorial",
    cssClass: "style-swiss",
    logoSvg: `<svg class="demo-logo-mark" viewBox="0 0 32 32" role="img" aria-label="Swiss / International logo"><rect width="32" height="32" rx="3" fill="#e11d48"/><rect x="13.5" y="6" width="5" height="20" fill="#ffffff"/><rect x="6" y="13.5" width="20" height="5" fill="#ffffff"/></svg>`,
    vibe: "Grid-based, sans-serif, high contrast, objective clarity",
    bestFit: "Finance, legal docs, publishing, design agency sites",
    prompt: "Design a [project] in Swiss International Typographic Style: strict 12-column mathematical grid, authentic Helvetica/Akzidenz sans-serif, asymmetric balance, bold red/black accents, objective information delivery.",
    palette: ["#ffffff", "#111111", "#e11d48", "#f4f4f5"],
    tags: ["helvetica", "grid", "rational", "red", "objective"],
    audioTone: "subtle",
    cssSnippet: `.swiss-card {
  background: #f4f4f5;
  border: 1px solid #18181b;
  border-radius: 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}
.swiss-btn {
  background: #e11d48;
  color: #ffffff;
  font-weight: 700;
  border-radius: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}`,
    tailwindSnippet: `<div class="bg-neutral-100 border border-black rounded-none p-6 text-black font-sans">
  <button class="bg-rose-600 text-white font-bold uppercase tracking-wider rounded-none px-4 py-2">Execute</button>
</div>`
  },
  {
    id: "bauhaus",
    name: "Bauhaus",
    category: "Bold",
    cssClass: "style-bauhaus",
    vibe: "Geometric shapes, primary colors, form follows function",
    bestFit: "Art, architecture, creative studios, cultural products",
    prompt: "Design a [project] in Bauhaus style: fundamental geometric primitives (circle, square, triangle), primary color scheme (red, blue, yellow, black), functional grid layout, geometric typography.",
    palette: ["#fffdf5", "#ffd000", "#e52521", "#00459c"],
    tags: ["primary", "geometric", "art", "architecture", "circle"],
    audioTone: "pop",
    cssSnippet: `.bauhaus-card {
  background: #ffd000;
  border: 4px solid #111111;
  color: #111111;
}
.bauhaus-btn {
  background: #e52521;
  color: #ffffff;
  border: 3px solid #111111;
  border-radius: 9999px;
  font-weight: 800;
}`,
    tailwindSnippet: `<div class="bg-amber-300 border-4 border-black p-6 text-black">
  <button class="bg-red-600 text-white font-black border-2 border-black rounded-full px-6 py-2">Join</button>
</div>`
  },
  {
    id: "artdeco",
    name: "Art Deco",
    category: "Editorial",
    cssClass: "style-artdeco",
    vibe: "Luxurious, geometric, ornamental, gold metallic accents",
    bestFit: "Luxury brands, high-end hotels, jewelry, formal events",
    prompt: "Design a [project] in Art Deco style: symmetrical geometric motifs, gold foil gradients on deep navy/obsidian, decorative borders, elegant high-contrast serif typography, Gatsby-era luxury feel.",
    palette: ["#0d131a", "#d4af37", "#f7e09e", "#141c24"],
    tags: ["gatsby", "luxury", "gold", "geometric", "ornate"],
    audioTone: "chime",
    cssSnippet: `.artdeco-card {
  background: #141c24;
  border: 2px solid #d4af37;
  outline: 2px solid #0d131a;
  outline-offset: -6px;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
  color: #f7e09e;
}`,
    tailwindSnippet: `<div class="bg-slate-900 border-2 border-amber-400 p-6 text-amber-200 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
  <button class="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-serif font-bold uppercase tracking-widest px-5 py-2">Reserve</button>
</div>`
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    category: "Retro",
    cssClass: "style-vaporwave",
    vibe: "Retro-futuristic, neon pink/cyan, 80s/90s nostalgia, grids",
    bestFit: "Music streaming, gaming, creative audio tools, retro merch",
    prompt: "Design a [project] in Vaporwave style: neon magenta and cyan gradients, retro 90s OS windows, wireframe perspective grid horizon, Roman statue/pixel glitch accents, nostalgic chillwave aesthetic.",
    palette: ["#2b1055", "#ff71ce", "#01cdfe", "#05ffa1"],
    tags: ["neon", "pink", "cyan", "90s", "retro"],
    audioTone: "arcade",
    cssSnippet: `.vaporwave-card {
  background: rgba(43, 16, 85, 0.7);
  border: 2px solid #ff71ce;
  box-shadow: 0 0 15px #01cdfe, inset 0 0 10px #ff71ce;
  color: #ffe6ff;
}`,
    tailwindSnippet: `<div class="bg-purple-950/80 border-2 border-pink-500 shadow-[0_0_15px_#01cdfe] rounded-lg p-6 text-pink-100">
  <button class="bg-gradient-to-r from-pink-500 to-cyan-400 text-white font-extrabold px-4 py-2 rounded shadow-[0_0_10px_#ff71ce]">PLAY</button>
</div>`
  },
  {
    id: "y2k",
    name: "Y2K Aesthetic",
    category: "Retro",
    cssClass: "style-y2k",
    vibe: "Glossy, futuristic 2000s, chrome, bubble shapes, cyber optimism",
    bestFit: "Fashion, youth apps, music players, social media",
    prompt: "Design a [project] in Y2K Aesthetic: glossy pill buttons with white specular glares, chrome metallic gradients, pastel pink/silver/cyan tones, bubble icons, early 2000s techno-optimism.",
    palette: ["#dbeafe", "#fbcfe8", "#a855f7", "#ec4899"],
    tags: ["glossy", "bubble", "2000s", "chrome", "cute"],
    audioTone: "pop",
    cssSnippet: `.y2k-btn {
  background: linear-gradient(180deg, #ec4899 0%, #be185d 100%);
  color: #ffffff;
  border: 2px solid #fdf2f8;
  border-radius: 9999px;
  box-shadow: 0 6px 12px rgba(236, 72, 153, 0.5), inset 0 2px 3px rgba(255,255,255,0.8);
  font-weight: 800;
}`,
    tailwindSnippet: `<div class="bg-gradient-to-b from-white to-indigo-100 border-2 border-purple-400 rounded-3xl shadow-lg p-6">
  <button class="bg-gradient-to-b from-pink-400 to-pink-600 text-white border-2 border-white rounded-full px-5 py-2 font-black shadow-md">Enter</button>
</div>`
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    logoSvg: `<svg class="demo-logo-mark" viewBox="0 0 32 32" role="img" aria-label="Cyberpunk logo"><path d="M16 1 29 8.5v15L16 31 3 23.5v-15Z" fill="#0b0b12"/><path d="M16 2.6 27.6 9.3v13.4L16 29.4 4.4 22.7V9.3Z" fill="none" stroke="#00f0ff" stroke-width="1.4"/><path d="M18.6 6.6 9.8 18.4h4.8l-1.6 7.2 9-12.1h-5l1.6-6.9Z" fill="#ff2bd6"/></svg>`,
    category: "Futuristic",
    cssClass: "style-cyberpunk",
    vibe: "Pitch black, neon yellow/cyan, glitch effects, dystopian tech",
    bestFit: "Gaming, web3, AI agents, dev terminals, sci-fi platforms",
    prompt: "Design a [project] in Cyberpunk style: pitch black background, neon toxic yellow and cyan accents, chamfered corner cutouts (clip-path), scanline overlays, HUD data telemetry, high-tech dystopian energy.",
    palette: ["#000000", "#ffe600", "#00f0ff", "#ff0055"],
    tags: ["hud", "neon", "glitch", "dystopian", "sci-fi"],
    audioTone: "terminal",
    cssSnippet: `.cyberpunk-card {
  background: #090a0f;
  border: 2px solid #ffe600;
  box-shadow: 0 0 15px rgba(255, 230, 0, 0.3), -3px 0 0 #00f0ff;
  clip-path: polygon(0 0, 92% 0, 100% 12%, 100% 100%, 8% 100%, 0 88%);
}`,
    tailwindSnippet: `<div class="bg-black border-2 border-yellow-400 text-yellow-300 p-6 shadow-[0_0_15px_rgba(255,230,0,0.4)]">
  <button class="bg-yellow-400 text-black font-black uppercase tracking-widest px-4 py-2 hover:bg-cyan-400">JACK IN</button>
</div>`
  },
  {
    id: "darkluxe",
    name: "Dark Luxe",
    category: "Futuristic",
    cssClass: "style-darkluxe",
    vibe: "Deep black, champagne gold, subtle specular gleam, cinematic",
    bestFit: "Developer tools, luxury SaaS, private banking, yachts",
    prompt: "Design a [project] in Dark Luxe style: deep obsidian (#050505) canvas, brushed brass and champagne gold highlights, subtle radial vignette, razor-sharp 1px dividers, refined typography, ultra-premium feel.",
    palette: ["#050505", "#121212", "#d4af37", "#f6e082"],
    tags: ["gold", "luxury", "obsidian", "fintech", "exclusive"],
    audioTone: "subtle",
    cssSnippet: `.darkluxe-card {
  background: linear-gradient(145deg, #121212 0%, #0a0a0a 100%);
  border: 1px solid #332a15;
  box-shadow: 0 10px 30px rgba(0,0,0,0.8), inset 0 1px 1px rgba(212, 175, 55, 0.3);
  border-radius: 12px;
  color: #e5e5e5;
}`,
    tailwindSnippet: `<div class="bg-neutral-950 border border-amber-900/40 rounded-xl p-6 text-stone-200 shadow-2xl">
  <button class="bg-gradient-to-b from-amber-400 to-amber-600 text-black font-bold px-4 py-2 rounded-lg">Access Portal</button>
</div>`
  },
  {
    id: "editorial",
    name: "Editorial / Magazine",
    category: "Editorial",
    cssClass: "style-editorial",
    vibe: "Typography-led, asymmetric columns, story-driven whitespace",
    bestFit: "Publishing, essays, blogs, luxury brand portfolios",
    prompt: "Design a [project] in Editorial / Magazine style: oversized serif display headlines, multi-column editorial grid, drop caps, generous artistic whitespace, story-first layout, subtle paper grain texture.",
    palette: ["#fdfbf7", "#1a1a1a", "#ffffff", "#737373"],
    tags: ["serif", "magazine", "vogue", "whitespace", "typography"],
    audioTone: "subtle",
    cssSnippet: `.editorial-card {
  background: #ffffff;
  border-top: 4px solid #1a1a1a;
  border-bottom: 1px solid #e5e5e5;
  font-family: 'Playfair Display', serif;
  color: #1a1a1a;
}`,
    tailwindSnippet: `<div class="bg-stone-50 border-t-4 border-black p-8 font-serif text-black">
  <h2 class="text-3xl font-extrabold mb-2">Issue No. 44</h2>
  <button class="bg-black text-white font-sans text-xs uppercase tracking-widest px-4 py-2">Read Feature</button>
</div>`
  },
  {
    id: "organic",
    name: "Organic / Biomorphic",
    category: "Organic",
    cssClass: "style-organic",
    vibe: "Natural shapes, pebble curves, warm earthy terracotta colors",
    bestFit: "Wellness, meditation, sustainability, botanical apps",
    prompt: "Design a [project] in Organic / Biomorphic style: pebble border-radii, flowing asymmetrical curves, warm terracotta, sage green, and sandstone palette, natural soft shadows, calming tactile touch.",
    palette: ["#f4efe6", "#e8dfd1", "#606c38", "#dda15e"],
    tags: ["nature", "pebble", "botanical", "calm", "wellness"],
    audioTone: "subtle",
    cssSnippet: `.organic-card {
  background: #e8dfd1;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  border: 1.5px solid #d4c5b0;
  color: #3d3429;
}`,
    tailwindSnippet: `<div class="bg-amber-100/60 rounded-[40px_20px_40px_20px] border border-amber-200 p-6 text-stone-800">
  <button class="bg-emerald-800 text-emerald-50 rounded-full px-5 py-2 font-medium">Breathe</button>
</div>`
  },
  {
    id: "retrofuturism",
    name: "Retro-Futurism",
    category: "Retro",
    cssClass: "style-retrofuturism",
    vibe: "80s sci-fi, CRT scanlines, neon laser grids, synthwave",
    bestFit: "Indie gaming, music players, creative synthesizers, events",
    prompt: "Design a [project] in Retro-Futurism / Synthwave style: 80s neon perspective grid floor, glowing sunset gradients, CRT scanlines, neon magenta and laser blue borders, retro arcade typography.",
    palette: ["#11052c", "#ff007f", "#00f0ff", "#ffe6ff"],
    tags: ["synthwave", "laser", "grid", "80s", "sunset"],
    audioTone: "arcade",
    cssSnippet: `.retrofuturism-card {
  background: rgba(26, 8, 62, 0.85);
  border: 2px solid #00f0ff;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.4);
  color: #ff007f;
}`,
    tailwindSnippet: `<div class="bg-indigo-950 border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] rounded-lg p-6 text-pink-400">
  <button class="bg-pink-600 text-white font-bold px-4 py-2 rounded shadow-[0_0_10px_#ff007f]">OVERDRIVE</button>
</div>`
  },
  {
    id: "memphis",
    name: "Memphis Design",
    category: "Bold",
    cssClass: "style-memphis",
    vibe: "Bold geometric patterns, squiggles, confetti dots, playful chaos",
    bestFit: "Youth brands, creative agencies, party apps, festivals",
    prompt: "Design a [project] in 1980s Memphis Design style: playful squiggles, polka dots, zigzag borders, bright contrasting primary/secondary colors, tilted off-kilter cards, upbeat energetic vibes.",
    palette: ["#fff0f5", "#ffeaa7", "#ff6b6b", "#54a0ff"],
    tags: ["squiggles", "dots", "playful", "chaos", "80s"],
    audioTone: "pop",
    cssSnippet: `.memphis-card {
  background: #ffeaa7;
  border: 3px solid #000;
  box-shadow: 6px 6px 0px #ff6b6b;
  transform: rotate(1deg);
}`,
    tailwindSnippet: `<div class="bg-yellow-200 border-2 border-black shadow-[6px_6px_0px_#ff6b6b] rotate-1 p-6 text-black">
  <button class="bg-blue-500 text-black font-extrabold border-2 border-black shadow-[4px_4px_0px_#1dd1a1] px-4 py-2">PARTY</button>
</div>`
  },
  {
    id: "pixel",
    name: "Pixel / 8-bit",
    category: "Retro",
    cssClass: "style-pixel",
    vibe: "Retro gaming, pixel fonts, chunky stepped borders, limited palette",
    bestFit: "Gaming, crypto games, retro tooling, indie developers",
    prompt: "Design a [project] in Pixel Art / 8-Bit style: pixelated monospace typography (VT323 / Press Start 2P), stepped box shadows, limited 16-color palette, chunky hard borders, nostalgic retro RPG game UI.",
    palette: ["#181425", "#262b44", "#fee761", "#ff0044"],
    tags: ["8bit", "arcade", "rpg", "vt323", "pixelart"],
    audioTone: "pixel",
    cssSnippet: `.pixel-card {
  background: #262b44;
  border: 4px solid #63c74d;
  box-shadow: 4px 4px 0px #124e89;
  font-family: 'VT323', monospace;
  color: #fee761;
}`,
    tailwindSnippet: `<div class="bg-slate-900 border-4 border-green-500 shadow-[4px_4px_0px_#1e3a8a] p-6 text-yellow-300 font-mono">
  <button class="bg-red-600 text-white border-2 border-white shadow-[2px_2px_0px_#000] px-3 py-1">START</button>
</div>`
  },
  {
    id: "scandinavian",
    name: "Scandinavian",
    category: "Minimal",
    cssClass: "style-scandinavian",
    vibe: "Light, airy, functional, muted wood tones, cozy hygge warmth",
    bestFit: "Home decor, lifestyle, wellness, minimalist e-commerce",
    prompt: "Design a [project] in Scandinavian style: ultra-light airy palette, warm light birch and stone neutrals, functional minimal layout, soft muted shadows, hygge warmth, human-centric simplicity.",
    palette: ["#fbfbfb", "#ffffff", "#d8c3b0", "#2c3e50"],
    tags: ["hygge", "nordic", "airy", "wood", "serene"],
    audioTone: "subtle",
    cssSnippet: `.scandi-card {
  background: #ffffff;
  border: 1px solid #eaedf1;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  color: #2c3e50;
}`,
    tailwindSnippet: `<div class="bg-white border border-slate-100 rounded-xl shadow-sm p-6 text-slate-700">
  <button class="bg-stone-300 hover:bg-stone-400 text-stone-900 font-semibold rounded-lg px-4 py-2">Discover</button>
</div>`
  },
  {
    id: "japandi",
    name: "Japandi",
    category: "Organic",
    cssClass: "style-japandi",
    vibe: "Japanese wabi-sabi + Scandinavian calm, muted earth tones",
    bestFit: "Interior design, tea, ceramics, wellness retreats",
    prompt: "Design a [project] in Japandi style: Japanese wabi-sabi elegance merged with Scandinavian minimalism, muted washi paper textures, linen and clay tones, intentional silence/whitespace, calm craftsmanship.",
    palette: ["#f4eee1", "#eae2d3", "#3c3832", "#b5a995"],
    tags: ["wabi-sabi", "zen", "clay", "calm", "linen"],
    audioTone: "subtle",
    cssSnippet: `.japandi-card {
  background: #eae2d3;
  border: 1px solid #d8cdba;
  border-radius: 6px;
  color: #3c3832;
}`,
    tailwindSnippet: `<div class="bg-stone-200 border border-stone-300 rounded-md p-6 text-stone-800">
  <button class="bg-stone-800 text-stone-100 font-medium rounded px-4 py-2">Quietude</button>
</div>`
  },
  {
    id: "monochrome",
    name: "Monochrome",
    category: "Editorial",
    cssClass: "style-monochrome",
    vibe: "Pure black & white, stark contrast, sharp lines, oversized serifs",
    bestFit: "High fashion, photography portfolios, art galleries",
    prompt: "Design a [project] in pure Monochrome style: 100% black and white, zero grayscale muddiness, razor-sharp stark contrast, oversized serif headlines, dramatic inverted sections, high-fashion attitude.",
    palette: ["#000000", "#ffffff", "#111111", "#000000"],
    tags: ["bw", "fashion", "contrast", "stark", "gallery"],
    audioTone: "heavy",
    cssSnippet: `.monochrome-card {
  background: #111111;
  border: 1.5px solid #ffffff;
  color: #ffffff;
}`,
    tailwindSnippet: `<div class="bg-black border-2 border-white text-white p-6">
  <button class="bg-white text-black font-extrabold hover:bg-black hover:text-white border border-white px-4 py-2">VIEW EXHIBIT</button>
</div>`
  },
  {
    id: "aurora",
    name: "Aurora",
    category: "Futuristic",
    cssClass: "style-aurora",
    vibe: "Vibrant northern lights gradients, ethereal glows, soft blurs",
    bestFit: "AI products, creative platforms, modern audio apps",
    prompt: "Design a [project] in Aurora style: glowing ambient northern lights gradients (emerald, turquoise, violet), diffused high-radius glows, deep nocturnal background, sleek border reflections, ethereal glow.",
    palette: ["#060913", "#10b981", "#06b6d4", "#8b5cf6"],
    tags: ["northernlights", "glow", "ethereal", "ai", "ambient"],
    audioTone: "chime",
    cssSnippet: `.aurora-card {
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(56, 189, 248, 0.3);
  box-shadow: 0 0 25px rgba(52, 211, 153, 0.25);
}`,
    tailwindSnippet: `<div class="bg-slate-900/80 border border-cyan-400/30 shadow-[0_0_25px_rgba(52,211,153,0.3)] rounded-2xl p-6 text-slate-100">
  <button class="bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 text-white font-bold px-4 py-2 rounded-xl">Ignite AI</button>
</div>`
  },
  {
    id: "nature",
    name: "Nature-Inspired",
    category: "Organic",
    cssClass: "style-nature",
    vibe: "Warm organic textures, moss greens, botanical motifs, eco feel",
    bestFit: "Sustainability, eco-friendly brands, agriculture, organic food",
    prompt: "Design a [project] in Nature-Inspired style: forest moss and eucalyptus greens, botanical border accents, warm recycled paper tones, soft rounded cards, eco-friendly sustainable vibe.",
    palette: ["#edf5eb", "#ffffff", "#2d6a4f", "#74c69d"],
    tags: ["botanical", "green", "eco", "forest", "sustainable"],
    audioTone: "subtle",
    cssSnippet: `.nature-card {
  background: #ffffff;
  border: 1px solid #cce3c9;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(46, 117, 46, 0.08);
  color: #1e3a1e;
}`,
    tailwindSnippet: `<div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-emerald-950">
  <button class="bg-emerald-700 text-emerald-50 rounded-xl px-4 py-2 font-semibold">Cultivate</button>
</div>`
  },
  {
    id: "antigrid",
    name: "Anti-Grid / Anti-Design",
    category: "Bold",
    cssClass: "style-antigrid",
    vibe: "Deliberate chaos, broken layouts, punk energy, overlapping rules",
    bestFit: "Art exhibits, punk music, experimental portfolios, zines",
    prompt: "Design a [project] in Anti-Grid / Anti-Design style: deliberately broken layouts, overlapping misaligned elements, distorted typography, chaotic visual hierarchy, punk zine energy, rule-breaking composition.",
    palette: ["#111111", "#ff0055", "#ffff00", "#00ff66"],
    tags: ["punk", "zine", "chaos", "rebel", "broken"],
    audioTone: "heavy",
    cssSnippet: `.antigrid-card {
  background: #ff0055;
  color: #ffffff;
  transform: rotate(-3deg) scale(0.96);
  border: 3px solid #ffff00;
}`,
    tailwindSnippet: `<div class="bg-rose-600 text-yellow-300 border-4 border-yellow-300 -rotate-3 p-6 font-mono">
  <button class="bg-yellow-300 text-black font-black rotate-6 translate-x-2 px-4 py-2">BREAK IT</button>
</div>`
  },
  {
    id: "scrollytelling",
    name: "Scrollytelling",
    category: "Futuristic",
    cssClass: "style-scrollytelling",
    vibe: "Motion-driven narrative, sticky milestones, progressive reveals",
    bestFit: "Product launch keynotes, longform investigative journalism",
    prompt: "Design a [project] in Scrollytelling style: narrative scroll milestones, sticky contextual panels, progressive stat reveals, cinematic timeline indicators, immersive storytelling sequence.",
    palette: ["#0f172a", "#1e1b4b", "#6366f1", "#f8fafc"],
    tags: ["narrative", "scroll", "timeline", "keynote", "story"],
    audioTone: "chime",
    cssSnippet: `.scrolly-card {
  background: rgba(30, 41, 59, 0.8);
  border-left: 4px solid #6366f1;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  color: #f8fafc;
}`,
    tailwindSnippet: `<div class="bg-slate-900 border-l-4 border-indigo-500 shadow-2xl rounded-r-xl p-6 text-white">
  <span class="text-xs uppercase font-mono text-indigo-400">Chapter 01</span>
  <h3 class="text-xl font-bold">The Genesis</h3>
</div>`
  },
  {
    id: "webgl3d",
    name: "3D / WebGL",
    category: "Futuristic",
    cssClass: "style-webgl3d",
    vibe: "Immersive 3D depth, isometric lighting, reactive ambient shadows",
    bestFit: "Hardware showcases, gaming, metaverse, spatial computing",
    prompt: "Design a [project] in 3D / WebGL aesthetic: simulated three-dimensional lighting, bevel reflections, dark metallic chassis, glowing directional highlights, floating interactive perspective cards.",
    palette: ["#1e1e38", "#2a2a50", "#4f46e5", "#06b6d4"],
    tags: ["isometric", "threejs", "shaders", "metallic", "chassis"],
    audioTone: "chime",
    cssSnippet: `.webgl-card {
  background: linear-gradient(145deg, #2a2a50 0%, #15152a 100%);
  border: 1px solid #4338ca;
  box-shadow: -8px -8px 20px rgba(99, 102, 241, 0.2), 8px 8px 25px rgba(0, 0, 0, 0.8);
  border-radius: 16px;
}`,
    tailwindSnippet: `<div class="bg-slate-900 border border-indigo-700 shadow-[0_20px_50px_rgba(79,70,229,0.3)] rounded-2xl p-6 text-indigo-100">
  <button class="bg-gradient-to-r from-indigo-600 to-cyan-500 font-bold px-4 py-2 rounded-xl text-white">Render Scene</button>
</div>`
  },
  {
    id: "kinetictype",
    name: "Kinetic Typography",
    category: "Bold",
    cssClass: "style-kinetictype",
    vibe: "Moving type, dynamic oversized headlines, typographic rhythm",
    bestFit: "Creative agencies, music festivals, bold marketing campaigns",
    prompt: "Design a [project] in Kinetic Typography style: dynamic oversized variable fonts, animated marquee tickers, bold typographic scale contrast, text-driven structural containers, high energetic impact.",
    palette: ["#ffffff", "#000000", "#ff3366", "#f3f4f6"],
    tags: ["variable-font", "ticker", "marquee", "kinetic", "syne"],
    audioTone: "pop",
    cssSnippet: `.kinetic-card {
  background: #000000;
  color: #ffffff;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  letter-spacing: -1px;
}`,
    tailwindSnippet: `<div class="bg-black text-white p-6 font-extrabold tracking-tight">
  <h2 class="text-4xl uppercase">MOTION IS MESSAGE</h2>
  <button class="bg-pink-600 text-white font-black uppercase tracking-wider px-4 py-2 mt-4">DISRUPT</button>
</div>`
  },
  {
    id: "humanscribble",
    name: "Human Scribble",
    category: "Organic",
    cssClass: "style-humanscribble",
    vibe: "Hand-drawn, wobbly imperfect sketch lines, personal touch",
    bestFit: "Notion creators, indie founders, educational tools, newsletters",
    prompt: "Design a [project] in Human Scribble / Hand-Drawn style: irregular wobbly border radiuses, hand-drawn underline highlights, sketchy doodle buttons, sticky note cards, authentic human warmth.",
    palette: ["#fffdf7", "#292524", "#fde047", "#78716c"],
    tags: ["doodle", "sketch", "handwritten", "warm", "notion"],
    audioTone: "pop",
    cssSnippet: `.scribble-card {
  background: #ffffff;
  border: 2px solid #44403c;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  box-shadow: 3px 3px 0px #78716c;
  font-family: 'Caveat', cursive;
}`,
    tailwindSnippet: `<div class="bg-amber-50 border-2 border-stone-800 rounded-[255px_15px_225px_15px] p-6 shadow-[3px_3px_0px_#444] font-serif">
  <button class="bg-yellow-300 border-2 border-stone-900 rounded-[15px_255px] font-bold px-4 py-1">Save note ✎</button>
</div>`
  },
  {
    id: "frutigeraero",
    name: "Frutiger Aero",
    category: "Retro",
    cssClass: "style-frutigeraero",
    vibe: "Glossy glass, water droplets, clear skies, 2000s tech optimism",
    bestFit: "Retro tech, nostalgic operating systems, music players",
    prompt: "Design a [project] in Frutiger Aero (Windows Vista / 7 era) style: glossy glass buttons with bright specular reflections, vibrant sky blue and grassy green gradients, aurora flares, ultra-glossy optimistic tech UI.",
    palette: ["#38bdf8", "#4ade80", "#15803d", "#0284c7"],
    tags: ["vista", "skeuomorphic", "gloss", "sky", "droplet"],
    audioTone: "chime",
    cssSnippet: `.frutiger-btn {
  background: linear-gradient(180deg, #38bdf8 0%, #0284c7 50%, #0369a1 100%);
  border: 1.5px solid #ffffff;
  border-radius: 9999px;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(2, 132, 199, 0.4), inset 0 2px 3px rgba(255,255,255,0.7);
  font-weight: 700;
}`,
    tailwindSnippet: `<div class="bg-gradient-to-b from-sky-300 via-sky-400 to-emerald-400 border-2 border-white/80 rounded-3xl p-6 shadow-xl">
  <button class="bg-gradient-to-b from-sky-400 to-blue-600 border border-white text-white font-bold rounded-full px-5 py-2 shadow-lg">Start Media</button>
</div>`
  },
  {
    id: "acidbrutalist",
    name: "Acid Brutalist",
    category: "Bold",
    cssClass: "style-acidbrutalist",
    vibe: "Neon acid green/pink on raw brutalist grid, rave energy",
    bestFit: "Techno clubs, music labels, underground fashion, NFT galleries",
    prompt: "Design a [project] in Acid Brutalist style: intense radioactive neon green (#ccff00) and hot magenta on pitch black, heavy structural borders, harsh typography, hypnotic rave-poster aesthetic.",
    palette: ["#000000", "#ccff00", "#ff0099", "#111111"],
    tags: ["rave", "techno", "radioactive", "acid", "toxic"],
    audioTone: "arcade",
    cssSnippet: `.acid-card {
  background: #ccff00;
  color: #000000;
  border: 3px solid #ff0099;
  box-shadow: 6px 6px 0px #ff0099;
  font-weight: 800;
}`,
    tailwindSnippet: `<div class="bg-black border-4 border-[#ccff00] p-6 text-[#ccff00]">
  <button class="bg-[#ff0099] text-white border-2 border-[#ccff00] font-black uppercase px-4 py-2 shadow-[4px_4px_0px_#ccff00]">RAVE ENTRY</button>
</div>`
  },
  {
    id: "monolith",
    name: "Monolith",
    category: "Bold",
    cssClass: "style-monolith",
    vibe: "Massive solid geometric blocks, monumental scale, brutal weight",
    bestFit: "Architectural firms, luxury real estate, industrial machinery",
    prompt: "Design a [project] in Monolith style: heavy architectural concrete blocks, monumental proportions, dark basalt tones, extreme physical presence, heavy drop blocks, dramatic monolithic silhouette.",
    palette: ["#141414", "#242424", "#383838", "#888888"],
    tags: ["monument", "stone", "basalt", "heavy", "architecture"],
    audioTone: "heavy",
    cssSnippet: `.monolith-card {
  background: #242424;
  border-left: 10px solid #888888;
  box-shadow: 12px 12px 0px #0a0a0a;
  color: #dedede;
}`,
    tailwindSnippet: `<div class="bg-neutral-900 border-l-8 border-stone-500 shadow-[10px_10px_0px_#000] p-6 text-stone-200">
  <button class="bg-stone-700 text-white font-bold px-5 py-2.5">STRUCTURE</button>
</div>`
  },
  {
    id: "darkcinema",
    name: "Dark Cinema",
    category: "Futuristic",
    cssClass: "style-darkcinema",
    vibe: "Cinematic dark, 2.39:1 letterbox framing, moody anamorphic lighting",
    bestFit: "Film production, trailers, video editors, storytelling apps",
    prompt: "Design a [project] in Dark Cinema style: 2.39:1 anamorphic letterbox cards, deep theatrical blacks, moody teal & orange lighting contrast, subtle film grain ambiance, widescreen cinematic framing.",
    palette: ["#0b0c10", "#1f2833", "#45a29e", "#66fcf1"],
    tags: ["letterbox", "anamorphic", "theatrical", "teal-orange", "film"],
    audioTone: "subtle",
    cssSnippet: `.cinema-card {
  background: #1f2833;
  border-top: 1px solid #45a29e;
  border-bottom: 1px solid #45a29e;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  color: #c5c6c7;
}`,
    tailwindSnippet: `<div class="bg-slate-950 border-y border-teal-500/50 p-6 text-slate-300 shadow-2xl">
  <button class="bg-teal-600 text-black font-bold uppercase tracking-widest px-4 py-2">PLAY REEL</button>
</div>`
  },
  {
    id: "darkcosmic",
    name: "Dark Cosmic",
    category: "Futuristic",
    cssClass: "style-darkcosmic",
    vibe: "Deep space nebula, cosmic purples, starlight gradients, void depth",
    bestFit: "Astronomy apps, AI frontier labs, deep tech platforms",
    prompt: "Design a [project] in Dark Cosmic style: deep space void (#000000 & #0d0221), swirling nebula gradients in magenta and indigo, starfield particulate glow, cosmic orb indicators, galactic depth.",
    palette: ["#0d0221", "#4a0e4e", "#a855f7", "#ec4899"],
    tags: ["space", "nebula", "starlight", "galaxy", "astronomy"],
    audioTone: "chime",
    cssSnippet: `.cosmic-card {
  background: rgba(13, 2, 33, 0.85);
  border: 1px solid #a855f7;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.35);
  color: #f1f5f9;
}`,
    tailwindSnippet: `<div class="bg-indigo-950/80 border border-purple-500/60 shadow-[0_0_20px_rgba(168,85,247,0.4)] rounded-2xl p-6 text-white">
  <button class="bg-gradient-to-r from-pink-500 to-purple-600 font-bold px-4 py-2 rounded-lg">Launch Probe</button>
</div>`
  },
  {
    id: "midcenturymodern",
    name: "Mid-Century Modern",
    category: "Retro",
    cssClass: "style-midcenturymodern",
    vibe: "1950s-60s retro geometric, warm mustard & teal, walnut curves",
    bestFit: "Furniture design, retro lifestyle, boutique coffee, vintage audio",
    prompt: "Design a [project] in Mid-Century Modern style: 1950s atomic age geometric shapes, warm mustard yellow, burnt orange, and teal color palette, warm cream background, retro walnut furniture curves.",
    palette: ["#fbf5e6", "#e27d60", "#41b3a3", "#2b3a42"],
    tags: ["1950s", "atomic", "mustard", "walnut", "furniture"],
    audioTone: "click",
    cssSnippet: `.midcentury-card {
  background: #ffffff;
  border: 2px solid #e27d60;
  border-radius: 20px 4px 20px 4px;
  box-shadow: 6px 6px 0px #41b3a3;
  color: #2b3a42;
}`,
    tailwindSnippet: `<div class="bg-amber-50 border-2 border-orange-500 rounded-[20px_4px] shadow-[5px_5px_0px_#0d9488] p-6 text-stone-800">
  <button class="bg-orange-500 text-white font-bold rounded-[4px_16px] px-4 py-2">Discover</button>
</div>`
  },
  {
    id: "retroterminal",
    name: "Retro Terminal",
    category: "Retro",
    cssClass: "style-retroterminal",
    vibe: "Phosphor green on pitch black, CRT scanlines, CLI prompts",
    bestFit: "DevOps tools, security dashboards, hacker consoles, CLI docs",
    prompt: "Design a [project] in Retro Terminal / CRT style: vibrant phosphor green (#39ff14) text on pitch black, authentic CRT horizontal scanlines, blinking block cursor, ASCII status boxes, monospace command prompts.",
    palette: ["#0d1117", "#000000", "#39ff14", "#238636"],
    tags: ["crt", "hacker", "cli", "green", "matrix"],
    audioTone: "terminal",
    cssSnippet: `.terminal-card {
  background: #000000;
  border: 1.5px solid #39ff14;
  box-shadow: 0 0 10px rgba(57, 255, 20, 0.3);
  color: #39ff14;
  font-family: 'Space Mono', monospace;
}`,
    tailwindSnippet: `<div class="bg-black border border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)] p-6 text-green-400 font-mono">
  <button class="bg-green-500 text-black font-bold px-4 py-1.5 hover:bg-green-400">EXECUTE >></button>
</div>`
  },
  {
    id: "baroque",
    name: "Renaissance / Baroque",
    category: "Editorial",
    cssClass: "style-baroque",
    vibe: "Ornate gilded frames, chiaroscuro dramatic contrast, classical",
    bestFit: "Fine art, museum archives, luxury wine, heritage watches",
    prompt: "Design a [project] in Renaissance / Baroque style: ornate gilded golden borders, dramatic chiaroscuro deep shadow contrast, classical roman serif typography (Cinzel), antique parchment and oil painting depth.",
    palette: ["#1b120c", "#2b1d13", "#c5a059", "#e8d8b9"],
    tags: ["renaissance", "oilpainting", "gilded", "chiaroscuro", "classical"],
    audioTone: "chime",
    cssSnippet: `.baroque-card {
  background: #2b1d13;
  border: 2px solid #c5a059;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.8), inset 0 0 10px rgba(197, 160, 89, 0.3);
  font-family: 'Cinzel', serif;
  color: #e8d8b9;
}`,
    tailwindSnippet: `<div class="bg-stone-950 border-2 border-amber-600 p-6 text-amber-100 font-serif shadow-2xl">
  <button class="bg-gradient-to-r from-amber-600 to-amber-700 text-black font-bold uppercase tracking-widest px-4 py-2 border border-amber-300">Curate</button>
</div>`
  },
  {
    id: "ukiyoe",
    name: "Ukiyo-e",
    category: "Organic",
    cssClass: "style-ukiyoe",
    vibe: "Japanese woodblock prints, Great Wave indigo, vermilion stamps",
    bestFit: "Cultural apps, tea houses, Japanese culinary, art collections",
    prompt: "Design a [project] in Ukiyo-e (Japanese Woodblock) style: traditional indigo blue and vermilion red color palette, bold woodblock ink line contours, washi rice paper background, wave crest motifs, vermilion seal stamps.",
    palette: ["#f7f1e3", "#227093", "#b33939", "#2c2c54"],
    tags: ["japanese", "woodblock", "wave", "indigo", "washi"],
    audioTone: "subtle",
    cssSnippet: `.ukiyoe-card {
  background: #ffffff;
  border: 2px solid #227093;
  box-shadow: 4px 4px 0px #b33939;
  color: #2c2c54;
}`,
    tailwindSnippet: `<div class="bg-amber-50 border-2 border-sky-800 shadow-[4px_4px_0px_#b91c1c] p-6 text-slate-800">
  <button class="bg-red-700 text-white font-bold border-2 border-slate-900 px-4 py-2">Inspect Print</button>
</div>`
  },
  {
    id: "destijl",
    name: "De Stijl",
    category: "Bold",
    cssClass: "style-destijl",
    vibe: "Piet Mondrian grid, thick black lines, primary red/blue/yellow blocks",
    bestFit: "Modernist art, design schools, creative portfolios",
    prompt: "Design a [project] in De Stijl (Mondrian) style: rigid grid of thick black horizontal and vertical lines, asymmetrical color blocks of pure primary red, blue, and yellow with white negative space.",
    palette: ["#ffffff", "#000000", "#0055ff", "#ff0000"],
    tags: ["mondrian", "primary", "rectangles", "modernist", "grid"],
    audioTone: "pop",
    cssSnippet: `.destijl-card {
  background: #0055ff;
  color: #ffffff;
  border: 5px solid #000000;
}
.destijl-btn {
  background: #ff0000;
  color: #ffffff;
  font-weight: 900;
  border: 4px solid #000000;
}`,
    tailwindSnippet: `<div class="bg-blue-600 border-4 border-black p-6 text-white font-black">
  <button class="bg-red-600 text-white border-4 border-black px-5 py-2 font-black">RED BLOCK</button>
</div>`
  },
  {
    id: "constructivism",
    name: "Constructivism",
    category: "Bold",
    cssClass: "style-constructivism",
    vibe: "Dynamic diagonal slashes, revolutionary red/black, bold propaganda",
    bestFit: "Activism, posters, bold streetwear, avant-garde publications",
    prompt: "Design a [project] in Russian Constructivism style: dynamic 45-degree diagonal layout axes, stark high-contrast red, black, and cream palette, heavy slab typography, megaphone geometric shapes.",
    palette: ["#eae6df", "#cc0000", "#000000", "#ffffff"],
    tags: ["diagonal", "propaganda", "slabs", "revolutionary", "red"],
    audioTone: "heavy",
    cssSnippet: `.construct-card {
  background: #cc0000;
  color: #ffffff;
  transform: skew(-4deg);
  border: 3px solid #000000;
  box-shadow: 6px 6px 0px #000000;
}`,
    tailwindSnippet: `<div class="bg-red-700 text-white border-4 border-black shadow-[6px_6px_0px_#000] -skew-x-3 p-6">
  <button class="bg-black text-white font-black uppercase tracking-wider px-5 py-2">ADVANCE</button>
</div>`
  },
  {
    id: "archival",
    name: "Archival Index",
    category: "Editorial",
    cssClass: "style-archival",
    vibe: "Documentation-as-design, catalog numbers, structured index cards",
    bestFit: "Research libraries, design documentation, museum archives",
    prompt: "Design a [project] in Archival Index style: catalog reference codes (REF-094), structured tabular index metadata, raw unstyled monospaced data grids, manila folder tabs, scholarly documentation aesthetic.",
    palette: ["#f8f6f0", "#ffffff", "#404040", "#737373"],
    tags: ["catalog", "archive", "library", "meta", "scholarly"],
    audioTone: "subtle",
    cssSnippet: `.archival-card {
  background: #ffffff;
  border: 1px solid #a3a3a3;
  box-shadow: 2px 2px 0px #d4d4d4;
  font-family: 'Space Mono', monospace;
  color: #262626;
}`,
    tailwindSnippet: `<div class="bg-white border border-stone-400 shadow-[2px_2px_0px_#d4d4d4] p-6 font-mono text-stone-800">
  <div class="text-xs text-stone-500 mb-2">[ID: 984-INDEX]</div>
  <button class="bg-stone-700 text-white text-xs px-3 py-1.5">OPEN FILE</button>
</div>`
  },
  {
    id: "motionnarrative",
    name: "Motion Narrative",
    category: "Futuristic",
    cssClass: "style-motionnarrative",
    vibe: "Cinematic scene transitions, spotlight reveals, smooth velocity",
    bestFit: "Keynotes, luxury automotive configurators, brand showcases",
    prompt: "Design a [project] in Motion Narrative style: fluid scene transitions, cinematic directional gradient sweeps, focused lighting highlights, elegant velocity curves, immersive sequential storytelling.",
    palette: ["#0f172a", "#1e293b", "#334155", "#3b82f6"],
    tags: ["motion", "spotlight", "velocity", "automotive", "cinematic"],
    audioTone: "chime",
    cssSnippet: `.motion-card {
  background: linear-gradient(135deg, #1e293b, #334155);
  border: 1px solid #64748b;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  color: #e2e8f0;
}`,
    tailwindSnippet: `<div class="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 rounded-xl p-6 text-slate-100 shadow-xl">
  <button class="bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg px-4 py-2">Next Chapter</button>
</div>`
  },
  {
    id: "cardplay",
    name: "Card Play",
    category: "Minimal",
    cssClass: "style-cardplay",
    vibe: "Playful interactive cards, tilt physics, tactile modular cards",
    bestFit: "Fintech cards, task boards, e-commerce collections, dashboard widgets",
    prompt: "Design a [project] in Card Play style: modular interactive card stacks with subtle tilt on hover, vibrant accent borders, pill tags, tactile grab handles, satisfying bounce micro-interactions.",
    palette: ["#f0fdf4", "#ffffff", "#22c55e", "#14532d"],
    tags: ["cards", "tilt", "fintech", "playful", "modular"],
    audioTone: "pop",
    cssSnippet: `.cardplay-card {
  background: #ffffff;
  border-radius: 20px;
  border: 2px solid #bbf7d0;
  box-shadow: 0 10px 20px -5px rgba(34, 197, 94, 0.15);
  transform: rotate(-1deg);
  transition: transform 0.2s ease;
}
.cardplay-card:hover {
  transform: rotate(0deg) translateY(-3px);
}`,
    tailwindSnippet: `<div class="bg-white border-2 border-emerald-200 rounded-3xl p-6 shadow-lg -rotate-1 hover:rotate-0 hover:-translate-y-1 transition text-emerald-950">
  <button class="bg-emerald-500 text-white font-bold rounded-2xl px-5 py-2">Swipe Card</button>
</div>`
  },
  {
    id: "cottagecore",
    name: "Cottagecore / Rustic",
    category: "Organic",
    cssClass: "style-cottagecore",
    vibe: "Soft botanical linen, wildflower pressed florals, vintage warm beige",
    bestFit: "Artisanal food, slow living, indie bakeries, handcrafted goods",
    prompt: "Design a [project] in Cottagecore / Rustic style: warm linen and oat textures (#fbf8f1), sage and dusty rose accents, vintage serif headlines, pressed floral decorative badges, soft deckled borders, calming nostalgic pastoral warmth.",
    palette: ["#fbf8f1", "#e8e1d5", "#708238", "#d8a48f"],
    tags: ["rustic", "linen", "botanical", "pastoral", "warm"],
    audioTone: "subtle",
    cssSnippet: `.cottage-card {
  background: #fbf8f1;
  border: 1.5px solid #dcd3c1;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(112, 130, 56, 0.08);
  color: #4a3e36;
}
.cottage-btn {
  background: #708238;
  color: #fff;
  border-radius: 8px;
  padding: 8px 16px;
  font-family: serif;
}`,
    tailwindSnippet: `<div class="bg-stone-50 border border-stone-200 rounded-2xl p-6 text-stone-800 shadow-sm">
  <button class="bg-lime-800 text-white rounded-lg px-4 py-2 font-serif">Harvest</button>
</div>`
  },
  {
    id: "corporatememphis",
    name: "Corporate Memphis / Alegria",
    category: "Minimal",
    cssClass: "style-corporatememphis",
    vibe: "Playful disproportionate geometry, friendly tech SaaS, flat curved shapes",
    bestFit: "Modern tech startups, onboarding screens, fintech dashboards",
    prompt: "Design a [project] in Corporate Memphis (Alegria) style: clean flat pastel surfaces with royal purple and coral accents, friendly rounded UI pills, bold clean geometry, modern cheerful SaaS aesthetic with playful proportions.",
    palette: ["#f8f9ff", "#4338ca", "#fb7185", "#38bdf8"],
    tags: ["tech", "alegria", "startup", "friendly", "flat"],
    audioTone: "pop",
    cssSnippet: `.corp-memphis-card {
  background: #ffffff;
  border: 2px solid #e0e7ff;
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(67, 56, 202, 0.1);
  color: #1e1b4b;
}
.corp-memphis-btn {
  background: #4338ca;
  color: #ffffff;
  border-radius: 9999px;
  padding: 8px 20px;
  font-weight: 700;
}`,
    tailwindSnippet: `<div class="bg-white border-2 border-indigo-100 rounded-3xl p-6 shadow-md text-indigo-950">
  <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full px-5 py-2">Get Started</button>
</div>`
  },
  {
    id: "dopamine",
    name: "Dopamine Design",
    category: "Bold",
    cssClass: "style-dopamine",
    vibe: "Hyper-saturated joyful candy colors, bouncy pill bubbles, cheerful vibes",
    bestFit: "Gen Z apps, social media, habit trackers, creative games",
    prompt: "Design a [project] in Dopamine Design style: hyper-saturated candy palette (bright yellow, neon coral, electric lilac, mint), ultra-plump pill buttons with bounce physics, joyful emoji iconography, euphoric high-energy typography.",
    palette: ["#ff007f", "#ffbe0b", "#8338ec", "#3a86ff"],
    tags: ["candy", "gen-z", "bouncy", "saturated", "joyful"],
    audioTone: "pop",
    cssSnippet: `.dopamine-card {
  background: linear-gradient(135deg, #ffbe0b, #fb5607);
  border: 3px solid #ff007f;
  border-radius: 28px;
  box-shadow: 0 12px 28px rgba(255, 0, 127, 0.35);
  color: #ffffff;
}
.dopamine-btn {
  background: #8338ec;
  color: #ffffff;
  border-radius: 9999px;
  font-weight: 900;
  box-shadow: 0 6px 14px rgba(131, 56, 236, 0.4);
}`,
    tailwindSnippet: `<div class="bg-gradient-to-tr from-amber-400 to-rose-500 rounded-3xl p-6 shadow-2xl text-white border-4 border-pink-500">
  <button class="bg-purple-600 text-white font-black rounded-full px-6 py-2.5 shadow-lg">BOOST ✨</button>
</div>`
  },
  {
    id: "lego",
    name: "Toy Brick / Modular Block",
    category: "Bold",
    cssClass: "style-lego",
    vibe: "Interlocking studs, primary plastic gloss, modular snap containers",
    bestFit: "EdTech, building games, developer infrastructure, creative portfolios",
    prompt: "Design a [project] in Toy Brick / Modular Block style: glossy plastic surfaces, faux stud circular connectors on top headers, chunky vibrant primary colors (Lego red, cobalt blue, sunshine yellow), interlocking snap borders.",
    palette: ["#d11013", "#0055bf", "#ffcf00", "#ffffff"],
    tags: ["plastic", "modular", "studs", "lego", "playful"],
    audioTone: "pop",
    cssSnippet: `.lego-card {
  background: #0055bf;
  border: 3px solid #003380;
  border-radius: 8px;
  box-shadow: 0 6px 0 #002255, inset 0 2px 0 rgba(255,255,255,0.4);
  color: #ffffff;
}
.lego-btn {
  background: #d11013;
  border: 2px solid #800000;
  box-shadow: 0 4px 0 #600000;
  font-weight: 900;
}`,
    tailwindSnippet: `<div class="bg-blue-600 border-2 border-blue-900 shadow-[0_6px_0_#1e3a8a] rounded-lg p-6 text-white">
  <button class="bg-red-600 border border-red-900 shadow-[0_4px_0_#7f1d1d] font-black px-4 py-2 rounded">SNAP IN</button>
</div>`
  },
  {
    id: "glassnoir",
    name: "Glass Noir / Dark Smoke",
    category: "Futuristic",
    cssClass: "style-glassnoir",
    vibe: "Ultra-dark smoked obsidian glass, iridescent rim highlights, deep depth",
    bestFit: "Crypto exchanges, hedge fund terminals, luxury cybersecurity",
    prompt: "Design a [project] in Glass Noir / Dark Smoke style: deep smoked obsidian panels (rgba(15,15,20,0.85)), high-dispersion backdrop-blur (24px), razor-sharp 1px dark iridescent border highlights, stealth luxury aura.",
    palette: ["#09090b", "#18181b", "rgba(255,255,255,0.08)", "#a1a1aa"],
    tags: ["smoked", "obsidian", "dark-glass", "crypto", "stealth"],
    audioTone: "subtle",
    cssSnippet: `.glassnoir-card {
  background: rgba(10, 10, 15, 0.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.15);
  border-radius: 16px;
  color: #f4f4f5;
}`,
    tailwindSnippet: `<div class="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 text-zinc-100 shadow-2xl">
  <button class="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-xl text-white">Authenticate</button>
</div>`
  },
  {
    id: "psychedelic",
    name: "Psychedelic / Groovy 70s",
    category: "Retro",
    cssClass: "style-psychedelic",
    vibe: "Swirling liquid lava gradients, wavy retro serif curves, warm sunset 1970s",
    bestFit: "Music festivals, indie record labels, creative cocktail bars",
    prompt: "Design a [project] in Psychedelic 1970s Groovy style: swirling lava lamp liquid gradients (burnt orange, mustard yellow, avocado olive, plum), wavy melting typography, retro flower power badges, groovy counterculture warmth.",
    palette: ["#d94e34", "#f2a65a", "#78866b", "#4a1c40"],
    tags: ["70s", "groovy", "lava", "wavy", "counterculture"],
    audioTone: "arcade",
    cssSnippet: `.psychedelic-card {
  background: linear-gradient(135deg, #d94e34, #f2a65a 50%, #4a1c40);
  border: 3px solid #ffdb99;
  border-radius: 32px 8px 32px 8px;
  box-shadow: 0 10px 25px rgba(217, 78, 52, 0.4);
  color: #fff9e6;
}`,
    tailwindSnippet: `<div class="bg-gradient-to-br from-orange-600 via-amber-500 to-purple-900 rounded-[32px_8px] p-6 text-amber-50 border-2 border-amber-200">
  <button class="bg-amber-400 text-stone-900 font-extrabold rounded-full px-5 py-2 shadow-md">GROOVY</button>
</div>`
  },
  {
    id: "biomorphicdigital",
    name: "Biomorphic Digital",
    category: "Organic",
    cssClass: "style-biomorphicdigital",
    vibe: "Cellular organic mesh, membrane translucency, living fluid gradients",
    bestFit: "Biotech platforms, genomics, digital healthcare, environmental AI",
    prompt: "Design a [project] in Biomorphic Digital style: living fluid membrane gradients, cellular rounded asymmetric containers, pulsing soft aura glows, sea glass transparency, microscopic scientific organic beauty.",
    palette: ["#022c22", "#059669", "#34d399", "#a7f3d0"],
    tags: ["cellular", "biotech", "fluid", "membrane", "science"],
    audioTone: "chime",
    cssSnippet: `.biomorphic-card {
  background: radial-gradient(circle at 30% 30%, #065f46 0%, #022c22 100%);
  border: 1.5px solid rgba(52, 211, 153, 0.35);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  box-shadow: 0 0 30px rgba(5, 150, 105, 0.25);
  color: #ecfdf5;
}`,
    tailwindSnippet: `<div class="bg-emerald-950 border border-emerald-500/40 rounded-[30px_60px_40px_50px] p-6 text-emerald-100 shadow-xl">
  <button class="bg-emerald-500 text-emerald-950 font-bold rounded-full px-5 py-2">Synthesize</button>
</div>`
  },
  {
    id: "weimar",
    name: "Expressionist / Weimar Woodcut",
    category: "Editorial",
    cssClass: "style-weimar",
    vibe: "Sharp angular fractures, high drama German expressionism, ink cuts",
    bestFit: "Independent film archives, dramatic theater, literary anthologies",
    prompt: "Design a [project] in Expressionist / Weimar Woodcut style: stark angular diagonal cuts, jagged asymmetric containers, deep charcoal and stark bone white contrast, ink woodcut grain, dramatic theatrical tension.",
    palette: ["#141414", "#faf7f2", "#b91c1c", "#404040"],
    tags: ["woodcut", "expressionist", "angular", "theatrical", "german"],
    audioTone: "heavy",
    cssSnippet: `.weimar-card {
  background: #141414;
  border: 2px solid #faf7f2;
  box-shadow: 8px 8px 0px #b91c1c;
  clip-path: polygon(0 0, 100% 3%, 97% 100%, 0 96%);
  color: #faf7f2;
}`,
    tailwindSnippet: `<div class="bg-neutral-950 border-2 border-stone-100 shadow-[8px_8px_0px_#b91c1c] p-6 text-stone-100 font-serif">
  <button class="bg-red-700 text-white font-bold uppercase tracking-widest px-4 py-2">PROCLAMATION</button>
</div>`
  },
  {
    id: "comicretro",
    name: "Pop Comic / Ben-Day Dot",
    category: "Retro",
    cssClass: "style-comicretro",
    vibe: "Halftone dot patterns, action speech bubbles, Roy Lichtenstein pop art",
    bestFit: "Comic platforms, gaming merchandise, streaming overlays, fun tools",
    prompt: "Design a [project] in Pop Comic / Ben-Day Dot style: visible comic halftone dot pattern background, bold black outline bubbles, speech balloon callouts, primary yellow/cyan/magenta pop colors, comic POW/BANG badge styling.",
    palette: ["#fff000", "#ff0044", "#00c3ff", "#000000"],
    tags: ["comic", "halftone", "pop-art", "bendy", "speech-bubble"],
    audioTone: "pop",
    cssSnippet: `.comic-card {
  background: #fff000;
  border: 4px solid #000000;
  box-shadow: 6px 6px 0px #000000;
  color: #000000;
  font-weight: 800;
}
.comic-btn {
  background: #ff0044;
  color: #ffffff;
  border: 3px solid #000000;
  box-shadow: 3px 3px 0px #000000;
  font-weight: 900;
}`,
    tailwindSnippet: `<div class="bg-yellow-300 border-4 border-black shadow-[6px_6px_0px_#000] p-6 text-black">
  <button class="bg-rose-600 text-white font-black border-2 border-black shadow-[3px_3px_0px_#000] px-5 py-2">POW! 💥</button>
</div>`
  },
  {
    id: "analogtape",
    name: "Analog VHS / Cassette Tape",
    category: "Retro",
    cssClass: "style-analogtape",
    vibe: "Magnetic tape texture, tracking error lines, VHS timecode counters",
    bestFit: "Podcasts, retro video recorders, audio players, lo-fi beats",
    prompt: "Design a [project] in Analog VHS / Magnetic Tape style: authentic VHS tape chassis, green/cyan phosphorescent digital counter (PLAY 00:42:15), tracking glitch horizontal flicker, cassette label stickers, lo-fi warmth.",
    palette: ["#1c1c1e", "#2c2c2e", "#30d158", "#ff453a"],
    tags: ["vhs", "cassette", "lo-fi", "timecode", "tape"],
    audioTone: "terminal",
    cssSnippet: `.analog-card {
  background: #1c1c1e;
  border: 2px solid #3a3a3c;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.8), 0 8px 16px rgba(0,0,0,0.6);
  color: #30d158;
  font-family: monospace;
}`,
    tailwindSnippet: `<div class="bg-zinc-900 border-2 border-zinc-700 p-6 text-emerald-400 font-mono shadow-2xl">
  <div class="text-xs text-rose-500 mb-2">REC ● [SP] 00:14:32</div>
  <button class="bg-zinc-800 border border-emerald-500 text-emerald-400 font-bold px-4 py-1.5">▶ REWIND</button>
</div>`
  },
  {
    id: "typefirst",
    name: "Type-First Monolithic",
    category: "Editorial",
    cssClass: "style-typefirst",
    vibe: "Gigantic architectural letterforms, zero decoration, raw typography as UI",
    bestFit: "Architectural monographs, design studios, cultural manifests",
    prompt: "Design a [project] in Type-First Monolithic style: extreme oversized typography dominating 80% of screen real estate, structural letterforms serving as section dividers, stark minimal monochrome contrast, monumental typographic architecture.",
    palette: ["#000000", "#ffffff", "#e5e5e5", "#171717"],
    tags: ["monolithic", "gigantic-type", "architecture", "manifesto", "bold"],
    audioTone: "heavy",
    cssSnippet: `.typefirst-card {
  background: #ffffff;
  color: #000000;
  border-top: 8px solid #000000;
  font-weight: 900;
  letter-spacing: -0.04em;
}`,
    tailwindSnippet: `<div class="bg-white text-black border-t-8 border-black p-8 font-black">
  <h2 class="text-5xl uppercase leading-none tracking-tighter mb-4">SCALE</h2>
  <button class="bg-black text-white text-xs uppercase tracking-widest px-6 py-3">ENTER</button>
</div>`
  },
  {
    id: "solarpunk",
    name: "Solarpunk / Eco-Utopia",
    category: "Futuristic",
    cssClass: "style-solarpunk",
    vibe: "Sunlight gold + foliage green, solar cells, clean futuristic ecology",
    bestFit: "Clean energy dashboards, sustainable tech, smart agriculture, climate AI",
    prompt: "Design a [project] in Solarpunk / Eco-Utopian style: bright golden sunlight gradients, lush foliage greens, sleek photovoltaic hexagonal grid motifs, organic Art Nouveau glass curves, optimistic sustainable high-tech future.",
    palette: ["#fefce8", "#15803d", "#ca8a04", "#84cc16"],
    tags: ["solarpunk", "eco-utopia", "solar", "clean-tech", "optimism"],
    audioTone: "chime",
    cssSnippet: `.solarpunk-card {
  background: linear-gradient(135deg, #fefce8 0%, #ecfdf5 100%);
  border: 2px solid #84cc16;
  border-radius: 24px;
  box-shadow: 0 10px 25px rgba(202, 138, 4, 0.15);
  color: #14532d;
}
.solarpunk-btn {
  background: linear-gradient(90deg, #65a30d, #ca8a04);
  color: #ffffff;
  border-radius: 12px;
  font-weight: 700;
}`,
    tailwindSnippet: `<div class="bg-gradient-to-br from-amber-50 to-emerald-50 border-2 border-lime-500 rounded-3xl p-6 text-emerald-950 shadow-md">
  <button class="bg-gradient-to-r from-lime-600 to-amber-600 text-white font-bold rounded-xl px-5 py-2">Harness Solar</button>
</div>`
  },
  {
    id: "darkbrutalism",
    name: "Dark Brutalism",
    category: "Bold",
    cssClass: "style-darkbrutalism",
    vibe: "Pitch-black monochrome, heavy solid borders, stark contrast, developer raw",
    bestFit: "Indie hackers, high-performance devtools, Linux shells, crypto protocol docs",
    prompt: "Design a [project] in Dark Brutalism style: true black background (#000000), stark solid white borders (2px-3px solid #ffffff), monospaced system typography (JetBrains Mono/Space Mono), zero gradients, hard block drop-shadows (4px 4px 0px #ffffff), raw unapologetic developer terminal layout.",
    palette: ["#000000", "#ffffff", "#121212", "#242424"],
    tags: ["dark", "brutalist", "monochrome", "monospace", "hardcore"],
    audioTone: "heavy",
    cssSnippet: `.darkbrutal-card {
  background: #000000;
  border: 3px solid #ffffff;
  box-shadow: 5px 5px 0px #ffffff;
  color: #ffffff;
  font-family: monospace;
}
.darkbrutal-btn {
  background: #ffffff;
  color: #000000;
  border: 2px solid #ffffff;
  font-weight: 900;
  text-transform: uppercase;
}`,
    tailwindSnippet: `<div class="bg-black border-2 border-white shadow-[5px_5px_0px_#fff] p-6 text-white font-mono">
  <button class="bg-white text-black font-black uppercase px-4 py-2 hover:bg-black hover:text-white border border-white">EXECUTE</button>
</div>`
  },
  {
    id: "linearmodern",
    name: "Linear / Raycast Dark",
    category: "Minimal",
    cssClass: "style-linearmodern",
    vibe: "Ultra-precise 1px zinc borders, dark graphite cards, glowing hotkeys, modern engineering",
    bestFit: "Next-gen B2B SaaS, project management, developer platforms, AI agent consoles",
    prompt: "Design a [project] in Linear / Raycast style: deep graphite surfaces (#0b0c0e, #131418), razor-sharp 1px subtle zinc borders (#262830), subtle radial ambient top-glows (#5e6ad2), rounded pill hotkey badges (Kbd), fluid micro-animations, ultra-refined elite product engineering aesthetic.",
    palette: ["#0b0c0e", "#131418", "#5e6ad2", "#e2e8f0"],
    tags: ["linear", "raycast", "refined", "zinc", "graphite", "kbd"],
    audioTone: "subtle",
    cssSnippet: `.linear-card {
  background: #131418;
  border: 1px solid #262830;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
}
.linear-btn {
  background: #5e6ad2;
  color: #ffffff;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(94, 106, 210, 0.4);
}`,
    tailwindSnippet: `<div class="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-zinc-100 shadow-xl">
  <button class="bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg px-4 py-2 text-xs shadow-md">Create Issue <kbd class="ml-1 bg-indigo-800 px-1.5 py-0.5 rounded text-[10px]">C</kbd></button>
</div>`
  },
  {
    id: "cyberphysical",
    name: "Cyber-Physical Architecture",
    category: "Futuristic",
    cssClass: "style-cyberphysical",
    vibe: "CAD blueprint wireframes, industrial robotics telemetry, robotic amber/hazard stripes",
    bestFit: "Spacecraft telemetry, autonomous drone controls, industrial automation, defense tech",
    prompt: "Design a [project] in Cyber-Physical Architecture style: technical CAD grid overlays, high-contrast industrial black chassis (#0a0a0c), hazard amber (#ffaa00) warning indicators, crosshair telemetry markers, monospace engineering coordinates, rugged physical industrial UI feel.",
    palette: ["#0a0a0c", "#ffaa00", "#202028", "#888899"],
    tags: ["cad", "telemetry", "robotics", "blueprint", "amber", "hazard"],
    audioTone: "terminal",
    cssSnippet: `.cyberphysical-card {
  background: #101016;
  border: 1.5px solid #ffaa00;
  box-shadow: 0 0 15px rgba(255, 170, 0, 0.2), inset 0 0 20px rgba(0,0,0,0.8);
  color: #ffaa00;
  font-family: monospace;
}
.cyberphysical-btn {
  background: #ffaa00;
  color: #000000;
  font-weight: 900;
  border-radius: 2px;
  text-transform: uppercase;
}`,
    tailwindSnippet: `<div class="bg-neutral-950 border border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] p-6 font-mono text-amber-400">
  <div class="text-[10px] text-amber-600 mb-1">AXIS-Z: 48.291 // STABLE</div>
  <button class="bg-amber-500 text-black font-black uppercase text-xs px-4 py-2">CALIBRATE [F2]</button>
</div>`
  },
  {
    id: "raytracing",
    name: "Ray-Tracing Glass",
    category: "Futuristic",
    cssClass: "style-raytracing",
    vibe: "Optical chromatic dispersion, prismatic caustic reflections, physically accurate refraction",
    bestFit: "Next-gen creative suites, 3D spatial computing, high-end optical device showcases",
    prompt: "Design a [project] in Ray-Tracing Glass style: physically modeled refractive glass panels with chromatic rainbow dispersion along edges, caustic radial light reflections, ultra-high-definition backdrop blur (32px), iridescent specular highlights over deep cosmic backdrop.",
    palette: ["#050814", "rgba(255,255,255,0.12)", "#38bdf8", "#e879f9"],
    tags: ["raytracing", "prismatic", "caustics", "chromatic", "refraction"],
    audioTone: "chime",
    cssSnippet: `.raytracing-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.03) 100%);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7), inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 0 20px rgba(56, 189, 248, 0.2);
  border-radius: 20px;
  color: #ffffff;
}`,
    tailwindSnippet: `<div class="bg-white/10 backdrop-blur-3xl border border-white/30 shadow-[0_25px_50px_rgba(0,0,0,0.7),0_0_20px_rgba(56,189,248,0.25)] rounded-2xl p-6 text-white">
  <button class="bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-bold rounded-xl px-4 py-2 shadow-lg">Refract Light</button>
</div>`
  },
  {
    id: "highdensity",
    name: "High-Density Terminal",
    category: "Minimal",
    cssClass: "style-highdensity",
    vibe: "Bloomberg / Reuters trader terminal, zero whitespace, microscopic tabular precision",
    bestFit: "Algorithmic trading, financial exchanges, live network NOCs, telemetry operations",
    prompt: "Design a [project] in High-Density Financial Terminal style: zero unnecessary padding/whitespace, compact 11px monospaced typography, tight multi-column data tables with ticker indicators (+2.4% green / -1.1% red), deep charcoal canvas (#121316), instantaneous information density.",
    palette: ["#121316", "#1c1e24", "#00e676", "#ff1744"],
    tags: ["bloomberg", "trading", "dense", "data", "noc", "ticker"],
    audioTone: "terminal",
    cssSnippet: `.density-card {
  background: #16181f;
  border: 1px solid #2a2e39;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  color: #cfd3dc;
  padding: 12px;
}
.density-btn {
  background: #2a2e39;
  color: #00e676;
  border: 1px solid #00e676;
  font-weight: 700;
  padding: 4px 8px;
}`,
    tailwindSnippet: `<div class="bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs text-zinc-300">
  <div class="flex justify-between border-b border-zinc-800 pb-1 mb-2"><span>NVDA: 138.25</span><span class="text-emerald-400">+4.12%</span></div>
  <button class="bg-zinc-900 border border-emerald-500 text-emerald-400 px-3 py-1 font-bold">BUY MKT</button>
</div>`
  },
  {
    id: "postdigitalgrunge",
    name: "Post-Digital Grunge",
    category: "Bold",
    cssClass: "style-postdigitalgrunge",
    vibe: "Distorted halftone xerox noise, distressed stamp borders, punk digital zine layout",
    bestFit: "Underground fashion labels, music festival zines, counter-culture art publications",
    prompt: "Design a [project] in Post-Digital Grunge style: gritty photocopy xerox textures, distressed postage stamp edges, misprinted ink registration shifts, rough industrial stencil type, stark black/white/blood-crimson punk zine visual tension.",
    palette: ["#0f0f0f", "#f4efe6", "#cc0022", "#404040"],
    tags: ["grunge", "photocopy", "xerox", "punk", "distressed", "zine"],
    audioTone: "heavy",
    cssSnippet: `.grunge-card {
  background: #f4efe6;
  color: #0f0f0f;
  border: 4px dashed #0f0f0f;
  box-shadow: 8px 8px 0px #cc0022;
  transform: rotate(-1.5deg);
}
.grunge-btn {
  background: #cc0022;
  color: #ffffff;
  border: 3px solid #0f0f0f;
  font-weight: 900;
  text-transform: uppercase;
}`,
    tailwindSnippet: `<div class="bg-stone-200 text-stone-950 border-4 border-dashed border-black shadow-[8px_8px_0px_#cc0022] -rotate-1 p-6">
  <button class="bg-red-700 text-white font-black uppercase tracking-wider border-2 border-black px-5 py-2">DISTORT</button>
</div>`
  },
  {
    id: "cybergoth",
    name: "Cyber-Goth / Dark Techwear",
    category: "Bold",
    cssClass: "style-cybergoth",
    vibe: "Acid toxic green + blood crimson on obsidian matte, tactical strapping UI dividers",
    bestFit: "Avant-garde streetwear, dark electronic music, tactical hardware configs",
    prompt: "Design a [project] in Cyber-Goth / Techwear style: matte obsidian black (#08080a), acid neon lime (#b8ff00) and blood crimson accents, tactical webbing harness borders, military stencil typography, high-angle chamfered cutouts, dark mechanical stealth.",
    palette: ["#08080a", "#b8ff00", "#ff003c", "#1a1a22"],
    tags: ["techwear", "goth", "tactical", "matte", "stealth", "straps"],
    audioTone: "arcade",
    cssSnippet: `.cybergoth-card {
  background: #0f0f14;
  border: 2px solid #b8ff00;
  box-shadow: 0 0 20px rgba(184, 255, 0, 0.25), inset 0 0 15px rgba(0,0,0,0.9);
  color: #b8ff00;
  clip-path: polygon(0 0, 95% 0, 100% 8%, 100% 100%, 5% 100%, 0 92%);
}`,
    tailwindSnippet: `<div class="bg-black border-2 border-lime-400 text-lime-400 p-6 shadow-[0_0_20px_rgba(163,230,53,0.3)] font-mono">
  <button class="bg-rose-600 text-white font-black uppercase tracking-widest px-4 py-2 border border-lime-400">ENGAGE PROTOCOL</button>
</div>`
  },
  {
    id: "zenminimal",
    name: "Japanese Ma (Zen Space)",
    category: "Minimal",
    cssClass: "style-zenminimal",
    vibe: "80% deliberate negative space, tranquil sandstone & river pebble grays, silence as UI",
    bestFit: "Mindfulness platforms, contemplative essays, tea ceremonies, architectural archives",
    prompt: "Design a [project] in Japanese Ma (Zen Negative Space) style: overwhelming generous silence and empty space (70-80% whitespace), muted warm sandstone (#f9f8f5) and river stone gray, refined thin typography, subtle tactile border breath, peaceful organic balance.",
    palette: ["#f9f8f5", "#ffffff", "#4a4a48", "#a8a29e"],
    tags: ["zen", "ma", "silence", "whitespace", "japanese", "peaceful"],
    audioTone: "subtle",
    cssSnippet: `.zen-card {
  background: #ffffff;
  border: 1px solid #e7e5e4;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  color: #44403c;
  padding: 32px;
}
.zen-btn {
  background: #44403c;
  color: #fafaf9;
  border-radius: 4px;
  padding: 8px 24px;
  font-weight: 400;
  letter-spacing: 0.05em;
}`,
    tailwindSnippet: `<div class="bg-stone-50 border border-stone-200 rounded-lg p-10 text-stone-700 shadow-xs">
  <button class="bg-stone-800 text-stone-100 font-light tracking-widest px-6 py-2.5 rounded">CONTEMPLATE</button>
</div>`
  },
  {
    id: "deconstructedwire",
    name: "Deconstructed Wireframe",
    category: "Bold",
    cssClass: "style-deconstructedwire",
    vibe: "Exposed layout bounding boxes, dimension labels (W: 320px), blueprint blue lines",
    bestFit: "Design systems documentation, architectural tools, Figma creator tools, developer blogs",
    prompt: "Design a [project] in Deconstructed Wireframe style: visible blueprint bounding grid boxes, dimension annotations (e.g. `[420px × 64px]`), coordinate crosshairs, architectural technical blue lines, exposed structural scaffolding celebrated as the final UI.",
    palette: ["#0a192f", "#00ffff", "#ffffff", "#172a45"],
    tags: ["wireframe", "blueprint", "dimensions", "scaffolding", "figma"],
    audioTone: "terminal",
    cssSnippet: `.wireframe-card {
  background: #0d1b2a;
  border: 1.5px dashed #00ffff;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
  color: #00ffff;
  font-family: monospace;
}
.wireframe-btn {
  background: transparent;
  border: 1.5px solid #00ffff;
  color: #00ffff;
  font-weight: 700;
  text-transform: uppercase;
}`,
    tailwindSnippet: `<div class="bg-slate-900 border-2 border-dashed border-cyan-400 p-6 text-cyan-300 font-mono">
  <div class="text-[10px] text-cyan-500 mb-2">&lt;FRAME W:100% H:AUTO&gt;</div>
  <button class="border border-cyan-400 text-cyan-300 font-bold px-4 py-2 hover:bg-cyan-400 hover:text-black">RENDER</button>
</div>`
  },
  {
    id: "claydark",
    name: "Obsidian Clay / Dark Clay",
    category: "Bold",
    cssClass: "style-claydark",
    vibe: "Soft inflated 3D clay volumes sculpted from dark charcoal with velvet highlights",
    bestFit: "Dark mode mobile apps, gaming dashboards, tactile crypto wallets, friendly dark tools",
    prompt: "Design a [project] in Obsidian Clay (Dark Claymorphism) style: plush rounded inflated volumes sculpted from dark charcoal (#1e1e24), deep inner drop shadows (inset -6px -6px 12px #000000, inset 6px 6px 12px #383844), plush pill buttons with 3D physical volume.",
    palette: ["#141418", "#1e1e24", "#6366f1", "#ffffff"],
    tags: ["dark-clay", "obsidian", "inflated", "plush", "tactile-dark"],
    audioTone: "pop",
    cssSnippet: `.claydark-card {
  background: #1e1e24;
  border-radius: 24px;
  box-shadow: 
    inset -6px -6px 12px rgba(0, 0, 0, 0.8),
    inset 6px 6px 12px rgba(255, 255, 255, 0.1),
    10px 14px 24px rgba(0, 0, 0, 0.7);
  color: #e5e5ea;
}`,
    tailwindSnippet: `<div class="bg-zinc-800 rounded-3xl p-6 shadow-[inset_-6px_-6px_12px_rgba(0,0,0,0.8),inset_6px_6px_12px_rgba(255,255,255,0.1),10px_14px_24px_rgba(0,0,0,0.7)] text-zinc-100">
  <button class="bg-indigo-600 font-bold rounded-2xl px-5 py-2.5 shadow-lg">Clay Action</button>
</div>`
  },
  {
    id: "chromemetal",
    name: "Liquid Chrome / Metallic 3D",
    category: "Futuristic",
    cssClass: "style-chromemetal",
    vibe: "Flowing liquid mercury gradients, specular mirror gleam, luxury hyper-metallic finish",
    bestFit: "Luxury automotive configurators, high-end electronic music, cyber jewelry, NFT drops",
    prompt: "Design a [project] in Liquid Chrome / 3D Specular Metal style: liquid mercury chrome gradients (simulating environmental sky reflections), razor-sharp white specular edge highlights, fluid sculpted pill chassis, high-gloss reflective luxury futurism.",
    palette: ["#090a0f", "#e2e8f0", "#94a3b8", "#38bdf8"],
    tags: ["chrome", "mercury", "specular", "metallic", "liquid-metal"],
    audioTone: "chime",
    cssSnippet: `.chrome-card {
  background: linear-gradient(135deg, #e2e8f0 0%, #64748b 35%, #f8fafc 50%, #334155 70%, #94a3b8 100%);
  border: 1.5px solid #ffffff;
  border-radius: 18px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.9);
  color: #0f172a;
}`,
    tailwindSnippet: `<div class="bg-gradient-to-tr from-slate-200 via-slate-400 to-white border-2 border-white rounded-2xl p-6 text-slate-900 shadow-2xl font-bold">
  <button class="bg-black text-white font-extrabold rounded-full px-5 py-2 shadow-md">POLISH</button>
</div>`
  },
  {
    id: "tactilepaper",
    name: "Tactile Papercraft / Skeuo-Fold",
    category: "Organic",
    cssClass: "style-tactilepaper",
    vibe: "Embossed heavy card stock, realistic drop-shadow paper layers, origami crease tabs",
    bestFit: "Notion workspaces, personal journaling, artisanal publishing, craft stores",
    prompt: "Design a [project] in Tactile Papercraft style: layered heavyweight cotton paper sheets (#fdfbf7), realistic delicate multi-layer drop shadows simulating physical paper elevation, debossed typography, natural deckle edges, authentic physical craft.",
    palette: ["#fdfbf7", "#f4efe6", "#292524", "#78716c"],
    tags: ["paper", "origami", "emboss", "journal", "cotton", "craft"],
    audioTone: "subtle",
    cssSnippet: `.paper-card {
  background: #fdfbf7;
  border: 1px solid #e7e0d3;
  border-radius: 4px;
  box-shadow: 
    0 1px 3px rgba(0,0,0,0.06),
    0 6px 16px rgba(0,0,0,0.08),
    0 12px 28px rgba(0,0,0,0.04);
  color: #292524;
}`,
    tailwindSnippet: `<div class="bg-stone-50 border border-stone-200 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_6px_16px_rgba(0,0,0,0.08)] rounded p-6 text-stone-900">
  <button class="bg-stone-800 text-stone-50 font-serif px-4 py-2 rounded-sm shadow-sm">Fold Page</button>
</div>`
  },
  {
    id: "retrocomputing",
    name: "1984 Macintosh GUI / System 1",
    category: "Retro",
    cssClass: "style-retrocomputing",
    vibe: "1-bit pure black & white dithered patterns, Chicago bitmap font, window titlebar stripes",
    bestFit: "Retro tech enthusiasts, nostalgic macOS tools, pixel art editors, vintage computing",
    prompt: "Design a [project] in 1984 Macintosh System 1 GUI style: authentic 1-bit black and white dither patterns, horizontal pinstripe window titlebars, square window close box, Chicago bitmap typography, drop-shadow dialog boxes, nostalgic retro OS perfection.",
    palette: ["#ffffff", "#000000", "#e0e0e0", "#808080"],
    tags: ["macintosh", "system1", "1bit", "dither", "chicago", "1984"],
    audioTone: "pixel",
    cssSnippet: `.mac1984-card {
  background: #ffffff;
  border: 2px solid #000000;
  box-shadow: 3px 3px 0px #000000;
  color: #000000;
  font-family: 'Space Mono', monospace;
}
.mac1984-btn {
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 4px;
  color: #000000;
  font-weight: 700;
  box-shadow: 1px 1px 0px #000000;
}`,
    tailwindSnippet: `<div class="bg-white border-2 border-black shadow-[3px_3px_0px_#000] p-6 text-black font-mono">
  <div class="border-b-2 border-black pb-1 mb-2 font-bold flex justify-between"><span>System 1.0</span><span>[■]</span></div>
  <button class="border-2 border-black rounded px-3 py-1 font-bold active:bg-black active:text-white">OK</button>
</div>`
  },
  {
    id: "glitchhologram",
    name: "Glitch Hologram HUD",
    category: "Futuristic",
    cssClass: "style-glitchhologram",
    vibe: "Scanline jitter, holographic cyan/violet displacement, tactical radar crosshairs",
    bestFit: "Sci-fi video games, cyber defense cockpits, AI agent command centers, virtual avatars",
    prompt: "Design a [project] in Glitch Hologram HUD style: semi-transparent glowing holographic cyan (#00f0ff) and magenta (#ff00ff) scanline projections, chromatic RGB glitch displacement on hover, tactical target reticles, orbital radar arcs, sci-fi military cockpit HUD.",
    palette: ["#050814", "#00f0ff", "#ff00ff", "#101828"],
    tags: ["hologram", "glitch", "hud", "rgb-split", "reticle", "scanline"],
    audioTone: "terminal",
    cssSnippet: `.hologram-card {
  background: rgba(5, 8, 20, 0.85);
  border: 1.5px solid #00f0ff;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.4), inset 0 0 15px rgba(255, 0, 255, 0.2);
  color: #00f0ff;
}
.hologram-btn {
  background: rgba(0, 240, 255, 0.15);
  border: 1px solid #00f0ff;
  color: #00f0ff;
  font-weight: 800;
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
}`,
    tailwindSnippet: `<div class="bg-slate-950/80 border border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] p-6 font-mono">
  <button class="bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold px-4 py-2 shadow-[0_0_10px_#00f0ff]">ENGAGE HUD</button>
</div>`
  },
  {
    id: "bauhausdark",
    name: "Bauhaus Dark Edition",
    category: "Editorial",
    cssClass: "style-bauhausdark",
    vibe: "Primary red/yellow/blue geometry inverted against nocturnal slate basalt blocks",
    bestFit: "Architectural firms, modern design universities, avant-garde tech publications",
    prompt: "Design a [project] in Bauhaus Dark Edition style: nocturnal obsidian canvas (#121214), stark primary Bauhaus red (#e52521), cobalt blue (#00459c), and cadmium yellow (#ffd000) pure geometric primitives, functional asymmetric grid, bold monolithic Bauhaus typography.",
    palette: ["#121214", "#e52521", "#ffd000", "#00459c"],
    tags: ["bauhaus-dark", "geometric", "primary", "monolith", "asymmetric"],
    audioTone: "heavy",
    cssSnippet: `.bauhausdark-card {
  background: #18181e;
  border: 4px solid #ffd000;
  box-shadow: 8px 8px 0px #00459c;
  color: #ffffff;
}
.bauhausdark-btn {
  background: #e52521;
  color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 9999px;
  font-weight: 900;
}`,
    tailwindSnippet: `<div class="bg-neutral-900 border-4 border-yellow-400 shadow-[8px_8px_0px_#1d4ed8] p-6 text-white font-bold">
  <button class="bg-red-600 text-white font-black rounded-full px-6 py-2 border border-white">FORM & FUNCTION</button>
</div>`
  },
  {
    id: "surrealism",
    name: "Surrealism",
    category: "Experimental",
    cssClass: "style-surrealism",
    vibe: "Dreamlike juxtaposed elements, irrational perspective, metaphysical atmosphere",
    bestFit: "Avant-garde creative portfolios, luxury fashion, music albums, art exhibitions",
    prompt: "Design a [project] in Surrealism style: dreamlike impossible perspective, metaphysical lighting and eerie soft gradients, floating asymmetric card elements, juxtaposed classical motifs with clean modern typography, ethereal palette of deep twilight slate, muted lavender, warm amber, and cream, poetic visual hierarchy with unexpected spatial depth.",
    palette: ["#1c192c", "#d8b4e2", "#f6ad55", "#faf5ff"],
    tags: ["surreal", "dreamlike", "metaphysical", "floating", "avant-garde"],
    audioTone: "ambient",
    cssSnippet: `.surrealism-card {
  background: radial-gradient(circle at 80% 20%, rgba(216, 180, 226, 0.25), #1c192c 80%);
  border: 1px solid rgba(216, 180, 226, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  color: #faf5ff;
}
.surrealism-btn {
  background: linear-gradient(135deg, #d8b4e2, #f6ad55);
  color: #1c192c;
  border-radius: 9999px;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(246, 173, 85, 0.4);
}`,
    tailwindSnippet: `<div class="bg-slate-900 border border-purple-300/30 shadow-2xl p-6 text-purple-50 rounded-2xl backdrop-blur-md">
  <button class="bg-gradient-to-r from-purple-300 to-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-full shadow-lg">Enter Dream</button>
</div>`
  },
  {
    id: "neoclassical",
    name: "Neo-Classical",
    category: "Editorial",
    cssClass: "style-neoclassical",
    vibe: "Symmetrical architectural proportion, marble textures, refined serif roman typography",
    bestFit: "Heritage brands, law firms, high-end architecture, bespoke horology, museums",
    prompt: "Design a [project] in Neo-Classical style: monumental symmetry, classical proportions, refined Roman serif headings (Didot / Bodoni style), deep antique bronze and warm ivory canvas, hairline gold metallic divider rules, dignified restraint with museum-grade typographic pacing.",
    palette: ["#171614", "#c5a059", "#f4efe6", "#2a2723"],
    tags: ["classical", "heritage", "serif", "monumental", "luxury"],
    audioTone: "bell",
    cssSnippet: `.neoclassical-card {
  background: #171614;
  border: 1px solid #c5a059;
  outline: 4px solid #171614;
  outline-offset: 2px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  color: #f4efe6;
}
.neoclassical-btn {
  background: transparent;
  color: #c5a059;
  border: 1px solid #c5a059;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-family: serif;
}`,
    tailwindSnippet: `<div class="bg-stone-900 border border-amber-600/60 p-6 text-stone-100 font-serif">
  <button class="border border-amber-500 text-amber-400 uppercase tracking-widest text-xs px-6 py-2.5 font-serif hover:bg-amber-500 hover:text-stone-950">Acquire Heritage</button>
</div>`
  },
  {
    id: "scrapbook",
    name: "Scrapbook / Collage",
    category: "Playful",
    cssClass: "style-scrapbook",
    vibe: "Washi tape stickers, torn paper edges, polaroids, cutout tactile layers",
    bestFit: "Personal creative blogs, artisan craft shops, travel diaries, student portfolios",
    prompt: "Design a [project] in Scrapbook Collage style: tactile washi tape overlays, craft paper cutouts, rotated polaroid frames (-3deg to 3deg), pin-board dropshadows, handwritten handwritten script accents alongside monospaced typewriter captions, charming analog warmth.",
    palette: ["#f5efe6", "#e07a5f", "#3d405b", "#81b29a"],
    tags: ["scrapbook", "collage", "washi-tape", "tactile", "polaroid"],
    audioTone: "pop",
    cssSnippet: `.scrapbook-card {
  background: #fdfaf5;
  border: 2px dashed #e07a5f;
  box-shadow: 4px 6px 16px rgba(61, 64, 91, 0.15);
  transform: rotate(-1deg);
  color: #3d405b;
}
.scrapbook-btn {
  background: #e07a5f;
  color: #ffffff;
  border-radius: 4px;
  box-shadow: 2px 3px 0px #3d405b;
  font-weight: 700;
  transform: rotate(1deg);
}`,
    tailwindSnippet: `<div class="bg-amber-50 border-2 border-dashed border-rose-400 -rotate-1 p-6 text-slate-800 shadow-md">
  <button class="bg-rose-500 text-white font-bold px-4 py-2 rotate-1 shadow-[2px_3px_0px_#334155] rounded">Pin Memory</button>
</div>`
  },
  {
    id: "conceptsketch",
    name: "Conceptual Sketch",
    category: "Minimal",
    cssClass: "style-conceptsketch",
    vibe: "Drafting blueprint grid, technical pencil annotations, gestural architectural lines",
    bestFit: "Design agency work-in-progress, engineering blogs, prototyping platforms, architects",
    prompt: "Design a [project] in Conceptual Sketch style: light graph paper background grid (#0055ff at 0.08 opacity), hand-drawn technical pen linework, blueprint drafting annotations, visible coordinate markers, crisp technical monospace typography, raw unrendered exploratory aesthetic.",
    palette: ["#f8fafc", "#2563eb", "#64748b", "#0f172a"],
    tags: ["sketch", "drafting", "blueprint", "architectural", "technical"],
    audioTone: "click",
    cssSnippet: `.conceptsketch-card {
  background: #ffffff;
  background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
  background-size: 16px 16px;
  border: 1px dashed #2563eb;
  color: #0f172a;
}
.conceptsketch-btn {
  background: transparent;
  color: #2563eb;
  border: 1px solid #2563eb;
  border-style: solid;
  font-family: monospace;
  font-weight: 600;
}`,
    tailwindSnippet: `<div class="bg-white border border-dashed border-blue-600 p-6 text-slate-900 font-mono shadow-sm">
  <button class="border border-blue-600 text-blue-600 px-4 py-2 hover:bg-blue-50 font-mono">DRAFT_SPEC()</button>
</div>`
  },
  {
    id: "luxurytypography",
    name: "Luxury Typography",
    category: "Editorial",
    cssClass: "style-luxurytypography",
    vibe: "High-contrast serif display, generous tracking, haute couture monochromatic restraint",
    bestFit: "Haute couture fashion, Michelin restaurants, high-end real estate, luxury perfumes",
    prompt: "Design a [project] in Luxury Typography style: majestic high-contrast modern serif typography, immense letter-spacing on subheadings, deep carbon black canvas, pale champagne gold accents, razor-sharp hairline grid borders, supreme editorial restraint with maximum whitespace.",
    palette: ["#0a0a0c", "#d4af37", "#f5f5f7", "#1f1f24"],
    tags: ["luxury", "typography", "haute-couture", "champagne", "serif"],
    audioTone: "chime",
    cssSnippet: `.luxurytypography-card {
  background: #0a0a0c;
  border: 1px solid rgba(212, 175, 55, 0.35);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
  color: #f5f5f7;
}
.luxurytypography-btn {
  background: transparent;
  color: #d4af37;
  border: 1px solid #d4af37;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  font-size: 0.75rem;
}`,
    tailwindSnippet: `<div class="bg-zinc-950 border border-amber-400/40 p-8 text-zinc-100 tracking-wide font-serif">
  <button class="border border-amber-400 text-amber-300 text-xs tracking-[0.25em] uppercase px-6 py-2.5">DISCOVER PRIVATE SALON</button>
</div>`
  },
  {
    id: "ethereal",
    name: "Ethereal / Dreamscape",
    category: "Futuristic",
    cssClass: "style-ethereal",
    vibe: "Nebulous pastel aura, iridescent luminous glow, soft floating prismatic diffusion",
    bestFit: "Wellness apps, ambient soundscapes, meditation platforms, avant-pop digital art",
    prompt: "Design a [project] in Ethereal Dreamscape style: diffused iridescent lighting, nebulous multi-tone gradient clouds (lilac, rose gold, mint, pearlescent cyan), soft blurred frosted glass panels, delicate typography, heavenly ambient luminescence, weightless floating visual pace.",
    palette: ["#0f1026", "#e879f9", "#38bdf8", "#fdf4ff"],
    tags: ["ethereal", "dreamscape", "iridescent", "luminous", "aura"],
    audioTone: "ambient",
    cssSnippet: `.ethereal-card {
  background: radial-gradient(circle at top right, rgba(232, 121, 249, 0.18), rgba(15, 16, 38, 0.95));
  border: 1px solid rgba(232, 121, 249, 0.3);
  box-shadow: 0 0 30px rgba(56, 189, 248, 0.15);
  backdrop-filter: blur(16px);
  color: #fdf4ff;
}
.ethereal-btn {
  background: linear-gradient(135deg, rgba(232, 121, 249, 0.8), rgba(56, 189, 248, 0.8));
  color: #0f1026;
  border-radius: 9999px;
  font-weight: 700;
  box-shadow: 0 0 20px rgba(232, 121, 249, 0.4);
}`,
    tailwindSnippet: `<div class="bg-indigo-950/80 border border-fuchsia-400/30 p-6 rounded-3xl shadow-[0_0_30px_rgba(56,189,248,0.2)] text-fuchsia-50 backdrop-blur-xl">
  <button class="bg-gradient-to-r from-fuchsia-400 to-sky-400 text-slate-950 font-bold px-6 py-2.5 rounded-full shadow-lg">Ascend Now</button>
</div>`
  },
  {
    id: "bohemian",
    name: "Bohemian / Boho Chic",
    category: "Warm",
    cssClass: "style-bohemian",
    vibe: "Terracotta sunbursts, botanical arches, organic hand-spun earth tones, textured warmth",
    bestFit: "Artisan crafts, sustainable living, yoga studios, botanical brands, organic cafes",
    prompt: "Design a [project] in Bohemian Boho Chic style: warm terracotta (#c86446), sun-bleached desert sand, sage eucalyptus green, arch motifs, sunburst vector details, organic humanist sans with delicate serif italic highlights, natural earthy warmth and relaxed tactile rhythm.",
    palette: ["#faf5ee", "#c86446", "#606c38", "#283618"],
    tags: ["bohemian", "terracotta", "botanical", "earth-tones", "organic"],
    audioTone: "bell",
    cssSnippet: `.bohemian-card {
  background: #fefae0;
  border: 1px solid #dda15e;
  border-radius: 24px 24px 12px 12px;
  box-shadow: 0 10px 25px rgba(200, 100, 70, 0.1);
  color: #283618;
}
.bohemian-btn {
  background: #c86446;
  color: #fefae0;
  border-radius: 9999px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(200, 100, 70, 0.3);
}`,
    tailwindSnippet: `<div class="bg-amber-50 border border-amber-300 rounded-t-3xl rounded-b-xl p-6 text-stone-800 shadow-sm">
  <button class="bg-amber-700 text-amber-50 font-bold px-5 py-2.5 rounded-full shadow-md hover:bg-amber-800">Gather Earth</button>
</div>`
  },
  {
    id: "anthropomorphic",
    name: "Anthropomorphic / Mascot UI",
    category: "Playful",
    cssClass: "style-anthropomorphic",
    vibe: "Expressive character mascots, emotional eye micro-states, friendly bubbly badges",
    bestFit: "Language learning apps, habit trackers, kids educational tech, pet tech startups",
    prompt: "Design a [project] in Anthropomorphic Mascot UI style (Duolingo / Headspace vibe): friendly expressive illustrated character elements, high-contrast bubbly buttons with tactile bottom shadows, cheerful round geometric badges, playful micro-interactions, delightful emotional UI states.",
    palette: ["#58cc02", "#1cb0f6", "#ffc800", "#131f24"],
    tags: ["mascot", "character", "playful", "bubbly", "gamified"],
    audioTone: "arcade",
    cssSnippet: `.anthropomorphic-card {
  background: #ffffff;
  border: 3px solid #e5e5e5;
  border-bottom: 6px solid #e5e5e5;
  border-radius: 20px;
  color: #131f24;
}
.anthropomorphic-btn {
  background: #58cc02;
  color: #ffffff;
  border: none;
  border-bottom: 4px solid #46a302;
  border-radius: 16px;
  font-weight: 800;
  text-transform: uppercase;
}`,
    tailwindSnippet: `<div class="bg-white border-2 border-b-4 border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm">
  <button class="bg-green-500 hover:bg-green-600 text-white font-extrabold uppercase px-6 py-3 rounded-2xl border-b-4 border-green-700 active:border-b-0 active:translate-y-1">START STREAK!</button>
</div>`
  },
  {
    id: "victorian",
    name: "Victorian Steampunk",
    category: "Historical",
    cssClass: "style-victorian",
    vibe: "Aged brass bezel gauges, filigree scrollwork, deep burgundy velvet, ornate typography",
    bestFit: "Escape room websites, retro video games, artisanal distillery, gothic mystery novels",
    prompt: "Design a [project] in Victorian Steampunk style: aged polished brass trims, deep antique mahogany and velvet burgundy canvas, etched mechanical gear filigree, ornamental engraved serif typography, riveted border plates, tactile clockwork instrumentation aesthetic.",
    palette: ["#1e140f", "#b8860b", "#722f37", "#f3e5ab"],
    tags: ["victorian", "steampunk", "brass", "filigree", "ornate"],
    audioTone: "heavy",
    cssSnippet: `.victorian-card {
  background: #1e140f;
  border: 2px solid #b8860b;
  box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.8), 0 8px 24px rgba(0, 0, 0, 0.7);
  color: #f3e5ab;
}
.victorian-btn {
  background: linear-gradient(180deg, #b8860b, #7a5806);
  color: #1e140f;
  border: 1px solid #ffd700;
  font-family: serif;
  font-weight: 800;
  letter-spacing: 0.1em;
}`,
    tailwindSnippet: `<div class="bg-stone-950 border-2 border-amber-600 shadow-2xl p-6 text-amber-100 font-serif">
  <button class="bg-gradient-to-b from-amber-600 to-amber-800 text-stone-950 font-black border border-amber-400 px-5 py-2 uppercase tracking-widest">ENGAGE VALVE</button>
</div>`
  },
  {
    id: "cybercore",
    name: "Cybercore / Netpunk",
    category: "Futuristic",
    cssClass: "style-cybercore",
    vibe: "Early web hacker terminal meets futuristic combat HUD, toxic lime and matrix black",
    bestFit: "Security red-team platforms, crypto protocols, developer command centers, esports",
    prompt: "Design a [project] in Cybercore Netpunk style: deep void black canvas, toxic fluorescent lime green accents (#00ff66), high-contrast terminal monospace type, digital wireframe telemetry, sharp angled chamfered card corners, tactical cyber ops overlay styling.",
    palette: ["#050807", "#00ff66", "#008f11", "#e0ffe8"],
    tags: ["cybercore", "netpunk", "terminal", "matrix", "hacker"],
    audioTone: "digital",
    cssSnippet: `.cybercore-card {
  background: #080d0a;
  border: 1px solid #00ff66;
  box-shadow: 0 0 16px rgba(0, 255, 102, 0.25), inset 0 0 12px rgba(0, 255, 102, 0.08);
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
  color: #e0ffe8;
}
.cybercore-btn {
  background: #00ff66;
  color: #050807;
  font-family: monospace;
  font-weight: 900;
  border: none;
  clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
}`,
    tailwindSnippet: `<div class="bg-black border border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)] p-6 font-mono text-emerald-300">
  <button class="bg-emerald-400 text-black font-black px-5 py-2 font-mono hover:bg-emerald-300">EXEC_OVERRIDE()</button>
</div>`
  },
  {
    id: "synthwave",
    name: "Synthwave / Outrun",
    category: "Retro",
    cssClass: "style-synthwave",
    vibe: "80s retro sunset, wireframe wire horizon grid, neon magenta and electric cyan chrome",
    bestFit: "Gaming streaming dashboards, music synthesizers, retro arcade events, podcasts",
    prompt: "Design a [project] in Synthwave Outrun style: glowing 80s neon chrome gradient, perspective wireframe ground grid receding into a setting neon sun, hot neon magenta (#ff2a85) paired with electric cyan (#00f0ff) and sunset amber, italicized chrome racing typography.",
    palette: ["#1a0b2e", "#ff2a85", "#00f0ff", "#ffe600"],
    tags: ["synthwave", "outrun", "neon", "80s", "retro-futuristic"],
    audioTone: "arcade",
    cssSnippet: `.synthwave-card {
  background: linear-gradient(180deg, #240046 0%, #10002b 100%);
  border: 2px solid #ff2a85;
  box-shadow: 0 0 25px rgba(255, 42, 133, 0.4), inset 0 0 15px rgba(0, 240, 255, 0.2);
  color: #ffffff;
}
.synthwave-btn {
  background: linear-gradient(90deg, #ff2a85, #ff71ce);
  color: #ffffff;
  border: none;
  font-weight: 800;
  text-transform: uppercase;
  font-style: italic;
  box-shadow: 0 0 18px #ff2a85;
}`,
    tailwindSnippet: `<div class="bg-purple-950 border-2 border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.5)] p-6 text-white">
  <button class="bg-gradient-to-r from-pink-500 to-cyan-400 text-black font-black italic px-6 py-2.5 rounded shadow-lg uppercase">RIDE THE GRID</button>
</div>`
  },
  {
    id: "graffiti",
    name: "Graffiti / Street Art",
    category: "Bold",
    cssClass: "style-graffiti",
    vibe: "Spray-paint drips, wildstyle outlines, stencil textures, raw urban wall energy",
    bestFit: "Skateboarding brands, hip-hop festivals, urban streetwear, alternative sports",
    prompt: "Design a [project] in Graffiti Street Art style: high-voltage spray can neon paint splatters, dynamic tilted angle containers, thick black wildstyle marker outlines, stencil spray textures, gritty distressed concrete background, rebel urban visual pacing.",
    palette: ["#121212", "#ff0055", "#00e5ff", "#f5ee38"],
    tags: ["graffiti", "street-art", "spray-paint", "stencil", "urban"],
    audioTone: "heavy",
    cssSnippet: `.graffiti-card {
  background: #1c1c1c;
  border: 3px solid #ff0055;
  box-shadow: 6px 6px 0px #00e5ff;
  transform: rotate(-1.5deg);
  color: #f5ee38;
}
.graffiti-btn {
  background: #ff0055;
  color: #ffffff;
  border: 3px solid #000000;
  box-shadow: 4px 4px 0px #f5ee38;
  font-weight: 900;
  text-transform: uppercase;
  transform: skew(-8deg);
}`,
    tailwindSnippet: `<div class="bg-neutral-900 border-4 border-pink-600 shadow-[6px_6px_0px_#06b6d4] -rotate-1 p-6 text-yellow-300">
  <button class="bg-pink-600 text-white font-black uppercase px-6 py-2 border-2 border-black -skew-x-6 shadow-[4px_4px_0px_#facc15]">TAG THE WALL</button>
</div>`
  },
  {
    id: "gothic",
    name: "Gothic / Dark Romantic",
    category: "Historical",
    cssClass: "style-gothic",
    vibe: "Blackletter typography, pointed cathedral arches, obsidian lace, moody chiaroscuro",
    bestFit: "Dark fantasy games, gothic metal merchandise, alternative subculture, horror media",
    prompt: "Design a [project] in Gothic Dark Romantic style: rich obsidian void canvas, crimson wine blood accents (#880808), intricate filigree pointed gothic arches, sharp high-contrast blackletter calligraphic headings, silver moon metallic borders, melancholic dramatic lighting.",
    palette: ["#0b0a0c", "#880808", "#c0c0c0", "#f0edf2"],
    tags: ["gothic", "dark-romantic", "blackletter", "cathedral", "crimson"],
    audioTone: "heavy",
    cssSnippet: `.gothic-card {
  background: #110f13;
  border: 1px solid #880808;
  outline: 1px solid #c0c0c0;
  outline-offset: -5px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.9);
  color: #f0edf2;
}
.gothic-btn {
  background: #880808;
  color: #f0edf2;
  border: 1px solid #c0c0c0;
  font-family: serif;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}`,
    tailwindSnippet: `<div class="bg-stone-950 border border-red-800 p-6 text-stone-200 shadow-2xl font-serif">
  <button class="bg-red-900 border border-stone-400 text-white font-serif uppercase tracking-widest px-6 py-2 hover:bg-red-800">ENTER SANCTUARY</button>
</div>`
  },
  {
    id: "mixedmedia",
    name: "Mixed Media / Raw Collage",
    category: "Bold",
    cssClass: "style-mixedmedia",
    vibe: "Hand-drawn ink scribbles over halftone photos, ripped card stock, vivid acrylic marks",
    bestFit: "Modern creative agencies, indie record labels, creative workshops, experimental media",
    prompt: "Design a [project] in Mixed Media Raw Collage style: distressed paper layers, bold hand-drawn ink marker scribbles juxtaposed over monochromatic photography, vivid purple and vermilion acrylic paint strokes, bold industrial sans paired with raw gestural handwriting.",
    palette: ["#f4f1ea", "#e63946", "#7209b7", "#1d3557"],
    tags: ["mixed-media", "raw-collage", "ink-scribble", "acrylic", "expressive"],
    audioTone: "pop",
    cssSnippet: `.mixedmedia-card {
  background: #fbf9f4;
  border: 3px solid #1d3557;
  box-shadow: 8px 8px 0px #7209b7, -4px -4px 0px #e63946;
  color: #1d3557;
}
.mixedmedia-btn {
  background: #e63946;
  color: #ffffff;
  border: 2px solid #1d3557;
  box-shadow: 3px 3px 0px #7209b7;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}`,
    tailwindSnippet: `<div class="bg-amber-50 border-4 border-slate-900 shadow-[8px_8px_0px_#7e22ce] p-6 text-slate-900">
  <button class="bg-rose-600 text-white font-black uppercase px-6 py-2.5 border-2 border-slate-900 shadow-[4px_4px_0px_#1e293b]">CREATE COLLAGE</button>
</div>`
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STYLES_DATA };
}


