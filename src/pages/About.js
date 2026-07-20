import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Globe, 
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { resolveAssetUrl } from '../utils/assets';

const About = () => {
  const stats = [
    { icon: <Award className="w-8 h-8" />, number: "500+", label: "Properties Sold" },
    { icon: <Users className="w-8 h-8" />, number: "1000+", label: "Happy Clients" },
    { icon: <Globe className="w-8 h-8" />, number: "15+", label: "Years Experience" },
    { icon: <TrendingUp className="w-8 h-8" />, number: "3", label: "Countries" }
  ];

  const values = [
    {
      title: "Excellence",
      description: "We maintain the highest standards in every transaction, ensuring exceptional service and results for our clients.",
      icon: <Star className="w-6 h-6" />
    },
    {
      title: "Integrity",
      description: "Transparency and honesty guide all our interactions, building trust and long-lasting relationships.",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Innovation",
      description: "We leverage cutting-edge technology and market insights to provide superior real estate solutions.",
      icon: <TrendingUp className="w-6 h-6" />
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
            alt="Dubai Skyline"
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              <span className="block">About</span>
              <span className="block text-yellow-400">Ascendure</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Your trusted partner in global luxury real estate, connecting discerning buyers with the world's most iconic properties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight" style={{ color: '#0A2540' }}>
                <span className="block">Our Story</span>
                <span className="block">of Excellence</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                Founded with a vision to redefine luxury real estate, Ascendure Properties has been at the forefront of connecting discerning buyers with the world's most prestigious properties for over 15 years.
              </p>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                Our journey began with a simple belief: that every client deserves access to exceptional properties and unparalleled service. Today, we're proud to have facilitated over 500 successful transactions across three continents.
              </p>
              <button className="inline-flex items-center justify-center text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: '#0A2540' }}>
                Learn More About Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-80 sm:h-96 w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={resolveAssetUrl('/assets/Redefining Modern Image.png')}
                  alt="Modern Building"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
              <span className="text-white">Our</span>
              <span className="text-yellow-400 ml-2 sm:ml-4">Achievements</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              Numbers that speak to our commitment to excellence and client satisfaction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
              >
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: '#0A2540' }}>
              <span className="text-gray-900">Our</span>
              <span className="text-yellow-400 ml-4">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every relationship we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              <span className="text-white">Meet Our</span>
              <span className="text-yellow-400 ml-4">Team</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Experienced professionals dedicated to delivering exceptional results for our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                description: "15+ years in luxury real estate with expertise in international markets.",
                image: resolveAssetUrl("assets/Blog 1.png")
              },
              {
                name: "Ahmed Al-Rashid",
                role: "Regional Director",
                description: "Specialist in Middle Eastern markets with deep local knowledge.",
                image: resolveAssetUrl("assets/Blog 2.png")
              },
              {
                name: "Elena Rodriguez",
                role: "European Operations",
                description: "Expert in European luxury properties and residency programs.",
                image: resolveAssetUrl("assets/Blog 1.png")
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 text-center"
              >
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <div className="text-yellow-400 font-semibold mb-4">{member.role}</div>
                <p className="text-white/80 text-sm leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
