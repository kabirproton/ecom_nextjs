import CryptoJS from "crypto-js"

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!

if (!ENCRYPTION_KEY) {
  console.warn("NEXT_PUBLIC_ENCRYPTION_KEY is not set. Encryption will not work.")
}

export const encryptData = (data: string): string => {
  if (!ENCRYPTION_KEY) {
    return data // Return original data if key is not set
  }
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString()
}

export const decryptData = (ciphertext: string): string => {
  if (!ENCRYPTION_KEY) {
    return ciphertext // Return original ciphertext if key is not set
  }
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}
