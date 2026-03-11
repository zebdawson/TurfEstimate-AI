import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Turf Estimate",
  description: "Instant rough artificial turf estimates for homeowners."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
