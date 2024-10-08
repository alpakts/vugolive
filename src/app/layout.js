import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import Loading from "./loading";
import { StoreProvider } from "./store-provider";
import { AuthProvider } from "./authProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Vugo Live",
  description: "Vugo Live | Canlı Yayınlar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
 
      <body className={inter.className}>
      <StoreProvider>
      <AuthProvider>
      <Suspense fallback={<Loading/>}>
      <Header />
      <div className="max-w-4xl mx-auto min-h-screen">
      {children}
      </div>
      <Footer/>
      </Suspense>
      </AuthProvider>
      </StoreProvider>
      </body>
    </html>
  );
}
