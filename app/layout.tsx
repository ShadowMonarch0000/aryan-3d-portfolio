import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aryan — Creative Developer & Digital Artist",
  description: "Aryan builds immersive digital experiences, interactive 3D worlds, and thoughtful web interfaces.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
