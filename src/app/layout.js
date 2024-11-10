import localFont from "next/font/local";
import "../styles/globals.css";
import Navbar from "@/components/application-wrapper/Navbar";
import Footer from "@/components/application-wrapper/Footer";
import ThemeWrapper from "./theme-wrapper";
import ProfileNavbar from "@/components/application-wrapper/ProfileNavbar";
import PrelineScript from "@/components/PrelineScript";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`} >
        <ThemeWrapper>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeWrapper>
      </body>
      <PrelineScript />
    </html>
  );
}
