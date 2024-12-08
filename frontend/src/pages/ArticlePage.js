import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiCalendar, FiTag } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { endpoints } from '../config/api';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${endpoints.articles}/${id}`);
        const data = await response.json();
        if (data.success) {
          setArticle(data.article);
        } else {
          setError('Failed to fetch article');
        }
      } catch (error) {
        setError('Error fetching article');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">{error}</p>
              <Link 
                to="/articles"
                className="inline-flex items-center text-white hover:text-neutral-300 transition-colors duration-300"
              >
                <FiArrowLeft className="mr-2" />
                Back to Articles
              </Link>
            </div>
          ) : article ? (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Back Button */}
              <Link 
                to="/articles"
                className="inline-flex items-center text-white hover:text-neutral-300 transition-colors duration-300"
              >
                <FiArrowLeft className="mr-2" />
                Back to Articles
              </Link>

              {/* Article Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 items-center text-sm text-neutral-400">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2" />
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <FiClock className="mr-2" />
                    {article.readTime}
                  </div>
                  <div className="flex items-center">
                    <FiTag className="mr-2" />
                    {article.category}
                  </div>
                </div>

                <h1 className="text-4xl text-white font-light">{article.title}</h1>
                <p className="text-xl text-neutral-400">{article.excerpt}</p>
              </div>

              {/* Article Image */}
              <div className="relative aspect-[2/1] overflow-hidden rounded-xl">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-invert prose-neutral max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {article.content}
                </ReactMarkdown>
              </div>
            </motion.article>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage; 