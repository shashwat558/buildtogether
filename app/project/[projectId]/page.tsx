"use client"
import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Users, Boxes, CheckCircle, XCircle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import CommentSection from '@/components/CommentSection'

interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  memberIds: string[];
  membersCount: number;
  techStack: string[];
  currentlyWorking: boolean;
  authorName: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Page = () => {
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);
  const {data:session} = useSession();
  if(!session){
    redirect("/signin")
  }
  const [loading, setLoading] = useState(true)
  const { projectId } = useParams();
  const sanitizedProjectId = projectId ?? String(projectId) ?? "";

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await fetch(`/api/project/singleproject?projectId=${sanitizedProjectId}`);
        if (res.ok) {
          const data = await res.json();
          setProjectDetails(data);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }
    getProject()
  }, [sanitizedProjectId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
        />
      </div>
    )
  }

  if (!projectDetails) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-black"
      >
        <h1 className="text-2xl font-semibold text-gray-300">Project not found</h1>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-purple-900/20 to-gray-900">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative max-w-6xl mx-auto p-4 sm:p-6 md:p-8"
      >
        {/* Header Section */}
        <motion.div 
          variants={fadeInUp}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
            >
              {projectDetails.title}
            </motion.h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
            >
              {projectDetails.currentlyWorking ? (
                <Badge variant="default" className="bg-green-500/20 text-green-300 hover:bg-green-500/30 backdrop-blur-sm">
                  <CheckCircle className="w-4 h-4 mr-1" /> Active
                </Badge>
              ) : (
                <Badge variant="default" className="bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 backdrop-blur-sm">
                  <XCircle className="w-4 h-4 mr-1" /> Completed
                </Badge>
              )}
            </motion.div>
          </div>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-300 mb-8 font-light"
          >
            {projectDetails.description}
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={projectDetails.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              
            ><Button variant={"default"}>
                <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </Button>
              
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Project Details Grid */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Team Members Card */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group"
          >
            <Card className="bg-gray-950/40 border-purple-500/20 h-full backdrop-blur-sm shadow-xl shadow-purple-500/5 transition-all duration-300 group-hover:shadow-purple-500/10">
              <CardHeader className="border-b border-purple-500/10">
                <CardTitle className="flex items-center gap-2 text-gray-100">
                  <Users className="w-5 h-5 text-purple-400" />
                  Team
                </CardTitle>
                <CardDescription className="text-gray-400">Project contributors</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                    <span className="text-sm text-gray-400">Author</span>
                    <span className="font-medium text-gray-200">{projectDetails.authorName}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/50">
                    <span className="text-sm text-gray-400">Team Size</span>
                    <span className="font-medium text-gray-200">{projectDetails.membersCount} member{projectDetails.membersCount !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm text-gray-400 block mb-3">Team Members</span>
                    <div className="flex flex-wrap gap-2">
                      {projectDetails.memberIds.map((member, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Badge variant="secondary" className="bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 transition-colors">
                            {member}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tech Stack Card */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group"
          >
            <Card className="bg-gray-950/40 border-purple-500/20 h-full backdrop-blur-sm shadow-xl shadow-purple-500/5 transition-all duration-300 group-hover:shadow-purple-500/10">
              <CardHeader className="border-b border-purple-500/10">
                <CardTitle className="flex items-center gap-2 text-gray-100">
                  <Boxes className="w-5 h-5 text-purple-400" />
                  Tech Stack
                </CardTitle>
                <CardDescription className="text-gray-400">Technologies used</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-2">
                  {projectDetails.techStack && projectDetails.techStack.length > 0 ? (
                    projectDetails.techStack.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20 transition-colors cursor-default">
                          {tech}
                        </span>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No technologies specified</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Project Status Card */}
          <motion.div
            variants={fadeInUp}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group"
          >
            <Card className="bg-gray-950/40 border-purple-500/20 h-full backdrop-blur-sm shadow-xl shadow-purple-500/5 transition-all duration-300 group-hover:shadow-purple-500/10">
              <CardHeader className="border-b border-purple-500/10">
                <CardTitle className="flex items-center gap-2 text-gray-100">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  Status
                </CardTitle>
                <CardDescription className="text-gray-400">Project progress</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50"
                  >
                    <div className={`w-3 h-3 rounded-full ${projectDetails.currentlyWorking ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span className="font-medium text-gray-200">
                      {projectDetails.currentlyWorking ? 'Active Development' : 'Completed'}
                    </span>
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-sm text-gray-400 p-3 rounded-lg bg-gray-900/50"
                  >
                    {projectDetails.currentlyWorking
                      ? 'This project is currently under active development.'
                      : 'This project has been completed.'}
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
      <CommentSection projectId={projectId as string} />
    </div>
  )
}

export default Page