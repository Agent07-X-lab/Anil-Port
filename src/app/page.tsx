'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Experience } from '@/components/sections/experience';
import { Contact } from '@/components/sections/contact';
import Chatbot from '@/components/chatbot';

const Loader = () => (
  <motion.div
    key="loader"
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    exit={{ opacity: 0, transition: { duration: 0.5 } }}
  >
    <div className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <motion.p 
      className="mt-4 text-lg font-headline tracking-widest text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.5 } }}
    >
      LOADING PORTFOLIO...
    </motion.p>
  </motion.div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          className="flex flex-col items-center overflow-x-hidden"
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Chatbot />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
