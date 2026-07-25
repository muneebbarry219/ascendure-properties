import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calculator, 
  Download, 
  FileText, 
  Shield, 
  Globe,
  DollarSign,
  Percent,
  Calendar,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Users,
  Home
} from 'lucide-react';

const InvestorsHub = () => {
  const [calculatorData, setCalculatorData] = useState({
    propertyValue: 5000000,
    downPayment: 1000000,
    loanTerm: 25,
    interestRate: 3.5,
    rentalIncome: 15000,
    expenses: 3000
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '', consent: false });
  const [leadStatus, setLeadStatus] = useState({ submitting: false, error: '' });

  const [roiData, setRoiData] = useState({
    propertyValue: 5000000,
    expectedAppreciation: 5,
    rentalYield: 6,
    holdingPeriod: 5
  });

  const handleCalculatorChange = (field, value) => {
    setCalculatorData({
      ...calculatorData,
      [field]: parseFloat(value) || 0
    });
  };

  const handleRoiChange = (field, value) => {
    setRoiData({
      ...roiData,
      [field]: parseFloat(value) || 0
    });
  };

  const calculateMortgage = () => {
    const principal = calculatorData.propertyValue - calculatorData.downPayment;
    const monthlyRate = calculatorData.interestRate / 100 / 12;
    const numPayments = calculatorData.loanTerm * 12;
    
    if (monthlyRate === 0) {
      return principal / numPayments;
    }
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                         (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return monthlyPayment;
  };

  const calculateROI = () => {
    const monthlyRental = calculatorData.rentalIncome;
    const monthlyExpenses = calculatorData.expenses;
    const monthlyMortgage = calculateMortgage();
    const netMonthlyIncome = monthlyRental - monthlyExpenses - monthlyMortgage;
    const annualNetIncome = netMonthlyIncome * 12;
    const roi = (annualNetIncome / calculatorData.downPayment) * 100;
    
    return {
      monthlyPayment: monthlyMortgage,
      netMonthlyIncome,
      annualNetIncome,
      roi
    };
  };

  const calculateInvestmentROI = () => {
    const currentValue = roiData.propertyValue;
    const futureValue = currentValue * Math.pow(1 + roiData.expectedAppreciation / 100, roiData.holdingPeriod);
    const totalRentalIncome = (roiData.propertyValue * roiData.rentalYield / 100) * roiData.holdingPeriod;
    const totalReturn = (futureValue - currentValue) + totalRentalIncome;
    const roi = (totalReturn / roiData.propertyValue) * 100;
    
    return {
      futureValue,
      totalRentalIncome,
      totalReturn,
      roi
    };
  };

  const mortgageResults = calculateMortgage();
  const roiResults = calculateROI();
  const investmentResults = calculateInvestmentROI();

  const marketReports = [
    {
      title: 'Q2 Luxury Market Report',
      description: 'Prime residential demand, product signals, investor watchpoints, and the outlook for Saudi luxury property.',
      date: 'Q2 2026',
      pages: '6',
      file: '/reports/q2-luxury-market-report-2026.pdf'
    },
    {
      title: 'KSA Investment Overview',
      description: 'A concise guide to opportunity drivers, foreign ownership, financing, Premium Residency, and acquisition.',
      date: '2026 Edition',
      pages: '6',
      file: '/reports/ksa-investment-overview-2026.pdf'
    },
    {
      title: 'Neighbourhood Guides',
      description: 'A practical comparison of Riyadh and Jeddah locations for lifestyle-led buyers and investors.',
      date: '2026 Edition',
      pages: '6',
      file: '/reports/ksa-neighbourhood-guides-2026.pdf'
    }
  ];

  const openReportGate = (report) => {
    setSelectedReport(report);
    setLeadStatus({ submitting: false, error: '' });
  };

  const submitReportLead = async (event) => {
    event.preventDefault();
    if (!leadData.consent) {
      setLeadStatus({ submitting: false, error: 'Please agree to the privacy notice to continue.' });
      return;
    }
    setLeadStatus({ submitting: true, error: '' });
    try {
      const response = await fetch('/api/inquiries/report-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leadData, report: selectedReport.title })
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || 'We could not process your request.');
      }
      const link = document.createElement('a');
      link.href = selectedReport.file;
      link.download = selectedReport.file.split('/').pop();
      document.body.appendChild(link);
      link.click();
      link.remove();
      setSelectedReport(null);
      setLeadData({ name: '', email: '', phone: '', consent: false });
    } catch (error) {
      setLeadStatus({ submitting: false, error: `${error.message} Please ensure the site API is running.` });
    }
  };

  const residencyPrograms = [
    {
      country: 'Saudi Arabia',
      program: 'Real Estate Owner Residency',
      investment: 'SAR 4,000,000+',
      benefits: [
        'Residency linked to qualifying ownership',
        'Eligible family residency',
        'Private-sector work flexibility',
        'Business activity under investment law'
      ],
      requirements: [
        'Qualifying residential property',
        'No mortgage or property finance',
        'Financial, medical, and record checks',
        'Current programme conditions apply'
      ]
    },
    {
      country: 'UAE',
      program: 'Golden Visa',
      investment: '2,000,000 AED',
      benefits: [
        '10-year renewable visa',
        'Property ownership',
        'Business opportunities',
        'Family sponsorship'
      ],
      requirements: [
        'Property investment',
        'Valid passport',
        'Health insurance',
        'Financial stability'
      ]
    },
    {
      country: 'Portugal',
      program: 'Golden Visa',
      investment: '500,000 EUR',
      benefits: [
        '5-year residency',
        'EU travel rights',
        'Property ownership',
        'Path to citizenship'
      ],
      requirements: [
        'Property investment',
        'Valid passport',
        'Clean record',
        'Financial proof'
      ]
    }
  ];

  const financeProfiles = [
    {
      title: 'Residents',
      subtitle: 'Saudi nationals, GCC nationals, and eligible Iqama holders',
      icon: Users,
      points: [
        'Broader access to SAMA-licensed banks and real estate finance companies',
        'Salary transfer, employment tenure, age, credit history, and debt burden commonly shape approval',
        'Sharia-compliant structures may include Murabaha or Ijarah, depending on the lender',
        'Down payment, term, pricing, and eligible property type vary by applicant and institution'
      ]
    },
    {
      title: 'Non-residents',
      subtitle: 'Individuals living outside Saudi Arabia',
      icon: Globe,
      points: [
        'Foreign ownership eligibility and financing eligibility are separate assessments',
        'Fewer lenders may participate, with enhanced identity, income, source-of-funds, and country-risk checks',
        'A larger equity contribution, additional security, or a Saudi banking relationship may be requested',
        'Some purchases may need to proceed in cash if suitable regulated financing is unavailable'
      ]
    }
  ];

  const ownershipFramework = [
    'The Non-Saudi Real Estate Ownership Law has applied since 22 January 2026.',
    'Permitted rights, property types, percentages, and duration can depend on the designated geographical zone.',
    'Residents apply through Saudi Properties using an Iqama; non-residents first obtain a digital identity through a Saudi embassy or representation.',
    'Ownership becomes legally effective upon registration in the Real Estate Registry.',
    'Makkah and Madinah are subject to special controls; ownership there is restricted to Saudi companies and Muslim individuals within the applicable framework.',
    'Premium Residency and GCC ownership regimes can provide distinct rights and must be assessed separately.'
  ];

  const dueDiligence = [
    ['Buyer eligibility', 'Confirm nationality, residency, ownership route, permitted zone, and any required approval before paying a deposit.'],
    ['Title and seller', 'Verify the registered owner, title deed, boundaries, rights, restrictions, obligations, mortgages, liens, and powers of attorney.'],
    ['Property compliance', 'Check land use, building permits, completion certificate, municipal compliance, utilities, access, and any violations.'],
    ['Physical condition', 'Commission an independent survey and technical inspection; reconcile actual area and boundaries with registered data.'],
    ['Off-plan safeguards', 'Verify the project, developer, escrow arrangements, licence, delivery schedule, specifications, and buyer remedies.'],
    ['Commercial review', 'Test valuation, comparable sales, rental assumptions, service charges, vacancy, insurance, and total acquisition costs.'],
    ['Contract and funding', 'Make the contract conditional where appropriate; confirm financing, source of funds, fees, tax treatment, and closing mechanics.'],
    ['Registration and handover', 'Register the transfer, retain payment evidence, record meter readings, obtain keys and warranties, and update all service accounts.']
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Investors Hub"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Investors Hub
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Your comprehensive resource for real estate investment analysis, 
              financing options, and market insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Investing
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-all duration-300">
                Download Reports
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Investment Calculators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analyze potential returns and financing options for your real estate investments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mortgage Calculator */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Mortgage Calculator</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Value (SAR)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.propertyValue}
                    onChange={(e) => handleCalculatorChange('propertyValue', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment (SAR)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.downPayment}
                    onChange={(e) => handleCalculatorChange('downPayment', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Term (Years)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.loanTerm}
                    onChange={(e) => handleCalculatorChange('loanTerm', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={calculatorData.interestRate}
                    onChange={(e) => handleCalculatorChange('interestRate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Results</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment:</span>
                    <span className="font-semibold">{mortgageResults.toLocaleString()} SAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest:</span>
                    <span className="font-semibold">
                      {((mortgageResults * calculatorData.loanTerm * 12) - (calculatorData.propertyValue - calculatorData.downPayment)).toLocaleString()} SAR
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ROI Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">ROI Calculator</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Rental Income (SAR)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.rentalIncome}
                    onChange={(e) => handleCalculatorChange('rentalIncome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Expenses (SAR)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.expenses}
                    onChange={(e) => handleCalculatorChange('expenses', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-4">ROI Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Monthly Income:</span>
                    <span className="font-semibold">{roiResults.netMonthlyIncome.toLocaleString()} SAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Net Income:</span>
                    <span className="font-semibold">{roiResults.annualNetIncome.toLocaleString()} SAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ROI:</span>
                    <span className="font-semibold text-green-600">{roiResults.roi.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Reports */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Market Reports
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive market analysis and investment insights from our expert team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {marketReports.map((report, index) => (
              <motion.div
                key={report.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <FileText className="w-8 h-8 text-yellow-500" />
                  <span className="text-sm text-gray-500">{report.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{report.title}</h3>
                <p className="text-gray-600 mb-6">{report.description}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-500">{report.pages} pages</span>
                  <span className="text-sm font-medium text-yellow-700">PDF brief</span>
                </div>
                
                <button onClick={() => openReportGate(report)} className="w-full flex items-center justify-center space-x-2 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200">
                  <Download className="w-5 h-5" />
                  <span>Get the Brief</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Residency Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Residency by Investment
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore residency opportunities through real estate investment in key markets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {residencyPrograms.map((program, index) => (
              <motion.div
                key={program.country}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{program.country}</h3>
                  <p className="text-yellow-600 font-medium">{program.program}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{program.investment}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                    <ul className="space-y-2">
                      {program.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {program.requirements.map((requirement, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KSA Investor Essentials */}
      <section className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">KSA investor essentials</p>
            <h2 className="text-4xl font-display font-bold md:text-5xl">
              Finance and ownership with clarity
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-xl leading-8 text-slate-300">
              Financing is lender-specific, while the right to buy is determined by Saudi law. Treat them as two connected but separate workstreams.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {financeProfiles.map((profile, index) => (
              <motion.article key={profile.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="rounded-2xl border border-white/10 bg-white/5 p-8">
                <profile.icon className="h-10 w-10 text-yellow-400" />
                <h3 className="mt-5 text-3xl font-bold">{profile.title}</h3>
                <p className="mt-2 text-slate-400">{profile.subtitle}</p>
                <ul className="mt-7 space-y-4">
                  {profile.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-7 text-slate-200"><CheckCircle className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />{point}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-6 text-sm leading-7 text-yellow-50">
            <strong>Responsible-finance note:</strong> SAMA-supervised lenders must assess affordability, verified income, existing obligations, and suitability. Calculator results are illustrations only and are not a credit offer, APR quotation, or approval.
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-yellow-600">Legal framework</p>
            <h2 className="text-4xl font-bold text-slate-900">Owning property in Saudi Arabia</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">The updated framework now accommodates resident and non-resident foreign individuals as well as qualifying entities, subject to location and category-specific controls.</p>
            <div className="mt-8 space-y-4">
              {ownershipFramework.map((item) => (
                <div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-4">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-yellow-600" />
                  <p className="leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="self-start rounded-3xl bg-slate-100 p-8 lg:sticky lg:top-28">
            <FileText className="h-10 w-10 text-slate-900" />
            <h3 className="mt-5 text-2xl font-bold text-slate-900">Before you structure the deal</h3>
            <p className="mt-4 leading-7 text-slate-600">Confirm your ownership category and the latest geographical-zone controls on the official portal. A signed sale agreement does not cure an ineligible acquisition.</p>
            <div className="mt-7 space-y-3">
              <a href="https://saudiproperties.rega.gov.sa" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg bg-white px-5 py-4 font-semibold text-slate-800 shadow-sm hover:text-yellow-600">Saudi Properties portal <ArrowRight className="h-5 w-5" /></a>
              <a href="https://rega.gov.sa/en/regulations-and-by-laws/rules/law-of-real-estate-ownership-and-investment-by-non-saudis/" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg bg-white px-5 py-4 font-semibold text-slate-800 shadow-sm hover:text-yellow-600">Read the official law <ArrowRight className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-yellow-600">Due diligence</p>
            <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">A checklist before you commit</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">Use this as a briefing tool for your licensed broker, lawyer, surveyor, lender, and tax adviser—not as a substitute for their review.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {dueDiligence.map(([title, copy], index) => (
              <motion.article key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 2) * 0.06 }} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100 font-bold text-yellow-700">{index + 1}</div>
                <div><h3 className="text-lg font-bold text-slate-900">{title}</h3><p className="mt-2 leading-7 text-slate-600">{copy}</p></div>
              </motion.article>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl bg-yellow-500 p-8 md:flex-row">
            <div><h3 className="text-2xl font-bold text-slate-950">Need a coordinated acquisition review?</h3><p className="mt-2 text-slate-800">We can help organise the property, finance, and professional-adviser workstreams.</p></div>
            <Link to="/contact" className="inline-flex shrink-0 items-center rounded-lg bg-slate-950 px-7 py-4 font-bold text-white hover:bg-slate-800">Speak with an advisor <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </div>
          <p className="mt-8 text-sm leading-6 text-slate-500"><strong>Disclaimer:</strong> General information only; not legal, finance, tax, or investment advice. Lending appetite, ownership zones, fees, and regulatory requirements may change. Verify current requirements with SAMA-licensed lenders, REGA, and qualified advisers. Reviewed July 2026.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Ready to Start Investing?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Let our investment experts guide you through the process of building 
              your real estate portfolio with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-lg transition-all duration-300">
                View Investment Properties
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="report-gate-title">
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="bg-slate-950 px-8 py-7 text-white">
              <button onClick={() => setSelectedReport(null)} className="absolute right-5 top-4 text-3xl leading-none text-slate-400 hover:text-white" aria-label="Close">×</button>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">Complimentary PDF</p>
              <h2 id="report-gate-title" className="mt-2 pr-8 text-3xl font-bold">{selectedReport.title}</h2>
              <p className="mt-3 text-slate-300">Tell us where to send future market intelligence, then your download will begin.</p>
            </div>
            <form onSubmit={submitReportLead} className="space-y-5 p-8">
              <div>
                <label htmlFor="lead-name" className="mb-2 block text-sm font-semibold text-slate-700">Full name</label>
                <input id="lead-name" required value={leadData.name} onChange={(e) => setLeadData({ ...leadData, name: e.target.value })} className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200" />
              </div>
              <div>
                <label htmlFor="lead-email" className="mb-2 block text-sm font-semibold text-slate-700">Email address</label>
                <input id="lead-email" type="email" required value={leadData.email} onChange={(e) => setLeadData({ ...leadData, email: e.target.value })} className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200" />
              </div>
              <div>
                <label htmlFor="lead-phone" className="mb-2 block text-sm font-semibold text-slate-700">Phone <span className="font-normal text-slate-400">(optional)</span></label>
                <input id="lead-phone" type="tel" value={leadData.phone} onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })} className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200" />
              </div>
              <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                <input type="checkbox" checked={leadData.consent} onChange={(e) => setLeadData({ ...leadData, consent: e.target.checked })} className="mt-1 h-4 w-4 accent-yellow-500" />
                <span>I agree to Ascendure’s <Link to="/privacy" className="font-semibold text-slate-900 underline">Privacy Policy</Link> and consent to receiving relevant property and market updates. I can unsubscribe at any time.</span>
              </label>
              {leadStatus.error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{leadStatus.error}</p>}
              <button disabled={leadStatus.submitting} className="flex w-full items-center justify-center rounded-lg bg-yellow-500 px-6 py-4 font-bold text-slate-950 transition hover:bg-yellow-400 disabled:cursor-wait disabled:opacity-60">
                {leadStatus.submitting ? 'Preparing download…' : 'Submit & download PDF'} <Download className="ml-2 h-5 w-5" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InvestorsHub;






