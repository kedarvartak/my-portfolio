import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

const Terminal = () => {
  const navigate = useNavigate();
  const [commands, setCommands] = useState([
    { text: '> Initializing admin interface...', type: 'system' },
    { text: '> Loading system components...', type: 'system' },
    { text: '> Database connection established ✓', type: 'success' },
    { text: '> Access granted. Welcome, admin.', type: 'success' },
    { text: '> Type "help" for available commands', type: 'system' },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  
  const handleCommand = (e) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      setCommands([...commands, { text: `> ${currentCommand}`, type: 'user' }]);
      processCommand(currentCommand.trim());
      setCurrentCommand('');
    }
  };

  const processCommand = (cmd) => {
    const lowercaseCmd = cmd.toLowerCase();
    let response;

    switch(lowercaseCmd) {
      case 'help':
        response = `Available commands:
- npm create article: Create a new article
- help: Show this help message
- stats: Show system statistics
- articles: List all articles
- clear: Clear terminal
- status: Check database connection
- logout: Exit admin mode`;
        break;
      case 'npm create article':
        setCommands(prev => [...prev, 
          { text: '> Initializing article creation wizard...', type: 'system' },
          { text: '> Redirecting to article editor...', type: 'system' }
        ]);
        setTimeout(() => {
          navigate('/admin/create-article');
        }, 1000);
        return;
      case 'status':
        response = `System Status:
> Database: Connected ✓
> Last sync: ${new Date().toLocaleTimeString()}
> Server status: Active
> API version: 1.0.0`;
        break;
      case 'stats':
        response = `System Statistics:
- Total Articles: 12
- Published: 8
- Draft: 4
- Total Views: 1,234
- Active Users: 56`;
        break;
      case 'clear':
        setCommands([]);
        return;
      case 'articles':
        response = `Recent Articles:
1. Understanding React Server Components
2. Building Scalable APIs with Node.js
3. Advanced TypeScript Patterns`;
        break;
      case 'logout':
        response = '> Logging out...';
        setTimeout(() => {
          navigate('/');
        }, 1000);
        break;
      default:
        response = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setCommands(prev => [...prev, { text: response, type: 'system' }]);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 h-[600px] overflow-hidden flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center space-x-2 pb-4 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-white/60 text-sm">admin@portfolio ~ </span>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto py-4 font-mono text-sm scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {commands.map((cmd, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-2 ${
              cmd.type === 'system' ? 'text-white/80' :
              cmd.type === 'success' ? 'text-green-400' :
              cmd.type === 'error' ? 'text-red-400' :
              'text-blue-400'
            }`}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {cmd.text}
          </motion.div>
        ))}
      </div>

      {/* Terminal Input */}
      <div className="flex items-center border-t border-white/10 pt-4">
        <span className="text-green-400 mr-2">❯</span>
        <input
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none text-white font-mono text-sm"
          placeholder="Type 'help' for available commands..."
          spellCheck="false"
          autoFocus
        />
      </div>
    </div>
  );
};

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-neutral-900">
      <AdminNavbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl text-white font-light mb-4">Admin Dashboard</h1>
            <p className="text-neutral-400">Manage your content and monitor system status</p>
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Terminal />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage; 