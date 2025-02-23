"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChatUser {
  id: string;
  username: string;
  profileImage?: string;
  lastSeen?: Date;
  isOnline?: boolean;
  chatId: string;
}

const ChatComponent = ({ chatUsers }: { chatUsers: ChatUser[] }) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date(date));
  };
  const uniqueChatUsers = Array.from(new Map(chatUsers.map(user => [user.id, user])).values());

  const router = useRouter();

  const handleChatClick = (chatId: string) => {
    router.push(`/chats?chatId=${chatId}`)

  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
      }}
      initial="hidden"
      animate="visible"
      className="fixed top-[20%] left-2 w-[320px] h-[700px] bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gray-800/50 p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Chat Members</h2>
        </div>
      </div>

      
      <div className="p-3 space-y-2 overflow-y-auto max-h-[calc(700px-4rem)]">
        {uniqueChatUsers.map((user, index) => (
          <motion.div
            key={user.id}
            onClick={() => handleChatClick(user.chatId)}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { 
                  delay: index * 0.1,
                  duration: 0.3 
                }
              }
            }}
            initial="hidden"
            animate="visible"
            className="group relative bg-gray-800/30 hover:bg-gray-700/50 rounded-xl p-3 transition-all duration-200"
          >
            <div className="flex items-center gap-3 cursor-pointer">
              
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  {user.profileImage ? (
                    <Image
                      src={user.profileImage}
                      alt={user.username}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                      <span className="text-xl text-gray-300">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
               
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-2 border-gray-800 rounded-full ${
                  user.isOnline ? 'bg-green-500' : 'bg-gray-500'
                }`} />
              </div>

              
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate">{user.username}</h3>
                <p className="text-sm text-gray-400">
                  {user.isOnline ? (
                    'Online'
                  ) : (
                    user.lastSeen ? 
                    `Last seen ${formatTime(user.lastSeen)}` :
                    'Offline'
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ChatComponent;