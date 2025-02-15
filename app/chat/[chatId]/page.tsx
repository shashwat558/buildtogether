"use client"
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Clock, Check, CheckCheck } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatUser {
  id: string;
  username: string;
  profileImage?: string;
  lastSeen?: Date;
  isOnline?: boolean;
}

const ChatPage = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated data - replace with actual API calls
  useEffect(() => {
    const getChats = async () => {
        
    }
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      senderId: session?.user?.id || '',
      receiverId: selectedUser.id,
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen  text-white p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-xl border border-purple-500/20 shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-4 min-h-[80vh]">
            {/* Users List */}
            <div className="col-span-1 border-r border-gray-700/50">
              <div className="p-4 border-b border-gray-700/50">
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Chats
                </h2>
              </div>
              <div className="overflow-y-auto h-[calc(80vh-4rem)]">
                <AnimatePresence>
                  {users.map((user) => (
                    <motion.button
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedUser(user)}
                      className={`w-full p-4 flex items-center gap-3 hover:bg-gray-700/30 transition-colors ${
                        selectedUser?.id === user.id ? 'bg-gray-700/50' : ''
                      }`}
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-400" />
                        </div>
                        {user.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{user.username}</p>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {user.isOnline ? 'Online' : `Last seen ${formatTime(user.lastSeen!)}`}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-3 flex flex-col">
              {selectedUser ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-700/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">{selectedUser.username}</h3>
                      <p className="text-sm text-gray-400">
                        {selectedUser.isOnline ? 'Online' : `Last seen ${formatTime(selectedUser.lastSeen!)}`}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className={`flex ${
                            message.senderId === session?.user?.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.senderId === session?.user?.id
                                ? 'bg-purple-500/20 rounded-br-none'
                                : 'bg-gray-700/50 rounded-bl-none'
                            }`}
                          >
                            <p>{message.content}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                              <span>{formatTime(message.timestamp)}</span>
                              {message.senderId === session?.user?.id && (
                                message.status === 'read' ? (
                                  <CheckCheck className="w-4 h-4 text-blue-400" />
                                ) : (
                                  <Check className="w-4 h-4" />
                                )
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-700/50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="p-2 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <User className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-xl font-medium">Select a chat to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChatPage;