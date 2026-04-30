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
  title: 'B2B Logistics | Domestic Freight Forwarding',
  description: 'Your trusted partner for domestic logistics and freight forwarding solutions since 1998.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
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
