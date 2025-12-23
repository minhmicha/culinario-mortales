<template>
  <div class="notification-center">
    <!-- Notification Button -->
    <button @click="toggleNotifications" class="notification-button" :class="{ 'has-unread': hasUnread }">
      <!-- Art Deco Envelope SVG -->
      <svg viewBox="0 0 64 64" class="envelope-icon">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#d4af37;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f4d03f;stop-opacity:1" />
          </linearGradient>
        </defs>
        <!-- Envelope Body -->
        <rect x="8" y="20" width="48" height="32" rx="2" fill="url(#goldGradient)" stroke="#1a1a1a" stroke-width="1.5"/>
        <!-- Envelope Flap -->
        <path d="M 8 20 L 32 38 L 56 20" fill="none" stroke="#1a1a1a" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M 8 20 L 32 38 L 56 20 L 56 24 L 32 42 L 8 24 Z" fill="rgba(212, 175, 55, 0.3)" stroke="#1a1a1a" stroke-width="1.5"/>
        <!-- Decorative Lines -->
        <line x1="16" y1="32" x2="28" y2="32" stroke="#1a1a1a" stroke-width="1" opacity="0.6"/>
        <line x1="16" y1="37" x2="32" y2="37" stroke="#1a1a1a" stroke-width="1" opacity="0.6"/>
        <line x1="16" y1="42" x2="26" y2="42" stroke="#1a1a1a" stroke-width="1" opacity="0.6"/>
      </svg>
      
      <!-- Unread Badge -->
      <span v-if="unreadCount > 0" class="unread-badge">{{ unreadCount }}</span>
    </button>

    <!-- Notification Panel -->
    <transition name="slide-fade">
      <div v-if="isOpen" class="notification-panel">
        <div class="panel-header">
          <h3>📬 Deine Nachrichten</h3>
          <button @click="closeNotifications" class="close-button">✕</button>
        </div>
        
        <div class="notifications-list">
          <!-- Personal Message -->
          <div v-if="personalMessage" class="notification-item">
            <div class="item-header">
              <span class="item-icon">🎭</span>
              <span class="item-title">Willkommen</span>
            </div>
            <p class="item-text">{{ personalMessage }}</p>
          </div>
          
          <!-- Partner Hint -->
          <div v-if="partnerHint" class="notification-item warning">
            <div class="item-header">
              <span class="item-icon">⚠️</span>
              <span class="item-title">Spielregel</span>
            </div>
            <p class="item-text">{{ partnerHint }}</p>
          </div>
          
          <!-- Tech Warning (nur für Matteo) -->
          <div v-if="techWarning" class="notification-item alert">
            <div class="item-header">
              <span class="item-icon">🔒</span>
              <span class="item-title">Wichtig</span>
            </div>
            <p class="item-text">{{ techWarning }}</p>
          </div>
          
          <!-- Empty State -->
          <div v-if="!personalMessage && !partnerHint && !techWarning" class="empty-state">
            <span class="empty-icon">📭</span>
            <p>Keine Nachrichten</p>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Backdrop -->
    <div v-if="isOpen" @click="closeNotifications" class="backdrop"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  personalMessage: {
    type: String,
    default: ''
  },
  partnerHint: {
    type: String,
    default: ''
  },
  techWarning: {
    type: String,
    default: ''
  }
})

const isOpen = ref(false)

const hasUnread = computed(() => {
  return !!(props.personalMessage || props.partnerHint || props.techWarning)
})

const unreadCount = computed(() => {
  let count = 0
  if (props.personalMessage) count++
  if (props.partnerHint) count++
  if (props.techWarning) count++
  return count
})

const toggleNotifications = () => {
  isOpen.value = !isOpen.value
}

const closeNotifications = () => {
  isOpen.value = false
}
</script>

<style scoped>
.notification-center {
  position: relative;
}

/* Notification Button */
.notification-button {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  border: 3px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 6px 20px rgba(212, 175, 55, 0.4),
    0 10px 35px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  padding: 14px;
}

.notification-button:hover {
  transform: translateY(-4px) scale(1.08);
  box-shadow: 
    0 8px 25px rgba(212, 175, 55, 0.5),
    0 14px 45px rgba(0, 0, 0, 0.2);
  border-color: #fff;
}

.notification-button.has-unread {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 
      0 6px 20px rgba(212, 175, 55, 0.4),
      0 10px 35px rgba(0, 0, 0, 0.15);
    transform: scale(1);
  }
  50% {
    box-shadow: 
      0 8px 25px rgba(212, 175, 55, 0.6),
      0 12px 40px rgba(212, 175, 55, 0.3),
      0 0 0 12px rgba(212, 175, 55, 0.15);
    transform: scale(1.05);
  }
}

/* Envelope Icon */
.envelope-icon {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2));
}

