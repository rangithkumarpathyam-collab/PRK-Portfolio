import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import './AntigravityHero.css';

const AntigravityHero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  
  const [engine] = useState(Matter.Engine.create({ gravity: { x: 0, y: 0 } }));

  useEffect(() => {
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // Render is only for debugging/visualization of physics bodies if needed
    // We will use HTML elements for the actual buttons
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent'
      }
    });

    // Create boundaries
    const thickness = 100;
    const walls = [
      Matter.Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true }), // top
      Matter.Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true }), // bottom
      Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }), // left
      Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true }) // right
    ];

    // Create button bodies
    const btn1Body = Matter.Bodies.rectangle(width * 0.3, height / 2, 200, 60, {
      restitution: 0.8,
      frictionAir: 0.02,
      chamfer: { radius: 30 }
    });
    const btn2Body = Matter.Bodies.rectangle(width * 0.7, height / 2, 200, 60, {
      restitution: 0.8,
      frictionAir: 0.02,
      chamfer: { radius: 30 }
    });

    Matter.World.add(engine.world, [...walls, btn1Body, btn2Body]);

    // Mouse constraints for interaction
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    // Disable default right-click context menu
    const handleContextMenu = (e) => e.preventDefault();
    container.addEventListener('contextMenu', handleContextMenu);

    // Sync HTML elements with Matter.js bodies
    const update = () => {
      if (btn1Ref.current) {
        const { x, y } = btn1Body.position;
        const angle = btn1Body.angle;
        btn1Ref.current.style.transform = `translate(${x - 100}px, ${y - 30}px) rotate(${angle}rad)`;
      }
      if (btn2Ref.current) {
        const { x, y } = btn2Body.position;
        const angle = btn2Body.angle;
        btn2Ref.current.style.transform = `translate(${x - 100}px, ${y - 30}px) rotate(${angle}rad)`;
      }
      requestAnimationFrame(update);
    };

    Matter.Runner.run(engine);
    update();

    // Mouse Interaction (Right Click Drag Force)
    let isRightDragging = false;
    let lastMousePos = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      if (e.button === 2) { // Right click
        isRightDragging = true;
        lastMousePos = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseMove = (e) => {
      if (isRightDragging) {
        const currentMousePos = { x: e.clientX, y: e.clientY };
        const force = {
          x: (currentMousePos.x - lastMousePos.x) * 0.005,
          y: (currentMousePos.y - lastMousePos.y) * 0.005
        };

        // Apply force to buttons near the mouse
        const bodies = [btn1Body, btn2Body];
        bodies.forEach(body => {
          const dist = Matter.Vector.magnitude(Matter.Vector.sub(body.position, currentMousePos));
          if (dist < 300) {
            Matter.Body.applyForce(body, body.position, force);
          }
        });

        lastMousePos = currentMousePos;
      }
    };

    const onMouseUp = () => {
      isRightDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('contextmenu', (e) => e.preventDefault());

    return () => {
      Matter.Engine.clear(engine);
      Matter.Render.stop(render);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [engine]);

  return (
    <div className="antigravity-container" ref={containerRef}>
      <canvas ref={canvasRef} className="matter-canvas" />
      <button 
        ref={btn1Ref} 
        className="pill-button view-work"
        onClick={() => window.location.href = '#projects'}
      >
        View My Work
      </button>
      <button 
        ref={btn2Ref} 
        className="pill-button get-touch"
        onClick={() => window.location.href = '#contact'}
      >
        Get in Touch
      </button>
      
      <div className="instructions">
        Right-click and drag to push the buttons around
      </div>
    </div>
  );
};

export default AntigravityHero;
