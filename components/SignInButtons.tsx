"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {  Loader2, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Hammer from "./ui/Hammer";


export default function SignInButtons() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-r blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <Card className="bg-gray-800/50 backdrop-blur-md border-purple-500/20 shadow-xl p-8">
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1
              }}
            >
              <Hammer />
            </motion.div>

            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Welcome 
              </h1>
              <p className="text-gray-400">Sign in to continue building together</p>
            </div>

            <div className="w-full space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="w-full h-12 bg-white hover:bg-gray-100 text-gray-900 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Mail className="mr-2 h-5 w-5" />
                  )}
                  {loading ? "Signing in..." : "Continue with Google"}
                </Button>
              </motion.div>

              
            </div>

            <p className="text-sm text-gray-400 mt-6">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}