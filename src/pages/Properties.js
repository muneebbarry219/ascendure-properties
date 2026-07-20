import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProperty } from '../context/PropertyContext';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Home, 
  Bed, 
  Bath, 
  Square, 
  Star,
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';
import { resolveAssetUrl } from '../utils/assets';

const Properties = () => {
  const { filters, setFilters, getFilteredProperties } = useProperty();
  const location = useLocation();
  const properties = useMemo(() => getFilteredProperties(), [getFilteredProperties, filters]);
  const [visibleCount, setVisibleCount] = useState(9);
  const visibleProperties = useMemo(() => properties.slice(0, visibleCount), [properties, visibleCount]);
  const clearFilters = () => {
    setFilters({
      type: 'all',
      city: 'all',
      priceRange: [0, 10000000],
      bedrooms: 'all',
      lifestyle: 'all',
      category: 'all',
      subType: 'all',
      ready: 'all',
      areaRange: [0, 1000000]
    });
    setVisibleCount(9);
  };

  const setFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  const handlePrice = (min, max) => setFilters(prev => ({ ...prev, priceRange: [Number(min||0), Number(max||1000000000)] }));
  const handleArea = (min, max) => setFilters(prev => ({ ...prev, areaRange: [Number(min||0), Number(max||1000000000)] }));

  const residentialSubTypes = ['Apartment','Villa','Townhouse','Penthouse','Villa Compound','Hotel Apartment','Land','Floor','Building'];
  const commercialSubTypes = ['Office','Shop','Warehouse','Industrial Land','Mixed Use Land','Showroom','Other Commercial'];
  const subTypeOptions = (filters.category === 'commercial') ? commercialSubTypes : residentialSubTypes;

  // Apply URL query params to filters on first render and when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const next = { ...filters };
    const city = params.get('city');
    const country = params.get('country');
    const subType = params.get('subType');
    const bedrooms = params.get('bedrooms');
    const ready = params.get('ready');
    if (city) next.city = city;
    if (country) next.country = country;
    if (subType) next.subType = subType;
    if (bedrooms) next.bedrooms = bedrooms;
    if (ready) next.ready = ready;
    setFilters(next);
    setVisibleCount(9);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A2540' }}>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={resolveAssetUrl('/assets/Hero Section Image.png')}
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              <span className="text-white">Discover Your</span>
              <span className="text-yellow-400 ml-2 sm:ml-4">Dream Property</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Explore our curated collection of premium properties across the globe. From luxury villas to modern apartments, find your perfect home with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* no recommended section per request */}

      {/* Search & Filter Section (functional) */}
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-8 border border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Buy / Rent / Off-Plan</label>
                <select value={filters.type} onChange={(e)=>setFilter('type', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                  <option value="all">All</option>
                  <option value="buy">Buy</option>
                  <option value="rent">Rent</option>
                  <option value="off-plan">Off-Plan</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select value={filters.city} onChange={(e)=>setFilter('city', e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                    <option value="all">All Locations</option>
                    <option value="Dubai">Dubai, UAE</option>
                    <option value="Riyadh">Riyadh, KSA</option>
                    <option value="Madrid">Madrid, Spain</option>
                    <option value="Budva">Budva, Montenegro</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Category</label>
                <select value={filters.category} onChange={(e)=>setFilter('category', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                  <option value="all">All</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Property Type</label>
                <select value={filters.subType} onChange={(e)=>setFilter('subType', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                  <option value="all">All Types</option>
                  {subTypeOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">All / Ready</label>
                <select value={filters.ready} onChange={(e)=>setFilter('ready', e.target.value)} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
                  <option value="all">All</option>
                  <option value="ready">Ready</option>
                </select>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Area (sqft)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="Min" className="px-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700" onChange={(e)=>handleArea(e.target.value, filters.areaRange[1])} />
                  <input type="number" placeholder="Max" className="px-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700" onChange={(e)=>handleArea(filters.areaRange[0], e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Price (AED)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="Min" className="px-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700" onChange={(e)=>handlePrice(e.target.value, filters.priceRange[1])} />
                  <input type="number" placeholder="Max" className="px-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700" onChange={(e)=>handlePrice(filters.priceRange[0], e.target.value)} />
                </div>
              </div>
              <div className="flex items-end">
                <button onClick={(e)=>{ e.preventDefault(); /* filters apply live */ }} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center">
                  <Search className="w-5 h-5 mr-2" />
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section Header */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
              <span className="text-white">Featured</span>
              <span className="text-yellow-400 ml-2 sm:ml-4">Properties</span>
            </h2>
            <div className="flex justify-center">
              <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="relative h-64 sm:h-72">
                  <img
                    src={(property.images && property.images[0]) || resolveAssetUrl('/assets/Rectangle 47.png')}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {property.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-full text-sm">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300">
                      <Star className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{property.price}</div>
                  
                  <div className="flex flex-wrap items-center justify-between text-gray-600 mb-4 gap-2">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.area}</span>
                    </div>
                  </div>
                  
                  <Link to={`/property/${property.id}/${property.slug || property.id}`} className="block">
                    <div className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center">
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {properties.length === 0 && (
            <div className="text-center text-white mt-8">
              <p className="mb-4">No properties matched your filters.</p>
              <button onClick={clearFilters} className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg">Clear Filters</button>
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < properties.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((c) => Math.min(c + 6, properties.length))}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
              >
                Load More Properties
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;
