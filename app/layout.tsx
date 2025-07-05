import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen font-sans">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">{children}</div>
      </body>
    </html>
  );
}
export const metadata = {
  title: "Learnify++",
  description: "AI Academic Assistant for Smarter Study",
};
