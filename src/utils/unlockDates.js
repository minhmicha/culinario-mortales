// Unlock dates for the Grand Hotel Mystery
export const UNLOCK_DATES = {
  // Character reveal - Grand Hotel opens at its founding hour (1926)
  characterReveal: new Date('2025-12-26T19:26:00'),
  
  // PDF download - Dossiers are unsealed (3 days before event for preparation)
  pdfDownload: new Date('2025-12-28T19:26:00')
}

export function isCharacterUnlocked() {
  const now = new Date()
  return now >= UNLOCK_DATES.characterReveal
}

export function isPdfUnlocked() {
  const now = new Date()
  return now >= UNLOCK_DATES.pdfDownload
}

export function getTimeUntilCharacterReveal() {
  const now = new Date()
  const diff = UNLOCK_DATES.characterReveal - now
  
  if (diff <= 0) return null
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return { days, hours, minutes, seconds, total: diff }
}

export function getTimeUntilPdfUnlock() {
  const now = new Date()
  const diff = UNLOCK_DATES.pdfDownload - now
  
  if (diff <= 0) return null
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return { days, hours, minutes, seconds, total: diff }
}

