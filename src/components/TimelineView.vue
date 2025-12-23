<template>
  <div class="timeline-view">
    <h2 class="timeline-title">📅 Ablaufplan des Abends</h2>
    
    <div class="timeline">
      <div
        v-for="(event, index) in eventSchedule"
        :key="index"
        class="timeline-item"
      >
        <div class="timeline-time">
          {{ event.time }}
        </div>
        <div class="timeline-icon">
          {{ event.icon }}
        </div>
        <div class="timeline-content">
          <h3>{{ event.phase }}</h3>
          <p class="description">{{ event.description }}</p>
          <p class="details">{{ event.details }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { eventSchedule } from '@/data/timeline'
</script>

<style scoped>
.timeline-view {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  border: 3px solid #d4af37;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.timeline-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #1a1a1a;
  margin: 0 0 2rem 0;
  text-align: center;
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 1.5rem;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #d4af37, #f4d03f, #d4af37);
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 80px 60px 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: start;
}

.timeline-time {
  font-weight: 600;
  color: #d4af37;
  font-size: 1.1rem;
  text-align: right;
  padding-top: 0.25rem;
}

.timeline-icon {
  font-size: 2.5rem;
  text-align: center;
  background: white;
  border: 3px solid #d4af37;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.timeline-content {
  padding: 1rem;
  background: rgba(212, 175, 55, 0.05);
  border-left: 4px solid #d4af37;
  border-radius: 8px;
}

.timeline-content h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
}

.description {
  color: #333;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.details {
  color: #666;
  margin: 0;
  font-size: 0.95rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .timeline {
    padding-left: 0;
  }
  
  .timeline::before {
    left: 30px;
  }
  
  .timeline-item {
    grid-template-columns: 1fr;
    padding-left: 70px;
  }
  
  .timeline-time {
    text-align: left;
    grid-column: 1;
    grid-row: 1;
  }
  
  .timeline-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
    font-size: 2rem;
  }
  
  .timeline-content {
    grid-column: 1;
    grid-row: 2;
  }
}
</style>

