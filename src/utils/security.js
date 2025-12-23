// Simple obfuscation - not cryptographically secure, just prevents casual snooping
const SECRET_KEY = 'GrandHotel1962Mystery'

export function decode(encoded) {
  try {
    // Base64 decode
    const decoded = atob(encoded)
    
    // Simple XOR with key
    let result = ''
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(
        decoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
      )
    }
    
    return JSON.parse(result)
  } catch (e) {
    console.error('Decode error:', e)
    return null
  }
}

export function encode(data) {
  const json = JSON.stringify(data)
  
  // Simple XOR with key
  let xored = ''
  for (let i = 0; i < json.length; i++) {
    xored += String.fromCharCode(
      json.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length)
    )
  }
  
  // Base64 encode
  return btoa(xored)
}

