import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Filter, 
  Grid, 
  List, 
  Map, 
  SortAsc, 
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  MapPin,
  Home,
  TrendingUp,
  Star
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';

const PropertyListings = () => {
  const { getFilteredProperties, filters, setFilters, sortBy, setSortBy } = useProperty();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const properties = getFilteredProperties();
  const type = location.pathname.includes('/buy') ? 'buy' : 
               location.pathname.includes('/rent') ? 'rent' : 
               location.pathname.includes('/off-plan') ? 'off-plan' : 'all';

  useEffect(() => {
    // Set initial filters based on URL
    if (type !== 'all') {
      setFilters({ ...filters, type });
    }
  }, [type]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (value !== 'all' && value !== '') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setShowSort(false);
  };

  const clearFilters = () => {
    setFilters({
      type: 'all',
      city: 'all',
      priceRange: [0, 10000000],
      bedrooms: 'all',
      lifestyle: 'all'
    });
    setSearchParams({});
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'roi', label: 'Best ROI' },
    { value: 'size', label: 'Largest First' }
  ];

  const cityOptions = [
    { value: 'all', label: 'All Cities' },
    { value: 'riyadh', label: 'Riyadh' },
    { value: 'jeddah', label: 'Jeddah' },
    { value: 'dubai', label: 'Dubai' },
    { value: 'london', label: 'London' }
  ];

  const bedroomOptions = [
    { value: 'all', label: 'Any Bedrooms' },
    { value: '1', label: '1+ Bedrooms' },
    { value: '2', label: '2+ Bedrooms' },
    { value: '3', label: '3+ Bedrooms' },
    { value: '4', label: '4+ Bedrooms' },
    { value: '5', label: '5+ Bedrooms' }
  ];

  const lifestyleOptions = [
    { value: 'all', label: 'All Lifestyles' },
    { value: 'Golf Living', label: 'Golf Living' },
    { value: 'Waterfront', label: 'Waterfront' },
    { value: 'Sky Residences', label: 'Sky Residences' }
  ];

  const priceRanges = [
    { label: 'Under 1M SAR', value: [0, 1000000] },
    { label: '1M - 3M SAR', value: [1000000, 3000000] },
    { label: '3M - 5M SAR', value: [3000000, 5000000] },
    { label: '5M - 10M SAR', value: [5000000, 10000000] },
    { label: '10M+ SAR', value: [10000000, 50000000] }
  ];

  const areaRanges = [
    { label: 'Under 1,000 sqft', value: [0, 1000] },
    { label: '1,000 - 2,000 sqft', value: [1000, 2000] },
    { label: '2,000 - 4,000 sqft', value: [2000, 4000] },
    { label: '4,000 - 8,000 sqft', value: [4000, 8000] },
    { label: '8,000+ sqft', value: [8000, 1000000] }
  ];

  const subTypeOptions = {
    residential: ['Apartment','Villa','Townhouse','Penthouse','Villa Compound','Hotel Apartment','Land','Floor','Building'],
    commercial: ['Office','Shop','Warehouse','Industrial Land','Mixed Use Land','Showroom','Other Commercial']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
              {type === 'all' ? 'All Properties' : 
               type === 'buy' ? 'Properties for Sale' :
               type === 'rent' ? 'Properties for Rent' :
               'Off-Plan Properties'}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {properties.length} properties found
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by property name, location, or developer..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar - Smaller and Left */}
          <div className="lg:w-64">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                {/* Property Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Property Type
                  </label>
                  <div className="space-y-1">
                    {[
                      { value: 'all', label: 'All Types', icon: Home },
                      { value: 'buy', label: 'For Sale', icon: TrendingUp },
                      { value: 'rent', label: 'For Rent', icon: MapPin },
                      { value: 'off-plan', label: 'Off-Plan', icon: Star }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value={option.value}
                          checked={filters.type === option.value}
                          onChange={(e) => handleFilterChange('type', e.target.value)}
                          className="mr-3 text-yellow-500 focus:ring-yellow-500"
                        />
                        <option.icon className="w-3 h-3 mr-2 text-gray-400" />
                        <span className="text-xs text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>

                {/* Category (Residential / Commercial) */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="all">All</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>

                {/* Sub Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Sub Type</label>
                  <select
                    value={filters.subType}
                    onChange={(e)=>handleFilterChange('subType', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="all">All</option>
                    {(filters.category==='residential'? subTypeOptions.residential : filters.category==='commercial'? subTypeOptions.commercial : [...subTypeOptions.residential,...subTypeOptions.commercial]).map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <select
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    {cityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ready */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Ready</label>
                  <div className="space-y-1">
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'ready', label: 'Ready to Move' }
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="ready"
                          value={option.value}
                          checked={filters.ready === option.value}
                          onChange={(e) => handleFilterChange('ready', e.target.value)}
                          className="mr-3 text-yellow-500 focus:ring-yellow-500"
                        />
                        <span className="text-xs text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <label key={index} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange[0] === range.value[0] && filters.priceRange[1] === range.value[1]}
                          onChange={() => handleFilterChange('priceRange', range.value)}
                          className="mr-3 text-yellow-500 focus:ring-yellow-500"
                        />
                        <span className="text-sm text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    {bedroomOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Lifestyle */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Lifestyle
                  </label>
                  <div className="space-y-1">
                    {lifestyleOptions.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="lifestyle"
                          value={option.value}
                          checked={filters.lifestyle === option.value}
                          onChange={(e) => handleFilterChange('lifestyle', e.target.value)}
                          className="mr-2 text-yellow-500 focus:ring-yellow-500"
                        />
                        <span className="text-xs text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - More Space */}
          <div className="flex-1 lg:ml-0">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Results Count */}
                <div className="text-gray-600">
                  Showing {properties.length} of {properties.length} properties
                </div>

                {/* View Controls */}
                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSort(!showSort)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <SortAsc className="w-4 h-4" />
                      <span className="text-sm">
                        {sortOptions.find(opt => opt.value === sortBy)?.label}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    {showSort && (
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-10">
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleSortChange(option.value)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`p-2 ${viewMode === 'map' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors duration-200`}
                    >
                      <Map className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            {viewMode === 'map' ? (
              <div className="bg-white rounded-2xl shadow-lg h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Map className="w-12 h-12 mx-auto mb-4" />
                  <p>Map view coming soon</p>
                </div>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {properties.map((property, index) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    index={index}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* No Results */}
            {properties.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListings;
