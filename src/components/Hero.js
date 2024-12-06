import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Animated lines background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:6rem_4rem]" />
      </div>

      {/* Subtle moving shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2"
        >
          <div className="w-full h-full border border-neutral-900 rounded-full" />
        </motion.div>
        <motion.div
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2"
        >
          <div className="w-full h-full border border-neutral-900 rounded-full" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col space-y-16">
            {/* Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center space-x-2 text-neutral-500"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
                </span>
                <span className="text-sm tracking-wide">Available for work</span>
              </motion.div>
            </motion.div>

            {/* Main Text */}
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-6xl text-white font-light tracking-tight"
              >
                Building digital products,<br />
                brands, and experiences
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-2xl text-neutral-400 text-lg font-light tracking-wide"
              >
                Full-stack developer specializing in crafting elegant solutions 
                through clean, efficient, and scalable code.
              </motion.p>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center space-x-8"
            >
              <motion.a
                whileHover={{ x: 4 }}
                href="#work"
                className="group flex items-center text-white text-lg"
              >
                View Work
                <motion.span
                  className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <FiArrowRight />
                </motion.span>
              </motion.a>
              <span className="w-px h-4 bg-neutral-800" />
              <motion.a
                whileHover={{ x: 4 }}
                href="#contact"
                className="group flex items-center text-white text-lg"
              >
                Contact
                <motion.span
                  className="inline-block ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <FiArrowRight />
                </motion.span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square w-full max-w-xl mx-auto lg:mx-0"
          >
            <div className="relative w-full h-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm rounded-2xl -rotate-2"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute inset-0 bg-neutral-900/50 backdrop-blur-sm rounded-2xl rotate-2"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative w-full h-full rounded-2xl overflow-hidden border border-neutral-800"
              >
                <img
                  src="https://placehold.co/800x800/1a1a1a/666666?text=Your+Image"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center space-y-4"
        >
          
        </motion.div>
      </motion.div>

      
    </section>
  );
};

export default Hero;