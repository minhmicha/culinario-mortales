<template>
  <div class="login-page">
    <div class="elegant-frame">
      <!-- Corner Accents -->
      <div class="corner-accent top-left"></div>
      <div class="corner-accent top-right"></div>
      <div class="corner-accent bottom-left"></div>
      <div class="corner-accent bottom-right"></div>
      
      <div class="login-content">
        <!-- Header with Icon -->
        <div class="hotel-icon-badge">
          <i class="fa-solid fa-lock"></i>
        </div>
        
      <h1 class="hotel-title">GRAND HOTEL FLORA</h1>
      <div class="title-line"></div>
      <p class="location-subtitle">Düsseldorf • 1962</p>
        
        <!-- Countdown if not yet unlocked -->
        <div v-if="!characterUnlocked" class="countdown-section">
          <CountdownTimer
            title="Das Grand Hotel öffnet seine Türen..."
            subtitle="Zur Stunde seiner Gründung im Jahre 1926"
            :getTimeFunction="getTimeUntilCharacterReveal"
            unlockedMessage="Die Türen sind geöffnet! 🎩"
          />
        </div>
        
        <!-- Login Form (only when unlocked) -->
        <div v-else class="login-form">
          <h2 class="form-title">Willkommen, werter Gast</h2>
          <p class="form-instruction">Bitte geben Sie Ihren persönlichen<br/>Zugangscode ein</p>
          
          <div class="input-group">
            <input
              v-model="code"
              type="text"
              placeholder="XXXXX-XXXX"
              @keyup.enter="handleLogin"
              :class="{ 'error': showError }"
              class="code-input"
            />
          </div>
          
          <div v-if="showError" class="error-alert">
            <i class="fa-solid fa-circle-exclamation"></i>
            <p class="error-text">
              Ungültiger Code.<br/>
              Bitte überprüfen Sie Ihre Eingabe.
            </p>
          </div>
          
          <button @click="handleLogin" class="primary-button">
            <i class="fa-solid fa-right-to-bracket"></i>
            <span>Eintreten</span>
          </button>
          
          <button @click="goBack" class="secondary-button">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Zurück</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import CountdownTimer from '@/components/CountdownTimer.vue'
import { isCharacterUnlocked, getTimeUntilCharacterReveal } from '@/utils/unlockDates'

const router = useRouter()
const { login } = useAuth()

const code = ref('')
const showError = ref(false)
const characterUnlocked = ref(isCharacterUnlocked())

