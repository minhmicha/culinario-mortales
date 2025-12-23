<template>
  <div class="compact-spotify-player">
    <div class="player-header">
      <span class="music-icon">🎵</span>
      <h3>Hintergrundmusik</h3>
    </div>
    
    <div class="iframe-container">
      <iframe
        style="border-radius:12px" 
        :src="musicConfig.spotify.embedUrl"
        width="100%" 
        height="152" 
        frameBorder="0" 
        allowfullscreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { musicConfig } from '@/data/music'
</script>

<style scoped>
.compact-spotify-player {
  background: rgba(26, 26, 26, 0.95);
  border-radius: 15px;
  padding: 1.25rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 2px solid #d4af37;
}

.player-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.music-icon {
  font-size: 1.3rem;
}

.player-header h3 {
  font-family: 'Playfair Display', serif;
  color: #f5f5dc;
  margin: 0;
  font-size: 1.1rem;
}

.iframe-container {
  border-radius: 12px;
  overflow: hidden;
}

/* Mobile Optimierung */
@media (max-width: 768px) {
  .compact-spotify-player {
    padding: 1rem;
  }
  
  .player-header h3 {
    font-size: 1rem;
  }
  
  .music-icon {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .compact-spotify-player {
    padding: 0.875rem;
    border-width: 2px;
  }
  
  .player-header {
    margin-bottom: 0.5rem;
  }
}
</style>

