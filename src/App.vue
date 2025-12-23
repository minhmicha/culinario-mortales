<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
/* Optimized font loading with display=swap */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Rosa/Pink Theme */
  --pink-primary: #e8c4c4;
  --pink-light: #f5e5e5;
  --pink-accent: #d4a5a5;
  
  /* Gold & Cream */
  --gold: #d4af37;
  --gold-light: #f4d03f;
  --cream: #f5f5dc;
  
  /* Neutrals */
  --black: #1a1a1a;
  --gray-dark: #2c2c2c;
  --gray: #666;
  --gray-light: #ddd;
  
  /* Accent Colors */
  --burgundy: #800020;
}

body {
  font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--pink-primary);
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
  will-change: auto;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

/* Custom scrollbar - hide on mobile for better UX */
@media (min-width: 769px) {
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--pink-light);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gold);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--gold-light);
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  body {
    font-size: 16px; /* Prevent zoom on iOS */
  }
  
  /* Hide scrollbar on mobile */
  ::-webkit-scrollbar {
    display: none;
  }
  
  * {
    -webkit-tap-highlight-color: rgba(212, 175, 55, 0.2);
  }
}

/* Performance: GPU acceleration for animations */
.notification-button,
.notification-panel,
button,
a {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>
