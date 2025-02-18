import type { Metadata } from "next";
import "./globals.css";

import LayoutBody from "@/components/LayoutBody";
import Head from "next/head";

export const metadata: Metadata = {
  title: "FilmScope",
  description: "The Ultimate Guide to Movies & TV Shows",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Movie & TV Encyclopedia" />
        <meta
          property="og:description"
          content="Discover detailed information about movies, TV shows, actors, and more!"
        />
        <meta
          property="og:image"
          content="https://filmscope.vercel.app/images/og_image.png"
        />
        {/* public/og_image.png */}
        <meta property="og:url" content="https://filmscope.vercel.app" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Movie & TV Encyclopedia" />
        <meta
          name="twitter:description"
          content="Discover detailed information about movies, TV shows, actors, and more!"
        />
        <meta
          name="twitter:image"
          content="https://filmscope.vercel.app/images/og_image.png"
        />
        {/* public/og_image.png */}
      </Head>

      <LayoutBody>{children}</LayoutBody>
    </html>
  );
}
