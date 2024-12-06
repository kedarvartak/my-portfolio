import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiSearch } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const articles = [
  {
    title: "Understanding React Server Components",
    excerpt: "An in-depth look at React Server Components and how they revolutionize the way we build React applications. Learn about the benefits, trade-offs, and implementation details.",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "React",
    link: "https://yourblog.com/react-server-components",
    image: "https://placehold.co/800x400/1a1a1a/666666?text=React+Server+Components"
  },
  {
    title: "Building Scalable APIs with Node.js",
    excerpt: "Best practices and patterns for building production-ready APIs using Node.js and Express. Covering authentication, caching, rate limiting, and more.",
    date: "March 1, 2024",
    readTime: "8 min read",
    category: "Backend",
    link: "https://yourblog.com/scalable-nodejs-apis",
    image: "https://placehold.co/800x400/1a1a1a/666666?text=Scalable+APIs"
  },
  // Add more articles...
];

const categories = ["All", "React", "Backend", "DevOps", "Architecture", "TypeScript"];

const ArticleCard = ({ article, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group relative bg-transparent border border-neutral-800 rounded-xl overflow-hidden"
  >
    <div className="relative aspect-[16/9] overflow-hidden">
      <img 
        src={article.image} 
        alt={article.title}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
    
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

      <h2 className="text-xl text-white font-light group-hover:text-neutral-300 transition-colors duration-300">
        {article.title}
      </h2>

      <p className="text-neutral-400 text-sm line-clamp-2">
        {article.excerpt}
      </p>

      <Link 
        to={`/articles/${article.slug}`}
        className="inline-flex items-center text-white text-sm hover:text-neutral-300 transition-colors duration-300"
      >
        Read Article 
        <FiArrowUpRight className="ml-1 w-4 h-4" />
      </Link>
    </div>
  </motion.article>
);

const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl sm:text-5xl text-white font-light mb-4">Articles</h1>
            <p className="text-neutral-400 max-w-2xl mx-auto font-light">
              Thoughts, learnings, and insights about web development, 
              architecture, and building great software.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-8">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative max-w-xl mx-auto"
            >
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900/50 border border-neutral-800 rounded-full py-3 pl-12 pr-6 text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors duration-300"
              />
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
                    selectedCategory === category
                      ? 'bg-white text-black'
                      : 'text-neutral-400 border border-neutral-800 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={index} article={article} index={index} />
            ))}
          </div>

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-neutral-400">No articles found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Articles; 