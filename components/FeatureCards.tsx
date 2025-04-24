"use client"
import React from 'react';
import { Search, Users, Trophy, TrendingUp } from 'lucide-react';
import Card from './ui/myCard';


const features = [
  {
    icon: Search,
    title: "Explore Opportunities",
    content: "Connect with like-minded students and developers. Find the right people with complementary skills to turn your ideas into reality.",
    color: "#F87171"
  },
  {
    icon: Users,
    title: "Collaborate Effectively",
    content: "Work seamlessly with your team using integrated tools and workflows. Share ideas, track progress, and achieve goals together.",
    color: "#4ADE80"
  },
  {
    icon: Trophy,
    title: "Showcase Your Talent",
    content: "Share your completed projects and gain recognition for your skills. Build an impressive portfolio for your career growth.",
    color: "#FBBF24"
  },
  {
    icon: TrendingUp,
    title: "Grow Your Skills",
    content: "Gain knowledge from your peers and mentors. Share tips, resources, and experiences to help each other succeed.",
    color: "#60A5FA"
  }
];

const FeatureCards = () => {
  return (
    <div className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              icon={feature.icon}
              title={feature.title}
              content={feature.content}
              color={feature.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
