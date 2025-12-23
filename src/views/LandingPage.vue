<template>
  <div class="landing-page">
    <div class="elegant-container">
      <!-- Decorative Corner Elements -->
      <div class="corner-accent top-left"></div>
      <div class="corner-accent top-right"></div>
      <div class="corner-accent bottom-left"></div>
      <div class="corner-accent bottom-right"></div>
      
      <div class="content-wrapper">
        <!-- Header with Icon -->
        <div class="header-section">
          <div class="hotel-icon">
            <i class="fa-solid fa-building-columns"></i>
          </div>
          
          <h1 class="main-title">GRAND HOTEL FLORA</h1>
          <div class="title-line"></div>
        </div>
        
        <!-- Hotel Image -->
        <div class="image-section">
          <div class="image-frame">
            <img 
              src="/images/grand-hotel.png" 
              alt="Grand Hotel" 
              class="hotel-image"
              @error="handleImageError"
            />
          </div>
        </div>
        
        <!-- Story Cards -->
        <div class="story-section">
          <div class="story-card">
            <div class="decorative-quote-top">❝</div>
            
            <p class="story-text first-paragraph">
              <span class="drop-cap">A</span>ugust 1962. Die High Society feiert die Eröffnung des prachtvollen 
              <em>Grand Hotel Flora</em> – ein prächtiges Luxushotel und Kronjuwel in der 
              Karriere von Hotel-Tycoon Frederic Price.
            </p>
            
            <p class="story-text">
              Bei einem exquisiten Menü wurden Lobreden gehalten und ausgiebig 
              getrunken. Die Gäste trafen sich zu einer ausgelassenen Cocktailparty an der längsten 
              Hotelbar der Stadt.
            </p>
            
            <div class="decorative-quote-bottom">❞</div>
          </div>
          
          <!-- Mystery Card -->
          <div class="mystery-card">
            <h3 class="mystery-heading">Eine tragische Wendung</h3>
            
            <p class="mystery-description">
              Die junge Schauspielerin <strong>Monique Moreau</strong> wird tot 
              in der Badewanne ihrer Suite aufgefunden.
            </p>
            
            <div class="mystery-footer">
              <p>Ein Selbstmord scheint ausgeschlossen.</p>
              <p class="mystery-question"><strong>Was ist an diesem Abend geschehen?</strong></p>
            </div>
          </div>
          
          <!-- Central Login Icon -->
          <div class="login-section">
            <button @click="goToLogin" class="lock-button">
              <i class="fa-solid fa-lock"></i>
            </button>
            <p class="login-text">Mit Code einloggen</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const imageError = ref(false)

const goToLogin = () => {
  router.push('/login')
}

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f5dc 0%, #f0ead6 50%, #faf8f5 100%);
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Elegant Container */
.elegant-container {
  position: relative;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border: 3px solid #d4af37;
  border-radius: 16px;
  box-shadow: 
    0 0 0 1px rgba(212, 175, 55, 0.3),
    0 20px 60px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  padding: 3.5rem 3rem;
  overflow: hidden;
}

/* Decorative Corners */
.corner-accent {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 2px solid #d4af37;
}

.corner-accent.top-left {
  top: 15px;
  left: 15px;
  border-right: none;
  border-bottom: none;
  border-radius: 4px 0 0 0;
}

.corner-accent.top-right {
  top: 15px;
  right: 15px;
  border-left: none;
  border-bottom: none;
  border-radius: 0 4px 0 0;
}

.corner-accent.bottom-left {
  bottom: 15px;
  left: 15px;
  border-right: none;
  border-top: none;
  border-radius: 0 0 0 4px;
}

.corner-accent.bottom-right {
  bottom: 15px;
  right: 15px;
  border-left: none;
  border-top: none;
  border-radius: 0 0 4px 0;
}

/* Content Wrapper */
.content-wrapper {
  text-align: center;
}

/* Header Section */
.header-section {
  margin-bottom: 2.5rem;
  animation: fadeInDown 0.8s ease-out;
}

.hotel-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  border-radius: 16px;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);
  transition: transform 0.3s ease;
}

.hotel-icon:hover {
  transform: translateY(-2px) scale(1.05);
}

.hotel-icon i {
  font-size: 2.2rem;
  color: #1a1a1a;
}

.main-title {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 0.8rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(212, 175, 55, 0.1);
  animation: fadeInDown 0.8s ease-out 0.2s both;
}

