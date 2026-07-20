import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  TrendingUp, 
  Shield, 
  Users, 
  FileText, 
  Phone,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Globe,
  Heart
} from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: Home,
      title: 'Buyer Advisory',
      id: 'buyer-advisory',
      description: 'Comprehensive guidance for property buyers with market insights and negotiation expertise.',
      features: [
        'Market analysis and property valuation',
        'Negotiation and deal structuring',
        'Legal and financial guidance',
        'Property inspection coordination',
        'Post-purchase support'
      ],
      process: [
        'Initial consultation and needs assessment',
        'Property search and shortlisting',
        'Property visits and evaluations',
        'Negotiation and offer preparation',
        'Legal and financial coordination',
        'Closing and handover'
      ],
      benefits: [
        'Save time and avoid costly mistakes',
        'Access to off-market properties',
        'Expert negotiation for better deals',
        'Comprehensive market knowledge',
        'Ongoing support and guidance'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Seller Representation',
      id: 'seller-representation',
      description: 'Maximize your property value with professional marketing and sales strategies.',
      features: [
        'Property valuation and pricing strategy',
        'Professional photography and staging',
        'Multi-channel marketing campaigns',
        'Qualified buyer screening',
        'Transaction management'
      ],
      process: [
        'Property assessment and valuation',
        'Marketing strategy development',
        'Professional photography and staging',
        'Multi-platform marketing launch',
        'Buyer qualification and showings',
        'Negotiation and closing'
      ],
      benefits: [
        'Higher sale prices through expert marketing',
        'Faster sales with targeted marketing',
        'Reduced stress with professional handling',
        'Access to qualified buyers',
        'Comprehensive transaction support'
      ]
    },
    {
      icon: Shield,
      title: 'Property Management',
      id: 'property-management',
      description: 'Comprehensive property management services for rental properties and investments.',
      features: [
        'Tenant screening and placement',
        'Rent collection and financial reporting',
        'Property maintenance coordination',
        'Legal compliance management',
        'Investment performance tracking'
      ],
      process: [
        'Property assessment and setup',
        'Tenant marketing and screening',
        'Lease preparation and execution',
        'Ongoing maintenance management',
        'Financial reporting and optimization'
      ],
      benefits: [
        'Maximize rental income',
        'Reduce vacancy periods',
        'Professional tenant management',
        'Comprehensive maintenance oversight',
        'Detailed financial reporting'
      ]
    },
    {
      icon: Users,
      title: 'Relocation Support',
      id: 'relocation',
      description: 'Complete relocation assistance for individuals and families moving to new cities.',
      features: [
        'Neighborhood and area research',
        'School and education guidance',
        'Local services and amenities',
        'Cultural and lifestyle orientation',
        'Ongoing support and assistance'
      ],
      process: [
        'Relocation needs assessment',
        'Area and neighborhood research',
        'Property search and selection',
        'Local services coordination',
        'Settlement and orientation support'
      ],
      benefits: [
        'Smooth transition to new location',
        'Local expertise and knowledge',
        'Comprehensive support services',
        'Reduced stress and uncertainty',
        'Ongoing assistance and guidance'
      ]
    },
    {
      icon: FileText,
      title: 'Financing & Legal Guidance',
      id: 'financing',
      description: 'Expert guidance on financing options and legal requirements for property transactions.',
      features: [
        'Mortgage and financing options',
        'Legal documentation review',
        'Tax implications guidance',
        'Investment structure advice',
        'Compliance and regulatory support'
      ],
      process: [
        'Financial situation assessment',
        'Financing options analysis',
        'Legal requirements review',
        'Documentation preparation',
        'Transaction coordination'
      ],
      benefits: [
        'Access to best financing rates',
        'Legal compliance assurance',
        'Tax optimization strategies',
        'Professional documentation',
        'Comprehensive transaction support'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Ahmed Al-Rashid',
      location: 'Riyadh',
      rating: 5,
      text: 'Ascendure\'s buyer advisory service was exceptional. They found me the perfect property and negotiated an amazing deal. Highly recommended!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Sarah Johnson',
      location: 'Dubai',
      rating: 5,
      text: 'The relocation support was outstanding. They helped my family settle into Dubai seamlessly with their comprehensive services.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      name: 'Mohammed Al-Zahrani',
      location: 'Jeddah',
      rating: 5,
      text: 'Professional property management that maximized my rental income. Their attention to detail and tenant management is excellent.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Our Services"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Comprehensive real estate services tailored to your unique needs and aspirations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore Services
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-all duration-300">
                Get Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Comprehensive Real Estate Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From property search to investment management, we provide end-to-end services 
              that ensure your real estate journey is successful and stress-free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <button className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      {services.map((service, serviceIndex) => (
        <section key={service.id} className={`py-20 ${serviceIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: serviceIndex % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className={serviceIndex % 2 === 0 ? 'order-1' : 'order-2'}
                >
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                    <service.icon className="w-10 h-10 text-yellow-600" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-gray-900 mb-6">{service.title}</h3>
                  <p className="text-xl text-gray-600 mb-8">{service.description}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: serviceIndex % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className={serviceIndex % 2 === 0 ? 'order-2' : 'order-1'}
                >
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h4 className="text-lg font-semibold text-gray-900 mb-6">Our Process</h4>
                    <div className="space-y-4">
                      {service.process.map((step, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Testimonials */}
      <section className="py-20 bg-yellow-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Client Testimonials
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Hear from our satisfied clients about their experience with our services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Let our expert team provide you with personalized real estate solutions 
              tailored to your unique needs and goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-all duration-300">
                View Our Properties
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;






