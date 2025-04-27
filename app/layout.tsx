"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createContext, ReactElement, useContext, useState } from "react";
import Head from "next/head";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: 'My Blog',
  description: '...',
}

export interface ContextType {
  title: string,
  icon: string,
  active: boolean,
  isFront: boolean,
  fullscreen: boolean,
  onTray: boolean
}

export interface GlobalContextValue {
  context: ContextType[];
  setContext: React.Dispatch<React.SetStateAction<ContextType[]>>;
}

export const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [context, setContext] = useState<ContextType[]>([{title: "App1", icon: "./github.png", active: false, isFront: false, fullscreen: false, onTray: false}, {title: "App2", icon: "./telegram.png", active: false, isFront: false, fullscreen: false, onTray: false}, {title: "Kolbász", icon: "./volume.png", active: false, isFront: false, fullscreen: false, onTray: false}])
  return (
    <GlobalContext.Provider value={{context, setContext}}>
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}>
        {children}
      </body>
    </html>
    </GlobalContext.Provider>
  );
}
