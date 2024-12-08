import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAward, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const achievements = [
  {
    title: "Best Developer Award 2023",
    organization: "Tech Conference XYZ",
    description: "Recognized for outstanding contributions to open-source development and innovative solutions in web technologies.",
    date: "December 2023",
    icon: FiAward,
  },
  {
    title: "1M+ Downloads",
    organization: "Open Source Project",
    description: "My open-source library reached over 1 million downloads on npm, helping developers worldwide build better applications.",
    date: "October 2023",
    icon: FiAward,
  },
  {
    title: "Speaker at DevCon 2023",
    organization: "DevCon International",
    description: "Delivered a keynote speech on modern web architecture and scalable system design to an audience of 500+ developers.",
    date: "August 2023",
    icon: FiAward,
  },
  // Add more achievements as needed
];

const Achievements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (
      (prevIndex + newDirection + achievements.length) % achievements.length
    ));
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">Achievements</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto font-light">
            Milestones and recognition in my professional journey
          </p>
        </motion.div>

        <div className="relative h-[400px] w-full overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-8 md:p-12 max-w-3xl mx-auto">
                <div className="flex flex-col items-center text-center">
                  {React.createElement(achievements[currentIndex].icon, {
                    className: "text-4xl text-white mb-6"
                  })}
                  <h3 className="text-2xl text-white font-light mb-2">
                    {achievements[currentIndex].title}
                  </h3>
                  <p className="text-neutral-400 text-sm mb-6">
                    {achievements[currentIndex].organization} • {achievements[currentIndex].date}
                  </p>
                  <p className="text-neutral-300 leading-relaxed">
                    {achievements[currentIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center space-x-4 mt-8">
            <button
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-neutral-900/50 border border-neutral-800 text-white hover:bg-neutral-800/50 transition-colors duration-300"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              {achievements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-white' : 'bg-neutral-700'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-neutral-900/50 border border-neutral-800 text-white hover:bg-neutral-800/50 transition-colors duration-300"
            >
              <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements; 