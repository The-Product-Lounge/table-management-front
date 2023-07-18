import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/lib/providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TPL | MySeat",
  description: "Table management platform by The Product Lounge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
