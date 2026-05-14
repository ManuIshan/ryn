'use client';

import Link from "next/link";
import Silk from "@/src/component/Silk";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="ft-footer">

      {/* top divider */}
      <div className="ft-top-bar" />

      <div className="ft-hero">

        {/* top row */}
        <div className="ft-top-row">

          <div className="ft-left">
            <a href="tel:+917736620996" className="ft-phone">
              +91 7736086912
            </a>
          </div>

          <nav className="ft-center">
            <Link href="/" className="ft-nav-link">Home</Link>
            <Link href="/#services" className="ft-nav-link">Services</Link>
            <Link href="/#pricing" className="ft-nav-link">Pricing</Link>
            <Link href="/contact" className="ft-nav-link">Contact</Link>
          </nav>

          <div className="ft-right">
            <a href="https://www.instagram.com/ryn.henne" target="_blank" rel="noopener noreferrer" className="ft-social-link">
              INSTA
            </a>
            <a href="https://wa.me/917736086912" target="_blank" rel="noopener noreferrer" className="ft-social-link">
              WHATSAPP
            </a>
            <a href="tel:+917736086912" className="ft-social-link">
              CALL
            </a>
          </div>

        </div>

        {/* 🔥 BEAMS BACKGROUND */}
        <Silk
           speed={5}
  scale={1}
  color="#9a979c"
  noiseIntensity={1}
  rotation={0}

        />

        {/* name */}
        <div className="ft-name-wrap">
          <span className="ft-copy">©2025</span>
          <h2 className="ft-name">Shifna<span>©</span></h2>
        </div>

      </div>

    </footer>
  );
}