'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { skills } from '@/lib/data';
import { Progress } from '@/components/ui/progress';

const SkillCard = ({ skill }: { skill: { name: string; level: number; icon: string; projectCount: number } }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-40 cursor-pointer"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* Front of the card */}
        <div
          className="absolute inset-0 w-full h-full glass-card p-4 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{skill.icon}</span>
              <h3 className="font-semibold text-lg text-foreground">{skill.name}</h3>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-muted-foreground">Proficiency</span>
                <span className="text-xs font-semibold text-primary">{skill.level}%</span>
              </div>
              <Progress value={skill.level} className="h-2 [&>div]:bg-primary" />
            </div>
          </>
        </div>
        
        {/* Back of the card */}
        <div
          className="absolute inset-0 w-full h-full glass-card p-4 flex flex-col items-center justify-center text-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <p className="text-5xl font-bold gradient-text">{skill.projectCount}</p>
          <p className="text-sm text-muted-foreground mt-2">Projects</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function Skills() {
  return (
    <Section id="skills" title="My Skillset">
      <div className="space-y-12">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category}>
            <h3 className="text-2xl font-bold text-center mb-8 font-headline text-secondary">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skillList.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <SkillCard skill={skill} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
