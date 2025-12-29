import { ref, computed } from 'vue'
import { accessCodes } from '@/data/codes'
import { characters } from '@/data/characters'

const currentUser = ref(null)

export function useAuth() {
  const isAuthenticated = computed(() => currentUser.value !== null)

  const login = (code) => {
    const upperCode = code.toUpperCase().trim()
    
    if (accessCodes[upperCode]) {
      const codeData = accessCodes[upperCode]
      const character = characters[codeData.characterId]
      
      // Override pdfUrl with culinarioLink from codes.js
      const characterWithPdf = {
        ...character,
        pdfUrl: codeData.culinarioLink
      }
      
      currentUser.value = {
        code: upperCode,
        guestName: codeData.guestName,
        characterId: codeData.characterId,
        character: characterWithPdf,
        culinarioLink: codeData.culinarioLink,
        personalMessage: codeData.personalMessage,
        partnerHint: codeData.partnerHint,
        techWarning: codeData.techWarning
      }
      
      // Save to localStorage
      localStorage.setItem('grandHotelUser', JSON.stringify(currentUser.value))
      
      return true
    }
    
    return false
  }

  const logout = () => {
    currentUser.value = null
    localStorage.removeItem('grandHotelUser')
  }

  const restoreSession = () => {
    const saved = localStorage.getItem('grandHotelUser')
    if (saved) {
      currentUser.value = JSON.parse(saved)
      return true
    }
    return false
  }

  return {
    currentUser,
    isAuthenticated,
    login,
    logout,
    restoreSession
  }
}

