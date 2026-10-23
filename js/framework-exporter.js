/**
 * Design Atlas — Multi-Framework Code Exporter
 * Generates ready-to-run component files for React + Tailwind, Vue 3, Svelte 5, and HTML.
 */

class FrameworkExporter {
  static generateReact(style) {
    const compName = style.name.replace(/[^a-zA-Z0-9]/g, '');
    return `import React, { useState } from 'react';

/**
 * ${style.name} Component
 * Design Language: ${style.category}
 * Vibe: ${style.vibe}
 */
export default function ${compName}Card({ title = "${style.name}", metric = "$24,500" }) {
  const [active, setActive] = useState(false);

  return (
    <div className="${style.cssClass} rounded-2xl p-6 transition-all shadow-xl max-w-md border">
      <div className="flex items-center justify-between pb-4 border-b border-current/20">
        <span className="text-xs font-bold uppercase tracking-wider opacity-80">${style.category}</span>
        <span className="text-[10px] px-2 py-0.5 rounded-full border border-current font-mono">LIVE</span>
      </div>

      <div className="my-6">
        <h3 className="text-lg font-black tracking-tight">{title}</h3>
        <p className="text-3xl font-extrabold mt-1">{metric}</p>
        <p className="text-xs opacity-75 mt-1">${style.vibe}</p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-current/20">
        <input 
          type="text" 
          placeholder="Enter value..."
          className="demo-input px-3 py-1.5 text-xs rounded-lg flex-1 outline-none"
        />
        <button 
          onClick={() => setActive(!active)}
          className="demo-btn px-4 py-2 text-xs font-bold rounded-lg transition active:scale-95"
        >
          {active ? 'Active' : 'Trigger Action'}
        </button>
      </div>
    </div>
  );
}`;
  }

  static generateVue(style) {
    return `<template>
  <div :class="['${style.cssClass}', 'rounded-2xl p-6 transition-all shadow-xl max-w-md border']">
    <div class="flex items-center justify-between pb-4 border-b border-current/20">
      <span class="text-xs font-bold uppercase tracking-wider opacity-80">${style.category}</span>
      <span class="text-[10px] px-2 py-0.5 rounded-full border border-current font-mono">VUE 3</span>
    </div>

    <div class="my-6">
      <h3 class="text-lg font-black tracking-tight">{{ title }}</h3>
      <p class="text-3xl font-extrabold mt-1">{{ metric }}</p>
      <p class="text-xs opacity-75 mt-1">${style.vibe}</p>
    </div>

    <div class="flex items-center gap-3 pt-4 border-t border-current/20">
      <input 
        v-model="inputValue" 
        placeholder="Enter value..."
        class="demo-input px-3 py-1.5 text-xs rounded-lg flex-1 outline-none"
      />
      <button 
        @click="isActive = !isActive"
        class="demo-btn px-4 py-2 text-xs font-bold rounded-lg transition active:scale-95"
      >
        {{ isActive ? 'Confirmed' : 'Execute' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: { type: String, default: '${style.name}' },
  metric: { type: String, default: '$24,500' }
});

const inputValue = ref('');
const isActive = ref(false);
</script>`;
  }

  static generateSvelte(style) {
    return `<script>
  let { title = '${style.name}', metric = '$24,500' } = $props();
  let inputValue = $state('');
  let isActive = $state(false);
</script>

<div class="${style.cssClass} rounded-2xl p-6 transition-all shadow-xl max-w-md border">
  <div class="flex items-center justify-between pb-4 border-b border-current/20">
    <span class="text-xs font-bold uppercase tracking-wider opacity-80">${style.category}</span>
    <span class="text-[10px] px-2 py-0.5 rounded-full border border-current font-mono">SVELTE 5</span>
  </div>

  <div class="my-6">
    <h3 class="text-lg font-black tracking-tight">{title}</h3>
    <p class="text-3xl font-extrabold mt-1">{metric}</p>
    <p class="text-xs opacity-75 mt-1">${style.vibe}</p>
  </div>

  <div class="flex items-center gap-3 pt-4 border-t border-current/20">
    <input 
      bind:value={inputValue}
      placeholder="Enter value..."
      class="demo-input px-3 py-1.5 text-xs rounded-lg flex-1 outline-none"
    />
    <button 
      onclick={() => isActive = !isActive}
      class="demo-btn px-4 py-2 text-xs font-bold rounded-lg transition active:scale-95"
    >
      {isActive ? 'Confirmed' : 'Execute'}
    </button>
  </div>
</div>`;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FrameworkExporter };
}
