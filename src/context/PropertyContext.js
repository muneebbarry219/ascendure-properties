import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { resolveAssetUrl } from '../utils/assets';

const PropertyContext = createContext();

const fallbackProperties = [
  {
    _id: 'dubai-luxury-villa',
    slug: 'dubai-luxury-villa',
    title: 'Dubai Luxury Villa',
    city: 'Dubai',
    country: 'UAE',
    address: 'Dubai Marina',
    price: 4200000,
    currency: 'AED',
    purpose: 'buy',
    category: 'residential',
    subType: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6200,
    status: 'Available',
    verified: true,
    readyToMove: true,
    featured: true,
    images: ['/assets/Dubai Container Image.png', '/assets/Luxury Villas Image.png'],
    features: ['Marina Views', 'Private Pool', 'Smart Home'],
    description: "A refined luxury villa in one of Dubai's most desirable residential destinations.",
    developer: 'Ascendure Properties',
    lifestyle: ['Luxury', 'Waterfront'],
    roi: 8,
    createdAt: '2026-01-01'
  },
  {
    _id: 'ksa-modern-residence',
    slug: 'ksa-modern-residence',
    title: 'Saudi Arabia Modern Residence',
    city: 'Riyadh',
    country: 'Saudi Arabia',
    address: 'King Fahd Road',
    price: 2900000,
    currency: 'AED',
    purpose: 'buy',
    category: 'residential',
    subType: 'Apartment',
    bedrooms: 3,
    bathrooms: 4,
    sqft: 3100,
    status: 'Available',
    verified: true,
    readyToMove: false,
    featured: true,
    images: ['/assets/KSA Container Image.png', '/assets/Rectangle 47.png'],
    features: ['City Views', 'Concierge', 'Fitness Center'],
    description: 'A modern residence positioned for long-term growth in Riyadh.',
    developer: 'Ascendure Properties',
    lifestyle: ['City Living', 'Investment'],
    roi: 7,
    createdAt: '2026-01-02'
  },
  {
    _id: 'montenegro-coastal-home',
    slug: 'montenegro-coastal-home',
    title: 'Montenegro Coastal Home',
    city: 'Budva',
    country: 'Montenegro',
    address: 'Adriatic Coast',
    price: 1800000,
    currency: 'AED',
    purpose: 'buy',
    category: 'residential',
    subType: 'Villa',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 3800,
    status: 'Available',
    verified: true,
    readyToMove: true,
    featured: true,
    images: ['/assets/Montenegro Container Image.png', '/assets/Lifestyle Home Image.png'],
    features: ['Sea Views', 'Terrace', 'Beach Access'],
    description: 'A scenic coastal property with relaxed European lifestyle appeal.',
    developer: 'Ascendure Properties',
    lifestyle: ['Coastal', 'Residency'],
    roi: 6,
    createdAt: '2026-01-03'
  },
  {
    _id: 'spain-residency-apartment',
    slug: 'spain-residency-apartment',
    title: 'Spain Residency Apartment',
    city: 'Madrid',
    country: 'Spain',
    address: 'Salamanca District',
    price: 2200000,
    currency: 'AED',
    purpose: 'buy',
    category: 'residential',
    subType: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2400,
    status: 'Available',
    verified: true,
    readyToMove: true,
    featured: true,
    images: ['/assets/Spain Container Image.png', '/assets/Residency Eligible Image.png'],
    features: ['Central Location', 'Balcony', 'Residency Eligible'],
    description: 'An elegant Madrid apartment suited for lifestyle and residency-focused buyers.',
    developer: 'Ascendure Properties',
    lifestyle: ['European', 'Residency'],
    roi: 5,
    createdAt: '2026-01-04'
  }
];

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  const mapProperties = useCallback((data) => {
    const getImageUrl = (imagePath) => {
      if (!imagePath) {
        return imagePath;
      }
      // If it's already an absolute URL from API, keep it
      if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
      }
      // Bundled src/assets images should resolve through webpack.
      if (imagePath.startsWith('/assets/')) {
        return resolveAssetUrl(imagePath);
      }
      // Uploaded API images can still come from the backend in local development.
      const apiBase = window.location.hostname === 'localhost' ? 'http://localhost:4000' : window.location.origin;
      return `${apiBase}${imagePath}`;
    };

    const defaultImages = [
      getImageUrl('/assets/home (3) 1.jpg'),
      getImageUrl('/assets/Rectangle 47.png'),
      getImageUrl('/assets/Rectangle 59.png'),
      getImageUrl('/assets/Luxury Villas Image.png'),
      getImageUrl('/assets/Hero Section Image.png')
    ];
    return (Array.isArray(data) ? data : []).map((p) => {
      const id = p._id;
      const type = p.purpose || p.type || 'buy';
      const location = [p.city, p.country, p.address].filter(Boolean).join(', ');
      const priceAED = p.currency === 'AED' ? p.price : p.price;
      const priceUSD = Math.round(priceAED / 3.67);
      const priceEUR = Math.round(priceAED / 3.99);
      const imgs = Array.isArray(p.images) && p.images.length ? p.images.map(getImageUrl) : defaultImages;
      return {
        id,
        slug: p.slug || id,
        title: p.title,
        location,
        price: p.price,
        priceUSD,
        priceEUR,
        priceAED: priceAED,
        type,
        category: p.category || 'residential',
        subType: p.subType || '',
        bedrooms: p.bedrooms || 0,
        bathrooms: p.bathrooms || 0,
        area: p.sqft || p.area || 0,
        status: p.status || 'Available',
        verified: !!p.verified,
        readyToMove: !!p.readyToMove,
        featured: !!p.featured,
        images: imgs,
        features: p.features?.general || p.features || [],
        description: p.description || '',
        developer: p.developer || '',
        lifestyle: p.lifestyle || [],
        roi: p.analytics?.roi || p.roi || undefined,
        createdAt: p.createdAt
      };
    });
  }, []);

  const refreshProperties = useCallback(async () => {
    const apiBase = process.env.REACT_APP_API_URL;

    if (window.location.hostname === 'localhost' && !apiBase) {
      setProperties(mapProperties(fallbackProperties));
      return;
    }

    try {
      const res = await fetch(`${apiBase || ''}/api/properties`);
      if (!res.ok) {
        throw new Error(`Properties request failed with ${res.status}`);
      }
      const data = await res.json();
      setProperties(mapProperties(data));
    } catch (e) {
      setProperties(mapProperties(fallbackProperties));
    }
  }, [mapProperties]);

  useEffect(() => {
    refreshProperties();
  }, [refreshProperties]);

  const [filters, setFilters] = useState({
    type: 'all',
    city: 'all',
    country: 'all',
    priceRange: [0, 1000000000],
    bedrooms: 'all',
    lifestyle: 'all',
    category: 'all',
    subType: 'all',
    ready: 'all',
    areaRange: [0, 1000000]
  });

  const [sortBy, setSortBy] = useState('newest');

  const getFilteredProperties = () => {
    let filtered = [...properties];

    // Filter by type
    if (filters.type !== 'all') {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    // Filter by country (supports common aliases)
    if (filters.country !== 'all') {
      const cf = String(filters.country).toLowerCase();
      filtered = filtered.filter(property => {
        const pc = String(property.country || '').toLowerCase();
        if (!cf) return true;
        if (cf.includes('saudi') || cf === 'ksa') {
          return pc.includes('saudi') || pc.includes('ksa');
        }
        if (cf.includes('dubai') || cf.includes('uae')) {
          return pc.includes('dubai') || pc.includes('uae') || pc.includes('united arab emirates');
        }
        return pc.includes(cf);
      });
    }

    // Filter by city (supports common aliases)
    if (filters.city !== 'all') {
      const cf = String(filters.city).toLowerCase();
      filtered = filtered.filter(property => {
        const loc = String(property.location || '').toLowerCase();
        if (!cf) return true;
        // Saudi Arabia aliases
        if (cf.includes('saudi') || cf === 'ksa') {
          return loc.includes('saudi') || loc.includes('ksa') || loc.includes('riyadh');
        }
        // UAE/Dubai aliases
        if (cf.includes('uae') || cf.includes('dubai')) {
          return loc.includes('dubai') || loc.includes('uae') || loc.includes('united arab emirates');
        }
        return loc.includes(cf);
      });
    }

    // Filter by price range
    filtered = filtered.filter(property =>
      property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1]
    );

    // Filter by area range (sqft)
    filtered = filtered.filter(property =>
      (property.area || 0) >= filters.areaRange[0] && (property.area || 0) <= filters.areaRange[1]
    );

    // Filter by bedrooms
    if (filters.bedrooms !== 'all') {
      const bedroomCount = parseInt(filters.bedrooms);
      filtered = filtered.filter(property => property.bedrooms >= bedroomCount);
    }

    // Filter by lifestyle
    if (filters.lifestyle !== 'all') {
      filtered = filtered.filter(property =>
        property.lifestyle.includes(filters.lifestyle)
      );
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(property => (property.category || 'residential') === filters.category);
    }

    // Filter by subType
    if (filters.subType !== 'all') {
      filtered = filtered.filter(property => (property.subType || '').toLowerCase() === String(filters.subType).toLowerCase());
    }

    // Filter by ready flag
    if (filters.ready !== 'all') {
      const wantReady = filters.ready === 'ready';
      filtered = filtered.filter(property => !!property.readyToMove === wantReady);
    }

    // Sort properties
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => {
          const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bt - at;
        });
        break;
      case 'roi':
        filtered.sort((a, b) => b.roi - a.roi);
        break;
      case 'size':
        filtered.sort((a, b) => b.area - a.area);
        break;
      default:
        break;
    }

    return filtered;
  };

  const getPropertyById = (id) => {
    return properties.find(property => String(property.id) === String(id));
  };

  const getFeaturedProperties = () => {
    return properties.filter(property => property.featured).slice(0, 6);
  };

  const getPropertiesByType = (type) => {
    return properties.filter(property => property.type === type);
  };

  const getPropertiesByLifestyle = (lifestyle) => {
    return properties.filter(property => property.lifestyle.includes(lifestyle));
  };

  const value = {
    properties,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    getFilteredProperties,
    getPropertyById,
    getFeaturedProperties,
    getPropertiesByType,
    getPropertiesByLifestyle,
    refreshProperties
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};
