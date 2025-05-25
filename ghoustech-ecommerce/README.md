# Ghous Tech E-Commerce Platform

A modern, full-stack e-commerce platform for digital products built with Next.js, Supabase, and Duitku payment integration. Features guest checkout, email verification, and secure digital product delivery.

## 🚀 Features

### Core Features
- **Guest Checkout**: No mandatory user registration required
- **Email/Phone Verification**: OTP-based verification system
- **Secure Payment**: Duitku payment gateway integration
- **Digital Delivery**: Secure download links with expiration
- **Mobile Responsive**: Optimized for all devices
- **Modern UI**: Clean design with Ghous Tech branding (#5271ff)

### Technical Features
- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Supabase**: Backend-as-a-Service for database and auth
- **Zustand**: Lightweight state management
- **Email Service**: Automated email notifications
- **Security**: Encrypted download tokens and rate limiting

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Backend**: Supabase (PostgreSQL)
- **Payment**: Duitku API
- **Email**: Nodemailer
- **State Management**: Zustand
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account
- Duitku merchant account
- Email service credentials (Gmail recommended)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ghoustech-ecommerce
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the example environment file:
```bash
cp .env.local.example .env.local
```

Fill in your environment variables:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Duitku Payment Gateway
DUITKU_MERCHANT_CODE=your_duitku_merchant_code
DUITKU_API_KEY=your_duitku_api_key
DUITKU_CALLBACK_URL=http://localhost:3000/api/payment/callback
DUITKU_RETURN_URL=http://localhost:3000/payment/success
DUITKU_ERROR_URL=http://localhost:3000/payment/failed

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BRAND_NAME=Ghous Tech
NEXT_PUBLIC_SUPPORT_WHATSAPP=+6281234567890

# Security
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=your_32_character_encryption_key
```

### 4. Database Setup
Run the SQL schema in your Supabase dashboard:
```bash
# Copy the contents of supabase/schema.sql
# Paste and execute in Supabase SQL Editor
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
ghoustech-ecommerce/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/             # React components
│   │   ├── cart/               # Shopping cart components
│   │   ├── home/               # Homepage sections
│   │   └── layout/             # Layout components
│   ├── lib/                    # Utility libraries
│   │   ├── supabase.ts         # Supabase client
│   │   ├── duitku.ts           # Payment integration
│   │   ├── email.ts            # Email service
│   │   └── utils.ts            # Helper functions
│   └── store/                  # State management
│       └── cart.ts             # Cart store
├── supabase/
│   └── schema.sql              # Database schema
├── public/                     # Static assets
├── .env.local.example          # Environment template
└── README.md                   # This file
```

## 🔄 User Flow

### Guest Checkout Process
1. **Browse Products** → User explores product catalog
2. **Add to Cart** → Products added to session-based cart
3. **Checkout** → Guest fills form (name, email, phone)
4. **Email Verification** → OTP sent to email for verification
5. **Payment** → Redirect to Duitku payment gateway
6. **Confirmation** → Email with secure download link
7. **Download** → Access products via time-limited links

### Key Features
- ✅ No mandatory user registration
- ✅ Email/phone verification for security
- ✅ Secure payment processing
- ✅ Automatic digital delivery
- ✅ Download link expiration (7 days)
- ✅ Download attempt limits (3x max)

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the SQL schema from `supabase/schema.sql`
3. Configure Row Level Security (RLS) policies
4. Get your project URL and API keys

### Duitku Setup
1. Register for Duitku merchant account
2. Complete verification process
3. Get merchant code and API key
4. Configure callback URLs

### Email Setup
1. Enable 2-factor authentication on Gmail
2. Generate app-specific password
3. Use app password in EMAIL_PASS variable

## 🚀 Deployment

### Deploy to Vercel
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Environment Variables for Production
```env
# Update URLs for production
NEXT_PUBLIC_APP_URL=https://your-domain.com
DUITKU_CALLBACK_URL=https://your-domain.com/api/payment/callback
DUITKU_RETURN_URL=https://your-domain.com/payment/success
DUITKU_ERROR_URL=https://your-domain.com/payment/failed
```

## 📱 API Routes

### Payment API
- `POST /api/payment/create` - Create payment request
- `POST /api/payment/callback` - Handle payment callback
- `GET /api/payment/status` - Check payment status

### Order API
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order details
- `POST /api/orders/verify` - Verify email/phone

### Download API
- `GET /api/download/[token]` - Secure download endpoint

## 🎨 Customization

### Brand Colors
The primary brand color is `#5271ff`. You can customize colors in:
- `tailwind.config.ts` - Tailwind color palette
- `src/app/globals.css` - CSS custom properties

### Email Templates
Customize email templates in `src/lib/email.ts`:
- OTP verification emails
- Purchase confirmation emails
- Download link emails

## 🔒 Security Features

- **Encrypted Download Tokens**: Secure token generation
- **Rate Limiting**: Prevent abuse of download endpoints
- **Email Verification**: OTP-based verification system
- **Secure Headers**: CORS and security headers
- **Input Validation**: Server-side validation
- **SQL Injection Protection**: Parameterized queries

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Test Payment Flow
1. Use Duitku sandbox environment
2. Test with provided test cards
3. Verify email delivery
4. Check download functionality

## 📞 Support

For support and questions:
- **Email**: hello@ghoustech.com
- **WhatsApp**: +62 812-3456-7890
- **Documentation**: [Link to docs]

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- Duitku for payment processing
- Tailwind CSS for the styling system
