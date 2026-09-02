import crypto from 'crypto';

export function generateId(prefix,length = 8) {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomBytes = crypto.randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[randomBytes[i] % chars.length];
  };
  const mid = Math.floor(length / 2);
  return `${prefix}-${result.slice(0, mid)}-${result.slice(mid)}`;
};