'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ShinyText from '../src/component/ShinyText';
import './pricing.css';
import TrueFocus from '@/src/component/TrueFocus';

/* 🔥 RevealText (same as services) */
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

export default function Pricing() {
  const router = useRouter();
  const [type, setType] = useState('bridal');

  const bridal = [
    {
      title: 'Palm Length',
      price: '₹250',
      points: [
        'Palm-focused bridal motifs',
        'Intricate florals & mandalas',
        'Time: 20-30 mins',
        'Elegant bridal look',
        'Perfect for minimal brides',
        'Clean finger detailing'
      ]
    },
    {
      title: 'Bangle Length',
      price: '₹350',
      points: [
        'Palm to wrist flow',
        'Bridal floral accents',
        'Time: 45-60 mins',
        'Moderate coverage',
        'Balanced detailing',
        'Stylish wrist finish'
      ]
    },
    {
      title: 'Mid Arm Length',
      price: '₹400',
      points: [
        'Palm to mid-arm',
        'Full finger coverage',
        'Time: 60-100 mins',
        'Premium bridal look',
        'Dense patterns',
        'Modern + traditional mix'
      ]
    },
    {
      title: 'Elbow Length',
      price: '₹800',
      points: [
        'Full extended design',
        'Dense detailing',
        'Time: 90-120 mins',
        'Luxury bridal',
        'Grand wedding look',
        'Heavy intricate work'
      ]
    }
  ];

  const party = [
    {
      title: 'Palm Length',
      price: '₹200',
      points: [
        'Quick elegant design',
        'Minimal floral',
        'Time: 15-25 mins',
        'Casual events',
        'Light detailing',
        'Simple patterns'
      ]
    },
    {
      title: 'Wrist Length',
      price: '₹250',
      points: [
        'Balanced wrist design',
        'Modern patterns',
        'Time: 25-35 mins',
        'Events',
        'Trendy looks',
        'Clean finish'
      ]
    },
    {
      title: 'Mid Arm Length',
      price: '₹350',
      points: [
        'Eye-catching style',
        'Fusion patterns',
        'Time: 45-55 mins',
        'Festive',
        'Bold designs',
        'Creative layouts'
      ]
    },
    {
      title: 'Elbow Length',
      price: '₹750',
      points: [
        'Extended mehndi',
        'Elegant flow',
        'Time: 60-75 mins',
        'Large events',
        'Detailed work',
        'Stylish coverage'
      ]
    }
  ];

  const data = type === 'bridal' ? bridal : party;

  return (
    <section id="pricing" className="pricing">

      <div className="pricing-content">

        {/* TOP */}
        <div className="pricing-topbar">
          <span>/ PRICING</span>
          <span>N. 03</span>
        </div>

        {/* 🔥 HEADLINE */}
        <div className="pricing-headline">
          <h2>
            <RevealText>
              Flexible henna pricing crafted to suit both elegant bridal designs and modern party styles
            </RevealText>
          </h2>
        </div>

        {/* TOGGLE */}
        <div className="toggle">
          <div className="toggle-inner">

            <motion.div
              className="toggle-bg"
              animate={{ x: type === 'party' ? '100%' : '0%' }}
              transition={{ type: 'spring', stiffness: 300 }}
            />

            <button
              onClick={() => setType('bridal')}
              className={type === 'bridal' ? 'active' : ''}
            >
              Bridal
            </button>

            <button
              onClick={() => setType('party')}
              className={type === 'party' ? 'active' : ''}
            >
              Party
            </button>

          </div>
        </div>

        {/* CARDS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            className="pricing-grid"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >

            {data.map((card, i) => (
              <div className="card" key={i}>

                <div className="card-head">
                  <h3>{card.title}</h3>
                  <p className="sub" style={{ fontSize: '12px' }}>
                    
                  </p>
                  <h2>{card.price} <span>/ side</span></h2>
                </div>

                <div className="card-body">
                  {card.points.map((p, idx) => (
                    <div key={idx} className="point">
                      <span className="gem-icon">✦</span>
                      <ShinyText text={p} />
                    </div>
                    
                    
                  ))}
                    <button
    className="card-book-btn"
    onClick={() => router.push('/contact')}
  >
    Book Now
  </button>

 





</div>
                </div>


            
            ))}

          </motion.div>
        </AnimatePresence>


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