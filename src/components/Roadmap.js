import { motion } from 'framer-motion';

const timelineData = {
  academic: [
    {
      year: "2023",
      title: "Master's in Computer Science",
      institution: "University Name",
      description: "Specialized in Artificial Intelligence and Machine Learning"
    },
    {
      year: "2021",
      title: "Bachelor's in Software Engineering",
      institution: "University Name",
      description: "Focus on Full-Stack Development and System Architecture"
    },
    // Add more academic milestones
  ],
  professional: [
    {
      year: "2023",
      title: "Senior Software Engineer",
      company: "Tech Company",
      description: "Leading frontend development team and architecting scalable solutions"
    },
    {
      year: "2021",
      title: "Software Developer",
      company: "Startup Name",
      description: "Full-stack development using React, Node.js, and AWS"
    },
    // Add more professional milestones
  ]
};

const TimelineItem = ({ data, index, type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative pl-8 sm:pl-32 py-6 group"
    >
      {/* Timeline Line */}
      <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-neutral-800 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-white after:border-4 after:box-content after:border-neutral-900 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
        {/* Year */}
        <time className="sm:absolute sm:left-0 sm:ml-[0.5rem] sm:translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-white rounded-full bg-neutral-900">
          {data.year}
        </time>
        {/* Content */}
        <div className="sm:pl-8">
          <h3 className="text-xl font-light text-white mb-2">
            {data.title}
          </h3>
          <h4 className="text-neutral-400 mb-2 text-sm">
            {type === 'academic' ? data.institution : data.company}
          </h4>
          <p className="text-neutral-500 text-sm">
            {data.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Roadmap = () => {
  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">My Journey</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            A timeline of my academic and professional milestones in the world of software development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Academic Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="text-center mb-8">
              <h3 className="inline-flex items-center justify-center text-white text-sm font-light py-2 px-4 rounded-full border border-neutral-800">
                Academic Journey
              </h3>
            </div>
            <div className="relative">
              {timelineData.academic.map((item, index) => (
                <TimelineItem 
                  key={index} 
                  data={item} 
                  index={index}
                  type="academic"
                />
              ))}
            </div>
          </motion.div>

          {/* Professional Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="text-center mb-8">
              <h3 className="inline-flex items-center justify-center text-white text-sm font-light py-2 px-4 rounded-full border border-neutral-800">
                Professional Journey
              </h3>
            </div>
            <div className="relative">
              {timelineData.professional.map((item, index) => (
                <TimelineItem 
                  key={index} 
                  data={item} 
                  index={index}
                  type="professional"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap; 