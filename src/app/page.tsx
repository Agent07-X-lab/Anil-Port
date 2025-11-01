'use client';

import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/sections/hero';

// Lazy load below-the-fold components for faster initial load
const About = lazy(() => import('@/components/sections/about').then(module => ({ default: module.About })));
const Skills = lazy(() => import('@/components/sections/skills').then(module => ({ default: module.Skills })));
const Projects = lazy(() => import('@/components/sections/projects').then(module => ({ default: module.Projects })));
const Experience = lazy(() => import('@/components/sections/experience').then(module => ({ default: module.Experience })));
const Contact = lazy(() => import('@/components/sections/contact').then(module => ({ default: module.Contact })));

const Loader = () => (
  <motion.div
    key="loader"
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    exit={{ opacity: 0, transition: { duration: 0.3 } }}
  >
    <div className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <motion.p 
      className="mt-4 text-lg font-headline tracking-widest text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2, duration: 0.3 } }}
    >
      LOADING PORTFOLIO...
    </motion.p>
  </motion.div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Reduced delay - only wait for critical resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          className="flex flex-col items-center overflow-x-hidden"
        >
          <Hero />
          <Suspense fallback={<div className="min-h-screen" />}>
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
