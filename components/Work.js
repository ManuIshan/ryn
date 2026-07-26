'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import './work.css';
import TrueFocus from '@/src/component/TrueFocus';

function RevealText({ children }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;

      const start = wh * 0.9;
      const end = wh * 0.15;

      const raw = (start - rect.top) / (start - end);

      setProgress(Math.min(1, Math.max(0, raw)));
    };

    onScroll();

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const words = children.split(' ');
  const total = words.length;

  return (
    <span ref={ref}>
      {words.map((word, i) => {
        const wp = Math.min(1, Math.max(0, progress * total - i));

        return (
          <span
            key={i}
            style={{
              color: `rgba(255,255,255,${0.1 + wp * 0.85})`,
              transition: '0.2s'
            }}
          >
            {word}{' '}
          </span>
        );
      })}
    </span>
  );
}

const workItems = [
  {
    id: 1,
    title: 'Bridal',
    image: '/bcover.jpg',
    category: 'Bridal Henna',
  },
  {
    id: 2,
    title: 'Party',
    image: '/pcover.jpg',
    category: 'Party Henna',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
};

export default function Work() {
  const router = useRouter();

  const handleCardClick = (id) => {
    if (id === 1) {
      router.push('/bridal');
    } else if (id === 2) {
      router.push('/party');
    }
  };

  return (
    <section id="services" className="work">
      <div className="work-content">

        {/* TOP */}
        <div className="work-topbar">
          <span>/ SERVICES</span>
          <span>N. 02</span>
        </div>

        {/* HEADING */}
        <div className="work-headline">
          <h2>
             <RevealText>
                          Professional henna services crafted to create elegant and memorable designs
                        </RevealText>
          </h2>
        </div>

        {/* CARDS GRID */}
        <motion.div
          className="work-cards-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {workItems.map((item) => (
            <motion.div
              key={item.id}
              className="work-card-wrapper"
              variants={cardVariants}
            >
              <div className="work-card" onClick={() => handleCardClick(item.id)} style={{ cursor: 'pointer' }}>
                <div className="work-card-image">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="work-image"
                  />
                  <div className="work-card-overlay">
                    <div className="work-card-bottom">
                      <div className="work-card-text">
                        <p className="work-title">{item.title}</p>
                        <p className="work-category">{item.category}</p>
                      </div>
                      <div className="work-card-arrow">
                        <span className="arrow-icon">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        
<div className="book-slot-wrap">
  <button
    className="hh3-cv-btn"
    onClick={() => router.push('/contact')}
  >
    <TrueFocus
      text="Book a Slot"
      manualMode={false}
      blurAmount={0.5}
      borderColor="rgb(255, 255, 255)"
      glowColor="rgba(255,255,255,0.2)"
    />
  </button>
</div>

      </div>
    </section>
  );
}
