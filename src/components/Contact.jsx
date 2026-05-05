import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendMessage } from '../services/api';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');
    try {
      await sendMessage(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
    setSending(false);
  };

  const contactItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'rangithkumar@gmail.com',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'India',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Status',
      value: 'Open for Internships & Freelance',
    },
  ];

  return (
    <section id="contact" className="section-padding bg-dark border-t border-gray-dark relative overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left - Info (slides in from left, slides out on scroll up) */}
          <ScrollReveal effect="slideLeft" duration={0.8} className="lg:w-1/2">
            <ScrollReveal effect="fadeUp">
              <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">Contact</span>
            </ScrollReveal>
            <ScrollReveal effect="blurIn" delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Let's Build Something<br />
                <span className="text-primary">Amazing Together</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal effect="fadeUp" delay={0.2}>
              <p className="text-gray mb-10 text-lg leading-relaxed">
                I'm always open to new opportunities, collaborations, and interesting projects. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </ScrollReveal>

            <StaggerContainer stagger={0.15} className="space-y-6">
              {contactItems.map((item, i) => (
                <StaggerItem key={i} effect="slideLeft">
                  <motion.div
                    whileHover={{ x: 8, transition: { duration: 0.2 } }}
                    className="flex items-center space-x-4 cursor-default"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, borderColor: '#4353FF' }}
                      className="w-12 h-12 bg-gray-dark/40 rounded-xl flex items-center justify-center text-primary border border-gray-dark transition-colors"
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <p className="text-sm text-gray">{item.label}</p>
                      <p className="font-bold text-white">{item.value}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </ScrollReveal>

          {/* Right - Form (slides in from right, slides out on scroll up) */}
          <ScrollReveal effect="slideRight" duration={0.8} delay={0.2} className="lg:w-1/2">
            <motion.div
              whileHover={{ borderColor: 'rgba(67,83,255,0.3)' }}
              className="bg-gray-dark/15 border border-gray-dark p-8 rounded-2xl backdrop-blur-sm transition-colors"
            >
              <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <ScrollReveal effect="fadeUp" delay={0.3}>
                  <motion.input
                    whileFocus={{ borderColor: '#4353FF', boxShadow: '0 0 0 2px rgba(67,83,255,0.15)' }}
                    type="text" name="name" value={formData.name} onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-dark border border-gray-dark rounded-xl px-5 py-3.5 focus:outline-none transition-all text-white placeholder:text-gray"
                    required
                  />
                </ScrollReveal>
                <ScrollReveal effect="fadeUp" delay={0.4}>
                  <motion.input
                    whileFocus={{ borderColor: '#4353FF', boxShadow: '0 0 0 2px rgba(67,83,255,0.15)' }}
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full bg-dark border border-gray-dark rounded-xl px-5 py-3.5 focus:outline-none transition-all text-white placeholder:text-gray"
                    required
                  />
                </ScrollReveal>
                <ScrollReveal effect="fadeUp" delay={0.5}>
                  <motion.textarea
                    whileFocus={{ borderColor: '#4353FF', boxShadow: '0 0 0 2px rgba(67,83,255,0.15)' }}
                    name="message" value={formData.message} onChange={handleChange}
                    placeholder="Your Message" rows="5"
                    className="w-full bg-dark border border-gray-dark rounded-xl px-5 py-3.5 focus:outline-none transition-all text-white placeholder:text-gray resize-none"
                    required
                  />
                </ScrollReveal>
                <ScrollReveal effect="scaleUp" delay={0.6}>
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 0 25px rgba(67,83,255,0.5)' }}
                    whileTap={{ scale: 0.97 }}
                    type="submit" disabled={sending}
                    className="w-full bg-primary text-white font-medium rounded-xl px-5 py-4 transition-all shadow-[0_0_15px_rgba(67,83,255,0.3)] disabled:opacity-50"
                  >
                    {sending ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </ScrollReveal>
                {status === 'success' && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-400 text-sm mt-2">✅ Message sent successfully!</motion.p>
                )}
                {status === 'error' && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="text-center text-red-400 text-sm mt-2">❌ Failed to send. Please try again.</motion.p>
                )}
              </form>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>

      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"
      />
    </section>
  );
};

export default Contact;
