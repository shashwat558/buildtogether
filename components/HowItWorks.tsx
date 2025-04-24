"use client"
import React from 'react';
import { motion } from "framer-motion";
import { BlurIn } from './ui/blurtext';
import { UserCircle2, Rocket, Users2, Sparkles } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Create a Profile",
    description: "Add your skills & interests to showcase what you bring to the table.",
    icon: UserCircle2,
    color: "#C084FC"
  },
  {
    number: "02",
    title: "Join or Start a Project",
    description: "Find exciting projects or start your own and connect with peers.",
    icon: Rocket,
    color: "#818CF8"
  },
  {
    number: "03",
    title: "Collaborate & Build",
    description: "Work together, learn, and bring ideas to life with your team.",
    icon: Users2,
    color: "#34D399"
  }
];

const HowItWorks = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full py-32 flex flex-col items-center relative overflow-hidden"
    >
     
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-4xl text-center mb-16"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-purple-400 " style={{
            animation: "spin 5s linear infinite"
          }} />
          <span className="text-purple-400 font-medium">How It Works</span>
        </div>
        <h1 className="text-6xl max-sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          <BlurIn>
            Get Started in Three Simple Steps
          </BlurIn>
        </h1>
      </motion.div>

      <div className="relative grid gap-8 px-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group flex max-sm:flex-col  items-center gap-6 p-8 rounded-2xl bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700/50 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300 w-[600px] max-sm:w-[350px]"
            >
              <motion.div 
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className={`relative flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700`}>
                  <Icon className="w-8 h-8" style={{ color: step.color }} />
                </div>
              </motion.div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-gray-500">
                    {step.number}
                  </span>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {step.title}
                  </h2>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default HowItWorks;