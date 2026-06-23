
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'VITALENS — Clinical Archives',
  description: 'AI-Powered Health Synthesis and Tracking Protocol.',
  icons: {
    icon: '/vitalens_favicon.svg', // Points to your public/favicon.svg file
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider afterSignInUrl="/HomePage">
      <html lang="en" className="scroll-smooth">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >

          <Provider>

            {children}

          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
