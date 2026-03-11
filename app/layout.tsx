import type { Metadata } from "next";
import "./globals.css";
import { pilotClientConfig } from "@/lib/config/pilotClient";

export const metadata: Metadata = {
  title: `${pilotClientConfig.businessName} | Instant Turf Estimate`,
  description: "Step-based landscape estimator demo for pilot sales presentations."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
