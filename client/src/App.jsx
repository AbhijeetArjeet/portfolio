import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ColdStartBanner from './components/common/ColdStartBanner';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PortfolioEditor from './pages/PortfolioEditor';
import PublicPortfolio from './pages/PublicPortfolio';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

import './styles/main.css';
import './styles/templates.css';

function Layout({ children }) {
  const location = useLocation();
  const isPublicPortfolio = location.pathname.startsWith('/u/');
  const isEditor = location.pathname === '/editor';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ColdStartBanner />
      {!isPublicPortfolio && <Navbar />}
      <div className="main-content">{children}</div>
      {!isPublicPortfolio && !isEditor && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/editor" element={<PortfolioEditor />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/u/:slug" element={<PublicPortfolio />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
