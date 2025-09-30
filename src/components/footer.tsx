'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from './ui/separator';

const socialLinks = [
  { icon: Github, href: 'https://github.com', 'aria-label': 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', 'aria-label': 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', 'aria-label': 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', 'aria-label': 'Instagram' },
  { icon: Mail, href: 'mailto:your.email@example.com', 'aria-label': 'Email' },
];

const navLinks = [
    { title: 'Home', id: 'home' },
    { title: 'About', id: 'about' },
    { title: 'Skills', id: 'skills' },
    { title: 'Projects', id: 'projects' },
    { title: 'Experience', id: 'experience' },
    { title: 'Contact', id: 'contact' },
];

const EasterEgg = () => (
  <div className="fixed inset-0 z-50 pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: `hsl(${Math.random() * 360}, 100%, 50%)`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [1, 1.5, 0], opacity: [1, 1, 0], transition: { duration: 1.5, delay: i * 0.02 } }}
      />
    ))}
  </div>
);

export function Footer() {
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 5) {
      setShowEasterEgg(true);
      setTimeout(() => {
        setShowEasterEgg(false);
        setClickCount(0);
      }, 2500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full bg-background/50 py-12 mt-20 relative">
      <AnimatePresence>{showEasterEgg && <EasterEgg />}</AnimatePresence>
      <Separator className="absolute top-0 w-full bg-gradient-to-r from-transparent via-primary to-transparent h-0.5" />
      <div className="container max-w-7xl mx-auto px-6 text-center">
        <div className="flex justify-center items-center gap-4 mb-6">
          <button onClick={handleLogoClick} className="text-2xl font-headline font-bold gradient-text">
            Anil Kumar Sahu
          </button>
        </div>
        
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-8">
            {navLinks.map(link => (
                <Link href={`#${link.id}`} key={link.id} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.title}
                </Link>
            ))}
        </div>

        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social['aria-label']}
              className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-125 hover:-translate-y-1"
            >
              <social.icon className="h-6 w-6" />
            </a>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Anil Kumar Sahu. All Rights Reserved.
        </p>
      </div>

      <button
        onClick={scrollToTop}
        aria-label="Back to Top"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center
                   border border-primary/50 backdrop-blur-sm
                   hover:bg-primary/40 hover:scale-110 transition-all duration-300
                   neon-glow-primary opacity-70 hover:opacity-100"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </footer>
  );
}
