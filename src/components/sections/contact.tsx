'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { ContactFormModal } from '@/components/ui/contact-form-modal';

const contactInfo = [
  { icon: Mail, text: 'anilkumarsahu075@gmail.com' },
  { icon: MapPin, text: 'Berhampur, Odisha, India' }
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Anil-glith', name: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/anil-sahu-476001361?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', name: 'LinkedIn' },
  { icon: Twitter, href: '#', name: 'Twitter' },
];

export function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Section id="contact" title="Get In Touch">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center items-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-4"
            >
              <h3 className="text-2xl md:text-3xl font-headline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Let's Start a Conversation
              </h3>
              <p className="text-muted-foreground text-lg max-w-md">
                Have a project in mind or want to collaborate? I'd love to hear from you. 
                Send me a message and let's bring your ideas to life.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 px-8 py-6 text-lg"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <span className="relative flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Open Contact Form
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.div>
                </span>
              </Button>
            </motion.div>
          </motion.div>
        
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 flex flex-col justify-center"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 group"
              >
                <div className="glass-card p-4 rounded-full group-hover:neon-glow-primary transition-all duration-300">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-lg text-muted-foreground">{info.text}</span>
              </motion.div>
            ))}
            <div className="flex space-x-4 pt-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 group"
                >
                  <div className="glass-card p-4 rounded-full group-hover:neon-glow-secondary transition-all duration-300">
                    <social.icon className="w-6 h-6 text-secondary" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>
      
      <ContactFormModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
