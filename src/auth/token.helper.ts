// token.helper.ts

import * as jwt from 'jsonwebtoken';

export function generateToken(username: string): string {
  const secretKey = 'your_secret_key'; // Change this to your secret key
  const expiresInOneDay = 60 * 60 * 24; // 24 hours in seconds
  const payload = { username };
  return jwt.sign(payload, secretKey, { expiresIn: expiresInOneDay });
}
