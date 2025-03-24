import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "LinkedThink",
  description: "An App that generated LinkedIn Post using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <GridPattern
          width={60}
          height={60}
          className="fixed inset-0 -z-10 opacity-80 w-screen h-screen"
        />
        
        <TooltipProvider>
        {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
