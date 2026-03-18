import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter, Roboto_Slab } from "next/font/google";
import { Providers } from "@/components/shared/providers";
import SmoothScroll from "@/components/shared/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"], // Regular, Medium
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Regular, Medium, SemiBold, Bold
});

export const metadata: Metadata = {
  title: "SHA Senior App",
  description: "Senior Year Nostalgic Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoSlab.variable} antialiased`}>
        <Providers>
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
