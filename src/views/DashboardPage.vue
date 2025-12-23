<template>
  <div class="dashboard-page">
    <!-- Lobby Background -->
    <div class="lobby-background"></div>
    
    <!-- Notification Center -->
    <NotificationCenter 
      :personalMessage="currentUser?.personalMessage"
      :partnerHint="currentUser?.partnerHint"
      :techWarning="currentUser?.techWarning"
    />
    
    <div class="dashboard-container">
      <!-- Grand Hotel Header/Reception -->
      <header class="hotel-reception">
        <div class="reception-content">
          <div class="hotel-emblem">
            <i class="fa-solid fa-building-columns"></i>
            <span class="hotel-title">GRAND HOTEL FLORA</span>
          </div>
          <button @click="handleLogout" class="logout-button">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Abmelden</span>
          </button>
        </div>
      </header>
      
      <!-- Welcome Card -->
      <div class="welcome-card">
        <!-- Decorative Top Border -->
        <div class="decorative-border-top">
          <div class="border-ornament"></div>
          <div class="border-line"></div>
          <div class="border-ornament"></div>
        </div>
        
        <div class="welcome-icon">
          <i class="fa-solid fa-key"></i>
        </div>
        
        <h1 class="guest-welcome">
          <span class="welcome-prefix">Willkommen</span>
          <span class="guest-name" v-if="currentUser.guestName">{{ currentUser.guestName }}</span>
        </h1>
        
        <p class="welcome-subtitle">im Grand Hotel Flora, Unterbilk</p>
        
        <!-- Elegant Info Grid -->
        <div class="event-info">
          <div class="info-item location-item">
            <div class="info-icon-wrapper">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <div class="info-content">
              <div class="info-label">Anschrift</div>
              <div class="info-main">Florastraße 25</div>
              <div class="info-sub">40216 Düsseldorf</div>
              <div class="info-detail">Klingel: Nguyen + Valentin-Stiebale</div>
            </div>
          </div>
          
          <div class="info-row">
            <div class="info-item compact-item">
              <div class="info-icon-wrapper">
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <div class="info-content">
                <div class="info-label">Zeitraum</div>
                <div class="info-value">August 1962</div>
              </div>
            </div>
            
            <div class="info-item compact-item">
              <div class="info-icon-wrapper">
                <i class="fa-solid fa-user-tie"></i>
              </div>
              <div class="info-content">
                <div class="info-label">Kleiderordnung</div>
                <div class="info-value">1960er Abendgarderobe</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Decorative Bottom Border -->
        <div class="decorative-border-bottom">
          <div class="border-ornament"></div>
          <div class="border-line"></div>
          <div class="border-ornament"></div>
        </div>
      </div>
      
      <!-- Navigation Tabs (Lobby Concierge Style) -->
      <nav class="concierge-nav">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="concierge-button"
          :class="{ active: activeTab === tab.id }"
        >
          <i :class="tab.icon"></i>
          <span>{{ tab.label }}</span>
        </button>
      </nav>
      
      <!-- Content Cards -->
      <div class="content-wrapper">
        <transition name="fade" mode="out-in">
          <!-- Character Tab -->
          <div v-if="activeTab === 'character'" key="character" class="content-card">
            <CharacterCard :character="currentUser.character" />
          </div>
          
          <!-- Timeline Tab -->
          <div v-else-if="activeTab === 'timeline'" key="timeline" class="content-card">
            <h2 class="card-title">
              <i class="fa-solid fa-clock"></i>
              Ablaufplan
            </h2>
            <TimelineView />
          </div>
          
          <!-- Menu Tab -->
          <div v-else-if="activeTab === 'menu'" key="menu" class="content-card">
            <h2 class="card-title">
              <i class="fa-solid fa-utensils"></i>
              Unser Menü
            </h2>
            
            <div class="menu-items">
              <div class="menu-item">
                <div class="course-label">Vorspeise</div>
                <div class="dish-name pending">wird noch bekanntgegeben</div>
                <div class="dish-responsibility">
                  <i class="fa-solid fa-user-chef"></i>
                  Verantwortlich: Alex & Merle
                </div>
              </div>
              
              <div class="menu-divider"></div>
              
              <div class="menu-item">
                <div class="course-label">Hauptgang</div>
                <div class="dish-name">Vegane Gänsekeulen</div>
                <div class="dish-accompaniment">mit Kartoffelklößen & Bratensauce</div>
                <div class="dish-note">(glutenfrei)</div>
                <div class="dish-responsibility">
                  <i class="fa-solid fa-user-chef"></i>
                  Verantwortlich: Shireen & Micha
                </div>
              </div>
              
              <div class="menu-divider"></div>
              
              <div class="menu-item">
                <div class="course-label">Dessert</div>
                <div class="dish-name">Panettone</div>
                <div class="dish-accompaniment">mit Mascarpone-Creme</div>
                <div class="dish-responsibility">
                  <i class="fa-solid fa-user-chef"></i>
                  Verantwortlich: Ani & Matteo
                </div>
              </div>
            </div>
          </div>
          
          <!-- Music Tab -->
          <div v-else-if="activeTab === 'music'" key="music" class="content-card">
            <h2 class="card-title">
              <i class="fa-solid fa-music"></i>
              Atmosphärische Musik
            </h2>
            <SpotifyPlayer />
          </div>
        </transition>
      </div>
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
import NotificationCenter from '@/components/NotificationCenter.vue'

