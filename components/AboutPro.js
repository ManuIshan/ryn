'use client';

import { useEffect, useRef, useState } from "react";
import ShinyText from "../src/component/ShinyText";
import "./aboutpro.css";

/* 🔥 SAME REVEAL AS YOUR HH2 */
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
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = children.split(" ");
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
              transition: "0.15s ease"
            }}
          >
            {word}{i < total - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}

/* COUNTER */
function Counter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;

        let start = null;
        const duration = 1600;

        const step = (ts) => {
          if (!start) start = ts;
          const pct = Math.min((ts - start) / duration, 1);
          const eased = 1 - Math.pow(1 - pct, 3);

          setCount(Math.floor(eased * target));

          if (pct < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}+</span>;
}

export default function AboutPro() {
  return (
    <section className="about">

      {/* TOP */}
      <div className="about-top">
        <span>/ ABOUT</span>
        <span>N. 01</span>
      </div>

      {/* GRID SAME AS HH2 */}
      <div className="about-grid">

        {/* IMAGE */}
        <div className="about-photo">
          <img src="/shf.jpeg" alt="henna" />
        </div>

        {/* TEXT */}
        <div className="about-headline-wrap">
          <h2 className="about-headline">
            <RevealText>
              I'm a passionate henna artist crafting elegant bridal and modern designs with intricate detail and timeless creativity.
            </RevealText>
          </h2>

          <div className="about-shiny">
            <ShinyText text="Henna Artist · Bridal Designs · Custom Patterns · Creative Art" />
          </div>
        </div>

        <div className="about-spacer" />

        <div className="about-stat-gap" />

        {/* STATS */}
        <div className="about-stat-1">
          <span className="about-stat-num">
            <Counter target={2} />
          </span>
          <p className="about-stat-title">Experience</p>
          <p className="about-stat-sub">Creating elegant designs</p>
        </div>

        <div className="about-stat-2">
          <span className="about-stat-num">
            <Counter target={50} />
          </span>
          <p className="about-stat-title">Clients</p>
          <p className="about-stat-sub">Designs that last</p>
        </div>

      </div>

    </section>
  );
}