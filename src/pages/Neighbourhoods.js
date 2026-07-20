import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Star, 
  TrendingUp,
  Users,
  Building,
  ArrowRight,
  Search
} from 'lucide-react';
import { resolveAssetUrl } from '../utils/assets';

const Neighbourhoods = () => {
  const neighbourhoods = [
    {
      name: "Dubai Marina",
      city: "Dubai, UAE",
      description: "Luxury waterfront living with world-class amenities and stunning marina views.",
      image: resolveAssetUrl("/assets/Dubai Container Image.png"),
      priceRange: "AED 2M - 15M",
      properties: 150,
      rating: 4.9,
      features: ["Marina Views", "Beach Access", "Shopping", "Dining"]
    },
    {
      name: "Downtown Dubai",
      city: "Dubai, UAE",
      description: "The heart of Dubai with iconic landmarks like Burj Khalifa and Dubai Mall.",
      image: resolveAssetUrl("/assets/KSA Container Image.png"),
      priceRange: "AED 1.5M - 20M",
      properties: 200,
      rating: 4.8,
      features: ["City Views", "Shopping", "Entertainment", "Business District"]
    },
    {
      name: "King Fahd Road",
      city: "Riyadh, KSA",
      description: "Riyadh's premier business and residential district with modern infrastructure.",
      image: resolveAssetUrl("/assets/Montenegro Container Image.png"),
      priceRange: "SAR 800K - 5M",
      properties: 120,
      rating: 4.7,
      features: ["Business Hub", "Modern Towers", "Shopping", "Dining"]
    },
    {
      name: "Salamanca District",
      city: "Madrid, Spain",
      description: "Historic and elegant neighborhood known for its cultural heritage and luxury properties.",
      image: resolveAssetUrl("/assets/Spain Container Image.png"),
      priceRange: "€800K - 3M",
      properties: 80,
      rating: 4.9,
      features: ["Historic", "Cultural", "Luxury", "Central Location"]
    },
    {
      name: "Budva Old Town",
      city: "Budva, Montenegro",
      description: "Charming coastal town with historic architecture and beautiful beaches.",
      image: resolveAssetUrl("/assets/Montenegro Container Image.png"),
      priceRange: "€300K - 1.5M",
      properties: 60,
      rating: 4.6,
      features: ["Coastal", "Historic", "Beach Access", "Tourism"]
    },
    {
      name: "Barcelona Eixample",
      city: "Barcelona, Spain",
      description: "Modernist architecture and vibrant city life in Barcelona's most prestigious district.",
      image: resolveAssetUrl("/assets/Spain Container Image.png"),
      priceRange: "€600K - 2.5M",
      properties: 90,
      rating: 4.8,
      features: ["Modernist", "Cultural", "Shopping", "Central"]
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A2540' }}>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={resolveAssetUrl('/assets/Hero Section Image.png')}
            alt="City Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              <span className="block">Premium</span>
              <span className="block text-yellow-400">Neighbourhoods</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Explore the world's most desirable neighborhoods where luxury meets lifestyle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">City</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                    <option>All Cities</option>
                    <option>Dubai, UAE</option>
                    <option>Riyadh, KSA</option>
                    <option>Madrid, Spain</option>
                    <option>Budva, Montenegro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Price Range</label>
                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                  <option>Any Price</option>
                  <option>Under €500K</option>
                  <option>€500K - €1M</option>
                  <option>€1M - €2M</option>
                  <option>Over €2M</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Property Type</label>
                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                  <option>All Types</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>Penthouse</option>
                  <option>Off-Plan</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighbourhoods Grid */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              <span className="text-white">Featured</span>
              <span className="text-yellow-400 ml-4">Neighbourhoods</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neighbourhoods.map((neighbourhood, index) => (
              <motion.div
                key={neighbourhood.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="relative h-64">
                  <img
                    src={neighbourhood.image}
                    alt={neighbourhood.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-white font-semibold text-sm">{neighbourhood.rating}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-full text-sm">
                      {neighbourhood.properties} Properties
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {neighbourhood.city}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{neighbourhood.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{neighbourhood.description}</p>
                  
                  <div className="text-xl font-bold text-gray-900 mb-4">{neighbourhood.priceRange}</div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {neighbourhood.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center">
                    Explore Properties
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
              View All Neighbourhoods
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: '#0A2540' }}>
              <span className="text-gray-900">Neighbourhood</span>
              <span className="text-yellow-400 ml-4">Insights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key statistics and insights about our featured neighborhoods.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Building className="w-8 h-8" />, number: "700+", label: "Total Properties" },
              { icon: <MapPin className="w-8 h-8" />, number: "6", label: "Featured Cities" },
              { icon: <Users className="w-8 h-8" />, number: "1000+", label: "Happy Residents" },
              { icon: <TrendingUp className="w-8 h-8" />, number: "15%", label: "Average Growth" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Neighbourhoods;


