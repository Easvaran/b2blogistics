import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import NextAuthProvider from '@/components/providers/NextAuthProvider';
import ClientLayout from '@/components/layout/ClientLayout';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { ToastContainer } from '@/components/ui/Toast';
import Script from 'next/script'; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'B2B Logistics Solution | Freight & Supply Chain Services',
  description: 'B2B Logistics Solution provides expert freight forwarding, supply chain management, and logistics services in India.',
  keywords: 'B2B Logistics Solution, freight forwarding India, supply chain management, professional logistics Madurai, transportation services India',
  authors: [{ name: 'B2B Logistics Solution' }],
  openGraph: {
    title: 'B2B Logistics Solution | Freight & Supply Chain Services',
    description: 'Expert freight forwarding and supply chain management services in India.',
    url: 'https://www.b2blogisticssolution.com',
    siteName: 'B2B Logistics Solution',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Logistics Solution | Freight & Supply Chain Services',
    description: 'B2B Logistics Solution provides expert freight forwarding and supply chain management services in India.',
  },
  alternates: {
    canonical: 'https://www.b2blogisticssolution.com',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "B2B Logistics Solution",
    "url": "https://www.b2blogisticssolution.com",
    "logo": "https://www.b2blogisticssolution.com/logo.png",
    "sameAs": []
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZSFS24BP1J"
          strategy="afterInteractive"
        />
        <Script id="ga-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-ZSFS24BP1J');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider>
            <ClientLayout>{children}</ClientLayout>
            <ToastContainer />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
