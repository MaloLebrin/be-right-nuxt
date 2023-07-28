import CryptoJS from 'crypto-js'
import encBase64 from 'crypto-js/enc-base64'

/**
 * create hash password
 * @param salt string
 * @param password string recieved by front
 * @returns hash saved in DB
 */
export const generateHash = (salt: string, password: string) => {
  const hash = CryptoJS.SHA256(password + salt).toString(encBase64)
  return hash
}