const router = useRouter()
const { currentUser, logout, restoreSession } = useAuth()

// Tab Navigation
const activeTab = ref('character')

const tabs = [
  { id: 'character', label: 'Dein Charakter', icon: 'fa-solid fa-masks-theater' },
  { id: 'timeline', label: 'Ablaufplan', icon: 'fa-solid fa-clock' },
  { id: 'menu', label: 'Menü', icon: 'fa-solid fa-utensils' },
  { id: 'music', label: 'Musik', icon: 'fa-solid fa-music' }
]

onMounted(() => {
  // Restore session if available
  if (!currentUser.value) {
    const restored = restoreSession()
    if (!restored) {
      router.push('/login')
    }
  }
})

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5dc 0%, #f0ead6 50%, #faf8f5 100%);
  padding: 2rem 1rem;
  position: relative;
}

/* Lobby Background */
.lobby-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at top right, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
    radial-gradient(circle at bottom left, rgba(212, 175, 55, 0.03) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.dashboard-container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

/* Hotel Reception Header */
.hotel-reception {
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.95) 0%, 
      rgba(252, 252, 250, 0.95) 50%,
      rgba(255, 255, 255, 0.95) 100%
    );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 16px;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 8px 24px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.02);
  padding: 1.8rem 2.5rem;
  position: relative;
  overflow: hidden;
}

.hotel-reception::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.008) 2px,
      rgba(0, 0, 0, 0.008) 4px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.008) 2px,
      rgba(0, 0, 0, 0.008) 4px
    );
  pointer-events: none;
  opacity: 0.5;
}

.reception-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hotel-emblem {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.hotel-emblem i {
  font-size: 2rem;
  color: #d4af37;
}

.hotel-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 0.3rem;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1.5rem;
  background: transparent;
  color: #666;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logout-button:hover {
  border-color: #d4af37;
  color: #d4af37;
  background: rgba(212, 175, 55, 0.05);
}

/* Welcome Card */
.welcome-card {
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.98) 0%, 
      rgba(252, 252, 250, 0.98) 50%,
      rgba(255, 255, 255, 0.98) 100%
    );
  backdrop-filter: blur(10px);
  border: 2px solid rgba(212, 175, 55, 0.4);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  text-align: center;
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.08),
    0 12px 40px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 1),
    inset 0 -1px 0 rgba(212, 175, 55, 0.1);
  position: relative;
  overflow: hidden;
}

