import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { getServiceById } from '../data/services';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const service = getServiceById(serviceId);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const ServiceIcon = service.icon;

  return (
    <main className="min-h-screen bg-white">
      <section className="relative flex min-h-[62vh] items-center overflow-hidden bg-gray-900 pt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2070&q=80"
            alt=""
            className="h-full w-full object-cover opacity-35"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20 text-white"
        >
          <Link to="/services" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-yellow-300">
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>
          <ServiceIcon className="mb-6 h-14 w-14 text-yellow-400" />
          <h1 className="mb-6 max-w-4xl text-5xl font-bold md:text-7xl">{service.title}</h1>
          <p className="max-w-3xl text-xl leading-relaxed text-white/85">{service.description}</p>
        </motion.div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-yellow-600">What we provide</p>
            <h2 className="mb-8 text-4xl font-bold text-gray-900">Expert guidance at every step</h2>
            <ul className="space-y-4">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-yellow-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-gray-50 p-8 shadow-lg"
          >
            <h2 className="mb-7 text-2xl font-bold text-gray-900">Our process</h2>
            <div className="space-y-5">
              {service.process.map((step, index) => (
                <div key={step} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-yellow-500 font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1.5 text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-yellow-600">The advantage</p>
            <h2 className="mb-8 text-4xl font-bold text-gray-900">What you can expect</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit) => (
              <div key={benefit} className="rounded-xl bg-white p-6 shadow-sm">
                <CheckCircle className="mb-4 h-6 w-6 text-yellow-600" />
                <p className="font-medium leading-relaxed text-gray-800">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-5 text-4xl font-bold">Let’s discuss your requirements</h2>
          <p className="mb-8 text-lg text-gray-300">Speak with our team for advice tailored to your goals.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-8 py-4 font-semibold hover:bg-yellow-600">
            Schedule a consultation
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailPage;
