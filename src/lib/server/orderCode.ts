import { randomInt } from 'crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid typos

/** Transfer content the customer types in their bank app, e.g. "VIBETALKK7Q2MX". No spaces: banks often mangle them. */
export function generateOrderCode(): string {
  let suffix = '';
  for (let i = 0; i < 6; i++) suffix += ALPHABET[randomInt(ALPHABET.length)];
  return `VIBETALK${suffix}`;
}
