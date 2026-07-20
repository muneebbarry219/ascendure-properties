import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Star,
  Calendar,
  TrendingUp,
  Car,
  Wifi,
  Shield,
  TreePine,
  Waves,
  Mountain,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Download,
  Play,
  ChevronLeft,
  ChevronRight,
  CheckCircle
} from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import { resolveAssetUrl } from '../utils/assets';

const PropertyDetail = () => {
  const { id, slug } = useParams();
  const { properties, getFeaturedProperties } = useProperty();
  const [fetched, setFetched] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'phone'
  });
  const [bottomForm, setBottomForm] = useState({ name: '', email: '', phone: '', message: '' });

  const property = properties.find(p => String(p.id) === String(id)) || fetched;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!properties.length && !fetched) {
        try {
          const res = await fetch(`/api/properties/${id}`);
          if (res.ok) {
            const p = await res.json();
            const mapped = {
              id: p._id,
              slug: p.slug || p._id,
              title: p.title,
              location: p.address || [p.city, p.country].filter(Boolean).join(', '),
              price: p.price,
              priceAED: p.currency === 'AED' ? p.price : p.price,
              priceUSD: Math.round((p.currency === 'AED' ? p.price : p.price) / 3.67),
              priceEUR: Math.round((p.currency === 'AED' ? p.price : p.price) / 3.99),
              type: p.purpose || p.type || 'buy',
              bedrooms: p.bedrooms || 0,
              bathrooms: p.bathrooms || 0,
              area: p.sqft || p.area || 0,
              status: p.status || 'Available',
              verified: !!p.verified,
              images: (Array.isArray(p.images) && p.images.length ? p.images : [
                '/assets/Rectangle 47.png',
                '/assets/Rectangle 59.png'
              ]).map((image) => image?.startsWith('/assets/') ? resolveAssetUrl(image) : image),
              features: p.features?.general || p.features || [],
              description: p.description || '',
              developer: p.developer || '',
              lifestyle: p.lifestyle || [],
              roi: p.analytics?.roi || p.roi || undefined
            };
            if (!cancelled) setFetched(mapped);
          }
        } catch {}
      }
    };
    load();
    return () => { cancelled = true; };
  }, [id, properties.length, fetched]);

  useEffect(() => {
    if (property) {
      document.title = `${property.title} - Ascendure Pages`;
    }
  }, [property]);

  // Mortgage calculator state
  const [homePrice, setHomePrice] = useState(0);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestPct, setInterestPct] = useState(4);
  const [years, setYears] = useState(25);

  useEffect(() => {
    if (property?.price) {
      setHomePrice(Number(property.price) || 0);
    }
  }, [property?.price]);

  const monthlyPayment = (() => {
    const price = Number(homePrice) || 0;
    const dp = Math.min(Math.max(Number(downPaymentPct) || 0, 0), 100);
    const rate = Math.max(Number(interestPct) || 0, 0) / 100 / 12;
    const n = Math.max(Number(years) || 0, 0) * 12;
    const loan = price * (1 - dp / 100);
    if (n === 0) return 0;
    if (rate === 0) return loan / n;
    return loan * (rate / (1 - Math.pow(1 + rate, -n)));
  })();

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
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property?.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          preferredContact: formData.preferredContact,
          message: formData.message
        })
      });
      alert('Thank you for your interest! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '', preferredContact: 'phone' });
    } catch (err) {
      alert('Failed to submit inquiry. Please try again.');
      console.error(err);
    }
  };

  const handleBottomFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property?.id,
          name: bottomForm.name,
          email: bottomForm.email,
          phone: bottomForm.phone,
          preferredContact: 'email',
          message: bottomForm.message
        })
      });
      alert('Thank you! We will reach out shortly.');
      setBottomForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      alert('Failed to submit. Please try again.');
      console.error(err);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Link to="/properties" className="btn-primary">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-500 rounded-full transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Full-width Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="relative lg:col-span-2 h-80 lg:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-all duration-300 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-all duration-300 shadow-lg"
              >
                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
              </button>
            </div>
            <div className="hidden lg:flex flex-col gap-3">
              {[1,2].map((idx)=> (
                <button key={idx}
                  onClick={() => property.images[idx] && setCurrentImageIndex(idx)}
                  className={`relative h-[256px] rounded-2xl overflow-hidden transition ${currentImageIndex===idx? 'ring-4 ring-yellow-500':''}`}
                >
                  <img src={property.images[idx] || property.images[0]} alt={`${property.title} ${idx+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          {/* Dot Indicators */}
          <div className="mt-3 flex justify-center space-x-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">

            {/* Property Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between items-center text-center sm:text-left mb-6">
                <div>
                  <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2 text-yellow-500" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>
                <div className="text-center sm:text-right space-y-3 mt-4 sm:mt-0">
                  <div className="text-4xl font-bold text-gradient mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <div className="flex justify-center sm:justify-end space-x-2 text-sm text-gray-600">
                    <span>{formatPrice(property.priceUSD, 'USD')}</span>
                    <span>•</span>
                    <span>{formatPrice(property.priceEUR, 'EUR')}</span>
                    <span>•</span>
                    <span>{formatPrice(property.priceAED, 'AED')}</span>
                  </div>
                  <div className="flex justify-center sm:justify-end">
                    <button
                      onClick={handleShare}
                      className="mt-2 inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors text-sm"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Status and Type Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-semibold shadow-lg">
                  {property.status}
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full text-sm font-semibold shadow-lg">
                  {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                </span>
                {property.verified && (
                  <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Verified
                  </span>
                )}
                {property.roi && (
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {property.roi}% ROI
                  </span>
                )}
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Bed className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Bath className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Square className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{property.area}</div>
                  <div className="text-sm text-gray-600">m²</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Car className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">2</div>
                  <div className="text-sm text-gray-600">Parking</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Key Facts */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Facts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl"><div className="text-sm text-gray-600">Purpose</div><div className="font-semibold text-gray-900 capitalize">{property.type}</div></div>
                  <div className="p-4 bg-gray-50 rounded-xl"><div className="text-sm text-gray-600">Status</div><div className="font-semibold text-gray-900">{property.status}</div></div>
                  <div className="p-4 bg-gray-50 rounded-xl"><div className="text-sm text-gray-600">Verified</div><div className="font-semibold text-gray-900">{property.verified? 'Yes':'No'}</div></div>
                </div>
              </div>

              {/* Highlights (iconic quick facts) */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center p-4 bg-white border rounded-xl shadow-sm"><Bed className="w-5 h-5 text-yellow-500 mr-3"/><div><div className="text-sm text-gray-600">Bedrooms</div><div className="font-semibold text-gray-900">{property.bedrooms}</div></div></div>
                  <div className="flex items-center p-4 bg-white border rounded-xl shadow-sm"><Bath className="w-5 h-5 text-yellow-500 mr-3"/><div><div className="text-sm text-gray-600">Bathrooms</div><div className="font-semibold text-gray-900">{property.bathrooms}</div></div></div>
                  <div className="flex items-center p-4 bg-white border rounded-xl shadow-sm"><Square className="w-5 h-5 text-yellow-500 mr-3"/><div><div className="text-sm text-gray-600">Area</div><div className="font-semibold text-gray-900">{property.area}</div></div></div>
                  <div className="flex items-center p-4 bg-white border rounded-xl shadow-sm"><Car className="w-5 h-5 text-yellow-500 mr-3"/><div><div className="text-sm text-gray-600">Parking</div><div className="font-semibold text-gray-900">2</div></div></div>
                </div>
              </div>

              {/* Amenities Icons */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {property.features.map((feature, i)=> (
                    <div key={i} className="flex items-center p-3 bg-gray-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3"/>
                      <span className="text-gray-800 text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lifestyle Tags */}
              {property.lifestyle && property.lifestyle.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Lifestyle</h3>
                  <div className="flex flex-wrap gap-3">
                    {property.lifestyle.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 rounded-full text-sm font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Developer Info */}
              {property.developer && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Developer</h3>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-lg font-semibold text-gray-900">{property.developer}</div>
                    <div className="text-gray-600">Trusted developer with premium projects</div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Mortgage Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Mortgage Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Home Price</label>
                    <input
                      type="number"
                      value={homePrice}
                      onChange={(e)=>setHomePrice(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Down Payment (%)</label>
                    <input
                      type="number"
                      value={downPaymentPct}
                      onChange={(e)=>setDownPaymentPct(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate (%)</label>
                    <input
                      type="number"
                      value={interestPct}
                      onChange={(e)=>setInterestPct(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Term (years)</label>
                    <input
                      type="number"
                      value={years}
                      onChange={(e)=>setYears(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="text-sm text-gray-600 mb-2">Estimated Monthly Payment</div>
                    <div className="text-4xl font-bold text-gray-900 mb-4">{formatPrice(Math.round(monthlyPayment), 'AED')}</div>
                    <div className="text-sm text-gray-500">Assumes fixed rate, equal payments. For guidance only.</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recommended Properties */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Recommended Properties</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(getFeaturedProperties ? getFeaturedProperties() : properties).slice(0,3).map((p)=> (
                  <Link key={p.id} to={`/property/${p.id}/${p.slug || p.id}`} className="group block">
                    <div className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300">
                      <div className="h-48 relative">
                        <img src={(p.images && p.images[0]) || resolveAssetUrl('/assets/Rectangle 47.png')} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-4">
                        <div className="text-sm text-gray-600 mb-1 flex items-center"><MapPin className="w-4 h-4 mr-1" />{p.location}</div>
                        <div className="font-semibold text-gray-900">{p.title}</div>
                        <div className="text-yellow-600 font-bold mt-1">{formatPrice(p.price)}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Bottom Inquiry Form (Blue Theme) */}
            
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 mb-8 sticky top-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Request Information</h3>
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"
                  placeholder="Full name"
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"
                  placeholder="Phone"
                />
                <select
                  value={formData.preferredContact}
                  onChange={(e) => setFormData({...formData, preferredContact: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"
                >
                  <option value="phone">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-sm"
                  placeholder="Your message"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                >
                  Request Information
                </button>
              </form>

              {/* Quick Actions (compact) */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100"><Phone className="w-4 h-4 mr-2"/>Call</button>
                <button className="flex items-center justify-center px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100"><MessageCircle className="w-4 h-4 mr-2"/>WhatsApp</button>
                <button className="flex items-center justify-center px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm hover:bg-purple-100"><Play className="w-4 h-4 mr-2"/>Virtual Tour</button>
                <button className="flex items-center justify-center px-3 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm hover:bg-yellow-100"><Download className="w-4 h-4 mr-2"/>Brochure</button>
              </div>
            </motion.div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