.welcome-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.008) 2px,
      rgba(0, 0, 0, 0.008) 4px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.008) 2px,
      rgba(0, 0, 0, 0.008) 4px
    );
  pointer-events: none;
  opacity: 0.5;
}

/* Decorative Borders */
.decorative-border-top,
.decorative-border-bottom {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.decorative-border-bottom {
  margin-bottom: 0;
  margin-top: 2rem;
}

.border-ornament {
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  transform: rotate(45deg);
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.4);
}

.border-line {
  flex: 1;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%,
    rgba(212, 175, 55, 0.3) 20%,
    rgba(212, 175, 55, 0.6) 50%,
    rgba(212, 175, 55, 0.3) 80%,
    transparent 100%
  );
}

/* Welcome Icon */
.welcome-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  border-radius: 50%;
  margin-bottom: 1.5rem;
  box-shadow: 
    0 8px 24px rgba(212, 175, 55, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 1;
}

.welcome-icon i {
  font-size: 2rem;
  color: #1a1a1a;
}

/* Welcome Text */
.guest-welcome {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.75rem 0;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.welcome-prefix {
  font-size: 1.5rem;
  font-weight: 400;
  color: #666;
  letter-spacing: 0.1rem;
}

.guest-name {
  font-size: 3rem;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.05rem;
}

.welcome-subtitle {
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  color: #666;
  font-style: italic;
  margin: 0 0 2.5rem 0;
  position: relative;
  z-index: 1;
}

/* Personal Message */
.personal-message {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(244, 208, 63, 0.05) 100%);
  border-left: 4px solid #d4af37;
  border-radius: 8px;
  padding: 1.2rem 1.5rem;
  margin: 1.5rem 0 2rem 0;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
  z-index: 1;
  text-align: left;
}

.personal-message i {
  font-size: 1.3rem;
  color: #d4af37;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.personal-message p {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  margin: 0;
}

/* Partner Hint (Game Rule Warning) */
.partner-hint {
  background: linear-gradient(135deg, rgba(255, 87, 51, 0.08) 0%, rgba(255, 120, 71, 0.05) 100%);
  border-left: 4px solid #ff5733;
  border-radius: 8px;
  padding: 1.2rem 1.5rem;
  margin: 1rem 0 2rem 0;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
  z-index: 1;
  text-align: left;
}

.partner-hint i {
  font-size: 1.3rem;
  color: #ff5733;
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.partner-hint p {
  font-family: 'Lato', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #d32f2f;
  margin: 0;
  font-weight: 500;
}

/* Event Info Grid */
.event-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
}

.info-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.info-item {
  display: flex;
  gap: 1.25rem;
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.6) 0%, 
      rgba(250, 248, 245, 0.6) 100%
    );
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 1.5rem;
  border-radius: 14px;
  text-align: left;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.info-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.005) 2px,
      rgba(0, 0, 0, 0.005) 4px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.005) 2px,
      rgba(0, 0, 0, 0.005) 4px
    );
  pointer-events: none;
  opacity: 0.5;
}

.info-item:hover {
  transform: translateY(-3px);
  border-color: #d4af37;
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.8) 0%, 
      rgba(250, 248, 245, 0.8) 100%
    );
  box-shadow: 
    0 6px 20px rgba(212, 175, 55, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.location-item {
  grid-column: 1 / -1;
}

.compact-item {
  padding: 1.25rem;
}

.info-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  min-width: 50px;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  position: relative;
  z-index: 1;
}

.compact-item .info-icon-wrapper {
  width: 45px;
  height: 45px;
  min-width: 45px;
}

.info-icon-wrapper i {
  font-size: 1.4rem;
  color: #1a1a1a;
}

.compact-item .info-icon-wrapper i {
  font-size: 1.2rem;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
  position: relative;
  z-index: 1;
}

.info-label {
  font-family: 'Lato', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}

.info-main {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.4;
}

