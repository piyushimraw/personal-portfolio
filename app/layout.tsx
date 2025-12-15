import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Piyush Shrivastava | Staff Software Engineer",
  description:
    "Full Stack Developer specializing in React, Node.js, Golang, and building scalable web applications. Experienced in developing mobile and web applications at MindTickle, Squadcast, and Leena AI.",
  keywords: [
    "Staff Software Engineer",
    "Full Stack Developer",
    "React",
    "Node.js",
    "Golang",
    "Next.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
