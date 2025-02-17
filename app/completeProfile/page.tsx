/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import ImageUploader from "@/components/ImageUploader"
import { useImage } from "@/context/imageContext"
import Image from "next/image"
import { Github, Loader2 } from "lucide-react"

interface College {
  id: string
  name: string
}

const Page = () => {
  const { data: session, update: sessionUpdate } = useSession()
  const userId = session?.user?.id
  
  const router = useRouter()
  if(session?.user?.username !== null){
    router.push("/dashboard");
  }

  const [username, setUsername] = useState<string>("")
  const [colleges, setColleges] = useState<College[]>([])
  const [githubUsername, setGithubUsername] = useState<string>("")
  const [college, setCollege] = useState<College | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  //@ts-ignore
  const { base64Image } = useImage()

  useEffect(() => {
    if (searchQuery.length < 3) {
      setColleges([])
      return
    }

    const timeOutId = setTimeout(async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/colleges?query=${searchQuery}`)
        if (response.ok) {
          const data = await response.json()
          setColleges(data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeOutId)
  }, [searchQuery])

  const handleSubmitAndUpdateSession = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch("/api/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, username, collegeId: college?.id, profileImage: base64Image, githubUsername }),
    })

    if (response.ok) {
      await sessionUpdate({
        newData: { username: username },
      })
      
      router.push("/dashboard")
    } else {
      console.error("Failed to update profile")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br p-4 w-[682px]"
    >
      <Card className="w-full   bg-gray-800 border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white text-center">Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitAndUpdateSession} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <Label htmlFor="username"  className="text-white text-lg">
                Username
              </Label>
              <Input
                id="username"
                required
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-white bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <Label htmlFor="githubUsername" className="text-white text-lg">
                Github Username
              </Label>
              <div className="relative">
                <Input
                  required
                  id="githubUsername"
                  type="text"
                  placeholder="Enter your github username"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  className="w-full text-white bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500 pl-10"
                />
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <Label htmlFor="college" className="text-white text-lg">
                Select your College
              </Label>
              <Input
              required
                id="college"
                type="text"
                placeholder="Search for your college"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-white bg-gray-700 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="animate-spin text-blue-500" size={24} />
                </div>
              ) : (
                <ul className="mt-2 max-h-[200px] overflow-y-auto bg-gray-700 rounded-md">
                  {colleges.map((college) => (
                    <motion.li
                      key={college.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => {
                        setCollege(college)
                        setSearchQuery(college.name)
                      }}
                      className="px-3 py-2 text-white cursor-pointer hover:bg-gray-600 transition-colors"
                    >
                      {college.name}
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <ImageUploader />
              {base64Image && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 flex justify-center">
                  <Image
                    width={100}
                    height={100}
                    src={base64Image || "/placeholder.svg"}
                    alt="preview"
                    className="rounded-full object-cover"
                  />
                </motion.div>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                Complete Profile
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Page

