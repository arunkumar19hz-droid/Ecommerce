// Next.js 15 Root Layout for GrowX Fashion
// File: frontend/app/layout.tsx

import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GrowX Fashion - Luxury Clothing Store',
  description: 'Premium clothing and urban streetwear collections by varunexa.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0A0A0A] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
