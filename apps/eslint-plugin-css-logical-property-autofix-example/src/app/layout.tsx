import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CSS Logical Property Plugin Demo",
  description: "Demo of eslint-plugin-css-logical-property-autofix",
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
