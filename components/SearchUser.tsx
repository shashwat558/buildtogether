'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'; // Added import for React

interface UserProps {
  username: string
  profileImage: string
}

interface CollegeProps {
  name: string
  id: string
}

export default function SearchUser() {
  const [users, setUsers] = useState<UserProps[] | null>(null)
  const [colleges, setColleges] = useState<CollegeProps[] | null>(null)
  const [searchUserParams, setSearchUserParams] = useState("")
  const [searchCollegeParams, setSearchCollegeParams] = useState("")
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const [isLoadingColleges, setIsLoadingColleges] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchUsers = async () => {
      if (searchUserParams.length < 3) {
        setUsers(null)
        return
      }

      setIsLoadingUsers(true)
      try {
        const response = await fetch(`/api/getUsers?query=${searchUserParams}`)
        if (response.ok) {
          const data = await response.json()
          setUsers(data)
        } else {
          console.error("Failed to fetch users")
        }
      } catch (error) {
        console.error("Error fetching users:", error)
      } finally {
        setIsLoadingUsers(false)
      }
    }

    const timeoutId = setTimeout(fetchUsers, 300)
    return () => clearTimeout(timeoutId)
  }, [searchUserParams])

  useEffect(() => {
    const fetchColleges = async () => {
      if (searchCollegeParams.length < 3) {
        setColleges(null)
        return
      }

      setIsLoadingColleges(true)
      try {
        const response = await fetch(`/api/colleges?query=${searchCollegeParams}`)
        if (response.ok) {
          const data = await response.json()
          setColleges(data)
        } else {
          console.error("Failed to fetch colleges")
        }
      } catch (error) {
        console.error("Error fetching colleges:", error)
      } finally {
        setIsLoadingColleges(false)
      }
    }

    const timeoutId = setTimeout(fetchColleges, 300)
    return () => clearTimeout(timeoutId)
  }, [searchCollegeParams])

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto p-4 rounded-lg shadow-lg"
    >
      
      <div className="flex flex-col md:flex-row justify-center items-start gap-5">
        <SearchBox
          placeholder="Search users..."
          value={searchUserParams}
          onChange={(e) => setSearchUserParams(e.target.value)}
          isLoading={isLoadingUsers}
          results={users}
          onResultClick={(item) => router.push(`/user/${item.username}`)}
          renderResult={(user) => user.username}
        />
        <SearchBox
          placeholder="Search colleges..."
          value={searchCollegeParams}
          onChange={(e) => setSearchCollegeParams(e.target.value)}
          isLoading={isLoadingColleges}
          results={colleges}
          onResultClick={(item) => router.push(`/college/${item.id}`)}
          renderResult={(college) => college.name}
        />
      </div>
    </motion.div>
  )
}

interface SearchBoxProps<T> {
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  results: T[] | null
  onResultClick: (item: T) => void
  renderResult: (item: T) => string
}

function SearchBox<T>({
  placeholder,
  value,
  onChange,
  isLoading,
  results,
  onResultClick,
  renderResult
}: SearchBoxProps<T>) {
  return (
    <div className="relative w-full md:w-64">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-700 text-white placeholder-gray-400 border-gray-600 focus:border-blue-500"
      />
      {isLoading && (
        <div className="absolute right-2 top-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        </div>
      )}
      {results && results.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-sm text-white"
              onClick={() => onResultClick(item)}
            >
              {renderResult(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
