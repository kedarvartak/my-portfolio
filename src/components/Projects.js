import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';

const projects = [
  {
    title: "Project Name 1",
    description: "A modern web application built with React and Node.js. Features include real-time updates, user authentication, and responsive design.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "https://via.placeholder.com/600x400/1a1a1a/666666?text=Project+1",
    github: "https://github.com/yourusername/project1",
    live: "https://project1.com",
    type: "project"
  },
  {
    title: "Understanding React Server Components",
    excerpt: "An in-depth look at React Server Components and how they revolutionize the way we build React applications.",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "React",
    link: "https://yourblog.com/react-server-components",
    image: "https://via.placeholder.com/600x400/1a1a1a/666666?text=Article+1",
    type: "article"
  },
  {
    title: "Project Name 2",
    description: "Full-stack e-commerce platform with advanced filtering, search functionality, and secure payment integration.",
    tags: ["TypeScript", "Next.js", "PostgreSQL", "Stripe"],
    image: "https://via.placeholder.com/600x400/1a1a1a/666666?text=Project+2",
    github: "https://github.com/yourusername/project2",
    live: "https://project2.com",
    type: "project"
  },
  {
    title: "Building Scalable APIs with Node.js",
    excerpt: "Best practices and patterns for building production-ready APIs using Node.js and Express.",
    date: "March 1, 2024",
    readTime: "8 min read",
    category: "Backend",
    link: "https://yourblog.com/scalable-nodejs-apis",
    image: "https://via.placeholder.com/600x400/1a1a1a/666666?text=Article+2",
    type: "article"
  }
];

const ProjectCard = ({ item, index }) => {
  if (item.type === "project") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative bg-transparent rounded-xl overflow-hidden border border-neutral-800"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 right-4 flex space-x-4">
              <a 
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
              >
                <FiGithub className="text-white w-5 h-5" />
              </a>
              <a 
                href={item.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
              >
                <FiExternalLink className="text-white w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className="text-xl text-white font-light">{item.title}</h3>
          <p className="text-neutral-400 text-sm line-clamp-2">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs text-neutral-300 bg-neutral-800/50 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-transparent rounded-xl overflow-hidden border border-neutral-800"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 text-xs text-neutral-300 bg-neutral-800/50 rounded-full">
            {item.category}
          </span>
          <div className="flex items-center space-x-2 text-xs text-neutral-400">
            <span>{item.date}</span>
            <span>•</span>
            <span>{item.readTime}</span>
          </div>
        </div>

        <h3 className="text-xl text-white font-light group-hover:text-neutral-300 transition-colors duration-300">
          {item.title}
        </h3>

        <p className="text-neutral-400 text-sm line-clamp-2">
          {item.excerpt}
        </p>

        <motion.a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-white text-sm hover:text-neutral-300 transition-colors duration-300"
          whileHover={{ x: 4 }}
        >
          Read Article 
          <FiArrowUpRight className="ml-1 w-4 h-4" />
        </motion.a>
      </div>
    </motion.article>
  );
};

const Projects = () => {
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
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">Projects & Articles</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto font-light">
            A showcase of my recent work and technical writing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((item, index) => (
            <ProjectCard key={index} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-8 mt-16"
        >
          <a 
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-white hover:text-neutral-300 transition-colors duration-300"
          >
            <span className="text-sm">View More Projects</span>
            <FiExternalLink className="w-4 h-4" />
          </a>
          <a 
            href="/articles"
            className="inline-flex items-center space-x-2 text-white hover:text-neutral-300 transition-colors duration-300"
          >
            <span className="text-sm">View More Articles</span>
            <FiExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 