.title-line {
  width: 200px;
  height: 2px;
  background: linear-gradient(to right, transparent 0%, #d4af37 50%, transparent 100%);
  margin: 1.2rem auto 2rem;
  animation: fadeIn 0.8s ease-out 0.4s both;
}

/* Image Section */
.image-section {
  margin: 2rem 0 2.5rem;
  animation: fadeIn 0.8s ease-out 0.8s both;
}

.image-frame {
  position: relative;
  max-width: 480px;
  margin: 0 auto;
  border: 2px solid #d4af37;
  border-radius: 12px;
  padding: 8px;
  background: #fff;
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-frame:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 12px 32px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.hotel-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  filter: sepia(0.1) contrast(1.05);
}

/* Story Section */
.story-section {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Story Card */
.story-card {
  background: 
    linear-gradient(135deg, 
      rgba(255, 255, 255, 0.95) 0%, 
      rgba(252, 252, 250, 0.95) 50%,
      rgba(255, 255, 255, 0.95) 100%
    );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 16px;
  padding: 2rem 2.5rem;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.06),
    0 8px 24px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.story-card::before {
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

.story-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 12px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.02);
}

.decorative-quote-top,
.decorative-quote-bottom {
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  line-height: 0;
  color: rgba(212, 175, 55, 0.3);
  font-weight: 700;
}

.decorative-quote-top {
  text-align: left;
  margin-bottom: 1rem;
  margin-left: -0.3rem;
}

.decorative-quote-bottom {
  text-align: right;
  margin-top: 1rem;
  margin-right: -0.3rem;
}

.story-text {
  font-size: 1.15rem;
  line-height: 2;
  color: #333;
  margin: 0 0 1.5rem 0;
  text-align: justify;
  position: relative;
}

.story-text.first-paragraph {
  text-indent: 0;
}

.story-text:last-of-type {
  margin-bottom: 0;
}

.drop-cap {
  float: left;
  font-family: 'Playfair Display', serif;
  font-size: 4.5rem;
  line-height: 0.85;
  font-weight: 700;
  color: #d4af37;
  margin: 0.15rem 0.4rem 0 0;
  text-shadow: 2px 2px 4px rgba(212, 175, 55, 0.2);
}

.story-text em {
  font-style: italic;
  color: #1a1a1a;
  font-weight: 600;
  letter-spacing: 0.02rem;
}

/* Mystery Card */
.mystery-card {
  background: 
    linear-gradient(135deg, 
      rgba(255, 252, 252, 0.95) 0%, 
      rgba(252, 248, 248, 0.95) 50%,
      rgba(255, 252, 252, 0.95) 100%
    );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(128, 0, 32, 0.2);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 
    0 2px 8px rgba(128, 0, 32, 0.08),
    0 8px 24px rgba(128, 0, 32, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(128, 0, 32, 0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.mystery-card::before {
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
      rgba(128, 0, 32, 0.012) 2px,
      rgba(128, 0, 32, 0.012) 4px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(128, 0, 32, 0.012) 2px,
      rgba(128, 0, 32, 0.012) 4px
    );
  pointer-events: none;
  opacity: 0.5;
}

.mystery-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 4px 12px rgba(128, 0, 32, 0.1),
    0 12px 32px rgba(128, 0, 32, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(128, 0, 32, 0.02);
}

.mystery-heading {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #800020;
  margin: 0 0 1.2rem 0;
  text-align: center;
}

.mystery-description {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #333;
  margin: 0 0 1.2rem 0;
  text-align: center;
}

.mystery-description strong {
  color: #800020;
  font-weight: 600;
}

.mystery-footer {
  padding-top: 1.2rem;
  border-top: 1px solid rgba(128, 0, 32, 0.15);
  text-align: center;
}

.mystery-footer p {
  font-size: 1.05rem;
  color: #555;
  margin: 0.5rem 0;
  font-style: italic;
}

.mystery-question strong {
  color: #800020;
}

/* Login Section */
.login-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.lock-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 10px 30px rgba(212, 175, 55, 0.4),
    0 0 0 0 rgba(212, 175, 55, 0.4);
  position: relative;
}

.lock-button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 
    0 15px 40px rgba(212, 175, 55, 0.5),
    0 0 0 8px rgba(212, 175, 55, 0.1);
}

.lock-button:active {
  transform: translateY(-2px) scale(1);
}

.lock-button i {
  font-size: 2rem;
  color: #1a1a1a;
}

.login-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #666;
  margin: 0;
  letter-spacing: 0.05rem;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .landing-page {
    padding: 2rem 1.25rem;
  }

  .elegant-container {
    padding: 2.5rem 2rem;
    border-width: 2px;
    border-radius: 14px;
  }

  .corner-accent {
    width: 22px;
    height: 22px;
  }

  .corner-accent.top-left,
  .corner-accent.top-right {
    top: 12px;
  }

  .corner-accent.bottom-left,
  .corner-accent.bottom-right {
    bottom: 12px;
  }

  .corner-accent.top-left,
  .corner-accent.bottom-left {
    left: 12px;
  }

  .corner-accent.top-right,
  .corner-accent.bottom-right {
    right: 12px;
  }

  .header-section {
    margin-bottom: 2.25rem;
  }

  .hotel-icon {
    width: 65px;
    height: 65px;
    margin-bottom: 1.3rem;
  }

  .hotel-icon i {
    font-size: 1.9rem;
  }

  .main-title {
    font-size: 2.75rem;
    letter-spacing: 0.35rem;
  }

  .title-line {
    width: 150px;
    margin: 1.1rem auto 2.25rem;
  }

  .image-section {
    margin-bottom: 2rem;
  }

  .image-frame {
    max-width: 100%;
    padding: 0.75rem;
  }

  .hotel-image {
    border-radius: 10px;
  }

  .story-section {
    gap: 2rem;
  }

  .story-card {
    padding: 2.25rem 1.75rem;
    border-radius: 14px;
  }

  .decorative-quote-top,
  .decorative-quote-bottom {
    font-size: 3.25rem;
  }

  .decorative-quote-top {
    margin-bottom: 0.85rem;
  }

  .decorative-quote-bottom {
    margin-top: 0.85rem;
  }

  .drop-cap {
    font-size: 3.75rem;
    margin: 0.12rem 0.4rem 0 0;
  }

  .story-text {
    font-size: 1.08rem;
    line-height: 1.85;
    text-align: left;
    margin-bottom: 1.4rem;
  }

  .mystery-card {
    padding: 2.25rem 1.75rem;
    border-radius: 14px;
  }

  .mystery-heading {
    font-size: 1.7rem;
    margin-bottom: 1.15rem;
  }

  .mystery-description {
    font-size: 1.12rem;
    line-height: 1.75;
  }

  .mystery-footer {
    padding-top: 1.15rem;
    margin-top: 1.15rem;
  }

  .mystery-footer p {
    font-size: 1.05rem;
    margin: 0.7rem 0;
  }

  .login-section {
    margin-top: 2.25rem;
  }

  .lock-button {
    width: 84px;
    height: 84px;
  }

  .lock-button i {
    font-size: 2.2rem;
  }

  .login-text {
    font-size: 1.2rem;
    margin-top: 0.9rem;
    line-height: 1.4;
  }
}

