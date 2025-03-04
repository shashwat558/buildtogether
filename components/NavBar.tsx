"use client"
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, LogOut, LogIn, Menu, X, MessageCircleMoreIcon } from 'lucide-react';

import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import UsePingWebSocket from '@/hooks/useWebSocket';



const NavBar: React.FC= () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevPingCount, setPrevPingCount] = useState(0);
  const [prevMessagesCount, setPrevMessagesCount] = useState(0);
  const {data: session} = useSession();
  const {recievedPings, messages} = UsePingWebSocket({userId: session?.user?.id ?? ""});
  console.log(recievedPings)
  
   
  useEffect(() => {
  setPrevPingCount(recievedPings?.length ?? 0);
  setPrevMessagesCount(messages?.length ?? 0);
}, [recievedPings?.length, messages?.length]);



 

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const linkHoverVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="w-full sm:w-full top-0 left-0 right-0 z-50 px-4 py-3">
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="relative max-w-7xl mx-auto"
      >
        
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl border border-purple-400/30 shadow-lg shadow-purple-500/20" />

        <div className="relative flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href={"/"}>
          <motion.div
            
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Image src="/Hammer.svg" alt="logo" height={50} width={50} />
             
            </motion.div>
            <span className="text-white font-semibold hidden sm:block">BuildTogether</span>
            
          </motion.div>
          </Link>
          
          

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <motion.div
              
              variants={linkHoverVariants}
              whileHover="hover"
              className="text-gray-300 hover:text-white transition-colors"
            >
             <Link href={"/dashboard"}>Dashboard</Link> 
            </motion.div>
            <motion.div
              
              variants={linkHoverVariants}
              whileHover="hover"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Link href={"/notifications"}>
               Notifications <span>{prevPingCount !== 0 ? prevPingCount: ""}</span>
              </Link>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="w-4 h-4" />
              </motion.div>
            </motion.div>
            <motion.div
              
              variants={linkHoverVariants}
              whileHover="hover"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            ><Link href={"/chats"}>Chats <span>{prevMessagesCount !== 0 ? prevMessagesCount : ""}</span></Link>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MessageCircleMoreIcon className="w-4 h-4" />
              </motion.div>
              
            </motion.div>
            <motion.div
              
              variants={linkHoverVariants}
              whileHover="hover"
              className="text-gray-300 hover:text-white transition-colors"
            >
             <Link href={"/leaderboard"}>Leaderboard</Link> 
            </motion.div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                <motion.div
                 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Link href={"/profile"}>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400/50">
                    <Image
                      src={session.user.profileImage ?? "/builder.svg"}
                      alt="Profile"
                      width={50} height={50}
                    />
                  </div>
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-purple-400/50 text-white hover:bg-purple-400/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Logout</span>
                </motion.button>
              </>
            ) : (
              <motion.div
                
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-purple-400/50 text-white hover:bg-purple-400/10 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <Link href={"/signin"}><span className="hidden sm:block">Login</span></Link>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-purple-400/10 rounded-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute top-full left-0 right-0 mt-2 p-4 bg-gray-900/95 backdrop-blur-md border border-purple-400/30 rounded-xl md:hidden"
            >
              <div className="flex flex-col gap-4">
                <a
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-purple-400/10"
                >
                  Dashboard
                </a>
                <a
                  href="/notifications"
                  className="flex items-center justify-between text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-purple-400/10"
                >
                  Notifications
                  <Bell className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default NavBar;