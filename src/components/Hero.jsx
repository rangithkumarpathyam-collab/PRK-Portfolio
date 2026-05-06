import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Draggable from 'react-draggable';

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  const textVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: (i) => ({
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] }
    })
  };

  return (
    <section ref={sectionRef} id="home" className="relative pt-40 pb-24 overflow-hidden min-h-screen flex items-center bg-dark">
      <motion.div
        style={{ opacity, scale, y }}
        className="container-custom relative z-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={textVariants}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-dark bg-gray-dark/30 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium text-gray-light">Open to opportunities</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={textVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6 text-white"
          >
            Hi, I'm <span className="text-primary">Ranjith</span>
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-light">Kumar</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={textVariants}
            className="text-lg md:text-xl text-gray mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            B.Tech Data Science Student & Aspiring Web Developer. I build real-world applications that solve practical problems in education and automation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            variants={textVariants}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            {/* View My Work Button */}
            <Draggable bounds="body">
              <div className="z-50 cursor-grab active:cursor-grabbing">
                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(67,83,255,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  href="#projects"
                  className="px-8 py-4 bg-primary text-white rounded-full font-medium shadow-[0_0_20px_rgba(67,83,255,0.4)] w-full sm:w-auto text-center block select-none"
                  draggable="false"
                  onClick={(e) => {
                    // Prevent navigation if the button was dragged significantly
                    // (react-draggable handles this mostly, but good for UX)
                  }}
                >
                  View My Work
                </motion.a>
              </div>
            </Draggable>

            {/* Get My Work Button */}
            <Draggable bounds="body">
              <div className="z-50 cursor-grab active:cursor-grabbing">
                <motion.a
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(51,51,51,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  href="#contact"
                  className="px-8 py-4 border border-gray-dark text-white rounded-full font-medium w-full sm:w-auto text-center block select-none"
                  draggable="false"
                >
                  Get My Work
                </motion.a>
              </div>
            </Draggable>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-20"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-gray-dark rounded-full mx-auto flex justify-center pt-2"
            >
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3], y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background glow effects */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/15 blur-[120px] rounded-full pointer-events-none -z-10"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none -z-10"
      />
    </section>
  );
};

export default Hero;