// Update unlock status every second
let intervalId = null
onMounted(() => {
  intervalId = setInterval(() => {
    characterUnlocked.value = isCharacterUnlocked()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const handleLogin = () => {
  showError.value = false
  
  if (!code.value.trim()) {
    showError.value = true
    return
  }
  
  const success = login(code.value)
  
  if (success) {
    router.push('/dashboard')
  } else {
    showError.value = true
    code.value = ''
  }
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5dc 0%, #f0ead6 50%, #faf8f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

/* Elegant Frame */
.elegant-frame {
  position: relative;
  max-width: 580px;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border: 3px solid #d4af37;
  border-radius: 16px;
  box-shadow: 
    0 0 0 1px rgba(212, 175, 55, 0.3),
    0 20px 60px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 3rem 2.5rem;
  overflow: hidden;
}

/* Corner Accents */
.corner-accent {
  position: absolute;
  width: 25px;
  height: 25px;
  border: 2px solid #d4af37;
}

.corner-accent.top-left {
  top: 12px;
  left: 12px;
  border-right: none;
  border-bottom: none;
  border-radius: 4px 0 0 0;
}

.corner-accent.top-right {
  top: 12px;
  right: 12px;
  border-left: none;
  border-bottom: none;
  border-radius: 0 4px 0 0;
}

.corner-accent.bottom-left {
  bottom: 12px;
  left: 12px;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 4px;
}

.corner-accent.bottom-right {
  bottom: 12px;
  right: 12px;
  border-left: none;
  border-top: none;
  border-radius: 0 0 4px 0;
}

/* Content */
.login-content {
  text-align: center;
}

.hotel-icon-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  border-radius: 14px;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
  transition: transform 0.3s ease;
  animation: fadeInDown 0.6s ease-out;
}

.hotel-icon-badge:hover {
  transform: translateY(-2px) scale(1.05);
}

.hotel-icon-badge i {
  font-size: 2rem;
  color: #1a1a1a;
}

.hotel-title {
  font-family: 'Playfair Display', serif;
  font-size: 3.2rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 0.7rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(212, 175, 55, 0.1);
  animation: fadeInDown 0.6s ease-out 0.1s both;
}

.title-line {
  width: 180px;
  height: 2px;
  background: linear-gradient(to right, transparent 0%, #d4af37 50%, transparent 100%);
  margin: 1rem auto;
  animation: fadeIn 0.6s ease-out 0.2s both;
}

.location-subtitle {
  font-size: 1.15rem;
  color: #666;
  letter-spacing: 0.2rem;
  margin: 0 0 2.5rem 0;
  animation: fadeInUp 0.6s ease-out 0.3s both;
}

/* Countdown Section */
.countdown-section {
  margin-top: 2rem;
  width: 100%;
}

/* Login Form */
.login-form {
  margin: 0;
}

.form-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.75rem;
  color: #1a1a1a;
  margin: 0 0 0.75rem 0;
  font-weight: 600;
}

.form-instruction {
  font-size: 1rem;
  color: #666;
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

/* Input Group */
.input-group {
  margin-bottom: 1.5rem;
}

.code-input {
  width: 100%;
  padding: 1.1rem 1.5rem;
  font-size: 1.25rem;
  font-family: 'Playfair Display', serif;
  border: 2px solid #d4af37;
  border-radius: 10px;
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.code-input:focus {
  outline: none;
  border-color: #b8941f;
  box-shadow: 0 4px 16px rgba(212, 175, 55, 0.2);
  transform: translateY(-1px);
}

.code-input.error {
  border-color: #800020;
  animation: shake 0.5s;
}

/* Error Alert */
.error-alert {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  background: linear-gradient(135deg, rgba(128, 0, 32, 0.04) 0%, rgba(128, 0, 32, 0.06) 100%);
  border: 2px solid #800020;
  border-radius: 10px;
  padding: 1rem 1.2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(128, 0, 32, 0.1);
}

.error-alert i {
  color: #800020;
  font-size: 1.2rem;
  margin-top: 0.1rem;
}

.error-text {
  font-size: 0.95rem;
  color: #800020;
  margin: 0;
  line-height: 1.5;
  flex: 1;
}

/* Buttons */
.primary-button,
.secondary-button {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.1rem 2rem;
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  border-radius: 10px;
  margin-bottom: 0.75rem;
}

.primary-button {
  color: #1a1a1a;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
}

.primary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(212, 175, 55, 0.4);
  background: linear-gradient(135deg, #f4d03f 0%, #d4af37 100%);
}

.primary-button i {
  font-size: 1.15rem;
}

.secondary-button {
  color: #666;
  background: transparent;
  border: 2px solid rgba(0, 0, 0, 0.1);
}

.secondary-button:hover {
  border-color: #d4af37;
  color: #d4af37;
  background: rgba(212, 175, 55, 0.05);
}

.secondary-button i {
  font-size: 1rem;
}

/* Animations */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
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

/* Responsive Design */
@media (max-width: 768px) {
  .login-page {
    padding: 2rem 1rem;
  }
  
  .elegant-frame {
    padding: 2.5rem 2rem;
    border-width: 2px;
    border-radius: 12px;
  }
  
  .corner-accent {
    width: 20px;
    height: 20px;
  }
  
  .corner-accent.top-left,
  .corner-accent.top-right {
    top: 10px;
  }
  
  .corner-accent.bottom-left,
  .corner-accent.bottom-right {
    bottom: 10px;
  }
  
  .corner-accent.top-left,
  .corner-accent.bottom-left {
    left: 10px;
  }
  
  .corner-accent.top-right,
  .corner-accent.bottom-right {
    right: 10px;
  }
  
  .hotel-icon-badge {
    width: 58px;
    height: 58px;
    margin-bottom: 1.3rem;
  }
  
  .hotel-icon-badge i {
    font-size: 1.8rem;
  }
  
  .hotel-title {
    font-size: 2.5rem;
    letter-spacing: 0.5rem;
  }
  
  .title-line {
    width: 150px;
  }
  
  .location-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .form-title {
    font-size: 1.6rem;
    margin-bottom: 0.75rem;
  }
  
  .form-instruction {
    font-size: 1rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }
  
  .input-group {
    margin-bottom: 1.5rem;
  }
  
  .code-input {
    font-size: 1.2rem;
    padding: 1.15rem 1.5rem;
    letter-spacing: 0.25rem;
  }
  
  .error-alert {
    padding: 1.1rem 1.3rem;
    margin-bottom: 1.5rem;
  }
  
  .primary-button,
  .secondary-button {
    padding: 1.2rem 2rem;
    font-size: 1.08rem;
    margin-bottom: 0.9rem;
    min-height: 56px;
  }
  
  .primary-button i,
  .secondary-button i {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 1.5rem 1rem;
  }
  
  .elegant-frame {
    padding: 2rem 1.5rem;
  }
  
  .hotel-icon-badge {
    width: 56px;
    height: 56px;
    margin-bottom: 1.2rem;
  }
  
  .hotel-icon-badge i {
    font-size: 1.7rem;
  }
  
  .hotel-title {
    font-size: 2.2rem;
    letter-spacing: 0.25rem;
  }
  
  .title-line {
    width: 120px;
    margin: 0.9rem auto;
  }
  
  .location-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .form-title {
    font-size: 1.5rem;
    margin-bottom: 0.7rem;
    line-height: 1.3;
  }
  
  .form-instruction {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.8rem;
  }
  
  .input-group {
    margin-bottom: 1.35rem;
  }
  
  .code-input {
    font-size: 1.2rem;
    padding: 1.15rem 1.4rem;
    letter-spacing: 0.22rem;
    min-height: 56px;
  }
  
  .error-alert {
    padding: 1rem 1.2rem;
    gap: 0.7rem;
    margin-bottom: 1.4rem;
  }
  
  .error-alert i {
    font-size: 1.3rem;
  }
  
  .error-text {
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .primary-button,
  .secondary-button {
    padding: 1.15rem 1.8rem;
    font-size: 1.05rem;
    margin-bottom: 0.8rem;
    min-height: 56px;
  }
  
  .primary-button i,
  .secondary-button i {
    font-size: 1.25rem;
  }
  
  .countdown-section {
    margin-top: 1.5rem;
  }
}

</style>

