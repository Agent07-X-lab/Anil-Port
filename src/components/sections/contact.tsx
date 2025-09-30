'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Rocket, Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm, type ContactFormState } from '@/app/actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
        </>
      ) : (
        <>
          <Rocket className="mr-2 h-4 w-4" /> Send Message
        </>
      )}
    </Button>
  );
}

const contactInfo = [
  { icon: Mail, text: 'anilkumarsahu075@gmail.com' },
  { icon: MapPin, text: 'Odisha, Berhampur, India' }
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/Anil-glith', name: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/anil-sahu-476001361?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', name: 'LinkedIn' },
  { icon: Twitter, href: '#', name: 'Twitter' },
];

export function Contact() {
  const { toast } = useToast();
  const initialState: ContactFormState = { message: '', success: false };
  const [state, formAction] = useActionState(submitContactForm, initialState);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success!' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <Section id="contact" title="Get In Touch">
      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8"
        >
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Input name="name" placeholder="Name" required className="bg-background/50 h-12"/>
            </div>
            <div className="space-y-2">
              <Input name="email" type="email" placeholder="Email" required className="bg-background/50 h-12"/>
            </div>
            <div className="space-y-2">
              <Input name="subject" placeholder="Subject" required className="bg-background/50 h-12"/>
            </div>
            <div className="space-y-2">
              <Textarea name="message" placeholder="Message" required className="bg-background/50" rows={5}/>
            </div>
            <SubmitButton />
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 flex flex-col justify-center"
        >
          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className="glass-card p-4 rounded-full group-hover:neon-glow-primary transition-all duration-300">
                <info.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-lg text-muted-foreground">{info.text}</span>
            </div>
          ))}
           <div className="flex space-x-4 pt-4">
            {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 group">
                    <div className="glass-card p-4 rounded-full group-hover:neon-glow-secondary transition-all duration-300">
                        <social.icon className="w-6 h-6 text-secondary" />
                    </div>
                </a>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
