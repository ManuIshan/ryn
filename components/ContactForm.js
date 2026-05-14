'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import "./ContactForm.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ContactForm() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventType: "",
    date: "",
    location: "",
    people: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    const formatted =
      name === "name" || name === "location"
        ? value.replace(/\b\w/g, c => c.toUpperCase())
        : value;

    setFormData(prev => ({
      ...prev,
      [name]: formatted
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, phone, eventType, date, location, people } = formData;

    if (!name || !phone || !eventType || !date || !location || !people) {
      setError("⚠️ Please fill all required fields");
      return;
    }

    setError("");

    const text = `
✅ New Henna Booking Request

👤 Name: ${name}
📞 Phone: ${phone}
🎉 Event: ${eventType}
📅 Date: ${date}
📍 Location: ${location}
👥 People: ${people}

💬 Message:
${formData.message || "N/A"}

🌿 Looking forward to your confirmation!
`;

    const url = `https://api.whatsapp.com/send?phone=917736086912&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* 🔥 NAVBAR OUTSIDE (FIX) */}
      <Navbar />

      <section className="contact-form-section">
        <div className="contact-form-container">

          {/* HEADING */}
          <motion.div
            className="contact-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h1 className="contact-title mt-5">Let's Book</h1>
            <p className="contact-subtitle">
              Fill the details to reserve your henna appointment.
            </p>
          </motion.div>

          {/* FORM */}
          <motion.form className="contact-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label className="form-label">Name*</label>
              <input
                type="text"
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone*</label>
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Event Type*</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Event</option>
                <option>Bridal Mehandi</option>
                <option>Engagement Henna</option>
                <option>Party Henna</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Event Date*</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input date-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location*</label>
              <input
                type="text"
                name="location"
                placeholder="Event Location"
                value={formData.location}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Number of People*</label>
              <input
                type="number"
                name="people"
                placeholder="Number of Guests"
                value={formData.people}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                placeholder="Any additional details..."
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                rows="6"
              />
            </div>

            {error && <div className="error-box">{error}</div>}

            <motion.button
              type="submit"
              className="contact-btn"
              whileTap={{ scale: 0.95 }}
            >
              BOOK SLOT
            </motion.button>

          </motion.form>
        </div>
      </section>
      <Footer/>
    </>
  );
}