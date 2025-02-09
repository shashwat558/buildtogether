"use client"

import Image from "next/image"
import { Button } from "./ui/button"
import Link from "next/link"
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined"
import { motion } from "framer-motion"
import { signOut, useSession } from "next-auth/react"
import BellIcon from "./bellIcon"

const cardVariant = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

const NavBar = () => {
  const { data: session } = useSession()

  return (
    <div className=" w-full min-w-full top-0 left-0 mb-5 right-0 z-50 flex justify-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariant}
        className="w-full max-w-7xl my-3 py-3 px-6 flex items-center justify-between rounded-2xl border border-purple-400/30 shadow-lg shadow-purple-500/20 bg-[#18181B]/75 backdrop-blur-md"
      >
        <Link href="/">
          <div className="flex-shrink-0">
            <Image
              src="/Hammer.svg"
              alt="logo"
              height={40}
              width={50}
              className="hover:opacity-80 transition-opacity"
            />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 px-4">
         
            <Link
             
              href={"/dashboard"}
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              dashboard
            </Link>
            <Link href={"/notifications"} className="flex text-gray-300 hover:text-white transition-colors text-sm font-medium items-center gap-1">
             
             Notifications
             <BellIcon />
              
            </Link>
          
        </nav>

        <div className="flex items-center gap-4">
          {session && (
            <Link href="/profile">
              <div className="text-white hover:opacity-80 transition-opacity">
                <AccountCircleOutlinedIcon className="text-[32px]" />
              </div>
            </Link>
          )}

          {session ? (
            <Button
              onClick={() => signOut()}
              variant="outline"
              className="bg-transparent text-white border-purple-400/50 hover:bg-purple-400/10"
            >
              Logout
            </Button>
          ) : (
            <Link href="/signin">
              <Button
                variant="outline"
                className="bg-transparent text-white border-purple-400/50 hover:bg-purple-400/10"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default NavBar

