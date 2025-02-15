import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full">
      <div className="container mx-auto">
        <div className="backdrop-blur-sm bg-black/20 rounded-lg p-3">
          <p className="text-center text-white flex items-center justify-center gap-2">
            Made with 
            <Heart className="w-4 h-4 text-red-500" /> 
            by
            <span className="font-medium">shashwat</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;