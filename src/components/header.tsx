'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/data';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const scrollToSection = (sectionId: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const NavItems = ({ isMobile = false }) => (
    navLinks.map((link) => (
      <Link
        key={link.id}
        href={`#${link.id}`}
        onClick={(e) => {
          scrollToSection(link.id, e);
          if (isMobile) {
            setMobileMenuOpen(false);
          }
        }}
        className={cn(
          "relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
          activeSection === link.id ? 'text-primary' : 'text-muted-foreground',
          isMobile && 'block w-full text-lg text-center py-4'
        )}
      >
        {link.title}
        {activeSection === link.id && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
            layoutId={isMobile ? "active-mobile" : "active-desktop"}
          />
        )}
      </Link>
    ))
  );

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled ? 'mt-4' : 'mt-0'
        )}
      >
        <div className={cn(
            'transition-all duration-300 mx-auto max-w-5xl rounded-full border-border/10',
            scrolled ? 'bg-background/80 backdrop-blur-lg border' : 'bg-transparent border-none'
        )}>
          <div className="flex h-16 items-center justify-between px-6">
            <Link 
              href="#home" 
              onClick={scrollToTop}
              className="text-xl font-headline font-bold gradient-text cursor-pointer"
            >
              Portfolio
            </Link>
            <nav className="hidden md:flex items-center space-x-2">
                <NavItems />
            </nav>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6">
                <Link href="#home" className="text-xl font-headline font-bold gradient-text" onClick={(e) => {
                  scrollToTop(e);
                  toggleMobileMenu();
                }}>
                    Portfolio
                </Link>
                <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                    <X className="h-6 w-6" />
                </Button>
            </div>
            <nav className="mt-8 flex flex-col items-center space-y-4">
              <NavItems isMobile={true} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
