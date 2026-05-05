import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      cursorX.set(e.clientX - 16); // 16 is half of the 32px width/height to center it
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const isClickable = 
        e.target.tagName.toLowerCase() === 'a' || 
        e.target.tagName.toLowerCase() === 'button' || 
        e.target.closest('a') || 
        e.target.closest('button');
        
      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`
        /* Hide the default cursor when our custom cursor is active on desktop */
        @media (min-width: 768px) {
          body {
            cursor: none;
          }
          a, button {
            cursor: none;
          }
        }
      `}</style>
      
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "#ffffff" : "transparent",
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      />
      
      {/* Tiny center dot that disappears on hover */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        animate={{
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1,
        }}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference"
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
      </motion.div>
    </>
  );
};

export default CustomCursor;
