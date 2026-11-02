import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { InventoryProvider } from "./context/InventoryContext";
import SiteHeader from "./components/SiteHeader";

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
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable}`}
    > 
      <head>
        <link
          rel="stylesheet"
          href="https://use/typekit.net/oya2wnr.css"
        />
      </head>
      
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        
        <InventoryProvider>
          <SiteHeader />
          {children}
        </InventoryProvider>
      </body>
    </html>
  );
}
