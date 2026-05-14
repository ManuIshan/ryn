'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import './bridal.css';
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

export default function Bridal() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const bridalImages = [
    'b2.jpeg', 'b14.jpeg', 'b11.jpeg', 'b12.jpeg','b6.jpeg', 'b9.jpeg', 'b16.jpeg', 'b3.jpeg', 'b8.jpeg', 'b13.jpeg',
    'b4.jpeg', 'b17.jpeg', 'b18.jpeg', 'b15.jpeg', 'b1.jpeg', 'b7.jpeg', 'b10.jpeg', 'b19.jpeg','bridalcover.jpeg'
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
          <section className="bridal">
            <div className="bridal-content">
              <div className="bridal-headline">
                <h1>
                  {/* <RevealText> */}
                    Discover the Art of Bridal Henna: Where Tradition Meets Elegance in Every Stroke, You Can See My Works Here
                  {/* </RevealText> */}
                </h1>
              </div>
              <div className="gallery">
                {bridalImages.map((img, index) => (
                  <div key={img} className="gallery-item" style={{ animationDelay: `${index * 0.1}s` }}>
                    <img src={`/${img}`} alt={img} />
                  </div>
                ))}
              </div>
              <div className="book-slot-wrap ">
                <button
                  className="hh3-cv-btn text-center"
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
            <Footer />
          </section>

        </>
      )}
    </>
  );
}