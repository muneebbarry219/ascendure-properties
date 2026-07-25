import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  FileCheck2,
  Globe2,
  HeartHandshake,
  Home,
  Landmark,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';

const products = [
  ['Real Estate Owner', 'For qualifying residential property ownership or usufruct valued at SAR 4 million or more.'],
  ['Investor', 'For investors deploying at least SAR 7 million into qualifying Saudi business activities.'],
  ['Entrepreneur', 'Two pathways for founders backed by an approved investment entity.'],
  ['Exceptional Competence', 'For executives and specialists in priority scientific, research, and healthcare fields.'],
  ['Gifted', 'For recognised talent in sports, culture, and the arts.'],
  ['Limited or Unlimited Duration', 'A renewable one-year route or permanent Premium Residency, subject to the applicable terms.']
];

const ownerCriteria = [
  'Applicant and family passports valid for at least 180 days',
  'Evidence of financial solvency and a clean criminal record',
  'Recent approved medical report confirming freedom from communicable diseases',
  'Valid legal residency with at least 90 days remaining when applying from within Saudi Arabia',
  'Applicant must satisfy the general age and application requirements'
];

const process = [
  ['Choose the right route', 'Compare Premium Residency products and confirm that your profile, investment, or property meets the current criteria.'],
  ['Prepare your evidence', 'Collect passports, financial records, criminal-record documentation, medical reports, and route-specific evidence.'],
  ['Verify the property', 'Confirm permitted location, residential use, title or off-plan status, valuation, financing, and developer accreditation.'],
  ['Apply online', 'Create an account and submit the application and supporting documents through the official Premium Residency portal.'],
  ['Complete review', 'Respond to any requests for clarification, pay the applicable processing and product fees, and complete due diligence.'],
  ['Receive and maintain status', 'After approval, keep the underlying investment, ownership, or eligibility conditions in force for the required period.']
];

const benefits = [
  [Users, 'Family residency', 'Reside in Saudi Arabia with eligible spouses, parents, and children under 25.'],
  [Briefcase, 'Work flexibility', 'Work in the private sector and move between employers, subject to reserved-profession rules.'],
  [Building2, 'Business access', 'Conduct business in line with Saudi investment legislation.'],
  [Home, 'Property rights', 'Own or benefit from eligible real estate, subject to location and regulatory controls.'],
  [Globe2, 'Travel convenience', 'Exit and re-enter without a separate visa and use designated citizen/GCC lanes at ports of entry.'],
  [HeartHandshake, 'Family support', 'Request relative visit visas and recruit domestic workers according to applicable procedures.']
];

const SectionTitle = ({ eyebrow, title, copy, dark = false }) => (
  <div className="mx-auto mb-12 max-w-3xl text-center">
    <p className={`mb-3 text-sm font-bold uppercase tracking-[0.22em] ${dark ? 'text-yellow-400' : 'text-yellow-600'}`}>{eyebrow}</p>
    <h2 className={`text-3xl font-bold md:text-5xl ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
    {copy && <p className={`mt-5 text-lg leading-8 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{copy}</p>}
  </div>
);

