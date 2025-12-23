import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Падрыхтоўка да ЦТ і ЦЭ 2025",
  description: "Сайт для падрыхтоўкі да цэнтралізаванага тэсціравання і цэнтралізаванага экзамену",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="be">
      <body className="antialiased">{children}</body>
    </html>
  );
}

