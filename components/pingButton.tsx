"use client"
import { useSession } from "next-auth/react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import UsePingWebSocket from "@/hooks/useWebSocket";

interface PingButtonProps {
  receiverId: string;
  projectId: string;
  projectName: string;
  senderName: string;
}

const PingButton: React.FC<PingButtonProps> = ({
  receiverId,
  projectId,
  projectName,
  senderName
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (!userId || userId === receiverId) {
    return null;
  }

  const { sendPing } = UsePingWebSocket({ userId });

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const bellVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: [0, 15, -15, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={() => sendPing({ receiverId, projectId, projectName, senderName })}
      className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
    >
      <div className="flex items-center gap-2">
        <motion.div variants={bellVariants}>
          <Bell className="w-4 h-4 text-purple-400" />
        </motion.div>
        <span className="text-sm font-medium">Ping</span>
      </div>
    </motion.button>
  );
};

export default PingButton;