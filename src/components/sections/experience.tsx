'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { experiences } from '@/lib/data';
import { Briefcase, GraduationCap, Trophy } from 'lucide-react';

const categoryIcons = {
  Education: <GraduationCap className="w-6 h-6" />,
  Certifications: <Briefcase className="w-6 h-6" />,
  Achievements: <Trophy className="w-6 h-6" />,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};

export function Experience() {
  return (
    <Section id="experience" title="My Journey">
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border" />
        <motion.div
          className="space-y-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {experiences.map((category, categoryIndex) => (
            <div key={category.category} className="space-y-8">
              {category.items.map((exp, expIndex) => {
                const isLeft = (categoryIndex + expIndex) % 2 === 0;
                return (
                  <motion.div
                    key={exp.title}
                    variants={item}
                    className="relative flex items-center"
                  >
                    <div
                      className={`w-1/2 ${
                        isLeft ? 'pr-8 text-right' : 'pl-8 text-left'
                      } ${isLeft ? '' : 'ml-auto'}`}
                    >
                      <div className="glass-card p-6">
                        <p className="text-sm text-primary mb-1">{exp.date}</p>
                        <h3 className="text-xl font-bold font-headline mb-2">
                          {exp.title}
                        </h3>
                        <p className="text-muted-foreground">{exp.description}</p>
                      </div>
                    </div>
                    
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background flex items-center justify-center border-2 border-secondary neon-glow-secondary">
                        {categoryIcons[category.category as keyof typeof categoryIcons]}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
