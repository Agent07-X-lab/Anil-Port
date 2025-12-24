'use client';

import { useState, useActionState, useEffect, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { FloatingInput, FloatingTextarea } from '@/components/ui/floating-input';
import { Button } from '@/components/ui/button';
import { Loader2, Rocket, CheckCircle2, XCircle, Send } from 'lucide-react';
import { submitContactForm, type ContactFormState } from '@/app/actions';
import { cn } from '@/lib/utils';

interface ContactFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactFormModal({ open, onOpenChange }: ContactFormModalProps) {
  const initialState: ContactFormState = { message: '', success: false };
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setTouched({});
        setShowSuccess(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Handle form submission success
  useEffect(() => {
    if (state.success && state.message) {
      setShowSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (state.issues && state.issues.length > 0) {
      const newErrors: Record<string, string> = {};
      state.issues.forEach((issue) => {
        if (issue.includes('Name')) newErrors.name = issue;
        else if (issue.includes('Email')) newErrors.email = issue;
        else if (issue.includes('Subject')) newErrors.subject = issue;
        else if (issue.includes('Message')) newErrors.message = issue;
      });
      setErrors(newErrors);
    }
  }, [state, onOpenChange]);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (value.length < 2) return 'Name must be at least 2 characters';
        break;
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break;
      }
      case 'subject':
        if (value.length < 5) return 'Subject must be at least 5 characters';
        break;
      case 'message':
        if (value.length < 10) return 'Message must be at least 10 characters';
        break;
    }
    return '';
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent double submission
    if (isPending) return;

    // Mark all fields as touched
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear previous errors

    // Create FormData and submit
    const formDataObj = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataObj.append(key, value);
    });

    // Submit form action within a transition
    startTransition(() => {
      formAction(formDataObj);
    });
  };

  // Reset errors if state changes
  useEffect(() => {
    if (state.success) {
      setErrors({});
    }
  }, [state]);

  const isFormValid =
    Object.values(errors).every((error) => !error) &&
    Object.values(formData).every((value) => value.length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto glass-card border-primary/20">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle className="text-3xl font-headline bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Get In Touch
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              Have a project in mind? Let's work together to bring your ideas to life.
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center py-12 space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center"
              >
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-semibold text-foreground"
              >
                Message Sent!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground text-center"
              >
                {state.message || "I'll get back to you as soon as possible."}
              </motion.p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6 mt-4"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FloatingInput
                  label="Your Name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onValueChange={(value) => handleChange('name', value)}
                  onBlur={() => handleBlur('name')}
                  error={errors.name}
                  success={!errors.name && touched.name && formData.name.length > 0}
                  disabled={isPending}
                  autoComplete="name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FloatingInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onValueChange={(value) => handleChange('email', value)}
                  onBlur={() => handleBlur('email')}
                  error={errors.email}
                  success={!errors.email && touched.email && formData.email.length > 0}
                  disabled={isPending}
                  autoComplete="email"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FloatingInput
                  label="Subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onValueChange={(value) => handleChange('subject', value)}
                  onBlur={() => handleBlur('subject')}
                  error={errors.subject}
                  success={!errors.subject && touched.subject && formData.subject.length > 0}
                  disabled={isPending}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FloatingTextarea
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onValueChange={(value) => handleChange('message', value)}
                  onBlur={() => handleBlur('message')}
                  error={errors.message}
                  success={!errors.message && touched.message && formData.message.length > 0}
                  disabled={isPending}
                  rows={6}
                />
              </motion.div>

              <AnimatePresence>
                {(state.message && !state.success) || errors.submit ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive"
                  >
                    <XCircle className="h-5 w-5 shrink-0" />
                    <p className="text-sm">{errors.submit || state.message}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending || !isFormValid}
                  className={cn(
                    'w-full group relative overflow-hidden',
                    'bg-gradient-to-r from-primary to-secondary',
                    'hover:shadow-lg hover:shadow-primary/50',
                    'transition-all duration-300',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                        <Rocket className="h-5 w-5 group-hover:translate-y-[-4px] transition-transform" />
                      </>
                    )}
                  </span>
                </Button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
