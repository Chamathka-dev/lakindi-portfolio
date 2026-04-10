import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// src/app/layout.js

export const metadata = {
  title: 'Lakindi Chathuprabha | Digital Arts',
  description: 'Vibrant, whimsical digital art and custom portraits by Lakindi Chathuprabha.',
  keywords: ['digital art', 'portraits', 'commission artist', 'Sri Lanka artist', 'whimsical art'],
  openGraph: {
    title: 'Lakindi Chathuprabha | Digital Arts',
    description: 'Vibrant, whimsical digital art and custom portraits.',
    type: 'website',
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
