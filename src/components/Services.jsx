import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    { title: 'Project Planning & Strategy', desc: 'I work closely with clients to define clear goals and develop a strategic roadmap for each project.' },
    { title: 'Design & User Experience', desc: 'I create intuitive and aesthetically pleasing designs that focus on user-centered experiences.' },
    { title: 'Custom Development', desc: 'I write clean, efficient code to build custom solutions tailored to the specific needs of the project.' },
    { title: 'API Integration', desc: 'I integrate third-party services and APIs to enhance functionality and improve user experience.' }
  ];

  return (
    <section id="services" className="section-padding bg-dark relative">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">The Best Service Package For You</h2>
          <p className="text-gray max-w-2xl mx-auto">Elevate your online presence with our specialized services tailored for your growth.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gray-dark/20 border border-gray-dark p-8 rounded-2xl hover:-translate-y-2 transition-transform cursor-pointer group hover:bg-gray-dark/40"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <div className="w-4 h-4 bg-primary rounded-full group-hover:bg-white transition-colors"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
