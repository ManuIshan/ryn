'use client';

import AboutPro from "@/components/AboutPro";
import ContactHero from "@/components/ContactHero";
import FAQ from "@/components/Faq";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Work from "@/components/Work";


export default function Home() {
  return (
    <>
    <div className="hero-wrapper">
  <Navbar />
  <Hero />
</div>
      <AboutPro/>
     
      <Work/>
    <Pricing/>
    <FAQ/>
    <ContactHero/>
    <Footer/>
    </>
  );
}