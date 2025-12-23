<template>
  <div class="character-card">
    <!-- Character Profile Section -->
    <div class="profile-section">
      <div class="profile-image-wrapper">
        <div class="golden-frame">
          <img 
            v-if="character.imageUrl" 
            :src="character.imageUrl" 
            :alt="character.name"
            class="character-image"
            loading="lazy"
            decoding="async"
            @error="handleImageError"
          />
          <div v-else class="character-silhouette" :style="{ color: character.color }">
            {{ character.silhouetteIcon }}
          </div>
        </div>
      </div>
      
      <div class="profile-info">
        <h2 class="character-name">{{ character.name }}</h2>
        <p class="character-title">
          <i class="fa-solid fa-briefcase"></i>
          {{ character.title }}
        </p>
        <p class="character-age">
          <i class="fa-solid fa-cake-candles"></i>
          {{ character.age }} Jahre
        </p>
      </div>
    </div>
    
    <!-- Theme Song Section -->
    <div class="theme-song-card">
      <div class="vinyl-icon">
        <i class="fa-solid fa-record-vinyl"></i>
      </div>
      <div class="song-info">
        <p class="song-label">Dein Theme Song</p>
        <p class="song-title">{{ character.themeSong.title }}</p>
        <p class="song-artist">{{ character.themeSong.artist }} • {{ character.themeSong.year }}</p>
      </div>
    </div>
    
    <!-- Costume Section -->
    <div class="costume-card">
      <div class="section-header">
        <div class="header-icon">
          <i class="fa-solid fa-masks-theater"></i>
        </div>
        <h3>Dein Kostüm</h3>
      </div>
      
      <p class="costume-description">{{ character.costume.description }}</p>
      
      <div class="costume-items">
        <div
          v-for="(item, index) in character.costume.items"
          :key="index"
          class="costume-item"
        >
          <i class="fa-regular fa-square-check"></i>
          <span>{{ item }}</span>
        </div>
      </div>
      
      <a 
        v-if="character.pinterestSearch"
        :href="character.pinterestSearch"
        target="_blank"
        class="pinterest-button"
      >
        <i class="fa-brands fa-pinterest"></i>
        <span>Pinterest Inspiration</span>
      </a>
    </div>
    
    <!-- Action Section -->
    <div class="action-section">
      <!-- PDF Unlocked -->
      <a
        v-if="character.pdfUrl && pdfUnlocked"
        :href="character.pdfUrl"
        target="_blank"
        class="pdf-button"
      >
        <i class="fa-solid fa-file-pdf"></i>
        <span>Rollenheft öffnen</span>
      </a>
      
      <!-- PDF Locked - Countdown -->
      <div v-else-if="character.pdfUrl && !pdfUnlocked" class="pdf-locked">
        <CountdownTimer
          title="Rollenheft wird entsiegelt"
          subtitle="Am 28. Dezember zur Stunde der Gründung (19:26)"
          :getTimeFunction="getTimeUntilPdfUnlock"
          unlockedMessage="Rollenheft ist verfügbar! 📜"
        />
      </div>
      
      <!-- No PDF configured -->
      <div v-else class="info-notice">
        <i class="fa-solid fa-circle-info"></i>
        <span>Dein Rollenheft wird vom Gastgeber noch hinzugefügt</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
import { isPdfUnlocked, getTimeUntilPdfUnlock } from '@/utils/unlockDates'

defineProps({
  character: {
    type: Object,
    required: true
  }
})

const pdfUnlocked = ref(isPdfUnlocked())

