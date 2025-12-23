<template>
  <div class="dashboard-page">
    <div class="dashboard-container">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="hotel-logo-small">
          🏛️ <span>GRAND HOTEL</span>
        </div>
        <button @click="handleLogout" class="logout-button">
          Abmelden
        </button>
      </header>
      
      <!-- Welcome Section -->
      <div class="welcome-section">
        <h1 class="welcome-title">
          Willkommen{{ currentUser.guestName ? ', ' + currentUser.guestName : '' }}!
        </h1>
        <div class="event-info">
          <div class="info-item">
            <span class="icon">📍</span>
            <span>New York Grand Hotel</span>
          </div>
          <div class="info-item">
            <span class="icon">📅</span>
            <span>August 1962</span>
          </div>
          <div class="info-item">
            <span class="icon">👔</span>
            <span>Dresscode: 1920er Stil</span>
          </div>
        </div>
      </div>
      
      <!-- Character Card -->
      <CharacterCard
        :character="currentUser.character"
        :culinarioLink="currentUser.culinarioLink"
      />
      
      <!-- Spotify Player -->
      <SpotifyPlayer />
      
      <!-- Timeline Toggle -->
      <div class="section-header">
        <button @click="toggleTimeline" class="toggle-button">
          <span class="icon">{{ showTimeline ? '▼' : '▶' }}</span>
          <span>Ablaufplan {{ showTimeline ? 'verbergen' : 'anzeigen' }}</span>
        </button>
      </div>
      
      <!-- Timeline (collapsible) -->
      <transition name="slide-fade">
        <TimelineView v-if="showTimeline" />
      </transition>
      
      <!-- Footer -->
      <footer class="dashboard-footer">
        <p>Ein unvergesslicher Abend erwartet dich... 🎭</p>
        <p class="small-text">Viel Erfolg bei den Ermittlungen!</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import CharacterCard from '@/components/CharacterCard.vue'
import SpotifyPlayer from '@/components/SpotifyPlayer.vue'
import TimelineView from '@/components/TimelineView.vue'

const router = useRouter()
const { currentUser, logout, restoreSession } = useAuth()

const showTimeline = ref(false)

onMounted(() => {
  // Restore session if available
  if (!currentUser.value) {
    const restored = restoreSession()
    if (!restored) {
      router.push('/login')
    }
  }
})

const toggleTimeline = () => {
  showTimeline.value = !showTimeline.value
}

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #e8c4c4 0%, #f5e5e5 50%, #d4a5a5 100%);
  padding: 2rem 1rem;
}

.dashboard-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  border: 2px solid #d4af37;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.hotel-logo-small {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
}

.hotel-logo-small span {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: #1a1a1a;
  letter-spacing: 0.1rem;
}

.logout-button {
  padding: 0.5rem 1.5rem;
  background: transparent;
  color: #666;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.logout-button:hover {
  border-color: #d4af37;
  color: #d4af37;
}

.welcome-section {
  background: rgba(26, 26, 26, 0.9);
  padding: 2rem;
  border-radius: 20px;
  border: 3px solid #d4af37;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.welcome-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #f5f5dc;
  margin: 0 0 1.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.event-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f5f5dc;
  font-size: 1rem;
}

.info-item .icon {
  font-size: 1.2rem;
}

.section-header {
  display: flex;
  justify-content: center;
}

.toggle-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: white;
  color: #1a1a1a;
  border: 2px solid #d4af37;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 500;
}

.toggle-button:hover {
  background: #d4af37;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
}

.dashboard-footer {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  border: 2px solid rgba(212, 175, 55, 0.3);
}

.dashboard-footer p {
  margin: 0.5rem 0;
  color: #1a1a1a;
  font-size: 1.1rem;
}

.small-text {
  font-size: 0.9rem !important;
  color: #666 !important;
  font-style: italic;
}

/* Transition for timeline */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 1rem 0.5rem;
  }
  
  .hotel-logo-small span {
    font-size: 1rem;
    letter-spacing: 0.05rem;
  }
  
  .welcome-title {
    font-size: 1.8rem;
  }
  
  .event-info {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>

