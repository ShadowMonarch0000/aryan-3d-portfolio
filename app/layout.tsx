import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aryan — Creative Developer & Digital Artist",
  description: "An anime-inspired sword battle unfolds as you scroll through Aryan's creative developer portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
