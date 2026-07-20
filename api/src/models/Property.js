import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    purpose: { type: String, enum: ['buy', 'rent', 'off-plan'], default: 'buy' },
    category: { type: String, enum: ['residential', 'commercial'], default: 'residential' },
    subType: { type: String },
    status: { type: String, enum: ['Available', 'Under Construction', 'Sold', 'Rented'], default: 'Available' },
    verified: { type: Boolean, default: false },
    readyToMove: { type: Boolean, default: false },
    offPlan: { type: Boolean, default: false },
    paymentPlan: { type: Boolean, default: false },
    brandNew: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },

    price: { type: Number, required: true },
    currency: { type: String, default: 'AED' },

    address: { type: String },
    city: { type: String },
    country: { type: String },

    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    sqft: { type: Number, default: 0 },

    images: [{ type: String }],

    description: { type: String },

    information: {
      type: { type: String },
      purposeLabel: { type: String },
      furnishing: { type: String },
      referenceNo: { type: String },
      completion: { type: String },
      averageRent: { type: String },
      addedOn: { type: Date },
    },

    features: {
      general: [{ type: String }],
      kitchenBathrooms: [{ type: String }],
      viewOptions: [{ type: String }],
      securityMaintenance: [{ type: String }],
      leisureLifestyle: [{ type: String }],
      convenience: [{ type: String }],
      communityFacilities: [{ type: String }]
    },

    lifestyle: [{ type: String }],
    developer: { type: String },

    analytics: {
      views: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      inquiries: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Property', PropertySchema);
