import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { services } from '../data/services';

const testimonials = [
  {
    name: 'Ahmed Al-Rashid',
    location: 'Riyadh',
    text: "Ascendure's buyer advisory service was exceptional. They found me the perfect property and negotiated an amazing deal.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Sarah Johnson',
    location: 'Dubai',
    text: 'The relocation support was outstanding. They helped my family settle into Dubai seamlessly.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=300&q=80'
  },
  {
    name: 'Mohammed Al-Zahrani',
    location: 'Jeddah',
    text: 'Professional property management that maximized my rental income. Their attention to detail is excellent.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80'
  }
];

const ServicesPage = () => (
  <main className="min-h-screen bg-white">
    <section className="relative flex h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2070&q=80"
          alt="Luxury property interior"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white"
      >
        <h1 className="mb-6 text-5xl font-bold md:text-7xl">Our Services</h1>
        <p className="mb-8 text-xl leading-relaxed text-white/90 md:text-2xl">
          Comprehensive real estate services tailored to your unique needs and aspirations
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a href="#service-overview" className="rounded-lg bg-yellow-500 px-8 py-4 font-semibold shadow-lg transition hover:bg-yellow-600">
            Explore services <ArrowRight className="ml-2 inline h-5 w-5" />
          </a>
          <Link to="/contact" className="rounded-lg border-2 border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-gray-900">
            Get consultation
          </Link>
        </div>
      </motion.div>
    </section>

    <section id="service-overview" className="scroll-mt-20 bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900">Comprehensive Real Estate Solutions</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Select a service to explore its dedicated offering, process, and benefits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const ServiceIcon = service.icon;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="flex flex-col rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                  <ServiceIcon className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900">{service.title}</h3>
                <p className="mb-6 flex-1 text-gray-600">{service.description}</p>
                <Link to={`/services/${service.id}`} className="inline-flex items-center font-medium text-yellow-600 hover:text-yellow-700">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>

    <section className="bg-yellow-500 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center text-white">
          <h2 className="mb-5 text-4xl font-bold">Client Testimonials</h2>
          <p className="text-xl text-white/90">Hear from our clients about their Ascendure experience.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-2xl bg-white p-8 shadow-lg">
              <div className="mb-4 flex">{[0, 1, 2, 3, 4].map((star) => <Star key={star} className="h-5 w-5 fill-current text-yellow-400" />)}</div>
              <p className="mb-6 italic text-gray-700">“{testimonial.text}”</p>
              <div className="flex items-center gap-4">
                <img src={testimonial.image} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />
                <div><h3 className="font-semibold text-gray-900">{testimonial.name}</h3><p className="text-sm text-gray-600">{testimonial.location}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-gray-900 py-20 text-center text-white">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-6 text-4xl font-bold">Ready to Get Started?</h2>
        <p className="mb-8 text-xl text-gray-300">Let our expert team provide a solution tailored to your needs and goals.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-8 py-4 font-semibold hover:bg-yellow-600">
          Schedule consultation <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  </main>
);

export default ServicesPage;
