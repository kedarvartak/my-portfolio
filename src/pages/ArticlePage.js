import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiCalendar, FiTag } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// This would typically come from your API or CMS
const articles = [
  {
    slug: "understanding-react-server-components",
    title: "Understanding React Server Components",
    excerpt: "An in-depth look at React Server Components and how they revolutionize the way we build React applications.",
    content: `
      # Introduction

      React Server Components represent a paradigm shift in how we build React applications. 
      This article explores the fundamentals, benefits, and practical implementations.

      ## What are Server Components?

      Server Components are a new kind of component that runs only on the server. 
      They allow us to move heavy computation and data fetching to the server, 
      resulting in smaller bundle sizes and better performance.

      ## Key Benefits

      1. Reduced Bundle Size
      2. Improved Performance
      3. Better Developer Experience
      4. Enhanced Security

      ## Implementation Details

      Here's a simple example of a Server Component:

      \`\`\`jsx
      // ServerComponent.server.js
      async function ServerComponent() {
        const data = await db.query('SELECT * FROM items');
        
        return (
          <div>
            {data.map(item => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        );
      }
      \`\`\`

      ## Best Practices

      When working with Server Components, consider the following best practices:
      
      - Keep data fetching close to where it's used
      - Use proper boundaries between server and client components
      - Leverage streaming for better user experience

      ## Conclusion

      Server Components offer a powerful new way to build React applications...
    `,
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "React",
    author: {
      name: "Your Name",
      avatar: "https://placehold.co/100x100/1a1a1a/666666?text=YN",
      role: "Full Stack Developer"
    },
    image: "https://placehold.co/800x400/1a1a1a/666666?text=React+Server+Components"
  },
  {
    slug: "building-scalable-apis-with-nodejs",
    title: "Building Scalable APIs with Node.js",
    excerpt: "Best practices and patterns for building production-ready APIs using Node.js and Express.",
    content: `
      # Building Scalable APIs with Node.js

      In this article, we'll explore best practices for building production-ready APIs...
    `,
    date: "March 1, 2024",
    readTime: "8 min read",
    category: "Backend",
    author: {
      name: "Your Name",
      avatar: "https://placehold.co/100x100/1a1a1a/666666?text=YN",
      role: "Full Stack Developer"
    },
    image: "https://placehold.co/800x400/1a1a1a/666666?text=Scalable+APIs"
  }
];

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Article not found</h1>
          <Link 
            to="/articles" 
            className="text-neutral-400 hover:text-white transition-colors duration-300"
          >
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/articles"
              className="inline-flex items-center text-neutral-400 hover:text-white transition-colors duration-300"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
          </motion.div>
        </div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 mb-12"
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center space-x-4 text-sm text-neutral-400">
              <span className="flex items-center">
                <FiCalendar className="w-4 h-4 mr-2" />
                {article.date}
              </span>
              <span className="flex items-center">
                <FiClock className="w-4 h-4 mr-2" />
                {article.readTime}
              </span>
              <span className="flex items-center">
                <FiTag className="w-4 h-4 mr-2" />
                {article.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl text-white font-light">
              {article.title}
            </h1>
            <p className="text-neutral-400 text-lg">
              {article.excerpt}
            </p>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 mb-16"
        >
          <div className="aspect-[2/1] rounded-xl overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Author */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 mb-16"
        >
          <div className="flex items-center space-x-4">
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="text-white">{article.author.name}</div>
              <div className="text-neutral-400 text-sm">{article.author.role}</div>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="prose prose-invert prose-neutral max-w-3xl mx-auto px-4 sm:px-6"
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-light mt-12 mb-6" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-light mt-10 mb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-light mt-8 mb-3" {...props} />,
              p: ({node, ...props}) => <p className="text-neutral-300 mb-6 leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-6 text-neutral-300" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-6 text-neutral-300" {...props} />,
              li: ({node, ...props}) => <li className="mb-2" {...props} />,
              code: ({node, inline, ...props}) => (
                inline ? 
                  <code className="bg-neutral-800 px-1.5 py-0.5 rounded text-sm" {...props} /> :
                  <code className="block bg-neutral-900/50 p-4 rounded-lg my-6 text-sm overflow-x-auto" {...props} />
              ),
              pre: ({node, ...props}) => <pre className="bg-transparent" {...props} />,
              blockquote: ({node, ...props}) => (
                <blockquote 
                  className="border-l-2 border-neutral-700 pl-4 italic text-neutral-400 my-6" 
                  {...props} 
                />
              ),
              a: ({node, ...props}) => (
                <a 
                  className="text-white hover:text-neutral-300 transition-colors duration-300 underline" 
                  {...props}
                />
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </motion.article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage; 