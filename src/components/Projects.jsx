import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjects } from '../services/api';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const fallbackProjects = [
    {
      title: 'Differential Equation Solver',
      description: 'Full-stack educational web app providing step-by-step solving and graph visualization for ODEs.',
      techStack: ['React', 'Node.js', 'Python'],
      features: ['Step-by-step solving', 'Graph visualization'],
      linkUrl: 'https://ode-solver-kappa.vercel.app/',
      imageUrl: '/assets/ode-solver.png'
    },
    {
      title: 'Resume Builder',
      description: 'Generates professional resumes with custom templates, PDF export, and secure data storage.',
      techStack: ['React', 'Node.js', 'MongoDB'],
      features: ['Custom templates', 'PDF export', 'Secure data storage'],
      linkUrl: 'https://official-resume-builder.vercel.app/',
      imageUrl: '/assets/resume-builder.png'
    },
    {
      title: 'Smart Water Planting System',
      description: 'IoT-based irrigation system that uses sensors and Arduino Uno to optimize water usage for plants.',
      techStack: ['IoT', 'Arduino Uno'],
      features: ['Sensor-based', 'Optimizes water usage'],
      videoUrl: 'https://res.cloudinary.com/dv1gjt416/video/upload/v1777102285/project1video_kan851.mp4'
    },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      // Add the video and link URLs even if data comes from the DB
      const projectsWithUrls = data.map(p => {
        if (p.title === 'Smart Water Planting System') {
          return { ...p, videoUrl: 'https://res.cloudinary.com/dv1gjt416/video/upload/v1777102285/project1video_kan851.mp4' };
        }
        if (p.title === 'Resume Builder') {
          return { ...p, linkUrl: 'https://official-resume-builder.vercel.app/', imageUrl: '/assets/resume-builder.png' };
        }
        if (p.title === 'Differential Equation Solver') {
          return { ...p, linkUrl: 'https://ode-solver-kappa.vercel.app/', imageUrl: '/assets/ode-solver.png' };
        }
        return p;
      });
      setProjects(projectsWithUrls.length > 0 ? projectsWithUrls : fallbackProjects);
    };
    fetchProjects();
  }, []);

  const techColors = {
    'React': 'bg-blue-500/20 text-blue-400',
    'Node.js': 'bg-green-500/20 text-green-400',
    'Python': 'bg-yellow-500/20 text-yellow-400',
    'MongoDB': 'bg-emerald-500/20 text-emerald-400',
    'IoT': 'bg-orange-500/20 text-orange-400',
    'Arduino Uno': 'bg-red-500/20 text-red-400',
  };

  const projectIcons = ['📐', '📄', '🌱'];

  const handleProjectClick = (project) => {
    if (project.videoUrl) {
      setSelectedVideo(project.videoUrl);
    } else if (project.linkUrl) {
      window.open(project.linkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" className="section-padding bg-dark border-t border-gray-dark relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <ScrollReveal effect="fadeUp">
            <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4 block">My Work</span>
          </ScrollReveal>
          <ScrollReveal effect="blurIn" delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured Projects</h2>
          </ScrollReveal>
          <ScrollReveal effect="fadeUp" delay={0.2}>
            <p className="text-gray max-w-2xl mx-auto">
              Real-world applications I've built to solve practical problems in education and automation.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer stagger={0.2} className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <StaggerItem key={index} effect="zoomIn" duration={0.7}>
              <motion.div
                whileHover={{ y: -12, transition: { duration: 0.3, ease: "easeOut" } }}
                className="group cursor-pointer h-full flex flex-col"
                onClick={() => handleProjectClick(project)}
              >
                {/* Project Image / Video */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="aspect-video bg-gradient-to-br from-gray-dark/60 to-gray-dark/20 rounded-2xl mb-6 overflow-hidden border border-gray-dark group-hover:border-primary/50 transition-colors relative"
                >
                  {project.videoUrl ? (
                    <video
                      src={project.videoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  ) : project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <motion.span
                        whileHover={{ scale: 1.3, rotate: 15 }}
                        className="text-5xl opacity-30 group-hover:opacity-70 transition-opacity duration-500 mb-2"
                      >
                        {projectIcons[index] || '🔧'}
                      </motion.span>
                    </div>
                  )}

                  {(project.videoUrl || project.linkUrl) && (
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                       <span className="text-xs font-medium bg-dark/80 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                         {project.videoUrl ? 'Click to view full screen' : 'Click to visit site'}
                       </span>
                     </div>
                  )}

                  <motion.div
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                  />
                </motion.div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${techColors[tech] || 'bg-gray-dark/30 text-gray-light'}`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300 flex items-center gap-2">
                  {project.title}
                  {project.linkUrl && (
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </h3>
                <p className="text-gray leading-relaxed mb-4 flex-grow">{project.description}</p>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <ul className="space-y-1.5 mt-auto">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-light flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-dark/90 backdrop-blur-sm"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-black border border-gray-dark rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark/50 backdrop-blur-sm hover:bg-primary rounded-full flex items-center justify-center text-white transition-colors border border-white/10"
                onClick={() => setSelectedVideo(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                <video
                  src={selectedVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
