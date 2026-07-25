import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Check, Clock, User } from 'lucide-react';
import { getGuideBySlug } from '../data/guides';
import { resolveAssetUrl } from '../utils/assets';

const GuideDetailPage = () => {
  const { slug } = useParams();
  const guide = getGuideBySlug(slug);
  if (!guide) return <Navigate to="/insights" replace />;

  return (
    <main className="min-h-screen bg-stone-50">
      <Helmet>
        <title>{guide.title} | Ascendure Insights</title>
        <meta name="description" content={guide.excerpt} />
      </Helmet>
      <section className="relative min-h-[620px] overflow-hidden bg-slate-950">
        <img src={resolveAssetUrl(guide.image)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/25" />
        <div className="relative mx-auto flex min-h-[620px] max-w-5xl flex-col justify-center px-6 pb-16 pt-32 text-white">
          <Link to="/insights" className="mb-8 inline-flex items-center text-sm font-bold text-yellow-400"><ArrowLeft className="mr-2 h-4 w-4" />All Insights</Link>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">{guide.category}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">{guide.title}</h1>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-300">
            <span className="flex items-center"><User className="mr-2 h-4 w-4" />{guide.author}</span>
            <span className="flex items-center"><Clock className="mr-2 h-4 w-4" />{guide.readTime}</span>
            <span>Evergreen guide · Reviewed July 2026</span>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-20">
        <p className="border-l-4 border-yellow-500 pl-6 text-xl leading-9 text-slate-700">{guide.intro}</p>
        {guide.dataPoints && (
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {guide.dataPoints.map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-[#0A2540] p-6 text-white">
                <p className="text-3xl font-bold text-yellow-400">{value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        )}
        {guide.lifestyleImages?.map((image) => (
          <figure key={image.src} className="mt-12">
            <img src={resolveAssetUrl(image.src)} alt={image.alt} className="aspect-[16/9] w-full rounded-2xl object-cover shadow-lg" />
            <figcaption className="mt-3 text-sm leading-6 text-slate-500">{image.caption}</figcaption>
          </figure>
        ))}
        <div className="mt-14 space-y-14">
          {guide.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-3xl font-bold text-slate-900">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-5 text-lg leading-8 text-slate-700">{paragraph}</p>)}
              {section.bullets && (
                <div className="mt-6 space-y-3 rounded-2xl bg-white p-7 shadow-sm">
                  {section.bullets.map((bullet) => <div key={bullet} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600" /><span className="leading-7 text-slate-700">{bullet}</span></div>)}
                </div>
              )}
            </section>
          ))}
        </div>
        {guide.sources && (
          <section className="mt-14 border-t border-slate-200 pt-10">
            <h2 className="text-2xl font-bold text-slate-900">Sources and methodology</h2>
            <p className="mt-3 leading-7 text-slate-600">Ascendure’s interpretation of the latest available public market evidence. Figures retain the reporting periods used by their publishers.</p>
            <ul className="mt-5 space-y-3">
              {guide.sources.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noreferrer" className="font-semibold text-[#0A2540] underline decoration-yellow-500 underline-offset-4 hover:text-yellow-700">{label}</a></li>)}
            </ul>
          </section>
        )}
        <div className="mt-16 rounded-2xl bg-slate-950 p-8 text-white">
          <h2 className="text-2xl font-bold">Apply the guide to a real opportunity</h2>
          <p className="mt-3 leading-7 text-slate-300">Speak with Ascendure about your brief, shortlist, and property acquisition strategy.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center rounded-lg bg-yellow-500 px-6 py-3 font-bold text-slate-950">Request a consultation <ArrowRight className="ml-2 h-5 w-5" /></Link>
        </div>
        <p className="mt-8 text-sm leading-6 text-slate-500">This guide provides general information only and is not legal, financial, tax, valuation, or investment advice. Rules and market conditions change; obtain current professional advice before acting.</p>
      </article>
    </main>
  );
};

export default GuideDetailPage;
