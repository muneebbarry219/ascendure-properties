import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageCircle,
  Calendar
} from 'lucide-react';
import { resolveAssetUrl } from '../utils/assets';

const Contact = () => {
  const emptyForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle');
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [isOtpOpen, setIsOtpOpen] = useState(false);

  const getErrorMessage = async (res, fallback) => {
    try {
      const data = await res.json();
      return data.error || fallback;
    } catch {
      return fallback;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');
    setFormStatus('sending-otp');

    try {
      const res = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      });

      if (!res.ok) {
        throw new Error(await getErrorMessage(res, 'Failed to send OTP. Please try again.'));
      }

      const data = await res.json();
      setVerificationId(data.verificationId);
      setDevOtp(data.devOtp || '');
      setOtpCode('');
      setIsOtpOpen(true);
      setFormStatus('awaiting-otp');
    } catch (error) {
      setOtpError(error.message || 'Failed to send OTP. Please try again.');
      setFormStatus('idle');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpError('');
    setFormStatus('verifying-otp');

    try {
      const verifyRes = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verificationId,
          phone: formData.phone,
          otp: otpCode
        })
      });

      if (!verifyRes.ok) {
        throw new Error(await getErrorMessage(verifyRes, 'Incorrect OTP. Please try again.'));
      }

      const verifyData = await verifyRes.json();
      setFormStatus('submitting');

      const submitRes = await fetch('/api/inquiries/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          otpToken: verifyData.otpToken
        })
      });

      if (!submitRes.ok) {
        throw new Error(await getErrorMessage(submitRes, 'OTP verified, but the form could not be submitted.'));
      }

      setFormStatus('submitted');
      setFormData(emptyForm);
      setOtpCode('');
      setVerificationId('');
      setDevOtp('');

      setTimeout(() => {
        setIsOtpOpen(false);
        setFormStatus('idle');
      }, 2500);
    } catch (error) {
      setOtpError(error.message || 'Verification failed. Please try again.');
      setFormStatus('awaiting-otp');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const offices = [
    {
      city: "Dubai",
      address: "Burj Khalifa, Downtown Dubai, UAE",
      phone: "+971 4 123 4567",
      email: "dubai@ascendure.com",
      hours: "Sun-Thu: 9AM-6PM"
    },
    {
      city: "Riyadh",
      address: "King Fahd Road, Riyadh, KSA",
      phone: "+966 11 234 5678",
      email: "riyadh@ascendure.com",
      hours: "Sun-Thu: 9AM-6PM"
    },
    {
      city: "Madrid",
      address: "Salamanca District, Madrid, Spain",
      phone: "+34 91 234 5678",
      email: "madrid@ascendure.com",
      hours: "Mon-Fri: 9AM-6PM"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A2540' }}>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={resolveAssetUrl('/assets/Hero Section Image.png')}
            alt="Dubai Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              <span className="block">Get In</span>
              <span className="block text-yellow-400">Touch</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Ready to find your dream property? Our expert team is here to guide you through every step of your real estate journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
            >
              <h2 className="text-3xl font-display font-bold text-white mb-6">
                Send us a Message
              </h2>
              <p className="text-white/80 mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    >
                      <option value="">Select a subject</option>
                      <option value="property-inquiry">Property Inquiry</option>
                      <option value="investment-consultation">Investment Consultation</option>
                      <option value="residency-program">Residency Program</option>
                      <option value="general-inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    placeholder="Tell us about your requirements..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending-otp'}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-lg text-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {formStatus === 'sending-otp' ? 'Sending OTP...' : 'Send OTP'}
                </button>

                {otpError && !isOtpOpen && (
                  <p className="text-sm font-medium text-red-200">{otpError}</p>
                )}
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-6">
                  Contact Information
                </h2>
                <p className="text-white/80 mb-8">
                  Reach out to us through any of our global offices or contact methods.
                </p>
              </div>

              {/* Quick Contact Options */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Call Us</h3>
                      <p className="text-white/80 text-sm">Speak directly with our team</p>
                    </div>
                  </div>
                  <p className="text-white/90">+971 4 123 4567</p>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Email Us</h3>
                      <p className="text-white/80 text-sm">Send us a detailed message</p>
                    </div>
                  </div>
                  <p className="text-white/90">info@ascendure.com</p>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Live Chat</h3>
                      <p className="text-white/80 text-sm">Chat with us instantly</p>
                    </div>
                  </div>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-lg text-sm transition-all duration-300">
                    Start Chat
                  </button>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Book Consultation</h3>
                      <p className="text-white/80 text-sm">Schedule a private meeting</p>
                    </div>
                  </div>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-lg text-sm transition-all duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Offices Section */}
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6" style={{ color: '#0A2540' }}>
              <span className="text-gray-900">Our Global</span>
              <span className="text-yellow-400 ml-4">Offices</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visit us at any of our strategically located offices around the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{office.city}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                    <p className="text-gray-600">{office.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <p className="text-gray-600">{office.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <p className="text-gray-600">{office.email}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <p className="text-gray-600">{office.hours}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {isOtpOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            {formStatus === 'submitted' ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-2xl font-display font-bold text-gray-900">Message Sent</h3>
                <p className="text-gray-600">Your phone number was verified and your inquiry has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <h3 className="mb-2 text-2xl font-display font-bold text-gray-900">Verify Your Phone</h3>
                <p className="mb-5 text-gray-600">
                  Enter the OTP sent to <span className="font-semibold text-gray-900">{formData.phone}</span>.
                </p>

                {devOtp && (
                  <div className="mb-4 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-900">
                    Development OTP: <span className="font-bold">{devOtp}</span>
                  </div>
                )}

                <label className="mb-2 block text-sm font-semibold text-gray-700">OTP Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  placeholder="Enter 6-digit OTP"
                  required
                />

                {otpError && (
                  <p className="mb-3 text-sm font-medium text-red-600">{otpError}</p>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOtpOpen(false);
                      setFormStatus('idle');
                      setOtpError('');
                    }}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-bold text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formStatus === 'verifying-otp' || formStatus === 'submitting'}
                    className="flex-1 rounded-lg bg-yellow-500 px-4 py-3 font-bold text-black transition-colors hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {formStatus === 'submitting'
                      ? 'Submitting...'
                      : formStatus === 'verifying-otp'
                        ? 'Verifying...'
                        : 'Verify & Submit'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Contact;


