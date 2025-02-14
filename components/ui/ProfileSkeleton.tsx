import React from 'react';
import { motion } from 'framer-motion';
import { School, MapPin, Github, Mail, User, Code } from 'lucide-react';

const ProjectCardSkeleton = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 shadow-lg p-6 h-[320px] animate-pulse">
      <div className="flex flex-col h-full">
        {/* Title */}
        <div className="flex items-start justify-between mb-6">
          <div className="h-7 bg-gray-700/50 rounded-lg w-3/4"></div>
          <div className="h-4 w-4 bg-gray-700/50 rounded-full"></div>
        </div>

        {/* Description */}
        <div className="space-y-3 flex-grow">
          <div className="h-4 bg-gray-700/50 rounded-lg w-full"></div>
          <div className="h-4 bg-gray-700/50 rounded-lg w-5/6"></div>
          <div className="h-4 bg-gray-700/50 rounded-lg w-4/6"></div>
        </div>

        {/* Footer */}
        <div className="space-y-4 pt-4 mt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-700/50 rounded-lg"></div>
            <div className="h-5 bg-gray-700/50 rounded-lg w-4/5"></div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-700/50"></div>
            <div className="h-5 bg-gray-700/50 rounded-lg w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full bg-gray-900 py-8 px-4"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 blur-3xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-md rounded-2xl border border-purple-500/20 shadow-xl">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Profile Image Skeleton */}
                <div className="flex-shrink-0">
                  <div className="w-56 h-56 rounded-2xl overflow-hidden ring-4 ring-purple-500/30 shadow-2xl">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700/50 to-gray-600/50 animate-pulse"></div>
                  </div>
                </div>

                {/* Profile Details Skeleton */}
                <div className="flex-grow space-y-8">
                  <div className="space-y-6">
                    {/* Username */}
                    <div className="flex items-center gap-3">
                      <User className="w-8 h-8 text-purple-400/50" />
                      <div className="h-10 bg-gray-700/50 rounded-lg w-64 animate-pulse"></div>
                    </div>

                    <div className="space-y-4">
                      {/* College Info */}
                      <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/50">
                        <School className="w-6 h-6 text-purple-400/50" />
                        <div className="space-y-2">
                          <div className="h-8 bg-gray-700/50 rounded-lg w-72 animate-pulse"></div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400/50" />
                            <div className="h-4 bg-gray-700/50 rounded-lg w-32 animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/50">
                        <Mail className="w-6 h-6 text-pink-400/50" />
                        <div className="h-6 bg-gray-700/50 rounded-lg w-64 animate-pulse"></div>
                      </div>

                      {/* Github */}
                      <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/50">
                        <Github className="w-6 h-6 text-blue-400/50" />
                        <div className="h-6 bg-gray-700/50 rounded-lg w-72 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-md rounded-2xl border border-purple-500/20 shadow-xl p-8">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-8">
              <Code className="w-8 h-8 text-purple-400/50" />
              <div className="h-8 bg-gray-700/50 rounded-lg w-48 animate-pulse"></div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
              {[1, 2, 3].map((i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileSkeleton;