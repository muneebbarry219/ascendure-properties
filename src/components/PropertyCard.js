import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Star,
  Eye,
  Calendar,
  TrendingUp
} from 'lucide-react';

const PropertyCard = ({ property, index = 0 }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const formatPrice = (price, currency = 'SAR') => {
    const formatter = new Intl.NumberFormat('en-US');
    const symbols = {
      SAR: '﷼',
      USD: '$',
      EUR: '€',
      AED: 'د.إ'
    };
    return `${symbols[currency]} ${formatter.format(price)}`;
  };

  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: `Check out this amazing property: ${property.title}`,
      url: window.location.origin + `/property/${property.id}/${property.slug}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg';
      case 'Under Construction':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg';
      case 'Sold':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg';
      case 'Rented':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'buy':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg';
      case 'rent':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg';
      case 'off-plan':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group property-card luxury-card"
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        <img
          src={property.images[0]}
          alt={property.title}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />

        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${getStatusColor(property.status)}`}>
            {property.status}
          </span>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${getTypeColor(property.type)}`}>
            {property.type === 'off-plan' ? 'Off-Plan' : property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </span>
        </div>

        {/* Verified Badge */}
        {property.verified && (
          <div className="absolute top-4 right-20">
            <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              <Star className="w-3 h-3" />
              <span>Verified</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <motion.button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>

          <motion.button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 text-gray-600 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>

        {/* ROI Badge */}
        {property.roi && (
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center space-x-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              <TrendingUp className="w-3 h-3" />
              <span>{property.roi}% ROI</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Location */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors duration-300">
            {property.title}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1 text-yellow-500" />
            <span className="font-medium">{property.location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {formatPrice(property.price)}
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
            <span className="px-2 py-1 bg-gray-100 rounded-full">{formatPrice(property.priceUSD, 'USD')}</span>
            <span className="px-2 py-1 bg-gray-100 rounded-full">{formatPrice(property.priceEUR, 'EUR')}</span>
            <span className="px-2 py-1 bg-gray-100 rounded-full">{formatPrice(property.priceAED, 'AED')}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Bed className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{property.bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{property.bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Square className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold">{property.area} m²</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {property.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
              >
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                +{property.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Lifestyle Tags */}
        {property.lifestyle && property.lifestyle.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {property.lifestyle.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Developer */}
        {property.developer && (
          <div className="mb-4 text-sm text-gray-600">
            <span className="font-semibold text-gray-800">Developer:</span> {property.developer}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            to={`/property/${property.id}/${property.slug}`}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all duration-300 hover:from-yellow-600 hover:to-yellow-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Details
          </Link>
          <button className="px-4 py-3 border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white rounded-lg transition-all duration-300 font-semibold">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
