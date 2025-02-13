import React from 'react'
import {motion} from "framer-motion";
import Card from './ui/myCard'
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
const FeatureCards = () => {
  return (
    <motion.div variants={{
      
    }} className='flex justify-center gap-16 items-center mt-20'>
        <Card icon={<SearchOutlinedIcon />} color='border-red-500' rotate='rotate-[7deg]' title='Explore Opportunities' content='Connect with like-minded students and developers. Find the right people with complementary skills to turn your ideas into reality.'/>

        <Card icon={<GroupsOutlinedIcon />} color='border-green-500' title='Collaborate Effectively' content='Connect with like-minded students and developers. Find the right people with complementary skills to turn your ideas into reality.' rotate='rotate-[-7deg]' />

        <Card icon={<ConstructionOutlinedIcon />} color='border-yellow-500' title='Showcase Your Talent' content='Share your completed projects and gain recognition for your skills. Build an impressive portfolio for your career growth.' rotate='rotate-[5deg]'/>

        <Card icon={<TrendingUpOutlinedIcon />} color='border-blue-500' rotate="rotate-[-8deg]" title='Grow-Up Your Skills' content='Gain knowledge from your peers and mentors. Share tips, resources, and experiences to help each other succeed.'/>
        
    </motion.div>
  )
}

export default FeatureCards