<template>
  <div class="login-page">
    <div class="login-container">
      <div class="hotel-logo">
        <div class="logo-icon">🏛️</div>
        <h1>GRAND HOTEL</h1>
        <p class="tagline">New York, 1962</p>
      </div>
      
      <div class="login-form">
        <h2>Willkommen, werter Gast</h2>
        <p class="instruction">Bitte geben Sie Ihren persönlichen Zugangscode ein</p>
        
        <div class="input-group">
          <input
            v-model="code"
            type="text"
            placeholder="XXXXX-XXXX"
            @keyup.enter="handleLogin"
            :class="{ 'error': showError }"
            class="code-input"
          />
          <span class="input-icon">🔑</span>
        </div>
        
        <div v-if="showError" class="error-message">
          <span class="error-icon">⚠️</span>
          Ungültiger Code. Bitte überprüfen Sie Ihre Eingabe.
        </div>
        
        <button @click="handleLogin" class="login-button">
          Eintreten
        </button>
        
        <button @click="goBack" class="back-button">
          ← Zurück
        </button>
      </div>
      
      <div class="decorative-line"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const code = ref('')
const showError = ref(false)

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
  background: linear-gradient(135deg, #e8c4c4 0%, #f5e5e5 50%, #d4a5a5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  max-width: 500px;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  border: 3px solid #d4af37;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.hotel-logo {
  text-align: center;
  margin-bottom: 2.5rem;
}

.logo-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.hotel-logo h1 {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: 0.3rem;
}

.tagline {
  font-size: 1rem;
  color: #d4af37;
  font-style: italic;
  margin-top: 0.5rem;
}

.login-form h2 {
  font-family: 'Playfair Display', serif;
  color: #1a1a1a;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  text-align: center;
}

.instruction {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.input-group {
  position: relative;
  margin-bottom: 1rem;
}

.code-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 1.1rem;
  border: 2px solid #d4af37;
  border-radius: 10px;
  background: white;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.code-input:focus {
  outline: none;
  border-color: #d4af37;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
}

.code-input.error {
  border-color: #800020;
  animation: shake 0.5s;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  pointer-events: none;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #800020;
  background: rgba(128, 0, 32, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.error-icon {
  font-size: 1.2rem;
}

.login-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  color: #1a1a1a;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
}

.back-button {
  width: 100%;
  padding: 0.75rem;
  background: transparent;
  color: #666;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.back-button:hover {
  border-color: #d4af37;
  color: #d4af37;
}

.decorative-line {
  margin-top: 2rem;
  height: 3px;
  background: linear-gradient(90deg, transparent, #d4af37, transparent);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

@media (max-width: 768px) {
  .login-container {
    padding: 2rem 1.5rem;
  }
  
  .hotel-logo h1 {
    font-size: 2rem;
    letter-spacing: 0.2rem;
  }
}
</style>

