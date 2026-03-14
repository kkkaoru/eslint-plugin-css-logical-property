import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSS Logical Property Biome Plugin Demo",
  description: "Demo of biome-plugin-css-prefer-logical-property",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
