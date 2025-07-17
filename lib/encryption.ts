import CryptoJS from "crypto-js"

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "super-secret-key"

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString()
}

export const decryptData = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}