.envelope-icon path {
  stroke: #1a1a1a;
  stroke-width: 1.8;
}

/* Unread Badge */
.unread-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: linear-gradient(135deg, #ff3333 0%, #ff5555 100%);
  color: white;
  font-size: 0.85rem;
  font-weight: 700;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 2px 8px rgba(255, 87, 51, 0.4);
}

/* Notification Panel */
.notification-panel {
  position: fixed;
  top: 5rem;
  right: 2rem;
  width: 420px;
  max-width: calc(100vw - 4rem);
  max-height: 600px;
  background: linear-gradient(135deg, #fff 0%, #fafafa 100%);
  border: 2px solid #d4af37;
  border-radius: 16px;
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    0 20px 60px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  border-bottom: 2px solid #b8941f;
  position: relative;
}

.panel-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #1a1a1a;
  margin: 0;
  font-weight: 700;
  text-align: center;
}

.close-button {
  background: rgba(26, 26, 26, 0.1);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 1.2rem;
  color: #1a1a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
}

.close-button:hover {
  background: rgba(26, 26, 26, 0.2);
  transform: translateY(-50%) rotate(90deg);
}

/* Notifications List */
.notifications-list {
  max-height: 70vh;
  overflow-y: auto;
  padding: 1rem;
}

/* Compact Notification Item */
.notification-item {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  border-left: 3px solid #d4af37;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
}

.notification-item:last-child {
  margin-bottom: 0;
}

.notification-item.warning {
  border-left-color: #ff8c00;
}

.notification-item.alert {
  border-left-color: #dc3545;
}

.notification-item:active {
  transform: scale(0.98);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Item Header */
.item-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.6rem;
}

.item-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

.item-title {
  font-family: 'Playfair Display', serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: 0.01rem;
}

.item-text {
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #555;
  margin: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 2rem 1rem;
  color: #999;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  opacity: 0.5;
}

.empty-state p {
  font-family: 'Lato', sans-serif;
  font-size: 0.9rem;
  font-style: italic;
  margin: 0;
}

/* Backdrop */
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  backdrop-filter: blur(2px);
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .notification-button {
    top: 1.2rem;
    right: 1.2rem;
    width: 65px;
    height: 65px;
    padding: 13px;
    border-width: 3px;
  }
  
  .notification-panel {
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    max-height: 100vh;
    border-radius: 0;
    border: none;
    border-top: 4px solid #d4af37;
    box-shadow: 
      0 -4px 20px rgba(0, 0, 0, 0.1),
      0 -8px 40px rgba(0, 0, 0, 0.05);
  }
  
  .panel-header {
    padding: 1.8rem 1.5rem;
    border-bottom: 3px solid #b8941f;
  }
  
  .panel-header h3 {
    font-size: 1.4rem;
    letter-spacing: 0.03rem;
  }
  
  .close-button {
    width: 42px;
    height: 42px;
    font-size: 1.5rem;
    right: 1.5rem;
  }
  
  .notifications-list {
    padding: 1rem;
  }
  
  .notification-item {
    padding: 1.1rem;
    margin-bottom: 0.8rem;
  }
  
  .item-header {
    gap: 0.7rem;
    margin-bottom: 0.7rem;
  }
  
  .item-icon {
    font-size: 1.4rem;
  }
  
  .item-title {
    font-size: 1rem;
  }
  
  .item-text {
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .empty-state {
    padding: 2.5rem 1.5rem;
  }
  
  .empty-icon {
    font-size: 2.8rem;
  }
  
  .empty-state p {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .notification-button {
    top: 1rem;
    right: 1rem;
    width: 60px;
    height: 60px;
    padding: 12px;
    border-width: 3px;
  }
  
  .unread-badge {
    width: 26px;
    height: 26px;
    font-size: 0.8rem;
    top: -5px;
    right: -5px;
  }
  
  .panel-header {
    padding: 1.6rem 1.5rem;
    border-bottom: 2px solid #b8941f;
  }
  
  .panel-header h3 {
    font-size: 1.3rem;
    letter-spacing: 0.02rem;
  }
  
  .close-button {
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
    right: 1.5rem;
  }
  
  .notifications-list {
    padding: 1rem;
  }
  
  .notification-item {
    padding: 1rem;
    margin-bottom: 0.75rem;
  }
  
  .item-header {
    gap: 0.65rem;
    margin-bottom: 0.65rem;
  }
  
  .item-icon {
    font-size: 1.35rem;
  }
  
  .item-title {
    font-size: 0.95rem;
  }
  
  .item-text {
    font-size: 0.9rem;
    line-height: 1.55;
  }
  
  .empty-state {
    padding: 2.5rem 1.5rem;
  }
  
  .empty-icon {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
  
  .empty-state p {
    font-size: 1rem;
  }
}
</style>

