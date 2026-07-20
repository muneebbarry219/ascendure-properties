import React, { useState } from 'react';
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
      title: 'Saudi Real Estate Market Report 2024',
      description: 'Comprehensive analysis of the Saudi real estate market including trends, opportunities, and investment insights.',
      date: 'January 2024',
      pages: '45',
      downloadCount: '1,234'
    },
    {
      title: 'UAE Property Investment Guide',
      description: 'Detailed guide to investing in UAE real estate with focus on Dubai and Abu Dhabi markets.',
      date: 'December 2023',
      pages: '38',
      downloadCount: '987'
    },
    {
      title: 'European Real Estate Outlook',
      description: 'Analysis of European property markets with focus on London, Paris, and emerging opportunities.',
      date: 'November 2023',
      pages: '52',
      downloadCount: '756'
    }
  ];

  const residencyPrograms = [
    {
      country: 'Saudi Arabia',
      program: 'Premium Residency',
      investment: '800,000 SAR',
      benefits: [
        '10-year renewable residency',
        'Property ownership rights',
        'Business establishment',
        'Family sponsorship'
      ],
      requirements: [
        'Clean criminal record',
        'Valid passport',
        'Investment proof',
        'Health insurance'
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

  const financingOptions = [
    {
      bank: 'Saudi National Bank',
      rate: '3.25%',
      term: '25 years',
      maxAmount: '5,000,000 SAR',
      features: ['Low interest rates', 'Flexible terms', 'Quick approval']
    },
    {
      bank: 'Al Rajhi Bank',
      rate: '3.50%',
      term: '30 years',
      maxAmount: '8,000,000 SAR',
      features: ['Islamic financing', 'No hidden fees', 'Online application']
    },
    {
      bank: 'Emirates NBD',
      rate: '3.75%',
      term: '25 years',
      maxAmount: '10,000,000 AED',
      features: ['International options', 'Currency flexibility', 'Premium service']
    }
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
                  <span className="text-sm text-gray-500">{report.downloadCount} downloads</span>
                </div>
                
                <button className="w-full flex items-center justify-center space-x-2 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200">
                  <Download className="w-5 h-5" />
                  <span>Download Report</span>
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

      {/* Financing Options */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
              Financing Partners
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access competitive financing options from our trusted banking partners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {financingOptions.map((option, index) => (
              <motion.div
                key={option.bank}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{option.bank}</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate:</span>
                    <span className="font-semibold text-green-600">{option.rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Term:</span>
                    <span className="font-semibold">{option.term}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Max Amount:</span>
                    <span className="font-semibold">{option.maxAmount}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors duration-200">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
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
    </div>
  );
};

export default InvestorsHub;






