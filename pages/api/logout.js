import { Magic } from '@magic-sdk/admin';
import jwt from 'jsonwebtoken';
import { removeTokenCookie, getTokenCookie } from '../../lib/cookie';

async function getLoginSession(req) {
  const Authorization = getTokenCookie(req);
  if (!Authorization) return;

  const JWTTokenArray = Authorization.split(' ');
  const token = JWTTokenArray[1];

  const session = await jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, user) => {
      if (err) return null;
      return user;
    },
  );

  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  // eslint-disable-next-line consistent-return
  return session;
}

export default async function logout(req, res) {
  const magic = await new Magic(process.env.MAGIC_SECRET_KEY);
  const session = await getLoginSession(req);

  if (session) {
    await magic.users.logoutByIssuer(session.issuer);
    removeTokenCookie(res);
  }

  res.status(200).json({ message: 'OK' });
}
