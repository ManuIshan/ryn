'use client';

import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import './Navbar.css';

export default function Navbar() {

  const [open, setOpen] = useState(false);

  const panelRef = useRef(null);
  const layersRef = useRef(null);

  const router = useRouter();

  /* 🔥 OPEN MENU */
  const openMenu = () => {
    const panel = panelRef.current;
    const layers = layersRef.current.children;

    gsap.to(layers, {
      x: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'circ.out'
    });

    gsap.to(panel, {
      x: 0,
      opacity: 1,
      duration: 0.65,
      delay: 0.1,
      ease: 'circ.out'
    });
  };

  /* 🔥 CLOSE MENU */
  const closeMenu = () => {
    const panel = panelRef.current;
    const layers = layersRef.current.children;

    gsap.to([panel, ...layers], {
      x: '100%',
      opacity: 0,
      duration: 0.4,
      ease: 'circ.in'
    });
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    next ? openMenu() : closeMenu();
  };

  /* 🔥 MENU ITEMS */
  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'SERVICES', path: '/#services' },
    { name: 'PRICING', path: '/#pricing' },
    { name: 'CONTACT', path: '/contact' },
  ];

  /* 🔥 FRAMER ANIMATION */
  const container = {
    hidden: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: {
      y: 60,
      opacity: 0,
      rotate: 5
    },
    show: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Ryn </div>

        <div
          className={`plus-icon ${open ? 'active' : ''}`}
          onClick={toggle}
        />
      </nav>

      {/* PRELAYERS */}
<div
  ref={layersRef}
  className={`sm-prelayers ${open ? 'active' : ''}`}
>        <div className="sm-prelayer layer1" />
        <div className="sm-prelayer layer2" />
      </div>

      {/* PANEL */}
<aside
  ref={panelRef}
  className={`staggered-menu-panel ${open ? 'active' : ''}`}
>
        {/* QUOTE */}
        <div className="sm-quote">
          “Turning moments into timeless henna art.”
        </div>

        {/* MENU */}
        <motion.ul
          className="sm-panel-list"
          variants={container}
          initial={false}
          animate={open ? "show" : "hidden"}
        >
          {menuItems.map((itemData, i) => (
            <motion.li
              key={i}
              className="sm-panel-itemWrap"
              variants={item}
            >
              <div
                className="sm-panel-item"
                onClick={() => {
                  setOpen(false);
                  closeMenu();

                  // 🔥 delay for smooth close animation
                  setTimeout(() => {
                    router.push(itemData.path);
                  }, 400);
                }}
              >
                <span className="sm-panel-itemLabel">
                  {itemData.name}
                </span>

                <span className="sm-number">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>

      </aside>
    </>
  );
}