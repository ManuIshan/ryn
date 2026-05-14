'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./faq.css";

const faqs = [
  {
    q: "Do you charge extra for travel?",
    a: "Yes, travel charges apply for locations beyond a 10 km radius. The cost depends on the distance and will be confirmed before booking.",
  },
  {
    q: "Is advance payment required?",
    a: "Yes, a small advance is required to confirm your slot. This ensures your booking is reserved.",
  },
  {
    q: "Is the advance refundable if I cancel?",
    a: "No, the advance is non-refundable once the slot is confirmed, as the time is reserved exclusively for you.",
  },
  {
    q: "Can I reschedule my booking?",
    a: "Yes, rescheduling is possible if informed at least 24–48 hours earlier, depending on availability.",
  },

  {
    q: "Do you offer custom designs?",
    a: "Yes, all designs are customizable based on your style, event, and preferences.",
  },
  {
    q: "Do you use natural henna?",
    a: "Yes, only high-quality natural henna is used for safe application and better stain.",
  },
  {
    q: "How do I book?",
    a: "Contact me with your date, location, and requirement to check availability and confirm your slot.",
  },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="faq-item"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <button
        className="faq-question"
        onClick={() => setOpen(!open)}
      >
        <span className="faq-q-text">{item.q}</span>

        <motion.span
          className="faq-plus"
          animate={{ rotate: open ? 45 : 0 }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="faq-divider" />
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section className="faq-section">

      <div className="faq-topbar">
        <span>/ FAQ</span>
        <span>N. 0419</span>
      </div>

      <div className="faq-list">
        {faqs.map((item, i) => (
          <FAQItem key={i} item={item} index={i} />
        ))}
      </div>

    </section>
  );
}