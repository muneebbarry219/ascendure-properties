import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Cookie, Eye, Lock, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      body:
        'We collect personal data you provide directly to us, such as your name, email address, phone number, property preferences, inquiry details, and payment or identification information when required for a transaction. We may also automatically collect limited technical information such as IP address, browser type, device information, and website usage data through cookies and similar technologies.'
    },
    {
      title: '2. How We Use Your Data',
      body:
        'We use your personal data to respond to inquiries, provide property and investment services, verify identity, process transactions, improve our website experience, send service-related communications, and comply with legal obligations. We only use your information for purposes that are clear, relevant, and necessary.'
    },
    {
      title: '3. Cookies and Similar Technologies',
      body:
        'Our website uses cookies and similar tools to remember preferences, improve site performance, analyze traffic, and support secure functionality. You may manage your cookie settings in your browser. Please note that disabling some cookies may affect certain features of the website.'
    },
    {
      title: '4. Sharing and Disclosure',
      body:
        'We may share personal data with trusted service providers that assist us in operating our website, processing payments, sending communications, or fulfilling legal and regulatory obligations. We do not sell your personal data. Where required by law or regulation, we may disclose information to regulators, courts, or government authorities.'
    },
    {
      title: '5. Data Retention and Security',
      body:
        'We retain personal data only for as long as necessary to fulfil the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce agreements. We take reasonable administrative, technical, and physical safeguards to protect personal data against unauthorized access, loss, or misuse.'
    },
    {
      title: '6. Your Rights',
      body:
        'Under the Saudi Arabia Personal Data Protection Law (PDPL), you may have the right to access, correct, delete, or restrict the use of your personal data, as well as withdraw consent where applicable. You may also object to certain processing activities and request a copy of your data in a portable format where legally available.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Helmet>
        <title>Privacy Policy | Ascendure Properties</title>
        <meta
          name="description"
          content="Privacy policy for Ascendure Properties covering data collection, cookies, sharing, and user rights under the Saudi Arabia PDPL."
        />
      </Helmet>

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <ShieldCheck size={16} />
              Privacy Policy
            </p>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
              Privacy Policy
            </h1>
            <p className="mt-5 text-lg text-slate-200">
              This policy explains how Ascendure Properties collects, uses, shares, and protects your personal data in line with the Saudi Arabia Personal Data Protection Law (PDPL).
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
                <FileText className="text-amber-600" />
                <h3 className="font-semibold text-slate-900">Contact Us</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                If you have questions about this policy or wish to exercise your rights, please contact our Data Protection team at privacy@ascendure.com.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Cookie className="text-amber-600" />
                <h3 className="font-semibold text-slate-900">Cookie Notice</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                We use essential cookies for site functionality and analytics cookies to understand traffic and improve performance. You can change your browser settings at any time.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Eye className="text-amber-600" />
                <h3 className="font-semibold text-slate-900">Your Choices</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                You can request access to your data, ask for correction or deletion, and object to or limit processing where permitted by law.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Lock className="text-amber-600" />
                <h3 className="font-semibold text-slate-900">Security</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                We maintain reasonable safeguards and review our practices regularly to protect personal data in accordance with applicable law.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
