import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Home,
  TrendingUp,
  Star,
  ArrowRight
} from 'lucide-react';
import { resolveAssetUrl } from '../utils/assets';

const HomePage = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [unitType, setUnitType] = useState('');
  const [handover, setHandover] = useState('');
  const [size, setSize] = useState('');

  const getImageUrl = resolveAssetUrl;

  const handleExplore = (label) => {
    const key = String(label).toUpperCase();
    const params = new URLSearchParams();
    if (key.includes('DUBAI')) params.set('city', 'Dubai');
    else if (key.includes('KSA') || key.includes('SAUDI')) params.set('city', 'Saudi Arabia');
    else if (key.includes('SPAIN')) params.set('city', 'Spain');
    else if (key.includes('MONTENEGRO')) params.set('city', 'Montenegro');
    navigate(`/properties${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (country) {
      // Use city filter to match location includes logic
      params.set('city', country);
    }
    if (unitType && unitType !== 'All Types') {
      params.set('subType', unitType);
    }
    if (size) {
      // Map size to bedrooms minimum
      const map = {
        '1-2 Bedrooms': '1',
        '3-4 Bedrooms': '3',
        '5+ Bedrooms': '5'
      };
      if (map[size]) params.set('bedrooms', map[size]);
    }
    if (handover === 'Immediate') {
      params.set('ready', 'ready');
    }
    navigate(`/properties${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A2540' }}>
      {/* Section 1 - Hero Section */}
      <section className="relative min-h-screen overflow-hidden pb-16 sm:pb-0">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl('/assets/Hero Section Image.png')}
            alt="Dubai Skyline at Sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(10,37,64,0.8) 100%)' }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 min-h-[85vh] sm:h-screen flex items-center">
          <div className="max-w-6xl mx-auto px-4 w-full pt-20 sm:pt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                  <span className="block">Global Luxury</span>
                  <span className="block text-yellow-400">Real Estate</span>
                  <span className="block">Brokerage</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-lg">
                  Connecting discerning buyers with the world's most iconic properties.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold px-6 py-3 rounded-lg text-sm hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 inline-block w-fit"
                  >
                    Request a Private Consultation
                  </Link>
                  <button className="border-2 border-white text-white font-bold px-6 py-3 rounded-lg text-sm hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center w-fit">
                    Explore Our Portfolio
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>

              {/* Right Content - Search Widget */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/70 backdrop-blur-xl rounded-2xl p-3 sm:p-6 shadow-2xl border border-white/30 max-w-md mx-auto lg:mx-0"
              >
                <h2 className="text-xl sm:text-3xl font-display font-bold text-gray-900 mb-1 sm:mb-2">
                  Find Your Dream Property
                </h2>
                <p className="text-gray-600 mb-4 sm:mb-8 text-xs sm:text-sm">
                  Search through our curated collection of premium properties
                </p>

                <form onSubmit={handleSearch} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Country</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-sm">
                          <option value="">Select Country</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Dubai">UAE</option>
                          <option value="Montenegro">Montenegro</option>
                          <option value="Spain">Spain</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Unit Type</label>
                      <div className="relative">
                        <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select value={unitType} onChange={(e) => setUnitType(e.target.value)} className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-sm">
                          <option>All Types</option>
                          <option>Villa</option>
                          <option>Apartment</option>
                          <option>Penthouse</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Handover</label>
                      <div className="relative">
                        <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select value={handover} onChange={(e) => setHandover(e.target.value)} className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-sm">
                          <option value="">Any</option>
                          <option>Immediate</option>
                          <option>2024</option>
                          <option>2025</option>
                          <option>2026</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Size</label>
                      <div className="relative">
                        <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-sm">
                          <option value="">All Sizes</option>
                          <option>1-2 Bedrooms</option>
                          <option>3-4 Bedrooms</option>
                          <option>5+ Bedrooms</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white font-bold py-2.5 sm:py-3 rounded-lg transition-colors duration-300 flex items-center justify-center text-sm"
                    style={{ backgroundColor: '#0A2540' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0B2A4A'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#0A2540'}
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Properties
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Line Separator - End of Section 1 */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 pb-8">
          <div className="flex justify-center">
            <div className="w-[600px] h-px bg-white/20"></div>
          </div>
        </div>
      </section>

      {/* Section 2 - Featured Countries */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl('/assets/Feature Countries Image.png')}
            alt="Featured Countries Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,37,64,0.8) 0%, rgba(10,37,64,0.7) 50%, rgba(10,37,64,0.6) 100%)' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="text-white">Featured</span>
              <span className="text-yellow-400 ml-2 sm:ml-4">Countries</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              Explore our top destinations where we've built a strong presence and helped clients find their dream properties.
            </p>
          </motion.div>

          {/* Country Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {[
              {
                name: "DUBAI",
                flag: "https://flagcdn.com/w40/ae.png",
                image: getImageUrl('/assets/Dubai Container Image.png'),
                gradient: "from-red-600/40 via-red-500/20 to-black/60",
                to: "/properties?country=UAE"
              },
              {
                name: "KSA",
                flag: "https://flagcdn.com/w40/sa.png",
                image: getImageUrl('/assets/KSA Container Image.png'),
                gradient: "from-green-600/40 via-green-500/20 to-black/60",
                to: "/properties?country=Saudi%20Arabia"
              },
              {
                name: "MONTENEGRO",
                flag: "https://flagcdn.com/w40/me.png",
                image: getImageUrl('/assets/Montenegro Container Image.png'),
                gradient: "from-blue-600/40 via-blue-500/20 to-black/60",
                to: "/properties?country=Montenegro"
              },
              {
                name: "SPAIN",
                flag: "https://flagcdn.com/w40/es.png",
                image: getImageUrl('/assets/Spain Container Image.png'),
                gradient: "from-yellow-600/40 via-yellow-500/20 to-black/60",
                to: "/properties?country=Spain"
              }
            ].map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 h-80 sm:h-96"
              >
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${country.gradient}`}></div>

                {/* Flag */}
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={country.flag}
                      alt={`${country.name} flag`}
                      className="h-auto w-8 rounded-sm object-contain shadow-sm"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 leading-tight">{country.name}</h3>
                  <Link to={country.to} className="block w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-sm text-center">
                    Explore Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Properties Button */}
          <div className="text-center">
            <Link
              to="/properties"
              className="inline-flex items-center bg-gradient-to-b from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-800 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="mr-3 bg-transparent">View All Properties</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3 - Trusted by Our Channel Partners */}
      <section className="relative py-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl('/assets/Rectangle 47.png')}
            alt="Channel Partners Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Trusted by Our Channel Partners
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We collaborate with top-tier developers, agents, and brands worldwide building partnerships founded on trust, excellence, and shared success.
            </p>
          </motion.div>

          {/* Partner Logos */}
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-300"
              >
                {/* Mountain Icon */}
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 bg-white rounded-sm transform rotate-45"></div>
                  <div className="absolute inset-1 bg-white/80 rounded-sm transform rotate-45"></div>
                </div>
                <span className="text-white font-medium text-lg group-hover:text-white/80 transition-colors duration-300">
                  logoipsum
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 - Redefining Modern Living */}
      <section className="relative z-10 overflow-hidden" style={{ height: '600px' }}>
        {/* Split Background - Blue Top (smaller), Grey Bottom */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, #0A2540 0%, #0A2540 35%, #f8f9fa 35%, #f8f9fa 100%)'
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
            {/* Left Content - Positioned in white section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
              style={{ marginTop: '220px' }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight" style={{ color: '#0A2540' }}>
                <span className="block">Redefining Modern</span>
                <span className="block">Living</span>
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-lg">
                Discover spaces designed for comfort, style, and long-term value crafted to meet today's lifestyle needs.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: getImageUrl('/assets/home (3) 1.jpg'), number: '500+', label: 'Properties Sold' },
                  { icon: getImageUrl('/assets/customer 1.png'), number: '1000+', label: 'Happy Clients' },
                  { icon: getImageUrl('/assets/expertise 1.png'), number: '15+', label: 'Years Experience' },
                  { icon: getImageUrl('/assets/global 1.png'), number: '3', label: 'Countries' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg overflow-hidden">
                      <img
                        src={stat.icon}
                        alt={stat.label}
                        className="w-8 h-8 object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-xs font-medium text-gray-600">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - 3D Building Image (No Card) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center items-center"
            >
              {/* 3D Building Image - Positioned to span both backgrounds */}
              <img
                src={getImageUrl('/assets/Redefining Modern Image.png')}
                alt="Modern 3D Building"
                className="w-full max-w-md h-auto object-contain"
                style={{
                  position: 'relative',
                  zIndex: 10
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5 - Featured Collections */}
      <section className="py-32 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="text-white">Featured</span>
              <span className="text-yellow-400 ml-4">Collections</span>
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Discover our handpicked selection of premium properties across different categories
            </p>
          </motion.div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Luxury Villas",
                description: "Exclusive villas with premium amenities",
                count: "25+ Properties",
                image: getImageUrl('/assets/Luxury Villas Image.png'),
                link: "/properties/luxury-villas"
              },
              {
                title: "Off-Plan Icons",
                description: "Future-ready properties under construction",
                count: "15+ Projects",
                image: getImageUrl('/assets/Off Plan Icons Image.png'),
                link: "/properties/off-plan"
              },
              {
                title: "Residency Eligible",
                description: "Properties qualifying for Golden Visa",
                count: "30+ Options",
                image: getImageUrl('/assets/Residency Eligible Image.png'),
                link: "/properties/residency-eligible"
              },
              {
                title: "Lifestyle Homes",
                description: "Curated properties for every lifestyle",
                count: "50+ Homes",
                image: getImageUrl('/assets/Lifestyle Home Image.png'),
                link: "/properties/lifestyle-homes"
              }
            ].map((collection, index) => (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Link to={collection.link} className="block">
                  <div className="relative h-96 rounded-2xl overflow-hidden mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <img
                      src={collection.image}
                      alt={collection.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-full text-sm">
                        {collection.count}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
                        style={{ backgroundColor: '#0A2540' }}
                      >
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                      <p className="text-white/90">{collection.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 - Trusted by Leading Developers */}
      <section className="relative py-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl('/assets/Rectangle 47.png')}
            alt="Leading Developers Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-white">
              Trusted by Leading Developers
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We partner with the most prestigious developers and brands in the region
            </p>
          </motion.div>

          {/* Developer Logos */}
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {[1, 2, 3, 4].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex items-center gap-3"
              >
                {/* Mountain Icon */}
                <div className="w-8 h-8 relative">
                  <div className="absolute inset-0 bg-white rounded-sm transform rotate-45"></div>
                  <div className="absolute inset-1 bg-white/80 rounded-sm transform rotate-45"></div>
                </div>
                {/* Logo Text */}
                <span className="text-white font-medium text-lg">logoipsum</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 - Empowering Global Real Estate Success */}
      <section className="relative z-10 overflow-hidden" style={{ height: '600px' }}>
        {/* Split Background - Blue Top (smaller), Grey Bottom */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to bottom, #0A2540 0%, #0A2540 35%, #f8f9fa 35%, #f8f9fa 100%)'
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
            {/* Left Side - Building Image (No Card) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex justify-center items-center"
            >
              {/* Tall Building Image - Positioned to span both backgrounds */}
              <img
                src={getImageUrl('/assets/tall-city-building-on-isolated-transparent-background-free-png 1.png')}
                alt="Tall Modern Skyscraper"
                className="w-full max-w-md h-auto object-contain"
                style={{
                  position: 'relative',
                  zIndex: 10
                }}
              />
            </motion.div>

            {/* Right Side - Text Content (Positioned in grey section) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
              style={{ marginTop: '220px' }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight" style={{ color: '#0A2540' }}>
                <span className="block">Empowering Global</span>
                <span className="block">Real Estate Success</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
                We help Real Estate Professionals achieve Global success, transforming every project into a lasting success story.
              </p>

              {/* Book Consultation Button */}
              <button className="inline-flex items-center justify-center text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: '#0A2540' }}>
                Book Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 8 - Channel Partner CTA */}
      <section className="relative py-32 overflow-hidden z-10">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl('/assets/Channel Partner Image.png')}
            alt="City Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(10,37,64,0.8) 100%)' }}></div>
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
              <span className="block">Become Ascendure</span>
              <span className="block text-yellow-400">Channel Partner</span>
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join our network of elite real estate professionals and gain access to exclusive projects, premium commissions, and long-term growth opportunities with Ascendure Properties.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex items-center justify-center bg-gray-600 hover:bg-gray-700 border border-white text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                Become our Partner
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Q2 Luxury Market Report Preview */}
      <section className="relative z-10 overflow-hidden bg-stone-100 py-24">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl"></div>
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -bottom-5 -right-5 h-full w-full rounded-2xl border border-yellow-500/30 bg-yellow-400/10"></div>
            <div className="relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl bg-[#0A2540] p-9 text-white shadow-2xl">
              <div className="flex items-baseline gap-2 border-b border-white/20 pb-5">
                <span className="font-display text-xl font-bold tracking-[0.14em]">ASCENDURE</span>
                <span className="text-[9px] font-bold tracking-[0.18em] text-yellow-400">PROPERTIES</span>
              </div>
              <div className="mt-auto">
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-yellow-400">Q2 2026 · Market Intelligence</p>
                <h2 className="font-display text-5xl font-bold leading-[1.05]">Luxury<br />Market<br />Report</h2>
                <p className="mt-6 max-w-xs leading-7 text-slate-300">Saudi Arabia’s prime residential market, decoded for discerning buyers and investors.</p>
              </div>
              <div className="mt-9 flex items-center justify-between border-t border-white/20 pt-5 text-xs text-slate-400">
                <span>PRIVATE CLIENT BRIEFING</span>
                <span>Q2 / 26</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-yellow-600">Featured insight</p>
            <h2 className="font-display text-4xl font-bold leading-tight text-[#0A2540] md:text-5xl">
              Where Saudi luxury demand is heading next
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our Q2 brief examines the signals shaping prime residential property—from family-led demand and differentiated product to delivery quality, leasing depth, and long-term place-making.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Demand', 'Buyer priorities'],
                ['Supply', 'Product quality'],
                ['Outlook', 'Investor watchlist']
              ].map(([title, copy]) => (
                <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="mb-3 h-1 w-8 rounded-full bg-yellow-500"></div>
                  <h3 className="font-bold text-[#0A2540]">{title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link to="/insights" className="inline-flex items-center justify-center rounded-lg bg-[#0A2540] px-8 py-4 font-bold text-white transition hover:bg-[#123b60]">
                Explore full Insights <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <span className="text-sm text-slate-500">Q2 2026 · 6-page briefing</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 9 - Our Blogs */}
      <section className="py-8 relative z-10" style={{ backgroundColor: '#0A2540' }}>
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-4"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-4">
              <span className="text-white">Our</span>
              <span className="text-yellow-400 ml-4">Blogs</span>
            </h2>
          </motion.div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {[
              {
                title: "Turning Dreams into Addresses",
                description: "Finding the perfect home isn't just about walls and roofs — it's about creating a space that fits your lifestyle. With the right guidance, you can move from dreaming to owning with confidence and ease.",
                image: getImageUrl('/assets/Blog 1.png')
              },
              {
                title: "Turning Dreams into Addresses",
                description: "Finding the perfect home isn't just about walls and roofs — it's about creating a space that fits your lifestyle. With the right guidance, you can move from dreaming to owning with confidence and ease.",
                image: getImageUrl('/assets/Blog 2.png')
              }
            ].map((blog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden h-96"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-xl font-bold mb-4">{blog.title}</h3>
                  <p className="text-white/90 text-sm leading-relaxed">{blog.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* See More Blogs Button */}
          <div className="text-center">
            <button className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
              See More Blogs
            </button>
          </div>
        </div>
      </section>

      {/* Section 10 - Ready to Find Your Dream Property */}
      <section className="relative py-32 overflow-hidden z-10">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl('/assets/Bottom CTA Image.png')}
            alt="Cityscape at Sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(17,24,39,0.9) 100%)' }}></div>
        </div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
              Ready to Find Your Dream Property?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Helping you invest smarter, live better, and secure your future through global real estate opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                Request a Private Consultation
              </button>
              <button className="inline-flex items-center justify-center bg-gray-600 hover:bg-gray-700 border border-white text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                Explore Our Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
