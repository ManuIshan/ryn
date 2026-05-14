'use client';
import { useEffect, useRef } from 'react';

export default function ScrollToTop() {
  const btnRef = useRef(null);
  const ringRef = useRef(null);
  const circumference = 2 * Math.PI * 20;

  useEffect(() => {
    const btn = btnRef.current;
    const ring = ringRef.current;

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? window.scrollY / scrollable : 0;
      ring.style.strokeDashoffset = circumference * (1 - percent);

      if (window.scrollY > 100) {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'all';
      } else {
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: '1rem', right: '1rem',
        width: 52, height: 52, background: 'none',
        border: 'none', padding: 0, cursor: 'pointer',
        opacity: 0, pointerEvents: 'none',
        transition: 'opacity 0.3s ease', zIndex: 9999,
      }}
    >
      <svg viewBox="0 0 52 52" style={{ width: 52, height: 52, transform: 'rotate(-90deg)' }}>
        <circle cx="26" cy="26" r="24" fill="#111" />
        <circle
          ref={ringRef}
          cx="26" cy="26" r="20"
          fill="none" stroke="white" strokeWidth="3"
          strokeDasharray="125.66" strokeDashoffset="125.66"
          strokeLinecap="round"
        />
        <polyline
          points="20,28 26,21 32,28"
          fill="none" stroke="white" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: 'rotate(90deg)', transformOrigin: '26px 26px' }}
        />
      </svg>
    </button>
  );
}