const KsaPremiumResidencyPage = () => (
  <main className="min-h-screen bg-white">
    <Helmet>
      <title>KSA Premium Residency & Foreign Property Ownership | Ascendure</title>
      <meta
        name="description"
        content="A practical guide to Saudi Premium Residency, foreign property ownership, eligibility, application steps, and key benefits."
      />
    </Helmet>

    <section className="relative min-h-[720px] overflow-hidden bg-slate-950">
      <img
        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=85"
        alt="Modern Saudi city skyline"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/30" />
      <div className="relative mx-auto flex min-h-[720px] max-w-6xl items-center px-6 pb-16 pt-32">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">
            <Sparkles className="h-4 w-4" /> Saudi Arabia residency & property guide
          </div>
          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            Build your future in <span className="text-yellow-400">Saudi Arabia</span>
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-200">
            Understand KSA Premium Residency, foreign property ownership, eligibility, the application journey, and the advantages available to qualifying individuals and families.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/contact" className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-7 py-4 font-bold text-slate-950 transition hover:bg-yellow-400">
              Request a consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a href="#guide" className="inline-flex items-center justify-center rounded-lg border border-white/60 px-7 py-4 font-bold transition hover:bg-white hover:text-slate-950">
              Explore the guide <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    <section id="guide" className="scroll-mt-20 bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="The programme" title="More than a visa" copy="Often called the Saudi Golden Visa, Premium Residency is a family of residency products designed for investors, property owners, entrepreneurs, exceptional professionals, and recognised talent." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map(([title, copy], index) => (
            <motion.article key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <BadgeCheck className="mb-5 h-9 w-9 text-yellow-500" />
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-yellow-600">Foreign ownership</p>
          <h2 className="text-4xl font-bold text-slate-900">Can foreigners own property in KSA?</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Yes, within the framework established by Saudi law. The updated Non-Saudi Real Estate Ownership Law entered into force on 22 January 2026 and covers resident and non-resident individuals as well as qualifying companies and entities.
          </p>
          <div className="mt-8 space-y-4">
            {[
              'Ownership is governed by designated geographical zones and applicable ownership controls.',
              'Makkah and Madinah have special restrictions and conditions; Premium Residency may provide usufruct rights under its own framework.',
              'Border areas, prohibited locations, property purpose, and entity type can affect eligibility.',
              'Applications under the general foreign-ownership framework are handled through REGA’s Saudi Properties portal.',
              'Premium Residency, GCC ownership rules, and other laws may grant distinct or more favourable rights in specific cases.'
            ].map((item) => <div key={item} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-yellow-600" /><p className="leading-7 text-slate-700">{item}</p></div>)}
          </div>
        </div>
        <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-2xl md:p-10">
          <div className="flex items-center gap-3 text-yellow-400"><Landmark className="h-7 w-7" /><p className="font-bold uppercase tracking-widest">Property-owner route</p></div>
          <p className="mt-6 text-5xl font-bold">SAR 4M+</p>
          <p className="mt-2 text-slate-300">minimum qualifying residential real-estate value</p>
          <div className="my-8 h-px bg-slate-700" />
          <ul className="space-y-4 text-slate-200">
            <li className="flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0 text-yellow-400" />Existing property must be residential, completed, and unencumbered.</li>
            <li className="flex gap-3"><Building2 className="h-5 w-5 shrink-0 text-yellow-400" />A qualifying off-plan home must be bought from a REGA-approved developer.</li>
            <li className="flex gap-3"><CircleDollarSign className="h-5 w-5 shrink-0 text-yellow-400" />For off-plan property, pay at least SAR 1 million or 10% of value, whichever is higher.</li>
            <li className="flex gap-3"><FileCheck2 className="h-5 w-5 shrink-0 text-yellow-400" />Financed or mortgaged property does not qualify for this route.</li>
          </ul>
          <p className="mt-8 rounded-xl bg-white/10 p-4 text-sm leading-6 text-slate-300">Residency duration remains linked to continued ownership, usufruct, or the qualifying off-plan contract and subsequent ownership.</p>
        </div>
      </div>
    </section>

    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Eligibility" title="A clear readiness checklist" copy="Every product has its own criteria. Property-owner applicants should expect these general and route-specific requirements." />
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="rounded-2xl bg-white p-8 shadow-sm lg:col-span-3">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">General applicant requirements</h3>
            <div className="space-y-4">
              {ownerCriteria.map((item) => <div key={item} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"><Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /><span className="text-slate-700">{item}</span></div>)}
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500 p-8 text-slate-950 lg:col-span-2">
            <MapPin className="h-10 w-10" />
            <h3 className="mt-6 text-2xl font-bold">Property due diligence matters</h3>
            <p className="mt-4 leading-7">A high purchase price alone does not guarantee qualification. Confirm title, permitted zone, use classification, valuation, mortgage status, developer approval, and transaction structure before committing.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center font-bold">Discuss a property <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <SectionTitle eyebrow="Application roadmap" title="From eligibility to approval" />
        <div className="relative">
          <div className="absolute bottom-8 left-6 top-8 w-px bg-slate-200 md:left-1/2" />
          {process.map(([title, copy], index) => (
            <div key={title} className={`relative mb-8 flex md:w-1/2 ${index % 2 ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}>
              <div className={`absolute left-0 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 font-bold text-yellow-400 md:left-auto ${index % 2 ? 'md:-left-6' : 'md:-right-6'}`}>{index + 1}</div>
              <div className="ml-16 w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:ml-0">
                <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle dark eyebrow="Why Premium Residency" title="Freedom to live, work, and invest" copy="The programme combines long-term stability with practical privileges for the holder and eligible family members." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([Icon, title, copy]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <Icon className="h-9 w-9 text-yellow-400" />
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-300">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="bg-yellow-500 py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 lg:flex-row lg:items-center">
        <div className="max-w-3xl">
          <p className="font-bold uppercase tracking-widest text-slate-800">Your next move</p>
          <h2 className="mt-3 text-4xl font-bold text-slate-950 md:text-5xl">Make your Saudi property strategy residency-ready.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-800">Ascendure can help you shortlist suitable property and coordinate the right professional support for your transaction.</p>
        </div>
        <Link to="/contact" className="inline-flex shrink-0 items-center rounded-lg bg-slate-950 px-8 py-4 font-bold text-white transition hover:bg-slate-800">Talk to an advisor <ArrowRight className="ml-2 h-5 w-5" /></Link>
      </div>
    </section>

    <section className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-6 text-sm leading-6 text-slate-500">
        <p><strong className="text-slate-700">Important:</strong> This guide is general information, not legal, tax, immigration, or investment advice. Requirements, fees, zones, and interpretations may change. Verify your position with the Saudi Premium Residency Center, the Real Estate General Authority, and qualified advisers before applying or purchasing property. Information reviewed July 2026.</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          <a className="font-semibold text-slate-700 underline hover:text-yellow-600" href="https://pr.gov.sa/Select-products" target="_blank" rel="noreferrer">Official Premium Residency products</a>
          <a className="font-semibold text-slate-700 underline hover:text-yellow-600" href="https://pr.gov.sa/services-terms" target="_blank" rel="noreferrer">Official eligibility terms</a>
          <a className="font-semibold text-slate-700 underline hover:text-yellow-600" href="https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/" target="_blank" rel="noreferrer">Official foreign-ownership law</a>
        </div>
      </div>
    </section>
  </main>
);

export default KsaPremiumResidencyPage;
