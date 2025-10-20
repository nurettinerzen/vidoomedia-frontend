import { useEffect } from 'react';

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // sayfa içeriği
  );
}
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
import VidooHomePage from '@/pages/VidooHomePage';
import VidooDriversPage from '@/pages/VidooDriversPage';
import VidooAdvertisingPage from '@/pages/VidooAdvertisingPage';
import VidooAboutPage from '@/pages/VidooAboutPage';
import VidooContactPage from '@/pages/VidooContactPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboard from '@/pages/AdminDashboard';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
