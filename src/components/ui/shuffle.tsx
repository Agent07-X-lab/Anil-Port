'use client';

import React, { useRef, useEffect, useState, memo } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'framer-motion';

const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/'.split('');

interface ShuffleProps {
  text: string;
  duration?: number;
  stagger?: number;
  ease?: string;
  threshold?: number;
  shuffleTimes?: number;
  shuffleDirection?: 'left' | 'right';
  animationMode?: 'onebyone' | 'all' | 'evenodd';
  triggerOnce?: boolean;
  triggerOnHover?: boolean;
  respectReducedMotion?: boolean;
  className?: string;
}

const Shuffle: React.FC<ShuffleProps> = ({
  text,
  duration = 1,
  stagger = 0.03,
  ease = 'power3.out',
  threshold = 0.1,
  shuffleTimes = 1,
  shuffleDirection = 'left',
  animationMode = 'onebyone',
  triggerOnce = true,
  triggerOnHover = false,
  respectReducedMotion = true,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, amount: threshold });
  const [hasAnimated, setHasAnimated] = useState(false);
  const reducedMotion =
    respectReducedMotion &&
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reducedMotion || (triggerOnce && hasAnimated)) return;
    if (triggerOnHover) return;

    if (isInView) {
      animate();
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, reducedMotion, triggerOnHover, triggerOnce]);

  const animate = () => {
    if (!ref.current) return;
    const chars = ref.current.querySelectorAll('.char');
    if (chars.length === 0) return;

    gsap.killTweensOf(chars);

    const tl = gsap.timeline();

    chars.forEach((char, index) => {
      const originalChar = char.getAttribute('data-original');
      if (originalChar === ' ') return;
      let fromText = '',
        toText = '';

      if (shuffleDirection === 'left') {
        fromText = char.innerHTML;
        toText = originalChar!;
      } else {
        fromText = originalChar!;
        toText = char.innerHTML;
      }

      for (let i = 0; i < shuffleTimes; i++) {
        tl.to(
          char,
          {
            duration: duration / (shuffleTimes * chars.length),
            text: {
              value: () =>
                SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
            },
            ease: 'none',
          },
          getStartTime(index, chars.length)
        );
      }

      tl.fromTo(
        char,
        { text: { value: fromText } },
        {
          duration: duration,
          text: { value: toText },
          ease: ease,
        },
        getStartTime(index, chars.length)
      );
    });
  };
  
  const getStartTime = (index: number, total: number) => {
    switch (animationMode) {
      case 'all':
        return 0;
      case 'evenodd':
        return index % 2 === 0 ? 0 : stagger;
      case 'onebyone':
      default:
        return index * stagger;
    }
  };

  const handleMouseEnter = () => {
    if (triggerOnHover && !reducedMotion) {
      animate();
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          data-original={char}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default memo(Shuffle);