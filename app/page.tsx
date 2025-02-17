"use client"
import React from 'react';
import { motion } from "framer-motion";
import { Sparkles } from 'lucide-react';
import { BlurIn } from '@/components/ui/blurtext';
import FeatureCards from '@/components/FeatureCards';
import HowItWorks from '@/components/HowItWorks';
import TestimonialCarousel from '@/components/TestimonialCarousel';
;

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import GitHubButton from '@/components/GtihubButton';

function App() {
  const {data: session} = useSession();
  if(session){
    redirect("/dashboard")
  }
  
  return (
    <div className="min-h-screen border-purple-500 border-[1px] rounded-lg bg-gray-900 text-white overflow-hidden">
      <GitHubButton />
      
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

      {/* Statistics Section */}
     

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Carousel */}
      <TestimonialCarousel />
    </div>
  );
}

export default App;