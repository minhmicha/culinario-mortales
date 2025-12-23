<template>
  <div class="spotify-player">
    <div class="player-header">
      <span class="music-icon">🎵</span>
      <h3>Hintergrundmusik</h3>
    </div>
    
    <p class="player-description">{{ musicConfig.spotify.name }}</p>
    
    <div class="iframe-container">
      <iframe
        style="border-radius:12px"
        :src="musicConfig.spotify.embedUrl"
        width="100%"
        height="352"
        frameBorder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Player - Grand Hotel Background Music"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { musicConfig } from '@/data/music'
</script>

<style scoped>
.spotify-player {
  background: rgba(26, 26, 26, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.player-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.music-icon {
  font-size: 1.5rem;
}

.player-header h3 {
  font-family: 'Playfair Display', serif;
  color: #f5f5dc;
  margin: 0;
  font-size: 1.3rem;
}

.player-description {
  color: #d4af37;
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
}

.iframe-container {
  border-radius: 12px;
  overflow: hidden;
  background: #000;
}

iframe {
  display: block;
  border-radius: 12px;
}
</style>

