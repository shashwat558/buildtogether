import type { Metadata } from "next";
import { Geist} from "next/font/google";
import "./globals.css";
import { BackgroundBeams } from "@/components/ui/background-beams";
import NavBar from "@/components/NavBar";

import { auth } from "./auth";
import SessionProviderComponent from "@/components/SessionProviderComponent";
import { ImageProvider } from "@/context/imageContext";
import Drag from "@/components/cursorFollower";

const giest = Geist({
  weight: "500",
  subsets: ["latin"]
})

// const jersey = Jersey_15({

//   subsets: ["latin"],
//   weight: "400"
// })



export const metadata: Metadata = {
  title: "buildtogether",
  description: "An app to see what your peers are working on",
};

export default async  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${giest.className} antialiased bg-zinc-900 scroll-m-0 flex flex-col justify-center items-center`}
      >
        <SessionProviderComponent session={session}>
        <BackgroundBeams className="z-[-10]"/>
        <NavBar />
        <ImageProvider>
          
          {children}
        </ImageProvider>
        <Drag />
        
        </SessionProviderComponent>
      </body>
    </html>
  );
}
