import { AuthProvider } from "@/app/authProvider";
import Loading from "@/app/loading";
import { StoreProvider } from "@/app/store-provider";
import Header from "@/components/layout/header";
import { Inter } from "next/font/google";
import { Suspense } from "react";

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
