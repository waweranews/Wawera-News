import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import News from '../components/News';
import VideoShowcase from '../components/VideoShowcase';
import Clients from '../components/Clients';
import FinalCTA from '../components/FinalCTA';
import Newsletter from '../components/Newsletter';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import Chatbot from '../components/Chatbot';
import { db, collection, doc, query, orderBy, onSnapshot } from '../firebase';
import { INITIAL_CONTENT, INITIAL_PROJECTS } from '../constants';
import { SiteContent, Project, NewsItem } from '../types';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for content
    const unsubContent = onSnapshot(doc(db, 'settings', 'content'), (doc) => {
      if (doc.exists()) {
        setContent(doc.data() as SiteContent);
      }
    });

    // Real-time listener for projects
    const qProjects = query(collection(db, 'projects'), orderBy('order', 'asc'));
    const unsubProjects = onSnapshot(qProjects, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      if (projectsData.length > 0) {
        setProjects(projectsData);
      }
    });

    // Real-time listener for news
    const qNews = query(collection(db, 'news'), orderBy('date', 'desc'));
    const unsubNews = onSnapshot(qNews, (snapshot) => {
      const newsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      setNews(newsData);
      setLoading(false);
    });

    return () => {
      unsubContent();
      unsubProjects();
      unsubNews();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero content={content} />
        <About content={content} />
        <Services />
        <VideoShowcase />
        <News news={news} />
        <Clients />
        <Portfolio projects={projects} />
        <FinalCTA />
        <Newsletter />
        <Contact content={content} />
      </main>
      <Footer content={content} />
      <WhatsAppButton content={content} />
      <Chatbot content={content} projects={projects} />
    </div>
  );
}
