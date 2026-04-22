'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/ui/Chatbot';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [mounted, setMounted] = useState(false);
  const [visibility, setVisibility] = useState({
    navbar: true,
    footer: true,
    chatbot: true
  });

  useEffect(() => {
    setMounted(true);
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.visibility) {
          setVisibility(data.visibility);
        }
      } catch (err) {
        console.error('Error fetching visibility settings:', err);
      }
    };
    
    fetchSettings();
  }, [pathname]);

  if (!mounted) {
    return <div className="min-h-screen flex flex-col"><main className="flex-grow">{children}</main></div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && visibility.navbar && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdmin && visibility.footer && <Footer />}
      {!isAdmin && visibility.chatbot && <Chatbot />}
    </div>
  );
}
