import { Magic } from '@magic-sdk/admin';
import jwt from 'jsonwebtoken';
import { setTokenCookie } from '../../lib/cookie';

export default async function login(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  // Exchange the did for user data
  const did = req.headers.authorization.split('Bearer').pop().trim();
  const user = await new Magic(process.env.MAGIC_SECRET_KEY).users.getMetadataByToken(did);

  // Set cookies to persist a user's session
  const token = await jwt.sign({ ...user }, process.env.JWT_SECRET);

  setTokenCookie(res, token);

  return res.status(200).json(user);
}
