import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import { Navbar } from "./_components/Navbar";
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { MySessionProvider } from "./_providers/MySessionProvider";
import { CartProvider } from "./_providers/CartContext";


const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  fallback: ["Exo Fallback"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
        <title>freshCart</title>
      </head>
      <body
        className={`${exo.variable} antialiased`}
      >
        <MySessionProvider>
          <CartProvider>
            <Navbar />
            <Toaster richColors />
            {children}
            <Footer />
          </CartProvider>
        </MySessionProvider>

      </body>
    </html>
  );
}
