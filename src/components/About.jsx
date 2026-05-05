import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

const About = () => {
  return (
    <section id="about" className="section-padding bg-dark relative overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Left - Profile Photo */}
          <ScrollReveal effect="slideLeft" duration={0.8} className="md:w-2/5 flex-shrink-0">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-2xl border-2 border-gray-dark overflow-hidden shadow-[0_0_40px_rgba(67,83,255,0.15)]"
              >
                <img
                  src="/assets/profile.jpg"
                  alt="Pathyam Ranjith Kumar"
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-dark/60 to-transparent"></div>
              </motion.div>

              {/* Floating badge */}
              <ScrollReveal effect="zoomIn" delay={0.4}>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -right-4 px-4 py-2 bg-primary rounded-xl shadow-[0_0_20px_rgba(67,83,255,0.3)]"
                >
                  <span className="text-sm font-bold text-white">B.Tech 2029</span>
                </motion.div>
              </ScrollReveal>

              {/* Decorative ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -left-4 w-20 h-20 border border-primary/20 rounded-full pointer-events-none"
              />
            </div>
          </ScrollReveal>

          {/* Right - Text Content */}
          <div className="md:w-3/5">
            <ScrollReveal effect="fadeUp" delay={0.1}>
              <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">About Me</span>
            </ScrollReveal>

            <ScrollReveal effect="blurIn" delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Passionate About Building<br />
                <span className="text-primary">Real-World Solutions</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal effect="fadeUp" delay={0.3}>
              <p className="text-gray text-lg leading-relaxed mb-8">
                I am a B.Tech student in Data Science at Geethanjali College of Engineering and Technology (2029).
                I am passionate about Web Development, Data Science, and Artificial Intelligence.
                I enjoy building real-world applications that solve practical problems, especially in education and automation.
              </p>
            </ScrollReveal>

            {/* Info Cards */}
            <StaggerContainer stagger={0.1} className="grid grid-cols-2 gap-4">
              {[
                { label: 'College', value: 'Geethanjali College of Engineering & Technology' },
                { label: 'Branch', value: 'Data Science' },
                { label: 'Interests', value: 'Web Dev, AI, IoT' },
                { label: 'Location', value: 'India' },
              ].map((info, i) => (
                <StaggerItem key={i} effect="zoomIn">
                  <motion.div
                    whileHover={{ y: -4, borderColor: 'rgba(67,83,255,0.4)' }}
                    className="bg-gray-dark/20 border border-gray-dark rounded-xl p-4 transition-colors"
                  >
                    <p className="text-sm text-gray mb-1">{info.label}</p>
                    <p className="text-white font-medium text-sm">{info.value}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