.info-value {
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.info-sub {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.4;
}

.info-detail {
  font-size: 0.88rem;
  color: #888;
  font-style: italic;
  margin-top: 0.15rem;
}

/* Concierge Navigation */
.concierge-nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.2rem;
  padding: 0 1rem;
  max-width: 900px;
  margin: 0 auto;
}

.concierge-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem 1.5rem;
  min-height: 140px;
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.95) 0%, 
      rgba(252, 252, 250, 0.95) 100%
    );
  backdrop-filter: blur(10px);
  border: 2px solid rgba(212, 175, 55, 0.25);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Lato', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: #666;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 8px 24px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  position: relative;
  overflow: hidden;
}

.concierge-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.008) 2px,
      rgba(0, 0, 0, 0.008) 4px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.008) 2px,
      rgba(0, 0, 0, 0.008) 4px
    );
  pointer-events: none;
  opacity: 0.5;
}

.concierge-button i {
  font-size: 2.5rem;
  color: #d4af37;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.concierge-button span {
  position: relative;
  z-index: 1;
}

.concierge-button:hover {
  transform: translateY(-4px);
  border-color: #d4af37;
  box-shadow: 
    0 8px 24px rgba(212, 175, 55, 0.25),
    0 12px 36px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  color: #1a1a1a;
}

.concierge-button:hover i {
  transform: scale(1.1);
}

.concierge-button.active {
  background: 
    linear-gradient(135deg, 
      rgba(212, 175, 55, 0.2) 0%, 
      rgba(244, 208, 63, 0.2) 100%
    );
  border-color: #d4af37;
  border-width: 3px;
  color: #1a1a1a;
  box-shadow: 
    0 6px 20px rgba(212, 175, 55, 0.3),
    0 10px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 0 40px rgba(212, 175, 55, 0.15);
}

.concierge-button.active i {
  color: #b8941f;
}

/* Content Wrapper */
.content-wrapper {
  display: flex;
  justify-content: center;
}

/* Content Card */
.content-card {
  width: 100%;
  max-width: 800px;
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.95) 0%, 
      rgba(252, 252, 250, 0.95) 50%,
      rgba(255, 255, 255, 0.95) 100%
    );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 8px 24px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
}

.content-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.008) 2px,
      rgba(0, 0, 0, 0.008) 4px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.008) 2px,
      rgba(0, 0, 0, 0.008) 4px
    );
  pointer-events: none;
  opacity: 0.5;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 2rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.card-title i {
  color: #d4af37;
  font-size: 1.8rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.25rem 0.75rem;
  background: transparent;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Lato', sans-serif;
  position: relative;
  overflow: hidden;
}

.sidebar-button::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #d4af37;
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.sidebar-button:hover {
  background: rgba(212, 175, 55, 0.1);
}

.sidebar-button:hover::before {
  transform: scaleY(0.5);
}

.sidebar-button.active {
  background: linear-gradient(135deg, 
    rgba(212, 175, 55, 0.25) 0%, 
    rgba(212, 175, 55, 0.15) 100%
  );
  box-shadow: 
    0 4px 15px rgba(212, 175, 55, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.sidebar-button.active::before {
  transform: scaleY(1);
}

.sidebar-icon {
  font-size: 1.75rem;
  color: rgba(245, 245, 220, 0.6);
  transition: all 0.3s ease;
}

.sidebar-button:hover .sidebar-icon {
  color: #d4af37;
  transform: scale(1.1);
}

.sidebar-button.active .sidebar-icon {
  color: #d4af37;
  animation: iconPulse 0.6s ease;
}

.sidebar-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(245, 245, 220, 0.6);
  text-align: center;
  letter-spacing: 0.3px;
  transition: color 0.3s ease;
}

.sidebar-button:hover .sidebar-label {
  color: rgba(245, 245, 220, 0.9);
}

.sidebar-button.active .sidebar-label {
  color: #d4af37;
}

/* Mobile Bottom Navigation */
.mobile-nav {
  display: none;
}

/* Content Area */
.content-area {
  position: relative;
  min-height: 400px;
}

.tab-content {
  animation: fadeIn 0.5s ease;
}

/* Art Deco Frame (for menu) */
.art-deco-frame {
  position: relative;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(250, 248, 245, 0.95) 100%
  );
  border: 4px solid #d4af37;
  box-shadow: 
    0 0 0 2px #1a1a1a,
    0 0 0 6px #d4af37,
    0 15px 40px rgba(0, 0, 0, 0.2),
    inset 0 0 60px rgba(212, 175, 55, 0.05);
}

