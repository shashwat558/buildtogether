"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface College {
  id: string
  name: string
}

const Page = () => {
  const { data } = useSession();
  const router = useRouter();

  if(data?.user?.username !== "default"){
    router.push("/dashboard")
  }
  
 

  
  
  const userId = data?.user?.id
  console.log(userId + "-----------------------------------")
  const [username, setUsername] = useState<string>("")
  const [colleges, setColleges] = useState<College[]>([])
  const [college, setCollege] = useState<College | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const response = await fetch("/api/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, username, collegeId: college?.id }),
    })
    console.log(userId, username, college?.id)

    if (response.ok) {
      console.log("Profile updated successfully")
      router.push("/dashboard")
    } else {
      console.error("Failed to update profile")
    }
  }

  return (
    <div className="flex items-center justify-center mt-20">
      <Card className="w-[450px] bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white text-xl">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full text-white bg-gray-700 border-gray-600"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="college" className="text-white text-xl">
                Select your College
              </Label>
              <Input
                id="college"
                type="text"
                placeholder="Search for your college"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-white bg-gray-700 border-gray-600"
              />
              {loading ? (
                <p className="text-gray-400">Loading colleges...</p>
              ) : (
                <ul className="mt-2 max-h-[200px] overflow-y-auto bg-gray-700 rounded-md">
                  {colleges.map((college) => (
                    <li
                      key={college.id}
                      onClick={() => {
                        setCollege(college)
                        setSearchQuery(college.name)
                      }}
                      className="px-3 py-2 text-white cursor-pointer hover:bg-gray-600 transition-colors"
                    >
                      {college.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page