// Update unlock status every second
let intervalId = null
onMounted(() => {
  intervalId = setInterval(() => {
    pdfUnlocked.value = isPdfUnlocked()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const handleImageError = (event) => {
  // Falls Bild nicht lädt, verstecke es
  event.target.style.display = 'none'
  // Zeige stattdessen das Icon (füge CSS-Klasse hinzu)
  const container = event.target.parentElement
  const silhouette = container.querySelector('.character-silhouette')
  if (silhouette) {
    silhouette.style.display = 'block'
  }
}
</script>

<style scoped>
.character-card {
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.95) 0%, 
      rgba(252, 252, 250, 0.95) 50%,
      rgba(255, 255, 255, 0.95) 100%
    );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 16px;
  padding: 0;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 8px 24px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.02);
  position: relative;
  overflow: hidden;
}

.character-card::before {
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

/* Profile Section */
.profile-section {
  text-align: center;
  padding: 3rem 2.5rem 2rem;
  position: relative;
  z-index: 1;
  background: linear-gradient(to bottom, rgba(212, 175, 55, 0.02) 0%, transparent 100%);
}

.profile-image-wrapper {
  display: inline-block;
  margin-bottom: 1.5rem;
}

.golden-frame {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto;
  padding: 8px;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  border-radius: 50%;
  box-shadow: 
    0 8px 24px rgba(212, 175, 55, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.5),
    inset 0 -2px 4px rgba(0, 0, 0, 0.2);
}

.character-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: white;
  padding: 8px;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}

.character-image[src$=".svg"] {
  object-fit: contain;
  padding: 12px;
}

.character-silhouette {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  background: white;
  border-radius: 50%;
}

.profile-info {
  position: relative;
  z-index: 1;
}

.character-name {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.02em;
}

.character-title,
.character-age {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.05rem;
  color: #666;
  margin: 0.5rem 0;
}

.character-title {
  color: #d4af37;
  font-size: 1.2rem;
  font-weight: 600;
}

.character-title i,
.character-age i {
  font-size: 1rem;
  opacity: 0.8;
}

/* Theme Song Card */
.theme-song-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 2.5rem;
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(212, 175, 55, 0.15);
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.03) 0%, rgba(212, 175, 55, 0.08) 100%);
}

.vinyl-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
  border-radius: 50%;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.theme-song-card:hover .vinyl-icon {
  transform: rotate(15deg);
}

.vinyl-icon i {
  font-size: 2rem;
  color: #d4af37;
}

.song-info {
  flex: 1;
}

.song-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #999;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.song-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.3rem 0;
  line-height: 1.2;
}

.song-artist {
  font-size: 1rem;
  color: #666;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Costume Card */
.costume-card {
  padding: 2.5rem;
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(212, 175, 55, 0.15);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.header-icon i {
  font-size: 1.3rem;
  color: #1a1a1a;
}

.section-header h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.costume-description {
  color: #444;
  line-height: 1.8;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.05rem;
}

.costume-items {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.costume-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.2rem;
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 10px;
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease;
}

.costume-item:hover {
  background: rgba(212, 175, 55, 0.1);
  transform: translateX(4px);
  border-color: #d4af37;
}

.costume-item i {
  font-size: 1.3rem;
  color: #d4af37;
  flex-shrink: 0;
}

.pinterest-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.9rem 2rem;
  background: #e60023;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Lato', sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(230, 0, 35, 0.3);
  width: 100%;
}

.pinterest-button:hover {
  background: #ad081b;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(230, 0, 35, 0.4);
}

.pinterest-button i {
  font-size: 1.2rem;
}

/* Action Section */
.action-section {
  padding: 2rem 2.5rem 2.5rem;
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(212, 175, 55, 0.15);
}

.pdf-locked {
  width: 100%;
}

.pdf-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  color: #1a1a1a;
  text-decoration: none;
  padding: 1.2rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Lato', sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.35);
}

.pdf-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(212, 175, 55, 0.45);
  background: linear-gradient(135deg, #f4d03f 0%, #d4af37 100%);
}

.pdf-button i {
  font-size: 1.4rem;
}

.info-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1.2rem 1.5rem;
  background: rgba(212, 175, 55, 0.08);
  color: #b8941f;
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 10px;
  font-size: 0.95rem;
  text-align: center;
}

