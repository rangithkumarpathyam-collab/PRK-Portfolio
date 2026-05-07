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
      value: 'rangithkumarpathyam@gmail.com',
      href: 'mailto:rangithkumarpathyam@gmail.com',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '+91 7416960828',
      href: 'tel:+917416960828',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      label: 'GitHub',
      value: 'rangithkumarpathyam-collab',
      href: 'https://github.com/rangithkumarpathyam-collab',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: 'LinkedIn',
      value: 'Pathyam Ranjith Kumar',
      href: 'https://linkedin.com/in/pathyam-ranjith-kumar-1a0579375',
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
              {contactItems.map((item, i) => {
                const Wrapper = item.href ? 'a' : 'div';
                const linkProps = item.href ? {
                  href: item.href,
                  target: item.href.startsWith('http') ? '_blank' : undefined,
                  rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                } : {};
                return (
                  <StaggerItem key={i} effect="slideLeft">
                    <motion.div
                      whileHover={{ x: 8, transition: { duration: 0.2 } }}
                      className="flex items-center space-x-4 cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, borderColor: '#4353FF' }}
                        className="w-12 h-12 bg-gray-dark/40 rounded-xl flex items-center justify-center text-primary border border-gray-dark transition-colors"
                      >
                        {item.icon}
                      </motion.div>
                      <Wrapper {...linkProps} className={item.href ? 'hover:opacity-80 transition-opacity' : ''}>
                        <p className="text-sm text-gray">{item.label}</p>
                        <p className="font-bold text-white">{item.value}</p>
                      </Wrapper>
                    </motion.div>
                  </StaggerItem>
                );
              })}
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
