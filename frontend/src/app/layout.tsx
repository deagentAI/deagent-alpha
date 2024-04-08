import type { Metadata } from "next";
import type { Viewport } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

const Header = dynamic(() => import("@comp/global/header"));
const Footer = dynamic(() => import("@comp/global/footer"));

import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deagent ai",
  description: "deagent ai",
  keywords: ["Deagent ai", "ai", "chatbot"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
