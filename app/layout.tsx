import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/lib/reactQueryConfig";
import { ReactNode } from "react";
import ThemeContextProvider from "@/context/themeContext";

export const metadata: Metadata = {
  title: "GameShop",
  description: "Gaming PC & Accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full font-iransans`}>
        <QueryProvider>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
