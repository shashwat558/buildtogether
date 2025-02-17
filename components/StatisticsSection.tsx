"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code2, GitFork, Trophy } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '1,000+',
    label: 'Active Users',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Code2,
    value: '500+',
    label: 'Projects Created',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: GitFork,
    value: '2,000+',
    label: 'Collaborations',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Trophy,
    value: '100+',
    label: 'Success Stories',
    color: 'from-yellow-500 to-orange-500',
  },
];

const StatisticsSection = () => {
  return (
    <div className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-purple-500/5 to-gray-900/0" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
          <p className="text-gray-400">Growing stronger with every collaboration</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <div className="relative bg-gray-800/50 border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;