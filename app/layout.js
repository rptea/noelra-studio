import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { InventoryProvider } from "./context/InventoryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Noelra Studio",
  description: "Review jewelry making material records, correct inventory issues, and prepare your supplies for the next step.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <InventoryProvider>
          {children}
        </InventoryProvider>
      </body>
    </html>
  );
}
