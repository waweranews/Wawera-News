import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc, addDoc, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.GEMINI_API_KEY,
  authDomain: "waweranews-ao.firebaseapp.com",
  projectId: "waweranews-ao",
  storageBucket: "waweranews-ao.appspot.com",
  messagingSenderId: "724921264681",
  appId: "1:724921264681:web:..."
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const handler = async (event, context) => {
  const { httpMethod, path, body } = event;
  const data = JSON.parse(body || '{}');
  
  try {
    if (httpMethod === 'GET') {
      const q = query(collection(db, 'raw_news'), where('status', '==', 'pending'));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      return {
        statusCode: 200,
        body: JSON.stringify(items)
      };
    }
    
    if (httpMethod === 'POST') {
      const { id, action, newsData } = data;
      
      if (action === 'approve') {
        // Move to posts
        const post = {
          ...newsData,
          author: 'Redação',
          status: 'published',
          date: new Date().toISOString()
        };
        
        await addDoc(collection(db, 'news'), post);
        await deleteDoc(doc(db, 'raw_news', id));
        
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'News approved and published' })
        };
      }
      
      if (action === 'reject') {
        await deleteDoc(doc(db, 'raw_news', id));
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'News rejected' })
        };
      }
    }
    
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error in curator-api:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
