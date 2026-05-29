'use client';
import { useEffect, useRef, ReactNode } from 'react';
import type { JSX } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
}

export default function Reveal({ children, delay = 0, className = '', tag: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('in'); io.unobserve(el); }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delayAttr = delay ? { 'data-delay': String(delay) } : {};

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`reveal ${className}`} {...delayAttr}>
      {children}
    </Tag>
  );
}
