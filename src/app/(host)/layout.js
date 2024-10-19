import { AuthProvider } from "@/app/(app)/authProvider";
import Loading from "@/app/(app)/loading";
import { StoreProvider } from "@/app/(app)/store-provider";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

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
      <div className="max-w-4xl mx-auto min-h-screen">
      {children}
      </div>
      </Suspense>
      </AuthProvider>
      </StoreProvider>
      </body>
    </html>
  );
}