@media (max-width: 480px) {
  .landing-page {
    padding: 1.5rem 1rem;
  }

  .elegant-container {
    padding: 2.5rem 1.6rem;
  }

  .header-section {
    margin-bottom: 2rem;
  }

  .hotel-icon {
    width: 62px;
    height: 62px;
    margin-bottom: 1.2rem;
  }

  .hotel-icon i {
    font-size: 1.85rem;
  }

  .main-title {
    font-size: 2.4rem;
    letter-spacing: 0.28rem;
  }

  .title-line {
    width: 135px;
    margin: 1rem auto 2rem;
  }

  .image-section {
    margin-bottom: 1.8rem;
  }

  .image-frame {
    padding: 0.7rem;
  }

  .story-section {
    gap: 1.8rem;
  }

  .story-card {
    padding: 2.2rem 1.6rem;
  }

  .decorative-quote-top,
  .decorative-quote-bottom {
    font-size: 2.85rem;
  }

  .decorative-quote-top {
    margin-bottom: 0.75rem;
  }

  .decorative-quote-bottom {
    margin-top: 0.75rem;
  }

  .drop-cap {
    font-size: 3.3rem;
    margin: 0.12rem 0.38rem 0 0;
  }

  .story-text {
    font-size: 1.05rem;
    line-height: 1.8;
    margin-bottom: 1.25rem;
  }

  .mystery-card {
    padding: 2.2rem 1.6rem;
  }

  .mystery-heading {
    font-size: 1.55rem;
    margin-bottom: 1.05rem;
    line-height: 1.3;
  }

  .mystery-description {
    font-size: 1.1rem;
    line-height: 1.7;
  }

  .mystery-footer {
    padding-top: 1.05rem;
    margin-top: 1.05rem;
  }

  .mystery-footer p {
    font-size: 1.02rem;
    margin: 0.65rem 0;
    line-height: 1.5;
  }

  .login-section {
    margin-top: 2.2rem;
  }

  .lock-button {
    width: 80px;
    height: 80px;
  }

  .lock-button i {
    font-size: 2.05rem;
  }

  .login-text {
    font-size: 1.15rem;
    margin-top: 0.8rem;
    line-height: 1.4;
  }
}
</style>

