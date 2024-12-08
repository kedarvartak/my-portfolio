import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep your static projects data
  const projects = [
    {
      title: "FINN - Financial Neural Network",
      description: "A financial tool that helps user manage their finances and make informed decisions using analytics and data visualisations. The application talks to the user's database and fetches the data to generate insights using Natural Language Processing.",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Python", "NLP", "Gemini"],
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop",
      github: "https://github.com/kedarvartak/nlp2SQL",
      live: "https://project1.com",
      type: "project"
    },
    {
      title: "CASSY - Climate Action Support System",
      description: "A web application that helps users manage their carbon footprint and make informed decisions to reduce their carbon emissions. The application uses the user's location to fetch the nearest carbon emission data and provides recommendations to the user.",
      tags: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Stripe"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
      github: "https://github.com/kedarvartak/Project-Cassy",
      live: "https://project2.com",
      type: "project"
    }
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://kedarvartak-portfolio.onrender.com/api/articles');
        const data = await response.json();

        if (data.success) {
          // Get the latest 2 articles and add type property
          const latestArticles = data.articles
            .slice(0, 2)
            .map(article => ({
              ...article,
              type: 'article',
              // Add date in a readable format
              date: new Date(article.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }),
              // Add link property for the article
              link: `/article/${article._id}`
            }));
          setArticles(latestArticles);
        } else {
          setError('Failed to fetch articles');
          console.error('API Error:', data.error);
        }
      } catch (error) {
        setError('Error fetching articles');
        console.error('Fetch Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Combine projects and articles
  const combinedItems = [...projects, ...articles];

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
          {isLoading ? (
            // Loading state
            <>
              <div className="animate-pulse bg-neutral-800/50 h-[400px] rounded-xl"></div>
              <div className="animate-pulse bg-neutral-800/50 h-[400px] rounded-xl"></div>
            </>
          ) : error ? (
            // Error state
            <div className="col-span-2 text-center text-red-400">
              {error}
            </div>
          ) : (
            // Render items
            combinedItems.map((item, index) => (
              <ProjectCard key={index} item={item} index={index} />
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-8 mt-16"
        >
          <a 
            href="https://github.com/kedarvartak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-white hover:text-neutral-300 transition-colors duration-300"
          >
            <span className="text-sm">View More Projects</span>
            <FiExternalLink className="w-4 h-4" />
          </a>
          <Link 
            to="/articles"
            className="inline-flex items-center space-x-2 text-white hover:text-neutral-300 transition-colors duration-300"
          >
            <span className="text-sm">View More Articles</span>
            <FiExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 