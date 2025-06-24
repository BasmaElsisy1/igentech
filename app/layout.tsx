import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { InterFont } from "./fonts";

export const metadata: Metadata = {
  title: "IgenTech Task",
  description: "IgenTech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${InterFont.className}`}
      >
        {children}
      </body>
    </html>
  );
}
