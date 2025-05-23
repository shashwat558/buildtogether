import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full max-sm:w-[100vw]">
      <div className="container mx-auto">
        <div className="backdrop-blur-sm bg-black/20 rounded-lg p-3">
          <p className="text-center text-white flex items-center justify-center gap-2">
            Made with 
            <Heart className="w-4 h-4 text-red-500" /> 
            by
            <Link target='_blank' href={"https://github.com/shashwat558"}><span className="font-medium">shashwat</span></Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;