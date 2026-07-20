import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';
import { resolveAssetUrl } from '../utils/assets';

const Countries = () => {
  const countries = [
    {
      name: 'Dubai',
      description: 'A global luxury property hub with iconic waterfront, skyline, and branded residence opportunities.',
      image: resolveAssetUrl('/assets/Dubai Banner.png'),
      startingPrice: 'Starting from ~$ 380,000 USD',
      to: '/properties?city=Dubai'
    },
    {
      name: 'Saudi Arabia',
      description: 'High-growth real estate markets shaped by modern communities, investment districts, and Vision 2030.',
      image: resolveAssetUrl('/assets/KSA Banner.png'),
      startingPrice: 'Starting from ~$ 400,000 USD',
      to: '/properties?city=Saudi%20Arabia'
    },
    {
      name: 'Montenegro',
      description: 'Coastal residences, marina living, and lifestyle-led investment options in a scenic European setting.',
      image: resolveAssetUrl('/assets/Montenegro Banner.png'),
      startingPrice: 'Starting from ~$ 87,000 USD',
      to: '/properties?city=Montenegro'
    },
    {
      name: 'Spain',
      description: 'Elegant city homes, resort destinations, and residency-friendly real estate across established markets.',
      image: resolveAssetUrl('/assets/Spain Banner.png'),
      startingPrice: 'Starting from ~$ 270,000 USD',
      to: '/properties?city=Spain'
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
              <span className="block">Access Premium Properties
              </span>
              <span className="block text-yellow-400">Across The Globe</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Select from hand-picked luxury destinations designed for investors, lifestyle buyers, and residency seekers.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {countries.map((country, index) => (
              <motion.div
                key={country.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative m-0 min-h-[420px] overflow-hidden rounded-2xl border border-white/10 p-0 shadow-2xl"
              >
                <img
                  src={country.image}
                  alt={`${country.name} real estate`}
                  className="absolute left-0 top-0 m-0 block h-full w-full p-0 object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                <div className="relative z-10 h-full min-h-[420px] flex flex-col justify-end p-6 sm:p-8">
                  <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                    {country.name}
                  </h2>
                  <p className="text-white/85 leading-relaxed mb-4 max-w-xl">
                    {country.description}
                  </p>
                  <div className="mb-6 w-fit border-l border-white/70 pl-4">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">
                      Starting From
                    </span>
                    <span className="mt-1 block text-sm sm:text-base font-semibold text-white">
                      {country.startingPrice.replace('Starting from ', '')}
                    </span>
                  </div>

                  <Link
                    to={country.to}
                    className="inline-flex w-fit items-center rounded-lg bg-white text-[#0A2540] px-5 py-3 text-sm font-bold transition-all duration-300 hover:bg-yellow-400 hover:text-black"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    View Properties
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Countries;
