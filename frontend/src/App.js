import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import '@/App.css';
import VidooHomePage from '@/pages/VidooHomePage';
import VidooDriversPage from '@/pages/VidooDriversPage';
import VidooAdvertisingPage from '@/pages/VidooAdvertisingPage';
import VidooAboutPage from '@/pages/VidooAboutPage';
import VidooContactPage from '@/pages/VidooContactPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboard from '@/pages/AdminDashboard';
import { Toaster } from '@/components/ui/sonner';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<VidooHomePage />} />
          <Route path="/drivers" element={<VidooDriversPage />} />
          <Route path="/advertising" element={<VidooAdvertisingPage />} />
          <Route path="/advertisers" element={<VidooAdvertisingPage />} />
          <Route path="/about" element={<VidooAboutPage />} />
          <Route path="/contact" element={<VidooContactPage />} />
          <Route path="/admin-ridemedia-8432" element={<AdminLoginPage />} />
          <Route path="/admin-ridemedia-8432/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
