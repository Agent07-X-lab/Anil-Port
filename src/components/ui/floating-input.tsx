'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  success?: boolean;
  onValueChange?: (value: string) => void;
}

export function FloatingInput({
  label,
  error,
  success,
  className,
  value,
  onValueChange,
  onChange,
  ...props
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setHasValue(String(value).length > 0);
    } else if (inputRef.current) {
      setHasValue(inputRef.current.value.length > 0);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setHasValue(newValue.length > 0);
    onChange?.(e);
    onValueChange?.(newValue);
  };

  const isFloating = isFocused || hasValue;
  const hasError = !!error;
  const showSuccess = success && !hasError && hasValue;

  return (
    <div className="relative w-full group">
      <div className="relative">
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "peer w-full px-4 pt-6 pb-2 bg-background/50 border rounded-lg",
            "text-foreground placeholder-transparent",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            "transition-all duration-300",
            hasError
              ? "border-destructive focus:border-destructive focus:ring-destructive/50"
              : showSuccess
              ? "border-green-500 focus:border-green-500 focus:ring-green-500/50"
              : "border-border focus:border-primary",
            className
          )}
          {...props}
        />
        
        <motion.label
          initial={false}
          animate={{
            y: isFloating ? -8 : 0,
            x: isFloating ? -4 : 0,
            scale: isFloating ? 0.85 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "absolute left-4 pointer-events-none transition-colors duration-300",
            isFloating
              ? "top-2 text-xs"
              : "top-1/2 -translate-y-1/2 text-base",
            hasError
              ? "text-destructive"
              : showSuccess
              ? "text-green-500"
              : isFloating
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {label}
        </motion.label>

        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <AlertCircle className="h-5 w-5 text-destructive" />
            </motion.div>
          )}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-1.5 text-sm text-destructive px-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  success?: boolean;
  onValueChange?: (value: string) => void;
}

export function FloatingTextarea({
  label,
  error,
  success,
  className,
  value,
  onValueChange,
  onChange,
  ...props
}: FloatingTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setHasValue(String(value).length > 0);
    } else if (textareaRef.current) {
      setHasValue(textareaRef.current.value.length > 0);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setHasValue(newValue.length > 0);
    onChange?.(e);
    onValueChange?.(newValue);
  };

  const isFloating = isFocused || hasValue;
  const hasError = !!error;
  const showSuccess = success && !hasError && hasValue;

  return (
    <div className="relative w-full group">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "peer w-full px-4 pt-6 pb-2 bg-background/50 border rounded-lg",
            "text-foreground placeholder-transparent resize-none",
            "focus:outline-none focus:ring-2 focus:ring-primary/50",
            "transition-all duration-300",
            hasError
              ? "border-destructive focus:border-destructive focus:ring-destructive/50"
              : showSuccess
              ? "border-green-500 focus:border-green-500 focus:ring-green-500/50"
              : "border-border focus:border-primary",
            className
          )}
          {...props}
        />
        
        <motion.label
          initial={false}
          animate={{
            y: isFloating ? -8 : 0,
            x: isFloating ? -4 : 0,
            scale: isFloating ? 0.85 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            "absolute left-4 pointer-events-none transition-colors duration-300",
            isFloating
              ? "top-2 text-xs"
              : "top-4 text-base",
            hasError
              ? "text-destructive"
              : showSuccess
              ? "text-green-500"
              : isFloating
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {label}
        </motion.label>

        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute right-3 top-4"
            >
              <AlertCircle className="h-5 w-5 text-destructive" />
            </motion.div>
          )}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute right-3 top-4"
            >
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {hasError && (
          <motion.p
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-1.5 text-sm text-destructive px-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

