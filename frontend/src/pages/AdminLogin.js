import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { endpoints } from '../config/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoints.sendCode, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setIsCodeSent(true);
      } else {
        setError(data.message || 'Failed to send verification code');
      }
    } catch (error) {
      setError('Error sending verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoints.verifyCode, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid verification code');
      }
    } catch (error) {
      setError('Error verifying code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6"
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl text-white font-light mb-2">Admin Access</h1>
              <p className="text-neutral-400">Enter your email to receive a login code</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center text-red-400"
              >
                <FiAlertCircle className="w-5 h-5 mr-2" />
                {error}
              </motion.div>
            )}

            {!isCodeSent ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/60 mb-2">Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-3.5 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-white/20"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors duration-200 relative ${
                    isLoading ? 'cursor-wait' : ''
                  }`}
                >
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center"
                    >
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </motion.div>
                  ) : (
                    'Send Code'
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div>
                  <label className="block text-white/60 mb-2">Verification Code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/20"
                    placeholder="Enter the 6-digit code"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors duration-200 relative ${
                    isLoading ? 'cursor-wait' : ''
                  }`}
                >
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center"
                    >
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </motion.div>
                  ) : (
                    'Verify Code'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLogin; 