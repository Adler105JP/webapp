import localFont from "next/font/local";
import "./globals.css";
import { AuthPorvider } from "./context/authContext";
import DashboardHeader from "@/components/ui/header";
import { ThemeProvider } from "next-themes";

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
  title: "NeoTech Platform",
  description: "System from administration by NeoTech",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthPorvider>
            <DashboardHeader />
            {children}
          </AuthPorvider>
        </ThemeProvider>
      </body>
    </html>
    
  );
}
