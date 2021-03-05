import jwt from 'jsonwebtoken';
import db from '../../../services/db';

export default async (req, res) => {
  // JWT validation
  const Authorization = req.headers.authorization;
  if (!Authorization) return res.status(401).json({ message: 'Unauthorized' });

  const JWTTokenArray = Authorization.split(' ');
  const token = JWTTokenArray[1];

  const user = await jwt.verify(
    token,
    process.env.JWT_SECRET,
  );
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  const { id } = req.query;

  try {
    if (req.method === 'GET') {
      const doc = await db.collection('tasks').doc(id).get();
      if (!doc.exists) {
        return res.status(404).json({ message: 'Not Found' });
      }
      return res.status(200).json(doc.data());
    } if (req.method === 'PUT') {
      await db.collection('tasks').doc(id).update({
        ...req.body,
        updated: new Date().toISOString(),
      });
      return res.status(200).json({ message: 'OK' });
    } if (req.method === 'DELETE') {
      await db.collection('tasks').doc(id).delete();
      return res.status(200).json({ message: 'OK' });
    }
    res.status(405).json({ message: 'Method Not Allowed' });
  } catch (e) {
    res.status(400).json(e);
  }
  return null;
};
