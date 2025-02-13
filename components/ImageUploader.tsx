/* eslint-disable @typescript-eslint/ban-ts-comment */
import type React from "react"
import { useRef } from "react"
import { useImage } from "@/context/imageContext"
import { motion } from "framer-motion"
import { Upload } from "lucide-react"

const ImageUploader = () => {
  //@ts-ignore
  const { setBase64Image } = useImage()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    const files = event.target.files
    if (files && files[0]) {
      const file = files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setBase64Image(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-64 h-64 bg-gray-700 rounded-lg shadow-lg overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-blue-400 transition-colors duration-300">
          <Upload size={48} className="mb-4" />
          <p className="text-lg font-semibold">Upload Image</p>
          <p className="text-sm mt-2">Click or drag and drop</p>
        </div>
      </motion.div>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-sm text-gray-400"
      >
        Supported formats: JPG, PNG, GIF (max 5MB)
      </motion.p>
    </motion.div>
  )
}

export default ImageUploader

