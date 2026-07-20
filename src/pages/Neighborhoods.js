import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Home, 
  TrendingUp, 
  Star,
  ArrowRight,
  CheckCircle,
  Users,
  Building,
  TreePine,
  Waves,
  Mountain,
  ShoppingBag,
  GraduationCap,
  Hospital,
  Plane
} from 'lucide-react';

const Neighborhoods = () => {
  const location = useLocation();
  const region = location.pathname.includes('/ksa') ? 'ksa' : 
                 location.pathname.includes('/uae') ? 'uae' : 
                 location.pathname.includes('/eu') ? 'eu' : 'all';

  const neighborhoods = {
    ksa: [
      {
        name: 'Kingdom Centre',
        city: 'Riyadh',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        description: 'The heart of Riyadh\'s business district with luxury residential towers and premium amenities.',
        highlights: ['Business District', 'Luxury Shopping', 'Fine Dining', 'Cultural Attractions'],
        avgPrice: '8,500,000',
        priceRange: '5M - 15M SAR',
        properties: 45,
        amenities: ['Shopping Malls', 'Restaurants', 'Business Centers', 'Cultural Sites'],
        lifestyle: 'Urban Luxury'
      },
      {
        name: 'Corniche',
        city: 'Jeddah',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
        description: 'Waterfront living with stunning Red Sea views and modern residential developments.',
        highlights: ['Waterfront Views', 'Modern Architecture', 'Beach Access', 'Marina Life'],
        avgPrice: '6,200,000',
        priceRange: '3M - 12M SAR',
        properties: 32,
        amenities: ['Beach Access', 'Marina', 'Water Sports', 'Seafood Restaurants'],
        lifestyle: 'Waterfront Living'
      },
      {
        name: 'NEOM',
        city: 'NEOM',
        image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        description: 'The future of smart cities with cutting-edge technology and sustainable living.',
        highlights: ['Smart City', 'Sustainable Living', 'Future Technology', 'Innovation Hub'],
        avgPrice: '12,000,000',
        priceRange: '8M - 25M SAR',
        properties: 18,
        amenities: ['Smart Technology', 'Green Spaces', 'Innovation Centers', 'Sustainable Transport'],
        lifestyle: 'Futuristic Living'
      }
    ],
    uae: [
      {
        name: 'Dubai Marina',
        city: 'Dubai',
        image: 'https://images.unsplash.com/photo-1512917778677-4c4b2a0b0e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        description: 'Iconic waterfront district with luxury high-rise towers and world-class amenities.',
        highlights: ['Marina Views', 'Luxury Towers', 'Water Activities', 'Nightlife'],
        avgPrice: '4,500,000',
        priceRange: '2M - 10M AED',
        properties: 67,
        amenities: ['Marina Walk', 'Beach Clubs', 'Fine Dining', 'Shopping Centers'],
        lifestyle: 'Marina Luxury'
      },
      {
        name: 'Palm Jumeirah',
        city: 'Dubai',
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
        description: 'Exclusive island community with private beaches and luxury villas.',
        highlights: ['Private Beaches', 'Luxury Villas', 'Exclusive Access', 'Resort Living'],
        avgPrice: '15,000,000',
        priceRange: '8M - 50M AED',
        properties: 23,
        amenities: ['Private Beaches', 'Resort Facilities', 'Water Sports', 'Exclusive Clubs'],
        lifestyle: 'Island Luxury'
      },
      {
        name: 'Downtown Dubai',
        city: 'Dubai',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        description: 'The heart of Dubai with iconic landmarks and premium residential towers.',
        highlights: ['Burj Khalifa', 'Dubai Mall', 'Business District', 'Cultural Attractions'],
        avgPrice: '3,800,000',
        priceRange: '2M - 8M AED',
        properties: 89,
        amenities: ['Shopping Malls', 'Cultural Sites', 'Business Centers', 'Entertainment'],
        lifestyle: 'Urban Sophistication'
      }
    ],
    eu: [
      {
        name: 'Mayfair',
        city: 'London',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
        description: 'London\'s most prestigious district with historic townhouses and luxury apartments.',
        highlights: ['Historic Architecture', 'Luxury Shopping', 'Fine Dining', 'Cultural Heritage'],
        avgPrice: '8,500,000',
        priceRange: '5M - 25M GBP',
        properties: 34,
        amenities: ['Luxury Shopping', 'Fine Dining', 'Art Galleries', 'Historic Sites'],
        lifestyle: 'Historic Luxury'
      },
      {
        name: 'Champs-Élysées',
        city: 'Paris',
        image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        description: 'The most famous avenue in Paris with luxury apartments and iconic landmarks.',
        highlights: ['Iconic Avenue', 'Luxury Apartments', 'Cultural Attractions', 'Fine Dining'],
        avgPrice: '6,200,000',
        priceRange: '3M - 15M EUR',
        properties: 28,
        amenities: ['Luxury Shopping', 'Fine Dining', 'Cultural Sites', 'Entertainment'],
        lifestyle: 'Parisian Elegance'
      },
      {
        name: 'Monaco',
        city: 'Monaco',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
        description: 'The epitome of luxury living with Mediterranean views and exclusive lifestyle.',
        highlights: ['Mediterranean Views', 'Luxury Yachts', 'Exclusive Events', 'Tax Benefits'],
        avgPrice: '25,000,000',
        priceRange: '15M - 100M EUR',
        properties: 12,
        amenities: ['Yacht Clubs', 'Luxury Hotels', 'Fine Dining', 'Entertainment'],
        lifestyle: 'Mediterranean Luxury'
      }
    ]
  };

  const currentNeighborhoods = region === 'all' ? 
    [...neighborhoods.ksa, ...neighborhoods.uae, ...neighborhoods.eu] : 
    neighborhoods[region] || [];

  const regionInfo = {
    ksa: {
      title: 'Saudi Arabia',
      description: 'Discover premium properties across the Kingdom\'s most prestigious locations',
      flag: '🇸🇦',
      currency: 'SAR'
    },
    uae: {
      title: 'United Arab Emirates',
      description: 'Explore luxury living in Dubai\'s most exclusive neighborhoods',
      flag: '🇦🇪',
      currency: 'AED'
    },
    eu: {
      title: 'Europe',
      description: 'Experience historic elegance and modern luxury in Europe\'s finest cities',
      flag: '🇪🇺',
      currency: 'EUR'
    }
  };

  const getLifestyleIcon = (lifestyle) => {
    switch (lifestyle) {
      case 'Urban Luxury':
        return Building;
      case 'Waterfront Living':
        return Waves;
      case 'Futuristic Living':
        return TrendingUp;
      case 'Marina Luxury':
        return Waves;
      case 'Island Luxury':
        return TreePine;
      case 'Urban Sophistication':
        return Building;
      case 'Historic Luxury':
        return Star;
      case 'Parisian Elegance':
        return Star;
      case 'Mediterranean Luxury':
        return Waves;
      default:
        return Home;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gray-900 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Neighborhoods"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-display font-bold mb-6">
              {region === 'all' ? 'Neighborhoods' : regionInfo[region]?.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {region === 'all' ? 'Explore premium neighborhoods across our key markets' : regionInfo[region]?.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Region Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/neighbourhoods"
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                region === 'all' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Regions
            </a>
            <a
              href="/neighbourhoods/ksa"
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                region === 'ksa' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🇸🇦 Saudi Arabia
            </a>
            <a
              href="/neighbourhoods/uae"
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                region === 'uae' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🇦🇪 UAE
            </a>
            <a
              href="/neighbourhoods/eu"
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                region === 'eu' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🇪🇺 Europe
            </a>
          </div>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              {region === 'all' ? 'Featured Neighborhoods' : `${regionInfo[region]?.title} Neighborhoods`}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the finest residential areas with exceptional amenities and lifestyle offerings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentNeighborhoods.map((neighborhood, index) => {
              const LifestyleIcon = getLifestyleIcon(neighborhood.lifestyle);
              
              return (
                <motion.div
                  key={`${neighborhood.city}-${neighborhood.name}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64">
                    <img
                      src={neighborhood.image}
                      alt={neighborhood.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-semibold mb-1">{neighborhood.name}</h3>
                      <p className="text-white/90">{neighborhood.city}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                        <LifestyleIcon className="w-4 h-4" />
                        <span>{neighborhood.lifestyle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">{neighborhood.description}</p>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Average Price:</span>
                        <span className="font-semibold text-gray-900">
                          {neighborhood.avgPrice} {regionInfo[region]?.currency || 'SAR'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Price Range:</span>
                        <span className="font-semibold text-gray-900">{neighborhood.priceRange}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Properties:</span>
                        <span className="font-semibold text-gray-900">{neighborhood.properties}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {neighborhood.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {neighborhood.amenities.map((amenity, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full mt-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center">
                      View Properties
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Market Insights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Market Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with the latest market trends and investment opportunities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 text-center"
            >
              <TrendingUp className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Market Growth</h3>
              <p className="text-gray-600 mb-4">
                Average property values have increased by 12% year-over-year across our key markets.
              </p>
              <div className="text-2xl font-bold text-green-600">+12%</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 rounded-2xl p-8 text-center"
            >
              <Users className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Activity</h3>
              <p className="text-gray-600 mb-4">
                International investment in luxury real estate has increased by 25% this year.
              </p>
              <div className="text-2xl font-bold text-blue-600">+25%</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-50 rounded-2xl p-8 text-center"
            >
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Demand</h3>
              <p className="text-gray-600 mb-4">
                Luxury properties are in high demand with average time on market reduced by 30%.
              </p>
              <div className="text-2xl font-bold text-purple-600">-30%</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Find Your Perfect Neighborhood
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Let our experts help you discover the ideal location that matches your lifestyle and investment goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore Properties
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-all duration-300">
                Get Market Report
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Neighborhoods;






