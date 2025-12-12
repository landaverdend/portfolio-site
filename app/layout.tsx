import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import BubbleBackground from '@/components/bubble-background';
import ChatBubble from '@/components/chat-bubble';
import { ChatProvider } from '@/contexts/chat-context';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fields Of Green Studios',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased pb-[100px] lg:pt-[130px] text-white`}>
        {process.env.NODE_ENV === 'production' && (
          <Script defer src="https://umami.landaverde.in/script.js" data-website-id="17a3552e-fa37-4300-8d28-b2cdf08abaec" />
        )}

        <ChatProvider>
          <BubbleBackground />
          <Navbar />
          {children}
          <ChatBubble />
        </ChatProvider>
      </body>
    </html>
  );
}
