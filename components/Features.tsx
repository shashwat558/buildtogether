"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, FileCode2 } from 'lucide-react';

const features = [
  {
    icon: <FileCode2 className="w-8 h-8 text-purple-400" />,
    title: "Post Your Projects",
    description: "Share your innovative projects with the community. Get feedback, find collaborators, and showcase your work to the world.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <Send className="w-8 h-8 text-blue-400" />,
    title: "Connect with Authors",
    description: "Interested in a project? Ping the authors directly to discuss collaboration opportunities and bring ideas to life.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-green-400" />,
    title: "Real-time Chat",
    description: "Communicate seamlessly with other users through our integrated chat system. Build relationships and foster collaboration.",
    gradient: "from-green-500 to-emerald-500"
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative p-6 rounded-2xl bg-gray-800/50 border border-gray-700 backdrop-blur-sm"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 rounded-2xl`} />
      <div className="relative">
        <div className="mb-4">{feature.icon}</div>
        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
        <p className="text-gray-400">{feature.description}</p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Developers
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to collaborate on amazing projects and connect with fellow developers.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;