import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/lib/reactQueryConfig";

export const metadata: Metadata = {
  title: "AtraMart",
  description: "Gaming PC & Accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-iransans`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
