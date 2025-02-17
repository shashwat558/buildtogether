"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    text: "badiya(Amazing)",
    author: "Mera Dost(My friend)",
    role: "Full Stack Developer",
    rating: 5,
  },
  {
    text: "maze aa gye bhai(It's crazy good)",
    author: "another friend",
    role: "UI/UX Designer",
    rating: 5,
  },
  {
    text: "padhle b*******",
    author: "Emma Thompson",
    role: "Backend Engineer",
    rating: 4,
  },
  {
    text: "Revolutionary platform for developers!",
    author: "Alex Chen",
    role: "Software Architect",
    rating: 5,
  },
  {
    text: "The best way to find project partners",
    author: "Sarah Miller",
    role: "Product Manager",
    rating: 5,
  },
];

const TestimonialCarousel = () => {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">What People Are Saying</h1>
          <p className="text-gray-400">Hear from our amazing community</p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-gray-800/50 p-6 rounded-xl border border-purple-500/20 h-full flex flex-col"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 flex-grow">{`"${testimonial.text}"`}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {testimonial.author[0]}
                    </div>
                    <div>
                      <p className="font-medium">{`"${testimonial.author}"`}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </div>
  );
};

export default TestimonialCarousel;