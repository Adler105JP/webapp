import localFont from "next/font/local";
import "./globals.css";
import { AuthPorvider } from "./context/authContext";
import DashboardHeader from "@/components/ui/header";

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
  title: "Dashborad",
  description: "System from administration of logs",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthPorvider>
          <DashboardHeader />
          {children}
        </AuthPorvider>
      </body>
    </html>
    
  );
}
