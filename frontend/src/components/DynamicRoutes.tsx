import { Routes, Route, Navigate } from 'react-router-dom';
import { useApi } from '@/contexts/ApiContext';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Projects from '@/pages/Projects';
import Skills from '@/pages/Skills';
import Contact from '@/pages/Contact';
import AdminPanel from '@/pages/AdminPanel';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

const DynamicRoutes = () => {
  const { portfolioConfig } = useApi();
  
  // Default URLs if config is not loaded yet
  const urls = portfolioConfig.urls || {
    home: "/",
    about: "/about",
    projects: "/projects",
    skills: "/skills",
    contact: "/contact",
    admin: "/hey-admin"
  };

  return (
    <Routes>
      {/* Home route */}
      <Route path={urls.home} element={<Index />} />
      
      {/* Dynamic routes based on configuration */}
      <Route path={urls.about} element={<About />} />
      <Route path={urls.projects} element={<Projects />} />
      <Route path={urls.skills} element={<Skills />} />
      <Route path={urls.contact} element={<Contact />} />
      
      {/* Admin route - Protected */}
      <Route path={urls.admin} element={
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      } />
      
      {/* Redirect root to home if not already */}
      {urls.home !== "/" && <Route path="/" element={<Navigate to={urls.home} replace />} />}
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DynamicRoutes;
