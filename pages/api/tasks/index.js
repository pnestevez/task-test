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

  try {
    if (req.method === 'GET') {
      const tasks = await db.collection('tasks').where('author', '==', user.email).get();
      const tasksData = tasks.docs.map(task => ({
        id: task.id,
        ...task.data(),
      }));
      return res.status(200).json(tasksData);
    } if (req.method === 'POST') {
      await db.collection('tasks').add({
        ...req.body,
        created: Date.now(),
      });
      return res.status(201).json({ message: 'Created' });
    }
    res.status(405).json({ message: 'Method Not Allowed' });
  } catch (e) {
    res.status(400).json(e);
  }
  return null;
};
