import CryptoJS from 'crypto-js'

const DUITKU_BASE_URL = 'https://sandbox.duitku.com/webapi/api' // Change to production URL for live
const MERCHANT_CODE = process.env.DUITKU_MERCHANT_CODE!
const API_KEY = process.env.DUITKU_API_KEY!

export interface DuitkuPaymentRequest {
  merchantOrderId: string
  productDetails: string
  email: string
  phoneNumber: string
  customerName: string
  amount: number
  callbackUrl: string
  returnUrl: string
  signature: string
}

export interface DuitkuPaymentResponse {
  statusCode: string
  statusMessage: string
  reference: string
  paymentUrl: string
  vaNumber?: string
  amount: string
}

// Generate signature for Duitku API
function generateSignature(merchantOrderId: string, amount: number): string {
  const data = `${MERCHANT_CODE}${merchantOrderId}${amount}${API_KEY}`
  return CryptoJS.MD5(data).toString()
}

// Create payment request to Duitku
export async function createDuitkuPayment(params: {
  orderNumber: string
  customerName: string
  email: string
  phone: string
  amount: number
  productDetails: string
}): Promise<DuitkuPaymentResponse> {
  const { orderNumber, customerName, email, phone, amount, productDetails } = params
  
  const signature = generateSignature(orderNumber, amount)
  
  const paymentData = {
    merchantCode: MERCHANT_CODE,
    paymentAmount: amount,
    paymentMethod: 'VC', // Virtual Account
    merchantOrderId: orderNumber,
    productDetails,
    customerName,
    email,
    phoneNumber: phone,
    callbackUrl: process.env.DUITKU_CALLBACK_URL,
    returnUrl: process.env.DUITKU_RETURN_URL,
    signature,
    expiryPeriod: 1440 // 24 hours in minutes
  }

  try {
    const response = await fetch(`${DUITKU_BASE_URL}/merchant/createinvoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData)
    })

    const result = await response.json()
    
    if (result.statusCode === '00') {
      return {
        statusCode: result.statusCode,
        statusMessage: result.statusMessage,
        reference: result.reference,
        paymentUrl: result.paymentUrl,
        vaNumber: result.vaNumber,
        amount: result.amount
      }
    } else {
      throw new Error(result.statusMessage || 'Payment creation failed')
    }
  } catch (error) {
    console.error('Duitku payment creation error:', error)
    throw new Error('Failed to create payment')
  }
}

// Verify callback signature from Duitku
export function verifyCallbackSignature(
  merchantOrderId: string,
  amount: string,
  resultCode: string,
  signature: string
): boolean {
  const expectedSignature = CryptoJS.MD5(
    `${MERCHANT_CODE}${amount}${merchantOrderId}${API_KEY}`
  ).toString()
  
  return signature === expectedSignature
}

// Check payment status
export async function checkPaymentStatus(merchantOrderId: string): Promise<{
  statusCode: string
  statusMessage: string
  amount?: string
  reference?: string
}> {
  const signature = CryptoJS.MD5(`${MERCHANT_CODE}${merchantOrderId}${API_KEY}`).toString()
  
  try {
    const response = await fetch(`${DUITKU_BASE_URL}/merchant/transactionStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merchantCode: MERCHANT_CODE,
        merchantOrderId,
        signature
      })
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Payment status check error:', error)
    throw new Error('Failed to check payment status')
  }
}

// Get available payment methods
export async function getPaymentMethods(amount: number): Promise<any[]> {
  const datetime = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const signature = CryptoJS.MD5(`${MERCHANT_CODE}${amount}${datetime}${API_KEY}`).toString()
  
  try {
    const response = await fetch(`${DUITKU_BASE_URL}/merchant/paymentmethod/getpaymentmethod`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        merchantcode: MERCHANT_CODE,
        amount,
        datetime,
        signature
      })
    })

    const result = await response.json()
    return result.paymentFee || []
  } catch (error) {
    console.error('Get payment methods error:', error)
    return []
  }
}

// Payment method codes for Duitku
export const PAYMENT_METHODS = {
  BCA_VA: 'I1',
  MANDIRI_VA: 'M2',
  BNI_VA: 'VA',
  BRI_VA: 'BR',
  PERMATA_VA: 'B1',
  CIMB_VA: 'B4',
  DANAMON_VA: 'DN',
  MAYBANK_VA: 'MB',
  QRIS: 'Q1',
  SHOPEE_PAY: 'SP',
  OVO: 'OV',
  DANA: 'DA',
  LINK_AJA: 'LA',
  GOPAY: 'GP',
  CREDIT_CARD: 'CC'
}

// Get payment method name
export function getPaymentMethodName(code: string): string {
  const methods: { [key: string]: string } = {
    'I1': 'BCA Virtual Account',
    'M2': 'Mandiri Virtual Account',
    'VA': 'BNI Virtual Account',
    'BR': 'BRI Virtual Account',
    'B1': 'Permata Virtual Account',
    'B4': 'CIMB Virtual Account',
    'DN': 'Danamon Virtual Account',
    'MB': 'Maybank Virtual Account',
    'Q1': 'QRIS',
    'SP': 'ShopeePay',
    'OV': 'OVO',
    'DA': 'DANA',
    'LA': 'LinkAja',
    'GP': 'GoPay',
    'CC': 'Credit Card'
  }
  
  return methods[code] || 'Unknown Payment Method'
}
