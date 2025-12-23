<template>
  <div class="countdown-container">
    <div v-if="timeRemaining" class="countdown">
      <div class="countdown-header">
        <h2 class="countdown-title">{{ title }}</h2>
        <p class="countdown-subtitle">{{ subtitle }}</p>
      </div>
      
      <div class="countdown-display">
        <div class="time-unit">
          <div class="time-value">{{ timeRemaining.days }}</div>
          <div class="time-label">TAGE</div>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
          <div class="time-value">{{ pad(timeRemaining.hours) }}</div>
          <div class="time-label">STUNDEN</div>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
          <div class="time-value">{{ pad(timeRemaining.minutes) }}</div>
          <div class="time-label">MINUTEN</div>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
          <div class="time-value">{{ pad(timeRemaining.seconds) }}</div>
          <div class="time-label">SEKUNDEN</div>
        </div>
      </div>
    </div>
    
    <div v-else class="countdown-unlocked">
      <div class="unlocked-icon">🎉</div>
      <h3>{{ unlockedMessage }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  getTimeFunction: {
    type: Function,
    required: true
  },
  unlockedMessage: {
    type: String,
    default: 'Freigeschaltet!'
  }
})

const timeRemaining = ref(null)
let intervalId = null

const updateCountdown = () => {
  timeRemaining.value = props.getTimeFunction()
}

const pad = (num) => {
  return String(num).padStart(2, '0')
}

onMounted(() => {
  updateCountdown()
  intervalId = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.countdown-container {
  width: 100%;
}

.countdown {
  background: rgba(255, 255, 255, 0.6);
  border: 2px solid #d4af37;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.countdown-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.countdown-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: #1a1a1a;
  margin: 0 0 0.75rem 0;
  font-weight: 600;
  line-height: 1.3;
}

.countdown-subtitle {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  color: #888;
  margin: 0;
  font-style: italic;
  font-weight: 400;
}

.countdown-display {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto;
  justify-content: center;
  align-items: center;
  gap: 0.5rem 0.75rem;
  max-width: 600px;
  margin: 0 auto;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 70px;
}

.time-value {
  font-family: 'Playfair Display', serif;
  font-size: 2.75rem;
  font-weight: 600;
  color: #d4af37;
  line-height: 1;
  margin-bottom: 0.4rem;
}

.time-label {
  font-family: 'Lato', sans-serif;
  font-size: 0.7rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.12rem;
  font-weight: 500;
}

.time-separator {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #d4af37;
  font-weight: 400;
  line-height: 1;
  align-self: center;
  padding-bottom: 1.2rem;
}

.countdown-unlocked {
  text-align: center;
  padding: 2.5rem 2rem;
  background: rgba(212, 175, 55, 0.08);
  border: 2px solid #d4af37;
  border-radius: 16px;
}

.unlocked-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from { 
    opacity: 0;
    transform: scale(0.8);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}

.countdown-unlocked h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #1a1a1a;
  margin: 0;
  font-weight: 600;
  line-height: 1.3;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .countdown {
    padding: 2rem 1.5rem;
  }

  .countdown-header {
    margin-bottom: 2rem;
  }

  .countdown-title {
    font-size: 1.5rem;
    line-height: 1.3;
  }

  .countdown-subtitle {
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .countdown-display {
    gap: 0.4rem 0.6rem;
  }

  .time-unit {
    min-width: 58px;
  }

  .time-value {
    font-size: 2.2rem;
    margin-bottom: 0.3rem;
  }

  .time-label {
    font-size: 0.65rem;
    letter-spacing: 0.08rem;
  }

  .time-separator {
    font-size: 1.8rem;
    padding-bottom: 1rem;
  }
  
  .countdown-unlocked {
    padding: 2.5rem 1.5rem;
  }
  
  .unlocked-icon {
    font-size: 3.5rem;
  }
  
  .countdown-unlocked h3 {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .countdown {
    padding: 1.8rem 1.2rem;
  }

  .countdown-header {
    margin-bottom: 1.8rem;
  }

  .countdown-title {
    font-size: 1.35rem;
    line-height: 1.3;
  }

  .countdown-subtitle {
    font-size: 0.9rem;
    line-height: 1.4;
  }

  .countdown-display {
    gap: 0.35rem 0.5rem;
  }

  .time-unit {
    min-width: 50px;
  }

  .time-value {
    font-size: 1.9rem;
    margin-bottom: 0.25rem;
  }

  .time-label {
    font-size: 0.6rem;
    letter-spacing: 0.06rem;
  }

  .time-separator {
    font-size: 1.5rem;
    padding-bottom: 0.9rem;
  }
  
  .countdown-unlocked {
    padding: 2rem 1.2rem;
  }
  
  .unlocked-icon {
    font-size: 3rem;
    margin-bottom: 0.8rem;
  }
  
  .countdown-unlocked h3 {
    font-size: 1.2rem;
    line-height: 1.3;
  }
}
</style>

