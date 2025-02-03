import React from 'react';

const ProjectCardSkeleton = () => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg w-[280px] h-[320px] p-6 border border-gray-700/50 animate-pulse">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 w-3 bg-gray-700 rounded-full"></div>
        </div>

        {/* Description */}
        <div className="space-y-2 flex-grow mb-4">
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>

        {/* Footer */}
        <div className="space-y-3 pt-2 border-t border-gray-700/50">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-4/5"></div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-700"></div>
            <div className="h-4 bg-gray-700 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen w-full flex justify-center p-4">
      <div className="profile-border w-full max-w-3xl flex flex-col gap-5 p-1">
        {/* Profile Section */}
        <div className="backdrop-blur-sm bg-slate-900/50 p-8 rounded-xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image Skeleton */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-2xl overflow-hidden ring-2 ring-purple-500/20 bg-gray-700 animate-pulse"></div>
            </div>

            {/* Profile Details Skeleton */}
            <div className="flex-grow space-y-6">
              <div className="space-y-4">
                {/* Username */}
                <div className="flex items-center gap-2 ml-[10px]">
                  <div className="w-5 h-5 bg-gray-700 rounded"></div>
                  <div className="h-10 bg-gray-700 rounded w-48"></div>
                </div>

                {/* College Info */}
                <div className="flex items-center gap-3 p-2 rounded-lg">
                  <div className="w-5 h-5 bg-gray-700 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-8 bg-gray-700 rounded w-64"></div>
                    <div className="h-4 bg-gray-700 rounded w-32"></div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-5 h-5 bg-gray-700 rounded"></div>
                    <div className="h-6 bg-gray-700 rounded w-48"></div>
                  </div>
                  <div className="flex items-center gap-3 p-2">
                    <div className="w-5 h-5 bg-gray-700 rounded"></div>
                    <div className="h-6 bg-gray-700 rounded w-56"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="backdrop-blur-sm bg-slate-900/50 flex flex-col gap-3 w-full rounded-xl h-[360px] p-1">
          <div className="h-12 bg-gray-700 rounded w-72 ml-3 mt-3"></div>
          <div className="flex gap-2 overflow-x-scroll scroll-smooth h-full p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;