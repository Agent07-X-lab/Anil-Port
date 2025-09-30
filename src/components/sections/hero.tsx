'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RotatingText } from '../ui/animated-text';
import { ArrowDown } from 'lucide-react';
import { ParticleBackground } from '../ui/particle-background';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';

export function Hero() {
  const roles = ["Full-Stack Developer", "React Specialist", "UI/UX Designer"];
  const container = useRef(null);

  useGSAP(() => {
    const chars = gsap.utils.toArray('.char');
    gsap.from(chars, {
      yPercent: 130,
      stagger: 0.05,
      ease: 'back.out',
      duration: 1,
      delay: 0.2,
    });
  }, { scope: container });
  
  return (
    <section id="home" className="relative h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          ref={container}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold font-headline mb-4"
        >
         <div className="gradient-text" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
            {'Anil Kumar Sahu'.split('').map((char, index) => (
              <span className="char inline-block" key={`${char}-${index}`}>{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </div>
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
