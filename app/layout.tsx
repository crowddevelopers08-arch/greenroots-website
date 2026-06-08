import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const outfit = Manrope({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Fraunces({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Green Roots - Premium Collection",
  description: "Green Roots — premium clothing, accessories, and gifts available by enquiry.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "theme-color": "#111d12",
    "msapplication-TileColor": "#111d12",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorant.variable}`}>
      <body className="font-[var(--font-outfit)] antialiased">{children}</body>
    </html>
  );
}
