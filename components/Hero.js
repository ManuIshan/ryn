'use client';

import './home.css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { MdOutlinePublic, MdContentCopy } from 'react-icons/md';
import Navbar from './Navbar';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

/* 🔥 NEW ANIMATIONS (added only) */
const leftSlide = {
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const rightSlide = {
  hidden: { opacity: 0, x: 80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('ryn.henne@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <>
      <Navbar />
      <motion.section
        className="hero"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* 🔥 Background Image */}
        <img
          src="/sh2.jpeg"
          alt="henna"
          className="hero-img"
        />

        {/* 🔥 Overlay (optional for readability) */}
        <div className="hero-overlay"></div>

        {/* 🔥 Center Content */}
        <div className="hero-content">
          <motion.h3 className="intro" variants={item}>
            Hi, I am
          </motion.h3>

          <motion.h1 className="title" variants={item}>
            Shifna
          </motion.h1>

          <motion.h2 className="subtitle" variants={item}>
            I am a Henna Artist
          </motion.h2>

          {/* <motion.p className="tagline" variants={item}>
            Turning hands into timeless works of art.
          </motion.p> */}
        </div>

        {/* 🔥 LEFT TEXT (animated from left) */}
        <motion.div
          className="hero-info-left"
          variants={leftSlide}
        >
          <MdOutlinePublic className="globe-icon" />
          <span>Based in Malappuram</span>
        </motion.div>

        {/* 🔥 RIGHT TEXT (animated from right) */}
        <motion.div
          className="hero-info-right"
          variants={rightSlide}
        >
          <span>ryn.henne@gmail.com</span>
          <button onClick={handleCopy} className="copy-btn">
            <MdContentCopy />
          </button>
          {copied && <span className="copied-msg">copied</span>}
        </motion.div>

      </motion.section>
    </>
  );
}