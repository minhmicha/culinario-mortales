<template>
  <div class="landing-page">
    <div class="content-wrapper">
      <div class="hotel-emblem">🏛️</div>
      
      <h1 class="hotel-title">GRAND HOTEL</h1>
      <div class="subtitle">New York, August 1962</div>
      
      <div class="intro-text">
        <p>Willkommen zur glamourösen Eröffnungsfeier des</p>
        <p>größten Luxushotels der Vereinigten Staaten.</p>
      </div>
      
      <div class="event-badge">
        <span class="badge-icon">🎭</span>
        <span>Ein Culinario Mortale Krimi-Dinner</span>
      </div>
      
      <div class="mystery-hint">
        Doch der Abend nimmt eine tragische Wendung...<br/>
        Die junge Schauspielerin <strong>Monique Moreau</strong> wird tot aufgefunden.
      </div>
      
      <button @click="goToLogin" class="cta-button">
        <span class="button-icon">🔑</span>
        Mit Code einloggen
      </button>
      
      <div class="art-deco-border"></div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #e8c4c4 0%, #f5e5e5 50%, #d4a5a5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.landing-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px);
  pointer-events: none;
}

.content-wrapper {
  max-width: 600px;
  text-align: center;
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.7);
  padding: 3rem 2rem;
  border-radius: 20px;
  border: 3px solid #d4af37;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.hotel-emblem {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: fadeInDown 1s ease-out;
}

.hotel-title {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: 0.5rem;
  text-shadow: 2px 2px 4px rgba(212, 175, 55, 0.3);
  animation: fadeInDown 1s ease-out 0.2s both;
}

.subtitle {
  font-size: 1.5rem;
  color: #d4af37;
  margin: 1rem 0 2rem;
  font-style: italic;
  animation: fadeInDown 1s ease-out 0.4s both;
}

.intro-text {
  margin: 2rem 0;
  font-size: 1.1rem;
  color: #2c2c2c;
  line-height: 1.6;
  animation: fadeIn 1s ease-out 0.6s both;
}

.event-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #1a1a1a;
  color: #f5f5dc;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  margin: 1.5rem 0;
  font-size: 1rem;
  animation: fadeIn 1s ease-out 0.8s both;
}

.badge-icon {
  font-size: 1.5rem;
}

.mystery-hint {
  margin: 2rem 0;
  padding: 1.5rem;
  background: rgba(26, 26, 26, 0.05);
  border-left: 4px solid #800020;
  border-radius: 8px;
  font-size: 1rem;
  color: #2c2c2c;
  line-height: 1.6;
  animation: fadeIn 1s ease-out 1s both;
}

.mystery-hint strong {
  color: #800020;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  color: #1a1a1a;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
  margin-top: 2rem;
  animation: fadeInUp 1s ease-out 1.2s both;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
}

.button-icon {
  font-size: 1.5rem;
}

.art-deco-border {
  margin-top: 2rem;
  height: 4px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
  animation: fadeIn 1s ease-out 1.4s both;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 768px) {
  .hotel-title {
    font-size: 2.5rem;
    letter-spacing: 0.3rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
  
  .intro-text {
    font-size: 1rem;
  }
  
  .content-wrapper {
    padding: 2rem 1.5rem;
  }
}
</style>