/* Corner Ornaments */
.corner-ornament {
  position: absolute;
  font-size: 2rem;
  color: #d4af37;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.top-left { top: -0.5rem; left: -0.5rem; }
.top-right { top: -0.5rem; right: -0.5rem; }
.bottom-left { bottom: -0.5rem; left: -0.5rem; }
.bottom-right { bottom: -0.5rem; right: -0.5rem; }

/* Section Headers */
.section-header-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.section-header-inline .ornament {
  font-size: 1rem;
  color: #d4af37;
}

.section-header-inline h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: 0.1rem;
}

/* Menu Section */
.menu-frame {
  padding: 2.5rem 2rem;
}

.menu-content {
  text-align: center;
}

.menu-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

.menu-item {
  text-align: center;
  padding: 1.5rem;
  background: rgba(212, 175, 55, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(212, 175, 55, 0.15);
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: rgba(212, 175, 55, 0.06);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.15);
}

.course-label {
  font-size: 0.85rem;
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.dish-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: #1a1a1a;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.dish-name.pending {
  font-style: italic;
  color: #999;
  font-weight: 400;
  font-size: 1.2rem;
}

.dish-accompaniment {
  font-size: 1rem;
  color: #555;
  font-style: italic;
  margin-bottom: 0.25rem;
}

.dish-note {
  font-size: 0.85rem;
  color: #888;
  font-style: italic;
  margin-top: 0.25rem;
}

.dish-responsibility {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #d4af37;
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  font-weight: 500;
}

.dish-responsibility i {
  font-size: 1rem;
}

.menu-divider {
  width: 60px;
  height: 2px;
  background: linear-gradient(to right, transparent 0%, #d4af37 50%, transparent 100%);
  margin: -0.5rem auto;
  position: relative;
  z-index: 1;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes iconPulse {
  0% { 
    transform: scale(1);
    filter: brightness(1);
  }
  50% { 
    transform: scale(1.15);
    filter: brightness(1.3);
  }
  100% { 
    transform: scale(1);
    filter: brightness(1);
  }
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Footer */
.art-deco-footer {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.7) 0%, 
    rgba(250, 248, 245, 0.7) 100%
  );
  border: 2px solid rgba(212, 175, 55, 0.3);
}

.footer-ornament {
  font-size: 1.5rem;
  color: #d4af37;
  margin: 0.5rem 0;
}

.footer-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: #1a1a1a;
  margin: 0.5rem 0;
}

.footer-subtext {
  font-size: 0.95rem;
  color: #666;
  font-style: italic;
  margin: 0.5rem 0;
}

