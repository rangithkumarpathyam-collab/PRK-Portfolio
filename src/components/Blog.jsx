import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getBlogPosts } from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getBlogPosts();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section id="blog" className="section-padding bg-dark border-t border-gray-dark">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Future SEO Trends You Should Follow</h2>
            <p className="text-gray max-w-xl">Stay updated with the latest news, insights, and trends in the world of SEO and digital marketing.</p>
          </div>
          <a href="#" className="hidden md:inline-flex px-6 py-3 border border-gray-dark rounded-full hover:bg-white hover:text-dark transition-colors font-medium">
            Explore All
          </a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video bg-gray-dark/50 rounded-2xl mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-tr from-gray-dark to-gray-dark/20 group-hover:scale-105 transition-transform duration-500"></div>
              </div>
              <div className="flex items-center space-x-4 mb-4 text-sm">
                <span className="text-primary font-medium">{post.category}</span>
                <span className="text-gray">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-gray">{post.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
