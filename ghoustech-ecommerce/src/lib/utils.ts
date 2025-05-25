import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import CryptoJS from 'crypto-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency to Indonesian Rupiah
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format number with thousand separators
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num)
}

// Generate random order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `GT${timestamp.slice(-6)}${random}`
}

// Generate OTP code
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Generate secure download token
export function generateDownloadToken(): string {
  return CryptoJS.lib.WordArray.random(32).toString()
}

// Encrypt sensitive data
export function encryptData(data: string): string {
  const key = process.env.ENCRYPTION_KEY || 'default-key-change-in-production'
  return CryptoJS.AES.encrypt(data, key).toString()
}

// Decrypt sensitive data
export function decryptData(encryptedData: string): string {
  const key = process.env.ENCRYPTION_KEY || 'default-key-change-in-production'
  const bytes = CryptoJS.AES.decrypt(encryptedData, key)
  return bytes.toString(CryptoJS.enc.Utf8)
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate Indonesian phone number
export function isValidPhoneNumber(phone: string): boolean {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '')
  
  // Check if it starts with 08 or +628 or 628
  const phoneRegex = /^(08|628|\+628)[0-9]{8,12}$/
  return phoneRegex.test(cleanPhone)
}

// Normalize phone number to international format
export function normalizePhoneNumber(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  
  if (cleanPhone.startsWith('08')) {
    return '+62' + cleanPhone.substring(1)
  } else if (cleanPhone.startsWith('628')) {
    return '+' + cleanPhone
  } else if (cleanPhone.startsWith('+628')) {
    return cleanPhone
  }
  
  return phone // Return original if format is not recognized
}

// Calculate download expiry date
export function calculateDownloadExpiry(): Date {
  const days = parseInt(process.env.DOWNLOAD_TOKEN_EXPIRY_DAYS || '7')
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + days)
  return expiry
}

// Check if download token is expired
export function isDownloadExpired(expiryDate: string): boolean {
  return new Date() > new Date(expiryDate)
}

// Format date to Indonesian locale
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj)
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Sleep function for delays
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Get client IP address from request
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}
