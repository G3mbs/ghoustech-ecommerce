import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client component client
export const createSupabaseClient = () => createClientComponentClient()

// Server component client
export const createSupabaseServerClient = () => createServerComponentClient({ cookies })

// Admin client with service role key (for server-side operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  download_url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string
  total_amount: number
  payment_status: 'pending' | 'paid' | 'failed' | 'expired'
  verification_status: 'pending' | 'verified'
  email_verified: boolean
  phone_verified: boolean
  download_token: string
  download_count: number
  max_downloads: number
  expires_at: string
  payment_method: string
  payment_reference: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_price: number
  quantity: number
  created_at: string
}

export interface OTPVerification {
  id: string
  email?: string
  phone?: string
  otp_code: string
  purpose: 'email_verification' | 'phone_verification'
  expires_at: string
  is_used: boolean
  created_at: string
}

export interface DownloadLog {
  id: string
  order_id: string
  product_id: string
  download_token: string
  ip_address: string
  user_agent: string
  downloaded_at: string
}
