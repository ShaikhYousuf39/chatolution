import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  
  switch (req.method) {
    case 'GET':
      const posts = await db
        .collection('posts') // Replace 'posts' with your collection name
        .find({})
        .toArray();
      res.status(200).json(posts);
      break;
    case 'POST':
      const newPost = req.body;
      const result = await db
        .collection('posts') // Replace 'posts' with your collection name
        .insertOne(newPost);
      res.status(201).json(result);
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}
