import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Gavel, AlertTriangle, Copyright, ShieldCheck } from 'lucide-react';

const TermsOfUse = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      body:
        'By accessing or using this website, you agree to be bound by these Terms of Use. If you do not agree, you should not use the website or any services offered through it.'
    },
    {
      title: '2. Website Use',
      body:
        'You may use the website for lawful purposes only. You agree not to upload, transmit, or distribute content that is unlawful, misleading, defamatory, infringing, or otherwise harmful. You must not attempt to interfere with the integrity or operation of the website.'
    },
    {
      title: '3. Property Listing Disclaimer',
      body:
        'All property listings, images, descriptions, pricing, availability, and other information are provided for general informational purposes only. While we aim to keep information accurate, details may change without notice and should not be relied upon as a guarantee of accuracy, legality, or availability.'
    },
    {
      title: '4. Limitation of Liability',
      body:
        'Ascendure Properties shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of this website, including loss of profit, loss of data, or loss of opportunity, except where prohibited by applicable law.'
    },
    {
      title: '5. Intellectual Property',
      body:
        'All content on this website, including text, graphics, logos, images, and software, is owned or licensed by Ascendure Properties and protected by applicable intellectual property laws. You may not copy, reproduce, distribute, or exploit any content without prior written permission.'
    },
    {
      title: '6. Third-Party Links and Services',
      body:
        'Our website may contain links to third-party websites or services. We are not responsible for the content, privacy practices, or availability of those sites and do not endorse them unless expressly stated.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Helmet>
        <title>Terms of Use | Ascendure Properties</title>
        <meta
          name="description"
          content="Terms of use for Ascendure Properties covering website usage, liability limitations, listing disclaimers, and intellectual property."
        />
      </Helmet>

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <FileText size={16} />
              Terms of Use
            </p>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
              Terms of Use
            </h1>
            <p className="mt-5 text-lg text-slate-200">
              These terms govern your access to and use of the Ascendure Properties website and related services.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {sections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                <p className="mt-3 leading-7 text-slate-700">{section.body}</p>
              </article>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-amber-600" />
                <h3 className="font-semibold text-slate-900">User Responsibility</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                You are responsible for ensuring that your use of the website complies with applicable laws and regulations.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-amber-600" />
                <h3 className="font-semibold text-slate-900">Property Information</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Any property decision should be made after independent verification of facts, pricing, and legal status.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Copyright className="text-amber-600" />
                <h3 className="font-semibold text-slate-900">Intellectual Property</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                Reproduction or redistribution of website content without permission is prohibited.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Gavel className="text-amber-600" />
                <h3 className="font-semibold text-slate-900">Changes to Terms</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                We may update these terms from time to time. Continued use of the website after changes are published constitutes your acceptance.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default TermsOfUse;
