<template>
  <div class="character-card" :style="{ borderColor: character.color }">
    <div class="character-header">
      <div class="character-silhouette" :style="{ color: character.color }">
        {{ character.silhouetteIcon }}
      </div>
      <div class="character-info">
        <h2 class="character-name">{{ character.name }}</h2>
        <p class="character-title">{{ character.title }}</p>
        <p class="character-age">{{ character.age }} Jahre</p>
      </div>
    </div>
    
    <div class="costume-section">
      <h3>🎭 Dein Kostüm</h3>
      <p class="costume-description">{{ character.costume.description }}</p>
      
      <div class="costume-checklist">
        <div
          v-for="(item, index) in character.costume.items"
          :key="index"
          class="checklist-item"
        >
          <span class="checkbox">☐</span>
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
    
    <div class="action-buttons">
      <a
        v-if="culinarioLink"
        :href="culinarioLink"
        target="_blank"
        class="primary-button"
      >
        <span class="button-icon">📜</span>
        Rollenheft öffnen
      </a>
      <div v-else class="info-message">
        <span>ℹ️</span>
        Dein Rollenheft-Link wird vom Gastgeber eingefügt
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  character: {
    type: Object,
    required: true
  },
  culinarioLink: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.character-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  border: 3px solid;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.character-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid rgba(212, 175, 55, 0.3);
}

.character-silhouette {
  font-size: 5rem;
  line-height: 1;
}

.character-info {
  flex: 1;
}

.character-name {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
}

.character-title {
  font-size: 1.2rem;
  color: #d4af37;
  margin: 0 0 0.25rem 0;
  font-weight: 500;
}

.character-age {
  font-size: 1rem;
  color: #666;
  margin: 0;
}

.costume-section {
  margin-bottom: 2rem;
}

.costume-section h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
}

.costume-description {
  color: #444;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.costume-checklist {
  background: rgba(212, 175, 55, 0.05);
  border-left: 4px solid #d4af37;
  padding: 1rem 1.5rem;
  border-radius: 8px;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: #333;
}

.checkbox {
  font-size: 1.5rem;
  color: #d4af37;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  color: #1a1a1a;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.6);
}

.button-icon {
  font-size: 1.5rem;
}

.info-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
  border-radius: 8px;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .character-header {
    flex-direction: column;
    text-align: center;
  }
  
  .character-name {
    font-size: 1.5rem;
  }
  
  .character-silhouette {
    font-size: 4rem;
  }
}
</style>

