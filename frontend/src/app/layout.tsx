import type { Metadata } from "next";
import { Poppins } from "next/font/google"
import "./globals.css";
import { Providers } from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
}) 


export const metadata: Metadata = {
  title: "DT Money",
  description: "Financial control application built with Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      > 
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
