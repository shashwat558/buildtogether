import type { Metadata } from "next";
import { Geist} from "next/font/google";
import "./globals.css";
import { BackgroundBeams } from "@/components/ui/background-beams";
import NavBar from "@/components/NavBar";

import { auth } from "./auth";
import SessionProviderComponent from "@/components/SessionProviderComponent";
import { ImageProvider } from "@/context/imageContext";
import Drag from "@/components/cursorFollower";
import NextTopLoader from 'nextjs-toploader';
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react"


const giest = Geist({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
  preload: true
})

// const jersey = Jersey_15({

//   subsets: ["latin"],
//   weight: "400"
// })



export const metadata: Metadata = {
  title: "BuildTogether - Collaborate on Projects",
  description: "Join BuildTogether to collaborate with developers worldwide!",
  keywords: ["collaboration", "open source", "developers", "projects"],
  authors: [{ name: "BuildTogether Team" }],
  icons: "/Hammer.svg",
  openGraph: {
    title: "BuildTogether - Collaborate on Projects",
    description: "Join BuildTogether to collaborate with developers worldwide!",
    url: "https://buildtogether.vercel.app",
    siteName: "BuildTogether",
    images: [
      {
        url: "https://buildtogether.vercel.app/banner.jpg",
        width: 1200,
        height: 630,
        alt: "BuildTogether Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildTogether - Collaborate on Projects",
    description: "Join BuildTogether to collaborate with developers worldwide!",
    images: ["https://buildtogether.vercel.app/banner.jpg"],
  },
};


export default async  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <html lang="en">
      <head>
        
        
      </head>
      <body
        className={`${giest.className} antialiased bg-zinc-900 scroll-m-0 flex flex-col justify-center items-center`}
      >
        <Analytics />
        <SessionProviderComponent session={session}>
          <NextTopLoader color="rgb(157, 0, 255)"/>
        <BackgroundBeams className="z-[-10]"/>
        <NavBar />

        <ImageProvider>
          
          {children}
        </ImageProvider>
        <Drag />
        
        </SessionProviderComponent>
        <Footer />
      </body>
    </html>
  );
}
