"use client"
import React from 'react';
import { motion } from "framer-motion";
import { Sparkles } from 'lucide-react';
import { BlurIn } from '@/components/ui/blurtext';
import FeatureCards from '@/components/FeatureCards';
import HowItWorks from '@/components/HowItWorks';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function App() {
  const {data: session} = useSession();
  if(session){
    redirect("/dashboard")
  }
  
  return (
    <div className="min-h-screen border-purple-500 border-[1px] rounded-lg bg-gray-900 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative w-full pt-16 md:pt-32 pb-12 md:pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto text-center px-4"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
            <span className="text-purple-400 font-medium text-sm md:text-base">Welcome to the Future</span>
          </div>
          <BlurIn>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Discover, Collaborate, Build
            </h1>
          </BlurIn>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-12">
            Connect with peers to bring amazing projects to life
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
          >
            <Link href={"/signin"}>Get Started</Link>
          </motion.button>
        </motion.div>
      </div>

      {/* Feature Cards Section */}
      <FeatureCards />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <div className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Are Saying</h2>
            <p className="text-gray-400">Hear from our amazing community</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-800/50 p-6 rounded-xl border border-purple-500/20"
            >
              <p className="text-gray-300 mb-4">{"badiya(Amazing)"}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                <div>
                  <p className="font-medium">Mera Dost(My friend)</p>
                  <p className="text-sm text-gray-400">Full Stack Developer</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-800/50 p-6 rounded-xl border border-purple-500/20"
            >
              <p className="text-gray-300 mb-4">{"maze aa gye bhai(It's crazy good)"}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                <div>
                  <p className="font-medium">(another friend)</p>
                  <p className="text-sm text-gray-400">UI/UX Designer</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-800/50 p-6 rounded-xl border border-purple-500/20"
            >
              <p className="text-gray-300 mb-4">{"padhle b*******"}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-blue-500" />
                <div>
                  <p className="font-medium">Emma Thompson</p>
                  <p className="text-sm text-gray-400">Backend Engineer</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;