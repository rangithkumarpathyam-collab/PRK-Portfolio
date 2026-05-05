import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

const Stats = () => {
  const stats = [
    { value: "3+", label: "Projects Built" },
    { value: "5+", label: "Technologies" },
    { value: "2029", label: "Graduating Year" },
    { value: "∞", label: "Passion for Code" }
  ];

  return (
    <section className="py-12 border-y border-gray-dark bg-dark/50">
      <div className="container-custom">
        <StaggerContainer stagger={0.12} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StaggerItem
              key={index}
              effect="scaleUp"
            >
              <motion.div
                whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                className="text-center px-4"
              >
                <h4 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stat.value}</h4>
                <p className="text-gray text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Stats;
