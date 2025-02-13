"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, LogOut, LogIn, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';

interface NavBarProps {
  session?: {
    user?: {
      profileImage?: string;
    };
  };
  onSignOut?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ session, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
    <div className="w-full  top-0 left-0 right-0 z-50 px-4 py-3">
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="relative max-w-7xl mx-auto"
      >
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md rounded-2xl border border-purple-400/30 shadow-lg shadow-purple-500/20" />

        <div className="relative flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Image src="/Hammer.svg" alt="logo" height={40} width={50} />
            </motion.div>
            <span className="text-white font-semibold hidden sm:block">BuildTogether</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <motion.a
              href="/dashboard"
              variants={linkHoverVariants}
              whileHover="hover"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </motion.a>
            <motion.a
              href="/notifications"
              variants={linkHoverVariants}
              whileHover="hover"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              Notifications
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="w-4 h-4" />
              </motion.div>
            </motion.a>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                <motion.a
                  href="/profile"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400/50">
                    <Image
                      src={session.user.profileImage ?? "/profileIcon.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSignOut}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-purple-400/50 text-white hover:bg-purple-400/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block">Logout</span>
                </motion.button>
              </>
            ) : (
              <motion.a
                href="/signin"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-transparent border border-purple-400/50 text-white hover:bg-purple-400/10 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:block">Login</span>
              </motion.a>
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