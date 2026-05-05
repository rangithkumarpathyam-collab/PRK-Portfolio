import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

const Skills = () => {
  const skillCategories = [
    { title: 'Languages', icon: '💻', skills: ['C', 'Python', 'JavaScript'], color: 'from-blue-500/20 to-blue-600/5' },
    { title: 'Frontend', icon: '🎨', skills: ['HTML', 'CSS', 'React', 'TailwindCSS', 'Framer Motion'], color: 'from-purple-500/20 to-purple-600/5' },
    { title: 'Backend', icon: '⚙️', skills: ['Node.js', 'Express.js'], color: 'from-green-500/20 to-green-600/5' },
    { title: 'Database', icon: '🗄️', skills: ['MongoDB'], color: 'from-emerald-500/20 to-emerald-600/5' },
    { title: 'Other Tools', icon: '🔧', skills: ['IoT (Arduino)', 'Git', 'VS Code'], color: 'from-orange-500/20 to-orange-600/5' },
    { title: 'Interests', icon: '🚀', skills: ['AI / ML', 'Data Science', 'Automation'], color: 'from-pink-500/20 to-pink-600/5' }
  ];

  return (
    <section id="skills" className="section-padding bg-dark border-t border-gray-dark relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <ScrollReveal effect="fadeUp">
            <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">My Toolkit</span>
          </ScrollReveal>
          <ScrollReveal effect="blurIn" delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Skills & Technologies</h2>
          </ScrollReveal>
          <ScrollReveal effect="fadeUp" delay={0.2}>
            <p className="text-gray max-w-2xl mx-auto">Technologies and tools I work with to bring ideas to life.</p>
          </ScrollReveal>
        </div>

        <StaggerContainer stagger={0.1} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <StaggerItem key={index} effect="zoomIn">
              <motion.div
                whileHover={{ y: -8, borderColor: 'rgba(67,83,255,0.4)', transition: { duration: 0.3 } }}
                className="bg-gray-dark/20 border border-gray-dark p-6 rounded-2xl cursor-pointer group h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-5 text-2xl`}
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.1, borderColor: '#4353FF', color: '#4353FF' }}
                      className="px-3 py-1.5 bg-dark border border-gray-dark rounded-lg text-sm text-gray-light transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Skills;
