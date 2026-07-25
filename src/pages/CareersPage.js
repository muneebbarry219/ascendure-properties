import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Sparkles, Globe2, Users, ShieldCheck } from 'lucide-react';

const CareersPage = () => {
  const roles = [
    {
      title: 'Senior Property Advisor',
      location: 'Riyadh · Dubai · London',
      type: 'Full-time',
      description: 'Guide discerning clients through exceptional residential and investment opportunities with discretion, insight, and elite service.'
    },
    {
      title: 'Luxury Client Relations Manager',
      location: 'Jeddah · Dubai',
      type: 'Full-time',
      description: 'Curate high-touch client experiences and foster lasting relationships with private clients and family offices.'
    },
    {
      title: 'Investment & Market Analyst',
      location: 'Remote · Riyadh',
      type: 'Full-time',
      description: 'Deliver market intelligence and strategic insight for premium portfolios across Saudi Arabia, the UAE, and Europe.'
    }
  ];

  const values = [
    {
      title: 'Elevated Service',
      description: 'We deliver thoughtful, precise, and highly personal experiences for every client.'
    },
    {
      title: 'Global Perspective',
      description: 'Our work spans leading markets across the Middle East, Europe, and beyond.'
    },
    {
      title: 'Trusted Excellence',
      description: 'We combine market expertise with discretion, integrity, and long-term vision.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Helmet>
        <title>Careers | Ascendure Properties</title>
        <meta
          name="description"
          content="Join Ascendure and help shape the future of luxury real estate with a globally minded, client-first team."
        />
      </Helmet>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(250,204,21,0.22),_transparent_35%)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col px-4 py-24 lg:flex-row lg:items-end lg:justify-between lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <Briefcase size={16} />
              Join Ascendure
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Build a career at the intersection of luxury, trust, and opportunity.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-200">
              Ascendure is shaping a new standard of real estate advisory for discerning clients across Saudi Arabia, the UAE, and Europe. We are seeking thoughtful professionals who value excellence, discretion, and long-term impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-flex items-center rounded-full bg-amber-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-amber-400"
              >
                Explore Opportunities
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/about"
                className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Learn About Us
              </a>
            </div>
          </motion.div>

          <div className="mt-12 rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur lg:mt-0 lg:max-w-sm">
            <div className="flex items-center gap-3">
              <Sparkles className="text-amber-400" />
              <h2 className="text-lg font-semibold">Why Ascendure</h2>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              We bring together global insight, premium client care, and a culture of excellence designed for professionals who want to leave a lasting mark.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">{value.title}</h3>
              <p className="mt-3 leading-7 text-slate-700">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Open Roles</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Join a team that values calibre and care.</h2>
            </div>
            <p className="max-w-2xl text-slate-600">
              Whether you are an experienced advisor or a rising specialist, we welcome professionals who bring insight, initiative, and a refined approach to service.
            </p>
          </div>

          <div className="mt-10 grid gap-6">
            {roles.map((role) => (
              <div key={role.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{role.title}</h3>
                    <p className="mt-2 text-slate-600">{role.description}</p>
                  </div>
                  <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    {role.type} · {role.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-slate-900 p-8 text-white">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-semibold">Ready to make your next move?</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  Send your CV and a short note about your background to careers@ascendure.com. We are always interested in connecting with exceptional talent.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm">
                  <Users size={16} />
                  Client-first culture
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm">
                  <Globe2 size={16} />
                  International reach
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm">
                  <ShieldCheck size={16} />
                  Trusted excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
