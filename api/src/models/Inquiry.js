import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema(
  {
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    report: { type: String },
    preferredContact: { type: String, enum: ['phone', 'email', 'whatsapp'], default: 'phone' },
    message: { type: String },
    otpVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Inquiry', InquirySchema);