.info-notice i {
  font-size: 1.3rem;
  flex-shrink: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-section {
    padding: 2.5rem 2rem 2rem;
  }
  
  .golden-frame {
    width: 145px;
    height: 145px;
  }
  
  .character-name {
    font-size: 2.1rem;
    margin-bottom: 0.85rem;
  }
  
  .character-title,
  .character-age {
    font-size: 1.05rem;
    margin: 0.6rem 0;
  }
  
  .character-silhouette {
    font-size: 4.8rem;
  }
  
  .theme-song-card {
    padding: 1.8rem;
    gap: 1.3rem;
  }
  
  .vinyl-icon {
    width: 58px;
    height: 58px;
  }
  
  .vinyl-icon i {
    font-size: 1.9rem;
  }
  
  .song-label {
    font-size: 0.85rem;
  }
  
  .song-title {
    font-size: 1.4rem;
    line-height: 1.3;
  }
  
  .song-artist {
    font-size: 1rem;
  }
  
  .costume-card {
    padding: 2.2rem 2rem;
  }
  
  .section-header {
    margin-bottom: 1.5rem;
  }
  
  .header-icon {
    width: 42px;
    height: 42px;
  }
  
  .header-icon i {
    font-size: 1.35rem;
  }
  
  .section-header h3 {
    font-size: 1.65rem;
  }
  
  .costume-description {
    font-size: 1.05rem;
    line-height: 1.75;
    margin-bottom: 1.8rem;
  }
  
  .costume-items {
    gap: 0.85rem;
    margin-bottom: 1.8rem;
  }
  
  .costume-item {
    padding: 1rem 1.3rem;
    font-size: 1rem;
  }
  
  .costume-item i {
    font-size: 1.35rem;
  }
  
  .pinterest-button {
    padding: 1.1rem 2rem;
    font-size: 1.02rem;
    min-height: 50px;
  }
  
  .pinterest-button i {
    font-size: 1.3rem;
  }
  
  .action-section {
    padding: 2rem 2rem 2.2rem;
  }
  
  .pdf-button {
    padding: 1.25rem 2rem;
    font-size: 1.1rem;
    min-height: 56px;
  }
  
  .pdf-button i {
    font-size: 1.5rem;
  }
  
  .info-notice {
    padding: 1.25rem 1.5rem;
    font-size: 0.98rem;
    line-height: 1.5;
  }
  
  .info-notice i {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .profile-section {
    padding: 2rem 1.5rem 1.2rem;
  }
  
  .golden-frame {
    width: 120px;
    height: 120px;
    padding: 6px;
  }
  
  .character-name {
    font-size: 1.7rem;
  }
  
  .character-title {
    font-size: 1.05rem;
  }
  
  .character-age {
    font-size: 0.95rem;
  }
  
  .character-silhouette {
    font-size: 4rem;
  }
  
  .theme-song-card {
    padding: 1.5rem;
    gap: 1rem;
    flex-direction: column;
    text-align: center;
  }
  
  .vinyl-icon {
    width: 50px;
    height: 50px;
  }
  
  .vinyl-icon i {
    font-size: 1.6rem;
  }
  
  .song-title {
    font-size: 1.2rem;
  }
  
  .song-artist {
    font-size: 0.9rem;
    justify-content: center;
  }
  
  .costume-card {
    padding: 1.8rem 1.5rem;
  }
  
  .header-icon {
    width: 36px;
    height: 36px;
  }
  
  .header-icon i {
    font-size: 1.1rem;
  }
  
  .section-header h3 {
    font-size: 1.4rem;
  }
  
  .costume-description {
    font-size: 1.02rem;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }
  
  .costume-item {
    padding: 0.9rem 1.1rem;
    font-size: 0.98rem;
  }
  
  .costume-item i {
    font-size: 1.2rem;
  }
  
  .action-section {
    padding: 1.6rem 1.5rem 1.8rem;
  }
  
  .pdf-button {
    padding: 1.15rem 1.6rem;
    font-size: 1.05rem;
    min-height: 54px;
  }
  
  .pdf-button i {
    font-size: 1.4rem;
  }
  
  .pinterest-button {
    padding: 1rem 1.8rem;
    font-size: 1rem;
    min-height: 48px;
  }
  
  .pinterest-button i {
    font-size: 1.25rem;
  }
  
  .info-notice {
    padding: 1.1rem 1.3rem;
    font-size: 0.95rem;
  }
  
  .info-notice i {
    font-size: 1.25rem;
  }
}
</style>

