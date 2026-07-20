import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  ArrowRight,
  TrendingUp,
  Globe,
  Home,
  Star,
  Clock
} from 'lucide-react';
import { resolveAssetUrl } from '../utils/assets';

const Insights = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Dubai Real Estate Market Outlook 2024",
      excerpt: "An in-depth analysis of Dubai's property market trends, investment opportunities, and future growth prospects.",
      image: resolveAssetUrl("/assets/Blog 1.png"),
      author: "Sarah Johnson",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Market Analysis",
      featured: true
    },
    {
      id: 2,
      title: "Golden Visa Programs: Your Gateway to European Residency",
      excerpt: "Explore the latest Golden Visa opportunities across Europe and how real estate investments can secure your residency.",
      image: resolveAssetUrl("/assets/Blog 2.png"),
      author: "Ahmed Al-Rashid",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Residency",
      featured: true
    },
    {
      id: 3,
      title: "Luxury Living in Riyadh: The New Wave of Premium Properties",
      excerpt: "Discover the emerging luxury real estate scene in Riyadh and the factors driving its rapid growth.",
      image: resolveAssetUrl("/assets/Blog 1.png"),
      author: "Elena Rodriguez",
      date: "March 5, 2024",
      readTime: "5 min read",
      category: "Lifestyle",
      featured: false
    },
    {
      id: 4,
      title: "Investment Strategies for Off-Plan Properties",
      excerpt: "Learn how to maximize returns from off-plan investments with our expert strategies and market insights.",
      image: resolveAssetUrl("/assets/Blog 2.png"),
      author: "Michael Chen",
      date: "February 28, 2024",
      readTime: "7 min read",
      category: "Investment",
      featured: false
    },
    {
      id: 5,
      title: "Montenegro: Europe's Hidden Gem for Real Estate Investment",
      excerpt: "Why Montenegro is becoming one of Europe's most attractive destinations for property investors.",
      image: resolveAssetUrl("/assets/Blog 1.png"),
      author: "David Wilson",
      date: "February 20, 2024",
      readTime: "9 min read",
      category: "Investment",
      featured: false
    },
    {
      id: 6,
      title: "Sustainable Luxury: The Future of High-End Real Estate",
      excerpt: "How sustainability is reshaping luxury real estate and what it means for investors and buyers.",
      image: resolveAssetUrl("/assets/Blog 2.png"),
      author: "Lisa Park",
      date: "February 15, 2024",
      readTime: "6 min read",
      category: "Trends",
      featured: false
    }
  ];

  const categories = [
    { name: "All", count: 24 },
    { name: "Market Analysis", count: 8 },
    { name: "Investment", count: 6 },
    { name: "Residency", count: 4 },
    { name: "Lifestyle", count: 3 },
    { name: "Trends", count: 3 }
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
              <span className="block">Market</span>
              <span className="block text-yellow-400">Insights</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Stay informed with the latest market trends, investment strategies, and real estate insights from our expert team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  index === 0 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              <span className="text-white">Featured</span>
              <span className="text-yellow-400 ml-4">Articles</span>
            </h2>
          </div>

          {/* Featured Posts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {blogPosts.filter(post => post.featured).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="relative h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-full text-sm">
                      Featured
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center text-gray-600 text-sm mb-4">
                    <User className="w-4 h-4 mr-2" />
                    <span className="mr-4">{post.author}</span>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="mr-4">{post.date}</span>
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>
                  
                  <button className="inline-flex items-center text-gray-900 font-bold hover:text-yellow-500 transition-colors duration-300">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* All Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <User className="w-4 h-4 mr-2" />
                    <span className="mr-4">{post.author}</span>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                    <button className="inline-flex items-center text-gray-900 font-bold hover:text-yellow-500 transition-colors duration-300 text-sm">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: '#0A2540' }}>
              <span className="text-gray-900">Stay</span>
              <span className="text-yellow-400 ml-4">Updated</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest market insights, investment opportunities, and exclusive property updates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Insights;


