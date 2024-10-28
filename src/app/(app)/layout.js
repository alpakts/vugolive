import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import Loading from "./loading";
import { StoreProvider } from "./store-provider";
import { AuthProvider } from "./authProvider";
const inter = Inter({ subsets: ["latin"] });
const APP_NAME = "Vugo Live";
const APP_DEFAULT_TITLE = "Vugo Live";
const APP_TITLE_TEMPLATE = "%s - Vugo Live";
const APP_DESCRIPTION = "Vugo Live!";
export const metadata = {
  applicationName: APP_NAME,
  title: "Vugo Live",
  description: "Vugo Live | Canlı Yayınlar",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};
export const viewport = {
  themeColor: "#00000",
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
