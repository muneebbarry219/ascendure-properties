import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { guides } from '../data/guides';
import { resolveAssetUrl } from '../utils/assets';

const Insights = () => (
  <main className="min-h-screen bg-[#0A2540]">
    <Helmet>
      <title>KSA Property Guides & Market Insights | Ascendure</title>
      <meta name="description" content="Evergreen guides for luxury property buyers and investors in Riyadh, Jeddah, and across Saudi Arabia." />
    </Helmet>

    <section className="relative overflow-hidden py-36">
      <img src={resolveAssetUrl('/assets/Hero Section Image.png')} alt="Saudi city skyline" className="absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-[#0A2540]/80 to-[#0A2540]" />
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">Ascendure intelligence</p>
        <h1 className="text-5xl font-bold md:text-7xl">Market <span className="text-yellow-400">Insights</span></h1>
        <p className="mx-auto mt-7 max-w-3xl text-xl leading-8 text-slate-200">Practical, enduring guidance for making better-informed property decisions in Saudi Arabia.</p>
      </motion.div>
    </section>

    <section className="pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">Published guides</p>
            <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">Build your KSA property knowledge</h2>
          </div>
          <p className="max-w-md leading-7 text-slate-300">Written for real decisions—not short-lived headlines. Each guide includes a practical checklist.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {guides.map((guide, index) => (
            <motion.article
              key={guide.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`group overflow-hidden rounded-2xl bg-white shadow-xl ${index === 0 ? 'lg:col-span-2 lg:grid lg:grid-cols-2' : ''}`}
            >
              <div className={`relative overflow-hidden ${index === 0 ? 'min-h-72' : 'h-64'}`}>
                <img src={resolveAssetUrl(guide.image)} alt={guide.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-slate-950">{guide.category}</span>
                {guide.flagship && <span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-slate-950/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">Flagship 2026</span>}
              </div>
              <div className="flex flex-col p-7">
                <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="flex items-center"><User className="mr-1.5 h-4 w-4" />{guide.author}</span>
                  <span className="flex items-center"><Clock className="mr-1.5 h-4 w-4" />{guide.readTime}</span>
                </div>
                <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-900">{guide.title}</h3>
                <p className="mt-4 flex-1 leading-7 text-slate-600">{guide.excerpt}</p>
                <Link to={`/insights/${guide.slug}`} className="mt-7 inline-flex items-center font-bold text-slate-900 hover:text-yellow-600">Read the guide <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-stone-100 py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
        <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-700">Need tailored guidance?</p><h2 className="mt-3 text-4xl font-bold text-[#0A2540]">Turn insight into a confident brief.</h2><p className="mt-4 max-w-2xl leading-7 text-slate-600">Our advisors can help connect your objectives with suitable locations, property types, and acquisition support.</p></div>
        <Link to="/contact" className="inline-flex shrink-0 items-center rounded-lg bg-[#0A2540] px-7 py-4 font-bold text-white hover:bg-[#123b60]">Talk to an advisor <ArrowRight className="ml-2 h-5 w-5" /></Link>
      </div>
    </section>
  </main>
);

export default Insights;
