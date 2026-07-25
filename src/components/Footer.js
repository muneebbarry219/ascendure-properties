import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  Shield,
  Award,
  Users
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    properties: [
      { name: 'Buy Properties', href: '/properties/buy' },
      { name: 'Rent Properties', href: '/properties/rent' },
      { name: 'Off-Plan', href: '/properties/off-plan' },
      { name: 'Luxury Villas', href: '/properties/collections/luxury-villas' },
      { name: 'Residency Eligible', href: '/properties/collections/residency-eligible' }
    ],
    locations: [
      { name: 'Riyadh', href: '/neighbourhoods/ksa' },
      { name: 'Jeddah', href: '/neighbourhoods/ksa' },
      { name: 'NEOM', href: '/neighbourhoods/ksa' },
      { name: 'Dubai', href: '/neighbourhoods/uae' },
      { name: 'London', href: '/neighbourhoods/eu' }
    ],
    services: [
      { name: 'Buyer Advisory', href: '/services/buyer-advisory' },
      { name: 'Seller Representation', href: '/services/seller-representation' },
      { name: 'Property Management', href: '/services/property-management' },
      { name: 'Relocation Support', href: '/services/relocation' },
      { name: 'Financing Guidance', href: '/services/financing' },
      { name: 'KSA Premium Residency', href: '/ksa-premium-residency' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about#team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Partners', href: '/partners' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Use', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/ascendure' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/ascendure' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/ascendure' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/ascendure' }
  ];

  const trustSignals = [
    { icon: Shield, text: 'Licensed & Regulated' },
    { icon: Award, text: 'Award Winning Service' },
    { icon: Users, text: '500+ Happy Clients' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex flex-col items-start mb-6">
              <h3 className="text-2xl font-display font-bold text-white mb-1">
                ASCENDURE
              </h3>
              <p className="text-sm text-gray-400 font-medium">PROPERTIES</p>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your gateway to premium real estate in Saudi Arabia, UAE, and Europe. 
              We specialize in luxury properties, investment opportunities, and 
              exceptional lifestyle experiences.
            </p>

            {/* Trust Signals */}
            <div className="space-y-3 mb-6">
              {trustSignals.map((signal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 text-sm text-gray-300"
                >
                  <signal.icon className="w-4 h-4 text-yellow-500" />
                  <span>{signal.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-yellow-600 transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Properties</h4>
            <ul className="space-y-2">
              {footerLinks.properties.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Locations</h4>
            <ul className="space-y-2">
              {footerLinks.locations.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Riyadh Office */}
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-yellow-500 mt-1" />
              <div>
                <h5 className="font-semibold mb-1">Riyadh Office</h5>
                <p className="text-gray-300 text-sm">
                  Kingdom Centre, 77th Floor<br />
                  Riyadh 12345, Saudi Arabia
                </p>
              </div>
            </div>

            {/* Jeddah Office */}
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-yellow-500 mt-1" />
              <div>
                <h5 className="font-semibold mb-1">Jeddah Office</h5>
                <p className="text-gray-300 text-sm">
                  Corniche Road, Tower 2<br />
                  Jeddah 21432, Saudi Arabia
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="text-gray-300 text-sm">+966 50 123 4567</p>
                  <p className="text-gray-300 text-sm">+966 11 234 5678</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-500" />
                <p className="text-gray-300 text-sm">info@ascendure.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Ascendure Pages. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Licensed by Saudi Real Estate Authority</span>
              <span>•</span>
              <span>Member of International Real Estate Federation</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
