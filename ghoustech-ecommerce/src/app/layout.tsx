import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/cart/CartSidebar';

export const metadata: Metadata = {
  title: "Ghous Tech - Premium Digital Products",
  description: "Discover premium digital products including design templates, software tools, courses, and more. Quality digital solutions for professionals and businesses.",
  keywords: "digital products, design templates, software, courses, premium tools, ghous tech",
  authors: [{ name: "Ghous Tech" }],
  creator: "Ghous Tech",
  publisher: "Ghous Tech",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Ghous Tech - Premium Digital Products",
    description: "Discover premium digital products including design templates, software tools, courses, and more.",
    siteName: "Ghous Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ghous Tech - Premium Digital Products",
    description: "Discover premium digital products including design templates, software tools, courses, and more.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen bg-gray-50 antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <CartSidebar />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#22c55e',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
