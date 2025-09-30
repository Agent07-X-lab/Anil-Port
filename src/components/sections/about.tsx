'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section } from '@/components/ui/section';
import Ballpit from '@/components/ui/ballpit';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '../ui/button';

const profileImage = PlaceHolderImages.find(p => p.id === 'profile');

const stats = [
    { value: '15+', label: 'Projects', color: 'text-primary' },
    { value: '5+', label: 'Technologies', color: 'text-secondary' },
    { value: '2+', label: 'Years Learning', color: 'text-destructive' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function About() {
  return (
    <Section id="about" title="About Me" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <Ballpit count={200} gravity={0.3} friction={0.9} wallBounce={0.95} followCursor={true}/>
        </div>
        <motion.div 
            className="relative z-10 grid md:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div className="flex items-center justify-center" variants={itemVariants}>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-50 animate-pulse"></div>
                    {profileImage && (
                        <Image 
                            src={profileImage.imageUrl}
                            alt="Anil Kumar Sahu"
                            width={320}
                            height={320}
                            data-ai-hint={profileImage.imageHint}
                            className="relative w-80 h-80 rounded-full object-cover border-4 border-primary shadow-2xl"
                        />
                    )}
                </div>
            </motion.div>
            
            <motion.div className="space-y-6" variants={itemVariants}>
                <p className="text-xl text-muted-foreground leading-relaxed">
                    Hey there! 👋 I'm <span className="text-primary font-semibold">Anil Kumar Sahu</span>, 
                    a passionate B.Tech student at PME College who loves turning ideas into reality through code.
                </p>
                <p className="text-lg text-muted-foreground/80">
                    I specialize in building modern web applications with React and Node.js, 
                    while crafting beautiful user interfaces in Figma. When I'm not coding, 
                    you'll find me exploring new technologies and contributing to open-source projects.
                </p>
                
                <div className="grid grid-cols-3 gap-4 pt-4">
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index}
                            className="glass-card p-4 text-center"
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <h3 className={`text-3xl md:text-4xl font-bold ${stat.color}`}>{stat.value}</h3>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
                
                <motion.div variants={itemVariants}>
                    <Button size="lg" className="mt-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full px-8 py-6 font-semibold transition-transform hover:scale-105 shadow-lg">
                        Download Resume
                    </Button>
                </motion.div>
            </motion.div>
        </motion.div>
    </Section>
  );
}
