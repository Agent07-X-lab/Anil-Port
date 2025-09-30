'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { projects } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    },
  }),
};

export function Projects() {
  return (
    <Section id="projects" title="Featured Projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <div className="glass-card overflow-hidden h-full flex flex-col group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[3/2]">
                    <Image
                      src={project.image.imageUrl}
                      alt={project.title}
                      fill
                      data-ai-hint={project.image.imageHint}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold font-headline mb-2 text-foreground">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 4).map((tech, i) => (
                        <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-muted-foreground flex-grow">{project.description}</p>
                    <div className="mt-6 flex justify-end">
                       <p className="text-sm text-primary flex items-center gap-2">
                           View Details <ExternalLink className="w-4 h-4"/>
                       </p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl glass-card">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-headline gradient-text">{project.title}</DialogTitle>
                    <DialogDescription className="text-muted-foreground pt-2">
                      {project.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-secondary">Key Features</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {project.features.map(feature => <li key={feature}>{feature}</li>)}
                      </ul>
                    </div>
                     <div className="space-y-2">
                      <h4 className="font-semibold text-secondary">Tech Stack</h4>
                       <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                   <div className="mt-6 flex gap-4">
                    <Link href={project.live} passHref>
                        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </Button>
                    </Link>
                    <Link href={project.github} passHref>
                        <Button variant="outline" className="flex-1">
                            <Github className="mr-2 h-4 w-4" /> View Code
                        </Button>
                    </Link>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
