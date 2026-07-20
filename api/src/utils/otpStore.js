import crypto from 'crypto';

const otpRequests = new Map();
const verifiedTokens = new Map();
const OTP_TTL_MS = 5 * 60 * 1000;
const VERIFIED_TOKEN_TTL_MS = 10 * 60 * 1000;

const normalizePhone = (phone) => String(phone || '').replace(/[^\d+]/g, '');

export const createOtpRequest = (phone) => {
  const normalizedPhone = normalizePhone(phone);
  const verificationId = crypto.randomUUID();
  const otp = process.env.NODE_ENV === 'production'
    ? String(crypto.randomInt(100000, 999999))
    : (process.env.OTP_DEV_CODE || String(crypto.randomInt(100000, 999999)));

  otpRequests.set(verificationId, {
    phone: normalizedPhone,
    otp,
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0
  });

  return {
    devOtp: process.env.NODE_ENV === 'production' ? undefined : otp,
    expiresInSeconds: OTP_TTL_MS / 1000,
    normalizedPhone,
    verificationId
  };
};

export const verifyOtpRequest = ({ verificationId, phone, otp }) => {
  const request = otpRequests.get(verificationId);
  const normalizedPhone = normalizePhone(phone);

  if (!request || request.expiresAt < Date.now()) {
    otpRequests.delete(verificationId);
    return { ok: false, error: 'OTP expired. Please request a new code.' };
  }

  if (request.phone !== normalizedPhone) {
    return { ok: false, error: 'Phone number does not match this OTP request.' };
  }

  request.attempts += 1;
  if (request.attempts > 5) {
    otpRequests.delete(verificationId);
    return { ok: false, error: 'Too many incorrect attempts. Please request a new code.' };
  }

  if (String(request.otp) !== String(otp).trim()) {
    return { ok: false, error: 'Incorrect OTP. Please try again.' };
  }

  otpRequests.delete(verificationId);

  const otpToken = crypto.randomUUID();
  verifiedTokens.set(otpToken, {
    phone: normalizedPhone,
    expiresAt: Date.now() + VERIFIED_TOKEN_TTL_MS
  });

  return { ok: true, otpToken };
};

export const consumeVerifiedOtpToken = ({ otpToken, phone }) => {
  const token = verifiedTokens.get(otpToken);
  const normalizedPhone = normalizePhone(phone);

  if (!token || token.expiresAt < Date.now()) {
    verifiedTokens.delete(otpToken);
    return false;
  }

  if (token.phone !== normalizedPhone) {
    return false;
  }

  verifiedTokens.delete(otpToken);
  return true;
};
