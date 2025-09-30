'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RotatingText } from '../ui/animated-text';
import { ArrowDown } from 'lucide-react';
import { ParticleBackground } from '../ui/particle-background';
import Shuffle from '../ui/shuffle';

export function Hero() {
  const roles = ["Full-Stack Developer", "React Specialist", "UI/UX Designer"];
  
  return (
    <section id="home" className="relative h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xl md:text-2xl font-light text-muted-foreground mb-2"
        >
          Hi there 👋, I'm
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold font-headline mb-4"
        >
         <Shuffle
            text="Anil Kumar Sahu"
            shuffleDirection="right"
            duration={0.35}
            animationMode="evenodd"
            shuffleTimes={1}
            ease="power3.out"
            stagger={0.03}
            threshold={0.1}
            triggerOnce={true}
            triggerOnHover={true}
            respectReducedMotion={true}
            className="gradient-text"
          />
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-2xl md:text-3xl font-light text-primary mb-2"
        >
          <RotatingText roles={roles} />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-2xl text-lg text-muted-foreground mb-8"
        >
          "Crafting Digital Experiences Through Code & Design"
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="#projects" passHref>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-lg transition-all duration-300 hover:shadow-lg neon-glow-primary">
              View My Work
            </Button>
          </Link>
          <Link href="#contact" passHref>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-6 text-lg transition-all duration-300 hover:shadow-lg hover:neon-glow-primary">
              Get In Touch
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 2 }}
        className="absolute bottom-10"
      >
        <ArrowDown className="w-8 h-8 text-primary" />
      </motion.div>
    </section>
  );
}
