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
      
      currentUser.value = {
        code: upperCode,
        guestName: codeData.guestName,
        characterId: codeData.characterId,
        character: character,
        culinarioLink: codeData.culinarioLink
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

