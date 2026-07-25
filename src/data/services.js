import { FileText, Home, Shield, TrendingUp, Users } from 'lucide-react';

export const services = [
  {
    icon: Home,
    title: 'Buyer Advisory',
    id: 'buyer-advisory',
    description: 'A discreet, white-glove advisory experience for high-net-worth buyers seeking exceptional residences, strategic acquisitions, and tailored market insight.',
    features: [
      'Private consultation aligned to lifestyle, investment, and residency goals',
      'Discreet access to off-market and exclusive opportunities',
      'Strategic negotiation and transaction guidance',
      'Cross-border due diligence and ownership support',
      'White-glove coordination from search to handover'
    ],
    process: [
      'Private consultation and mandate definition',
      'Curated property search and shortlisting',
      'In-person or virtual viewings and due diligence',
      'Negotiation, offer strategy, and contract support',
      'Cross-functional coordination with legal and financial advisors',
      'Closing and post-purchase concierge'
    ],
    benefits: [
      'A tailored search experience shaped around your priorities',
      'Access to rare and off-market listings',
      'Confident negotiation with premium market intelligence',
      'Seamless execution with high-touch support',
      'A trusted advisor for every milestone of the purchase'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Seller Representation',
    id: 'seller-representation',
    description: 'An exclusive listing service designed to position exceptional homes with precision, discretion, and a highly curated buyer audience.',
    features: [
      'Strategic property valuation and pricing guidance',
      'Discreet marketing tailored to luxury buyers and private investors',
      'Access to our private network of qualified purchasers',
      'Elevated presentation, storytelling, and lifestyle positioning',
      'Confidential sales execution from launch to closing'
    ],
    process: [
      'Private consultation and property positioning',
      'Valuation, market analysis, and launch strategy',
      'Curated marketing, staging, and content development',
      'Targeted outreach to our exclusive buyer network',
      'Buyer qualification, negotiations, and deal management',
      'Discreet closing support and transition planning'
    ],
    benefits: [
      'Optimized market positioning for stronger perceived value',
      'Confidential exposure to serious, well-matched buyers',
      'A refined sales approach that protects privacy and timing',
      'Stronger negotiation leverage with premium market insight',
      'A seamless, high-touch experience from launch to close'
    ]
  },
  {
    icon: Shield,
    title: 'Property Management',
    id: 'property-management',
    description: 'Concierge-level asset care that keeps luxury residences performing, protected, and positioned for optimal yield.',
    features: [
      'Selective tenant sourcing and qualification',
      'White-glove maintenance and on-site coordination',
      'Proactive rental yield optimization',
      'Tenant care and relationship management',
      'Transparent financial reporting and portfolio oversight'
    ],
    process: [
      'Property evaluation and premium positioning',
      'Targeted tenant search and qualification',
      'Tailored lease structuring and onboarding',
      'Ongoing preventive maintenance and service delivery',
      'Performance review and yield enhancement'
    ],
    benefits: [
      'A worry-free ownership experience with trusted local teams',
      'Stronger occupancy and more reliable cash flow',
      'Maintained property condition to preserve value',
      'Privacy-focused tenant relations and tenant care',
      'Actionable insight to maximize long-term returns'
    ]
  },
  {
    icon: Users,
    title: 'Relocation Support',
    id: 'relocation',
    description: 'A premium relocation service for high-net-worth individuals seeking seamless transition, privacy, and local expertise.',
    features: [
      'Visa guidance and residency advisory',
      'Neighborhood matching based on lifestyle preferences',
      'Settling-in support for home, transport and household services',
      'School and healthcare advisory for global families',
      'Concierge coordination throughout the move'
    ],
    process: [
      'Personal relocation consultation and requirements review',
      'Tailored neighborhood and lifestyle matching',
      'Visa and regulatory guidance with trusted partners',
      'Private introductions to schools, clinics and service providers',
      'Settlement planning and ongoing local support'
    ],
    benefits: [
      'A discreet, well-organized transition to your new city',
      'Confidence in visa and residency matters',
      'A tailored neighborhood fit for family and lifestyle',
      'Access to trusted education and healthcare advisors',
      'Reduced relocation stress with dedicated concierge support'
    ]
  },
  {
    icon: FileText,
    title: 'Financing & Legal Guidance',
    id: 'financing',
    description: 'Specialised advisory for foreign buyers, offering mortgage strategy, legal due diligence, ownership structuring, and compliance confidence.',
    features: [
      'Mortgage advisory for cross-border buyers',
      'Legal due diligence and title validation',
      'Ownership structuring for residency and investment',
      'Regulatory compliance support for foreign investors',
      'Tax and financial planning guidance'
    ],
    process: [
      'We assess financing capacity and eligibility',
      'Identify mortgage solutions for international buyers',
      'Conduct legal due diligence and risk review',
      'Design ownership structures aligned to goals',
      'Coordinate compliance with local regulations'
    ],
    benefits: [
      'Access to mortgage options tailored for foreigners',
      'Reduced legal risk through meticulous due diligence',
      'Ownership plans that support residency and investment objectives',
      'Confidence that regulatory and reporting standards are met',
      'A seamless advisory experience from offer to closing'
    ]
  }
];

export const getServiceById = (id) => services.find((service) => service.id === id);
