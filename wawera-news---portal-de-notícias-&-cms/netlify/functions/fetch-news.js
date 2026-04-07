import Parser from 'rss-parser';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.GEMINI_API_KEY, // Using this as a proxy for the key if needed, but usually we'd have a separate one
  authDomain: "waweranews-ao.firebaseapp.com",
  projectId: "waweranews-ao",
  storageBucket: "waweranews-ao.appspot.com",
  messagingSenderId: "724921264681",
  appId: "1:724921264681:web:..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const parser = new Parser();

const FEEDS = [
  'https://www.angop.ao/rss/geral/',
  'https://www.bbc.com/portuguese/index.xml',
  'https://noticias.uol.com.br/ultimas-noticias/index.xml'
];

export const handler = async (event, context) => {
  try {
    const results = [];
    
    for (const url of FEEDS) {
      const feed = await parser.parseURL(url);
      
      for (const item of feed.items) {
        // Check if news already exists in raw_news or posts
        const q = query(collection(db, 'raw_news'), where('link', '==', item.link));
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          const rawNews = {
            title: item.title,
            link: item.link,
            excerpt: item.contentSnippet || item.content,
            date: item.pubDate || new Date().toISOString(),
            source: feed.title,
            status: 'pending',
            category: 'Automático',
            image: item.enclosure?.url || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80'
          };
          
          await addDoc(collection(db, 'raw_news'), rawNews);
          results.push(rawNews);
          
          // Check for sensitive keywords
          const sensitiveKeywords = ['guerra', 'atentado', 'crise', 'urgente'];
          const isSensitive = sensitiveKeywords.some(kw => 
            rawNews.title.toLowerCase().includes(kw) || 
            rawNews.excerpt.toLowerCase().includes(kw)
          );
          
          if (isSensitive) {
            // Here we would trigger SendGrid/Twilio
            console.log(`ALERTA: Notícia sensível detectada: ${rawNews.title}`);
          }
        }
      }
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Fetched ${results.length} new items`, items: results })
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
