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
  title: 'B2B Logistics | Domestic Freight Forwarding & Supply Chain Solutions',
  description: 'Your trusted partner for domestic logistics, land transport, and freight forwarding solutions in India since 1998. Reliable, safe, and on-time delivery.',
  keywords: 'logistics, freight forwarding, land transport, supply chain, B2B logistics, domestic shipping, India logistics',
  authors: [{ name: 'B2B Logistics' }],
  openGraph: {
    title: 'B2B Logistics | Domestic Freight Forwarding Solutions',
    description: 'Expert domestic logistics and supply chain solutions since 1998. Reliable land transport across India.',
    url: 'https://b2blogistics.in',
    siteName: 'B2B Logistics',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2B Logistics | Domestic Freight Forwarding Solutions',
    description: 'Expert domestic logistics and supply chain solutions since 1998.',
  },
  alternates: {
    canonical: 'https://b2blogistics.in',
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
