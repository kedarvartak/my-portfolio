import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Roadmap from './components/Roadmap';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Articles from './pages/Articles';
import ArticlePage from './pages/ArticlePage';
import AdminPage from './pages/AdminPage';
import CreateArticle from './pages/CreateArticle';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-black">
        {/* Global Background Grid */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:6rem_4rem]" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <Hero />
                <Roadmap />
                <Skills />
                <Projects />
                <Footer />
              </>
            } />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticlePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/create-article" 
              element={
                <ProtectedRoute>
                  <CreateArticle />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