/* Tablet */
@media (max-width: 1024px) {
  .dashboard-container {
    max-width: 900px;
  }
  
  .hotel-name {
    font-size: 1.3rem;
    letter-spacing: 0.2rem;
  }
  
  .welcome-title {
    font-size: 2.2rem;
  }
  
  .main-layout {
    grid-template-columns: 220px 1fr;
    gap: 1.5rem;
  }
  
  .sidebar {
    padding: 1.25rem 0.5rem;
  }
  
  .sidebar-button {
    padding: 1.1rem 0.5rem;
  }
  
  .sidebar-icon {
    font-size: 1.6rem;
  }
  
  .sidebar-label {
    font-size: 0.75rem;
  }
  
  .logo-icon {
    font-size: 1.3rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .dashboard-page {
    padding: 1.5rem 1rem;
  }
  
  .dashboard-container {
    gap: 1.75rem;
  }
  
  .hotel-reception {
    padding: 1.5rem;
    border-radius: 12px;
  }
  
  .reception-content {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .hotel-emblem {
    gap: 0.75rem;
    justify-content: center;
  }
  
  .hotel-emblem i {
    font-size: 1.7rem;
  }
  
  .hotel-title {
    font-size: 1.3rem;
    letter-spacing: 0.2rem;
  }
  
  .logout-button {
    width: 100%;
    justify-content: center;
    padding: 0.7rem 1.3rem;
    font-size: 0.95rem;
  }
  
  .welcome-card {
    padding: 2.5rem 1.8rem;
    border-radius: 16px;
  }
  
  .welcome-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 1.25rem;
  }
  
  .welcome-icon i {
    font-size: 1.75rem;
  }
  
  .guest-welcome {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
  
  .welcome-prefix {
    font-size: 1.25rem;
  }
  
  .guest-name {
    font-size: 2.25rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .personal-message {
    padding: 1rem 1.2rem;
    font-size: 0.95rem;
  }
  
  .personal-message i {
    font-size: 1.1rem;
  }
  
  .partner-hint {
    padding: 1rem 1.2rem;
  }
  
  .partner-hint p {
    font-size: 0.9rem;
  }
  
  .partner-hint i {
    font-size: 1.1rem;
  }
  
  .decorative-border-top,
  .decorative-border-bottom {
    margin-bottom: 1.5rem;
  }
  
  .decorative-border-bottom {
    margin-top: 1.5rem;
  }
  
  .event-info {
    gap: 1rem;
  }
  
  .info-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .info-item {
    padding: 1.25rem;
    gap: 1rem;
  }
  
  .compact-item {
    padding: 1.1rem;
  }
  
  .info-icon-wrapper {
    width: 45px;
    height: 45px;
    min-width: 45px;
  }
  
  .compact-item .info-icon-wrapper {
    width: 40px;
    height: 40px;
    min-width: 40px;
  }
  
  .info-icon-wrapper i {
    font-size: 1.25rem;
  }
  
  .compact-item .info-icon-wrapper i {
    font-size: 1.1rem;
  }
  
  .info-label {
    font-size: 0.7rem;
  }
  
  .info-main {
    font-size: 1.05rem;
  }
  
  .info-value {
    font-size: 0.95rem;
  }
  
  .info-sub {
    font-size: 0.9rem;
  }
  
  .info-detail {
    font-size: 0.83rem;
  }
  
  .concierge-nav {
    gap: 1rem;
    padding: 0.75rem;
    flex-wrap: wrap;
  }
  
  .concierge-nav {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  .concierge-button {
    padding: 1.8rem 1.2rem;
    min-height: 130px;
  }
  
  .concierge-button i {
    font-size: 2.2rem;
  }
  
  .concierge-button span {
    font-size: 1rem;
  }
  
  .content-card {
    padding: 2.2rem 1.8rem;
    border-radius: 12px;
  }
  
  .card-title {
    font-size: 1.7rem;
    margin-bottom: 1.5rem;
  }
  
  .card-title i {
    font-size: 1.5rem;
  }
  
  /* Switch to mobile navigation */
  .main-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .sidebar {
    display: none;
  }
  
  /* Mobile Bottom Navigation */
  .mobile-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, 
      rgba(26, 26, 26, 0.98) 0%, 
      rgba(18, 18, 18, 0.98) 100%
    );
    border-top: 1px solid rgba(212, 175, 55, 0.3);
    padding: 0.75rem 0.5rem 0.5rem;
    justify-content: space-around;
    z-index: 1000;
    box-shadow: 
      0 -10px 30px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
  }
  
  .mobile-nav-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.6rem 0.75rem;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex: 1;
    max-width: 100px;
    border-radius: 12px;
    position: relative;
  }
  
  .mobile-nav-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 3px;
    background: #d4af37;
    border-radius: 0 0 3px 3px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .mobile-nav-button.active::before {
    opacity: 1;
  }
  
  .mobile-nav-button.active {
    background: rgba(212, 175, 55, 0.15);
  }
  
  .mobile-nav-icon {
    font-size: 1.5rem;
    color: rgba(245, 245, 220, 0.6);
    transition: all 0.3s ease;
  }
  
  .mobile-nav-button.active .mobile-nav-icon {
    color: #d4af37;
    animation: iconPulse 0.6s ease;
  }
  
  .mobile-nav-label {
    font-size: 0.7rem;
    color: rgba(245, 245, 220, 0.6);
    font-weight: 500;
    letter-spacing: 0.3px;
  }
  
  .mobile-nav-button.active .mobile-nav-label {
    color: #d4af37;
    font-weight: 600;
  }
  
  .art-deco-header {
    padding: 1.25rem 1.5rem;
    border-width: 2px;
    box-shadow: 
      0 0 0 1px #1a1a1a,
      0 0 0 3px #d4af37,
      0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hotel-name {
    font-size: 1.2rem;
    letter-spacing: 0.15rem;
  }
  
  .elegant-logout {
    font-size: 0.9rem;
    padding: 0.5rem 1.25rem;
  }
  
  .welcome-frame {
    padding: 2rem 1.5rem;
    border-width: 3px;
    box-shadow: 
      0 0 0 1px #1a1a1a,
      0 0 0 4px #d4af37,
      0 12px 30px rgba(0, 0, 0, 0.2);
  }
  
  .corner-ornament {
    font-size: 1.5rem;
  }
  
  .welcome-ornament {
    font-size: 1.5rem;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
  
  .title-line {
    width: 150px;
  }
  
  .detail-item {
    font-size: 0.95rem;
  }
  
  .menu-frame {
    padding: 2rem 1.5rem;
  }
  
  .dish-name {
    font-size: 1.3rem;
  }
  
  .dish-name.pending {
    font-size: 1.1rem;
  }
  
  .dish-accompaniment {
    font-size: 0.95rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .footer-text {
    font-size: 1.1rem;
  }
  
  .footer-subtext {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .dashboard-page {
    padding: 1rem;
  }
  
  .dashboard-container {
    gap: 1.5rem;
  }
  
  .hotel-reception {
    padding: 1.3rem;
  }
  
  .reception-content {
    gap: 0.85rem;
  }
  
  .hotel-emblem {
    gap: 0.6rem;
  }
  
  .hotel-emblem i {
    font-size: 1.5rem;
  }
  
  .hotel-title {
    font-size: 1.1rem;
    letter-spacing: 0.15rem;
  }
  
  .logout-button {
    padding: 0.65rem 1.2rem;
    font-size: 0.88rem;
  }
  
  .welcome-card {
    padding: 2.25rem 1.5rem;
  }
  
  .welcome-icon {
    width: 55px;
    height: 55px;
    margin-bottom: 1.15rem;
  }
  
  .welcome-icon i {
    font-size: 1.6rem;
  }
  
  .guest-welcome {
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
  }
  
  .welcome-prefix {
    font-size: 1.15rem;
  }
  
  .guest-name {
    font-size: 2rem;
  }
  
  .welcome-subtitle {
    font-size: 0.95rem;
    margin-bottom: 1.75rem;
  }
  
  .decorative-border-top,
  .decorative-border-bottom {
    margin-bottom: 1.3rem;
  }
  
  .decorative-border-bottom {
    margin-top: 1.3rem;
  }
  
  .border-ornament {
    width: 10px;
    height: 10px;
  }
  
  .event-info {
    gap: 0.9rem;
  }
  
  .info-row {
    gap: 0.9rem;
  }
  
  .info-item {
    padding: 1.15rem;
    gap: 0.9rem;
  }
  
  .compact-item {
    padding: 1rem;
  }
  
  .info-icon-wrapper {
    width: 42px;
    height: 42px;
    min-width: 42px;
  }
  
  .compact-item .info-icon-wrapper {
    width: 38px;
    height: 38px;
    min-width: 38px;
  }
  
  .info-icon-wrapper i {
    font-size: 1.15rem;
  }
  
  .compact-item .info-icon-wrapper i {
    font-size: 1.05rem;
  }
  
  .info-label {
    font-size: 0.68rem;
  }
  
  .info-main {
    font-size: 1rem;
  }
  
  .info-value {
    font-size: 0.9rem;
  }
  
  .info-sub {
    font-size: 0.85rem;
  }
  
  .info-detail {
    font-size: 0.8rem;
  }
  
  .concierge-nav {
    gap: 0.85rem;
    padding: 0.5rem;
  }
  
  .concierge-nav {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
  }
  
  .concierge-button {
    padding: 1.6rem 1.2rem;
    min-height: 130px;
    gap: 0.6rem;
  }
  
  .concierge-button i {
    font-size: 2.2rem;
  }
  
  .concierge-button span {
    font-size: 1rem;
    line-height: 1.3;
  }
  
  .content-card {
    padding: 2rem 1.5rem;
  }
  
  .card-title {
    font-size: 1.5rem;
    margin-bottom: 1.3rem;
    gap: 0.65rem;
  }
  
  .card-title i {
    font-size: 1.35rem;
  }
  
  .mobile-nav {
    padding: 0.6rem 0.25rem 0.4rem;
  }
  
  .mobile-nav-button {
    padding: 0.5rem 0.5rem;
    gap: 0.2rem;
  }
  
  .mobile-nav-button::before {
    width: 50%;
  }
  
  .mobile-nav-icon {
    font-size: 1.4rem;
  }
  
  .mobile-nav-label {
    font-size: 0.65rem;
  }
  
  .art-deco-header {
    padding: 1rem 1rem;
  }
  
  .logo-ornament {
    font-size: 0.7rem;
  }
  
  .hotel-name {
    font-size: 1rem;
    letter-spacing: 0.1rem;
  }
  
  .elegant-logout {
    font-size: 0.85rem;
    padding: 0.45rem 1rem;
  }
  
  .welcome-frame {
    padding: 1.5rem 1rem;
    border-width: 2px;
  }
  
  .corner-ornament {
    font-size: 1.2rem;
  }
  
  .welcome-ornament {
    font-size: 1.3rem;
  }
  
  .welcome-title {
    font-size: 1.6rem;
  }
  
  .title-line {
    width: 120px;
    height: 2px;
  }
  
  .detail-item {
    font-size: 0.85rem;
  }
  
  .detail-ornament {
    font-size: 0.6rem;
  }
  
  .menu-frame {
    padding: 1.5rem 1rem;
  }
  
  .course-label {
    font-size: 0.75rem;
    letter-spacing: 0.15rem;
  }
  
  .dish-name {
    font-size: 1.2rem;
  }
  
  .dish-name.pending {
    font-size: 1rem;
  }
  
  .dish-accompaniment {
    font-size: 0.9rem;
  }
  
  .dish-note {
    font-size: 0.8rem;
  }
  
  .dish-responsibility {
    font-size: 0.85rem;
    margin-top: 0.65rem;
    padding-top: 0.65rem;
  }
  
  .dish-responsibility i {
    font-size: 0.95rem;
  }
  
  .menu-divider {
    font-size: 1.3rem;
  }
  
  .section-title {
    font-size: 1.3rem;
  }
  
  .section-ornament {
    font-size: 0.8rem;
  }
  
  .art-deco-footer {
    padding: 1.5rem 1rem;
  }
  
  .footer-ornament {
    font-size: 1.3rem;
  }
  
  .footer-text {
    font-size: 1rem;
  }
  
  .footer-subtext {
    font-size: 0.85rem;
  }
}

</style>

