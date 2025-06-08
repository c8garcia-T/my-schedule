import type { Metadata } from "next";
import { Lexend } from "next/font/google";

import "./globals.css";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Schedule",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${lexend.className}`}>{children}</body>
    </html>
  );
}
