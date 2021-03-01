// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import db from '@/lib/firebase-admin'

//https://firebase.google.com/docs/firestore/query-data/get-data#node.js
export default async (_, res) => {
  const snapshot = await db.collection('sites').get();
  const sites = [];

  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  // if (!getDoc.exists) {
  //   console.log('No such document!');
  // } else {
  //   console.log('Document data:', getDoc.data());
  // }
  res.status(200).json({ sites }) 
};
