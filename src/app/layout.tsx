import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lime Weather",
  description: "A modern, animated real-time weather app",
  icons: {
    icon: '/img/icon.png',
    apple: '/img/icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
