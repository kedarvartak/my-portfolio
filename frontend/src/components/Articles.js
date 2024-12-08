import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const articles = [
  {
    title: "Understanding React Server Components",
    excerpt: "An in-depth look at React Server Components and how they revolutionize the way we build React applications.",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "React",
    link: "https://yourblog.com/react-server-components",
    image: "https://via.placeholder.com/600x400/1a1a1a/666666?text=Article+1"
  },
  {
    title: "Building Scalable APIs with Node.js",
    excerpt: "Best practices and patterns for building production-ready APIs using Node.js and Express.",
    date: "March 1, 2024",
    readTime: "8 min read",
    category: "Backend",
    link: "https://yourblog.com/scalable-nodejs-apis",
    image: "https://via.placeholder.com/600x400/1a1a1a/666666?text=Article+2"
  },
  {
    title: "Modern CSS Techniques",
    excerpt: "Exploring modern CSS features and techniques for building better user interfaces.",
    date: "February 20, 2024",
    readTime: "6 min read",
    category: "CSS",
    link: "https://yourblog.com/modern-css",
    image: "https://via.placeholder.com/600x400/1a1a1a/666666?text=Article+3"
  }
];

const ArticleCard = ({ article, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-neutral-900/50 rounded-xl overflow-hidden border border-neutral-800"
    >
      {/* Article Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Article Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 text-xs text-neutral-300 bg-neutral-800/50 rounded-full">
            {article.category}
          </span>
          <div className="flex items-center space-x-2 text-xs text-neutral-400">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        <h3 className="text-xl text-white font-light group-hover:text-neutral-300 transition-colors duration-300">
          {article.title}
        </h3>

        <p className="text-neutral-400 text-sm line-clamp-2">
          {article.excerpt}
        </p>

        <motion.a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-white text-sm hover:text-neutral-300 transition-colors duration-300"
          whileHover={{ x: 4 }}
        >
          Read More 
          <FiArrowUpRight className="ml-1 w-4 h-4" />
        </motion.a>
      </div>
    </motion.article>
  );
};

const Articles = () => {
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
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-4">Featured Articles</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto font-light">
            Sharing my thoughts and experiences in software development through technical writing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a 
            href="https://yourblog.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-white hover:text-neutral-300 transition-colors duration-300"
          >
            <span className="text-sm">View All Articles</span>
            <FiArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Articles; 