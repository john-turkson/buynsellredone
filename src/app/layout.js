import localFont from "next/font/local";
import "../styles/globals.css";
import Footer from "@/components/application-wrapper/Footer";
import ThemeWrapper from "./theme-wrapper";
import NavbarSelector from "@/components/application-wrapper/NavbarSelector";
import PrelineScript from "@/components/PrelineScript";
import SessionWrapper from "@/context/SessionWrapper";
import Navbar from "@/components/application-wrapper/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "BuynSell",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
        <SessionWrapper>
          <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`} >
              <ThemeWrapper>
                <NavbarSelector />
                <main className="flex-grow">{children}</main>
                <Footer />
              </ThemeWrapper>
          </body>
        </SessionWrapper>
        <PrelineScript />
    </html>
  );
}
