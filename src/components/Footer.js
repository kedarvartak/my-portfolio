import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiArrowUpRight } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-transparent border-t border-neutral-800">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {/* Left Column */}
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-light text-white"
            >
              Let's create something<br />amazing together
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-neutral-400 max-w-md"
            >
              Open for opportunities and interesting projects.
              Feel free to reach out if you're looking for a developer,
              have a question, or just want to connect.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <a 
                href="mailto:your.email@example.com"
                className="inline-flex items-center text-white hover:text-neutral-300 transition-colors duration-300"
              >
                <span className="text-lg">your.email@example.com</span>
                <FiArrowUpRight className="ml-2 w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8 md:text-right">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="text-neutral-400 uppercase text-sm tracking-wider">Social</div>
              <div className="flex space-x-6 md:justify-end">
                {[
                  { icon: FiGithub, link: "https://github.com/yourusername" },
                  { icon: FiTwitter, link: "https://twitter.com/yourusername" },
                  { icon: FiLinkedin, link: "https://linkedin.com/in/yourusername" },
                  { icon: FiMail, link: "mailto:your.email@example.com" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="text-neutral-400 uppercase text-sm tracking-wider">Quick Links</div>
              <div className="space-y-3">
                {['About', 'Projects', 'Articles', 'Contact'].map((link, index) => (
                  <motion.div key={index} whileHover={{ x: -8 }}>
                    <a 
                      href={`#${link.toLowerCase()}`}
                      className="text-neutral-300 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-neutral-400 text-sm"
          >
            © {currentYear} Your Name. All rights reserved.
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            onClick={scrollToTop}
            className="group flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors duration-300"
          >
            <span className="text-sm">Back to top</span>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-6 rounded-full border border-current flex items-center justify-center"
            >
              <motion.div
                initial={{ rotate: 90 }}
                className="w-4 h-4"
              >
                <FiArrowUpRight />
              </motion.div>
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      <div className="absolute bottom-0 left-1/2 w-px h-24 bg-gradient-to-t from-neutral-800 to-transparent transform -translate-x-1/2" />
    </footer>
  );
};

export default Footer; 