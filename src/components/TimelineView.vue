<template>
  <div class="timeline-view">
    <div class="timeline">
      <div
        v-for="(event, index) in eventSchedule"
        :key="index"
        class="timeline-item"
      >
        <div class="timeline-icon">
          <i :class="event.icon"></i>
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
  position: relative;
  z-index: 1;
}

.timeline {
  position: relative;
  padding-left: 0;
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  align-items: start;
}

.timeline-icon {
  text-align: center;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 4px 12px rgba(212, 175, 55, 0.4),
    inset 0 2px 4px rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
}

.timeline-icon i {
  font-size: 2rem;
  color: #1a1a1a;
}

.timeline-content {
  padding: 1.5rem;
  background: rgba(212, 175, 55, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.timeline-item:hover .timeline-content {
  background: rgba(212, 175, 55, 0.1);
  transform: translateX(4px);
}

.timeline-content h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.75rem 0;
}

.description {
  color: #333;
  margin: 0 0 0.75rem 0;
  font-weight: 500;
  font-size: 1.05rem;
  line-height: 1.6;
}

.details {
  color: #666;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .timeline-item {
    grid-template-columns: 1fr;
    padding-left: 80px;
  }
  
  .timeline-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;
  }
  
  .timeline-icon i {
    font-size: 1.7rem;
  }
  
  .timeline-content {
    grid-column: 1;
    padding: 1.3rem;
  }
  
  .timeline-content h3 {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .timeline-item {
    padding-left: 70px;
    margin-bottom: 1.75rem;
  }
  
  .timeline-icon {
    width: 55px;
    height: 55px;
  }
  
  .timeline-icon i {
    font-size: 1.5rem;
  }
  
  .timeline-content {
    padding: 1.2rem;
  }
  
  .timeline-content h3 {
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
  }
  
  .description {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }
  
  .details {
    font-size: 0.9rem;
  }
}
</style>

