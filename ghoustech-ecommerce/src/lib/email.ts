import nodemailer from 'nodemailer'

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Send OTP verification email
export async function sendOTPEmail(email: string, otpCode: string, customerName: string) {
  const transporter = createTransporter()
  
  const mailOptions = {
    from: `"${process.env.NEXT_PUBLIC_BRAND_NAME}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Kode Verifikasi - ${process.env.NEXT_PUBLIC_BRAND_NAME}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kode Verifikasi</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #5271ff; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .otp-code { background: #5271ff; color: white; font-size: 32px; font-weight: bold; text-align: center; padding: 20px; border-radius: 8px; margin: 20px 0; letter-spacing: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${process.env.NEXT_PUBLIC_BRAND_NAME}</h1>
            <p>Verifikasi Email Anda</p>
          </div>
          <div class="content">
            <h2>Halo ${customerName}!</h2>
            <p>Terima kasih telah berbelanja di ${process.env.NEXT_PUBLIC_BRAND_NAME}. Untuk melanjutkan proses pembelian, silakan verifikasi email Anda dengan kode berikut:</p>
            
            <div class="otp-code">${otpCode}</div>
            
            <div class="warning">
              <strong>⚠️ Penting:</strong>
              <ul>
                <li>Kode ini berlaku selama <strong>10 menit</strong></li>
                <li>Jangan bagikan kode ini kepada siapa pun</li>
                <li>Jika Anda tidak melakukan pembelian, abaikan email ini</li>
              </ul>
            </div>
            
            <p>Setelah verifikasi berhasil, Anda akan diarahkan ke halaman pembayaran untuk menyelesaikan transaksi.</p>
            
            <p>Butuh bantuan? Hubungi kami di WhatsApp: <strong>${process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP}</strong></p>
          </div>
          <div class="footer">
            <p>&copy; 2024 ${process.env.NEXT_PUBLIC_BRAND_NAME}. All rights reserved.</p>
            <p>Email ini dikirim secara otomatis, mohon tidak membalas email ini.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending OTP email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

// Send purchase confirmation email with download link
export async function sendPurchaseConfirmationEmail(
  email: string,
  customerName: string,
  orderNumber: string,
  products: Array<{ name: string; price: number }>,
  totalAmount: number,
  downloadToken: string
) {
  const transporter = createTransporter()
  const downloadUrl = `${process.env.NEXT_PUBLIC_APP_URL}/download/${downloadToken}`
  
  const productsList = products.map(product => 
    `<li>${product.name} - ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}</li>`
  ).join('')

  const mailOptions = {
    from: `"${process.env.NEXT_PUBLIC_BRAND_NAME}" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Pembelian Berhasil - ${orderNumber}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pembelian Berhasil</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #28a745; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .download-button { background: #5271ff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; font-weight: bold; }
          .order-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Pembayaran Berhasil!</h1>
            <p>Terima kasih atas pembelian Anda</p>
          </div>
          <div class="content">
            <h2>Halo ${customerName}!</h2>
            <p>Pembayaran Anda telah berhasil diproses. Berikut adalah detail pesanan Anda:</p>
            
            <div class="order-details">
              <h3>Detail Pesanan</h3>
              <p><strong>Nomor Pesanan:</strong> ${orderNumber}</p>
              <p><strong>Produk yang dibeli:</strong></p>
              <ul>${productsList}</ul>
              <p><strong>Total Pembayaran:</strong> ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(totalAmount)}</p>
            </div>
            
            <div style="text-align: center;">
              <a href="${downloadUrl}" class="download-button">📥 Download Produk</a>
            </div>
            
            <div class="warning">
              <strong>📋 Informasi Penting:</strong>
              <ul>
                <li>Link download berlaku selama <strong>7 hari</strong></li>
                <li>Maksimal <strong>3 kali download</strong></li>
                <li>Simpan file dengan baik setelah download</li>
                <li>Jika ada masalah, hubungi customer service</li>
              </ul>
            </div>
            
            <p>Butuh bantuan? Hubungi kami di WhatsApp: <strong>${process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP}</strong></p>
            
            <p>Terima kasih telah mempercayai ${process.env.NEXT_PUBLIC_BRAND_NAME}! 🙏</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 ${process.env.NEXT_PUBLIC_BRAND_NAME}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Error sending purchase confirmation email:', error)
    return { success: false, error: 'Failed to send email' }
  }
}
