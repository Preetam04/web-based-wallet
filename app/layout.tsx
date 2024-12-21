import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { ContextProvider } from "@/lib/context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WalletSmith",
  description: "Generate your Ethereum and Solana wallets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />

            <Separator />
            {/* <DarkModeBtn /> */}
            {children}
          </ThemeProvider>
          <Toaster />
        </ContextProvider>
      </body>
    </html>
  );
}
