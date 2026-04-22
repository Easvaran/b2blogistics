'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Chatbot from '@/components/ui/Chatbot';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [visibility, setVisibility] = useState({
    navbar: true,
    footer: true,
    chatbot: true
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.visibility) {
          setVisibility(data.visibility);
        }
      })
      .catch(err => console.error('Error fetching visibility settings:', err));
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && visibility.navbar && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdmin && visibility.footer && <Footer />}
      {!isAdmin && visibility.chatbot && <Chatbot />}
    </div>
  );
}
