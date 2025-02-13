import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, x: -100, rotate: 0 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 1 },
  },
  floating: {
    y: [0, -10, 0], // Moves up and down
    transition: {
      repeat: Infinity, // Infinite loop
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const Card = ({
  color,
  title,
  content,
  rotate,
  icon,
  x,
}: {
  color: string;
  title: string;
  content: string;
  rotate: number;
  icon: React.ReactNode;
  x: number;
}) => {
  return (
    <motion.div
      variants={{
  hidden: { opacity: 0, x: x, rotate: 0 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: rotate,
    transition: { duration: 1 },
  },
  floating: {
    y: [0, -5, 0], // Moves up and down
    transition: {
      repeat: Infinity, // Infinite loop
      duration: 4,
      ease: "easeInOut",
    },
  },
}}
      initial="hidden"
       animate={["visible", "floating"]}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        transition: { type: "spring", stiffness: 150 },
      }}
      
      className={`h-72 w-56 rounded-3xl gap-3 flex flex-col ${color} p-5 text-white border-[1px] shadow-md hover:bg-[#18181B]`}
    >
      <div className="flex flex-row items-center">
        <h1 className="text-3xl capitalize">{title}</h1>
        <div className="scale-150">{icon}</div>
      </div>
      <p className="hover:text-lg text-md">{content}</p>
    </motion.div>
  );
};

export default Card;
