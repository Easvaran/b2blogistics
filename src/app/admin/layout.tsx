import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* 
          This layout will bypass the root Navbar and Footer because 
          it's in a sub-directory and we'll use conditional rendering 
          or a separate layout structure if needed.
          
          However, Next.js RootLayout wraps EVERYTHING. 
          To truly remove the main Navbar/Footer, we usually use 
          Route Groups or conditional logic in RootLayout.
      */}
      {children}
    </div>
  );
}
