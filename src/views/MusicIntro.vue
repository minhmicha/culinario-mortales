<template>
  <div class="music-intro">
    <div class="backdrop"></div>
    
    <div class="intro-content">
      <div class="hotel-icon">🎭</div>
      <h1 class="intro-title">GRAND HOTEL</h1>
      <p class="intro-subtitle">New York, August 1962</p>
      
      <div class="music-prompt">
        <p class="prompt-text">Möchtest du mit atmosphärischer Musik starten?</p>
        
        <div class="button-group">
          <button @click="startWithMusic" class="music-btn with-music">
            <span class="btn-icon">🎵</span>
            <span>Mit Musik</span>
          </button>
          
          <button @click="startWithoutMusic" class="music-btn without-music">
            <span class="btn-icon">🔇</span>
            <span>Ohne Musik</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startWithMusic = () => {
  // Speichere Musik-Präferenz
  localStorage.setItem('musicEnabled', 'true')
  router.push('/')
}

const startWithoutMusic = () => {
  // Speichere Musik-Präferenz
  localStorage.setItem('musicEnabled', 'false')
  router.push('/')
}
</script>

<style scoped>
.music-intro {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(26, 26, 26, 0.95) 0%, 
    rgba(44, 44, 44, 0.95) 50%, 
    rgba(26, 26, 26, 0.95) 100%
  );
  backdrop-filter: blur(10px);
  z-index: 0;
}

.intro-content {
  position: relative;
  z-index: 1;
  text-align: center;
  animation: fadeIn 0.8s ease-out;
}

.hotel-icon {
  font-size: 6rem;
  margin-bottom: 1.5rem;
  animation: scaleIn 0.6s ease-out 0.2s both;
}

.intro-title {
  font-family: 'Playfair Display', serif;
  font-size: 5rem;
  color: #f5f5dc;
  margin: 0 0 1rem 0;
  letter-spacing: 1rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.intro-subtitle {
  font-size: 1.8rem;
  color: #d4af37;
  font-style: italic;
  margin: 0 0 4rem 0;
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.music-prompt {
  animation: fadeInUp 0.8s ease-out 0.8s both;
}

.prompt-text {
  font-size: 1.3rem;
  color: #f5f5dc;
  margin: 0 0 2rem 0;
}

.button-group {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.music-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  border: 3px solid;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Lato', sans-serif;
}

.music-btn.with-music {
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  color: #1a1a1a;
  border-color: #d4af37;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
}

.music-btn.with-music:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(212, 175, 55, 0.6);
}

.music-btn.without-music {
  background: transparent;
  color: #f5f5dc;
  border-color: #f5f5dc;
}

.music-btn.without-music:hover {
  background: rgba(245, 245, 220, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(245, 245, 220, 0.2);
}

.btn-icon {
  font-size: 1.8rem;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
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

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Mobile */
@media (max-width: 768px) {
  .hotel-icon {
    font-size: 4rem;
  }
  
  .intro-title {
    font-size: 3rem;
    letter-spacing: 0.5rem;
  }
  
  .intro-subtitle {
    font-size: 1.3rem;
    margin-bottom: 3rem;
  }
  
  .prompt-text {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
  
  .button-group {
    flex-direction: column;
    padding: 0 1rem;
  }
  
  .music-btn {
    width: 100%;
    justify-content: center;
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .hotel-icon {
    font-size: 3rem;
  }
  
  .intro-title {
    font-size: 2.5rem;
    letter-spacing: 0.3rem;
  }
  
  .intro-subtitle {
    font-size: 1.1rem;
  }
  
  .prompt-text {
    font-size: 1rem;
  }
  
  .music-btn {
    font-size: 1rem;
    padding: 0.9rem 1.5rem;
  }
  
  .btn-icon {
    font-size: 1.5rem;
  }
}
</style>


