'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import './party.css';
import TrueFocus from '@/src/component/TrueFocus';
import Footer from '@/components/Footer';

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

export default function Party() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const partyImages = [
    'p34.jpeg', 'p33.jpeg', 'p7.jpeg', 'p5.jpeg', 'p6.jpeg', 'p4.jpeg', 'p1.jpeg', 'p9.jpeg', 'p12.jpeg', 'p13.jpeg',
    'p19.jpeg', 'p18.jpeg', 'p20.jpeg', 'p16.jpeg', 'p17.jpeg', 'p14.jpeg', 'p26.jpeg', 'p25.jpeg', 'p27.jpeg', '28.jpeg','29.jpeg', 'p30.jpeg',
    'p2.jpeg', 'p3.jpeg', 'p8.jpeg', 'p10.jpeg', 'p11.jpeg', 'p15.jpeg', 'p21.jpeg', 'p22.jpeg', 'p23.jpeg', 'p24.jpeg', 'p31.jpeg', 'p32.jpeg','p35.jpeg',
  ];

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <Navbar />
          <section className="party">
            <div className="party-content">
              <div className="party-headline">
                <h1>
                    Unleash the Fun with Party Henna Designs: Vibrant, Creative, and Perfect for Every Celebration, You Can See My Works Here
                </h1>
              </div>
              <div className="gallery">
                {partyImages.map((img, index) => (
                  <div key={img} className="gallery-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <img src={`/${img}`} alt={img} />
                  </div>
                ))}
              </div>
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
            <Footer/>
          </section>
        </>
      )}
    </>
  );
}