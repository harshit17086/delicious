import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Recipe Finder",
  description: "Discover delicious recipes from around the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
