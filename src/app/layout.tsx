import type { Metadata } from "next";
import "./globals.css";

import LayoutBody from "@/components/LayoutBody";

export const metadata: Metadata = {
  title: "FilmScope",
  description: "The Ultimate Guide to Movies & TV Shows",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "FilmScope - The Ultimate Guide to Movies & TV Shows",
    description:
      "Discover detailed information about movies, TV shows, actors, and more!",
    images: [{ url: "https://filmscope.vercel.app/og_image.png" }],
    url: "https://filmscope.vercel.app",
  },
  twitter: {
    card: "summary",
    title: "FilmScope - The Ultimate Guide to Movies & TV Shows",
    description:
      "Discover detailed information about movies, TV shows, actors, and more!",
    images: [{ url: "https://filmscope.vercel.app/og_image.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LayoutBody>{children}</LayoutBody>
    </html>
  );
}
