import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark border-t border-gray-dark pt-16 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#home" className="text-2xl font-display font-bold tracking-tight text-white mb-6 block">
              P<span className="text-primary">RK</span>
            </a>
            <p className="text-gray leading-relaxed mb-6">
              B.Tech Data Science Student passionate about building real-world applications with modern web technologies.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-dark/40 border border-gray-dark flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white text-sm">
                GH
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-dark/40 border border-gray-dark flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white text-sm">
                LI
              </a>
              <a href="mailto:rangithkumar@gmail.com" className="w-10 h-10 rounded-full bg-gray-dark/40 border border-gray-dark flex items-center justify-center hover:bg-primary hover:border-primary transition-colors text-white text-sm">
                ✉
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-gray hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray hover:text-white transition-colors">About</a></li>
              <li><a href="#skills" className="text-gray hover:text-white transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-gray hover:text-white transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-gray hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="text-gray">
                <span className="text-white font-medium">Email:</span><br />
                rangithkumar@gmail.com
              </li>
              <li className="text-gray">
                <span className="text-white font-medium">Location:</span><br />
                India
              </li>
              <li className="text-gray">
                <span className="text-white font-medium">Status:</span><br />
                <span className="text-primary">Available for opportunities</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-dark pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray">
          <p>© {new Date().getFullYear()} Pathyam Ranjith Kumar. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Built with <span className="text-primary">React</span>, <span className="text-primary">TailwindCSS</span> & <span className="text-primary">Framer Motion</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
