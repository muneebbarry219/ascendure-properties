import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import Properties from './pages/Properties';
import PropertyListings from './pages/PropertyListings';
import PropertyDetail from './pages/PropertyDetail';
import InvestorsHub from './pages/InvestorsHub';
import Neighbourhoods from './pages/Neighbourhoods';
import Countries from './pages/Countries';
import About from './pages/About';
import Insights from './pages/Insights';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CareersPage from './pages/CareersPage';
import KsaPremiumResidencyPage from './pages/KsaPremiumResidencyPage';
import GuideDetailPage from './pages/GuideDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

// Context
import { PropertyProvider } from './context/PropertyContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <PropertyProvider>
          <Router>
            <div className="App">
              <ScrollToTop />
              {!window.location.pathname.startsWith('/admin') && <Header />}
              
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/properties" element={<Properties />} />
                  <Route path="/properties/buy" element={<PropertyListings type="buy" />} />
                  <Route path="/properties/rent" element={<PropertyListings type="rent" />} />
                  <Route path="/properties/off-plan" element={<PropertyListings type="off-plan" />} />
                  <Route path="/property/:id/:slug" element={<PropertyDetail />} />
                  <Route path="/investors" element={<InvestorsHub />} />
                  <Route path="/neighbourhoods" element={<Neighbourhoods />} />
                  <Route path="/countries" element={<Countries />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/insights/:slug" element={<GuideDetailPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfUse />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/ksa-premium-residency" element={<KsaPremiumResidencyPage />} />

                  {/* Admin */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route element={<ProtectedRoute />}> 
                    <Route path="/admin" element={<AdminDashboard />} />
                  </Route>

                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AnimatePresence>
              
              {!window.location.pathname.startsWith('/admin') && <Footer />}
              {!window.location.pathname.startsWith('/admin') && <WhatsAppButton />}
            </div>
          </Router>
        </PropertyProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;



