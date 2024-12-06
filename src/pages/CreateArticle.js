import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSave, FiX, FiEye, FiEyeOff, FiImage, FiYoutube, FiLink } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Toolbar = ({ onInsert, onMediaClick }) => {
  const tools = [
    { icon: FiImage, label: 'Image', format: 'image', isMedia: true },
    { icon: FiYoutube, label: 'YouTube', format: 'youtube', isMedia: true },
    { icon: FiLink, label: 'Link', format: '[Link text](url)' },
    { label: 'H1', format: '# ' },
    { label: 'H2', format: '## ' },
    { label: 'H3', format: '### ' },
    { label: 'Bold', format: '**Bold text**' },
    { label: 'Italic', format: '_Italic text_' },
    { label: 'Code', format: '`code`' },
    { label: 'Quote', format: '> Quote' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-2 bg-white/5 rounded-lg">
      {tools.map((tool, index) => (
        <button
          key={index}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (tool.isMedia) {
              onMediaClick(tool.format);
            } else {
              onInsert(tool.format);
            }
          }}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-white/80 text-sm transition-colors duration-200"
        >
          {tool.icon && <tool.icon className="w-4 h-4" />}
          <span>{tool.label}</span>
        </button>
      ))}
    </div>
  );
};

const MediaModal = ({ type, isOpen, onClose, onInsert }) => {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  const handleInsert = () => {
    let markdown = '';
    if (type === 'image') {
      markdown = `![${alt}](${url})`;
    } else if (type === 'youtube') {
      const videoId = url.split('v=')[1]?.split('&')[0];
      markdown = `[![Video](https://img.youtube.com/vi/${videoId}/0.jpg)](${url})`;
    }
    onInsert(markdown);
    onClose();
    setUrl('');
    setAlt('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-neutral-800 rounded-lg p-6 w-full max-w-md"
          >
            <h3 className="text-xl text-white mb-4">Insert {type === 'image' ? 'Image' : 'YouTube Video'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white/60 mb-2">URL</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  placeholder={type === 'image' ? 'Image URL...' : 'YouTube URL...'}
                />
              </div>
              {type === 'image' && (
                <div>
                  <label className="block text-white/60 mb-2">Alt Text</label>
                  <input
                    type="text"
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                    placeholder="Image description..."
                  />
                </div>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleInsert}
                  className="px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors duration-200"
                >
                  Insert
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CreateArticle = () => {
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: ''
  });

  const handleInsertFormat = (format) => {
    const textarea = document.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    const newText = before + format + after;
    setFormData({ ...formData, content: newText });
    
    // Set cursor position after format insertion
    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + format.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle article creation logic here
    console.log('Article data:', formData);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <AdminNavbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl text-white font-light">Create New Article</h1>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setIsPreview(!isPreview)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors duration-300"
                >
                  {isPreview ? <FiEyeOff /> : <FiEye />}
                  <span>{isPreview ? 'Edit' : 'Preview'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors duration-300"
                >
                  <FiX />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-500 transition-colors duration-300"
                >
                  <FiSave />
                  <span>Save Article</span>
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/60 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/20"
                    placeholder="Enter article title..."
                  />
                </div>
                <div>
                  <label className="block text-white/60 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/20"
                    placeholder="Article category..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/60 mb-2">Excerpt</label>
                <input
                  type="text"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/20"
                  placeholder="Brief description of the article..."
                />
              </div>

              {/* Content Editor/Preview */}
              <div>
                <label className="block text-white/60 mb-2">Content</label>
                {!isPreview ? (
                  <>
                    <Toolbar 
                      onInsert={handleInsertFormat} 
                      onMediaClick={(type) => setShowMediaModal(type)}
                    />
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full h-[600px] bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/20 font-mono"
                      placeholder="Write your article in markdown format..."
                    />
                  </>
                ) : (
                  <div className="prose prose-invert prose-neutral max-w-none bg-white/5 border border-white/10 rounded-lg p-6">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {formData.content || '*No content yet*'}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      <MediaModal
        type={showMediaModal}
        isOpen={!!showMediaModal}
        onClose={() => setShowMediaModal(null)}
        onInsert={handleInsertFormat}
      />

      <Footer />
    </div>
  );
};

export default CreateArticle; 