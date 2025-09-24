import type { Metadata } from "next";

import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import ToasterProvider from "@/lib/provider/ToasterProvider";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QA Store",
  description: "QA Store with NextJS 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <ClerkProvider>
          <ToasterProvider />
          <Navbar />
        {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
