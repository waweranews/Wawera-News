import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  CheckCircle2, 
  Image as ImageIcon, 
  Link as LinkIcon,
  Video,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { INITIAL_PROJECTS, INITIAL_CONTENT } from '../constants';
import { Project, SiteContent, NewsItem } from '../types';
import { 
  db, 
  storage,
  logout as firebaseLogout, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  ref,
  uploadBytes,
  getDownloadURL,
  handleFirestoreError,
  OperationType
} from '../firebase';
import { toast } from 'sonner';
import { Newspaper } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'news' | 'settings'>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [content, setContent] = useState<SiteContent>(INITIAL_CONTENT);
  const [isEditingProject, setIsEditingProject] = useState<Project | null>(null);
  const [isEditingNews, setIsEditingNews] = useState<NewsItem | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Content
      const contentDoc = await getDoc(doc(db, 'settings', 'content'));
      if (contentDoc.exists()) {
        setContent(contentDoc.data() as SiteContent);
      } else {
        // Initialize with default if not exists
        await setDoc(doc(db, 'settings', 'content'), INITIAL_CONTENT);
      }

      // Fetch Projects
      const projectsQuery = query(collection(db, 'projects'), orderBy('order', 'asc'));
      const projectsSnap = await getDocs(projectsQuery);
      const projectsData = projectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      
      if (projectsData.length === 0) {
        // Initialize with default projects if empty
        for (const p of INITIAL_PROJECTS) {
          const { id, ...data } = p;
          await setDoc(doc(db, 'projects', id), data);
        }
        setProjects(INITIAL_PROJECTS);
      } else {
        setProjects(projectsData);
      }
      // Fetch News
      const newsQuery = query(collection(db, 'news'), orderBy('date', 'desc'));
      const newsSnap = await getDocs(newsQuery);
      const newsData = newsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));
      setNews(newsData);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseLogout();
      localStorage.removeItem('isLoggedIn');
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'settings', 'content'), { ...content });
      setShowSuccess(true);
      toast.success('Conteúdo atualizado com sucesso!');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'settings/content');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        setProjects(projects.filter(p => p.id !== id));
        toast.success('Projeto excluído!');
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
      }
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
      try {
        await deleteDoc(doc(db, 'news', id));
        setNews(news.filter(n => n.id !== id));
        toast.success('Notícia excluída!');
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `news/${id}`);
      }
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isEditingProject) return;

    setUploadingVideo(true);
    try {
      const storageRef = ref(storage, `projects/videos/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setIsEditingProject({ ...isEditingProject, videoUrl: downloadURL });
      toast.success('Vídeo carregado com sucesso!');
    } catch (error) {
      console.error('Video upload error:', error);
      toast.error('Erro ao carregar o vídeo. Verifique as permissões do Storage.');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingProject) {
      try {
        const { id, ...data } = isEditingProject;
        if (id === 'new') {
          const newId = Date.now().toString();
          await setDoc(doc(db, 'projects', newId), data);
          setProjects([...projects, { ...isEditingProject, id: newId }]);
        } else {
          await updateDoc(doc(db, 'projects', id), data);
          setProjects(projects.map(p => p.id === id ? isEditingProject : p));
        }
        setIsEditingProject(null);
        setShowSuccess(true);
        toast.success('Projeto guardado!');
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'projects');
      }
    }
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingNews) {
      try {
        const { id, ...data } = isEditingNews;
        if (id === 'new') {
          const newId = Date.now().toString();
          await setDoc(doc(db, 'news', newId), data);
          setNews([{ ...isEditingNews, id: newId }, ...news]);
        } else {
          await updateDoc(doc(db, 'news', id), data);
          setNews(news.map(n => n.id === id ? isEditingNews : n));
        }
        setIsEditingNews(null);
        setShowSuccess(true);
        toast.success('Notícia guardada!');
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, 'news');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col p-6 fixed h-full z-20">
        <div className="flex items-center gap-3 mb-12">
          <img src="https://i.imgur.com/fAZ6NKn.png" alt="Wawera News" className="h-8" referrerPolicy="no-referrer" />
          <span className="font-bold text-lg">Admin</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400'}`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400'}`}
          >
            <Briefcase size={20} />
            Projetos
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'news' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400'}`}
          >
            <Newspaper size={20} />
            Notícias
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'hover:bg-white/10 text-gray-400'}`}
          >
            <Settings size={20} />
            Definições
          </button>
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <ExternalLink size={20} />
            Ver Site
          </a>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all mt-auto"
        >
          <LogOut size={20} />
          Sair
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-primary capitalize">{activeTab}</h1>
            <p className="text-gray-500">Bem-vindo ao seu painel de controlo.</p>
          </div>
          {activeTab === 'projects' && (
            <button
              onClick={() => setIsEditingProject({ id: 'new', name: '', logo: '', work: '', driveLink: '', order: projects.length + 1, category: 'Institucional' })}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Novo Projeto
            </button>
          )}
          {activeTab === 'news' && (
            <button
              onClick={() => setIsEditingNews({ id: 'new', title: '', date: new Date().toISOString().split('T')[0], category: 'Geral', image: '', excerpt: '' })}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Nova Notícia
            </button>
          )}
        </header>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase size={24} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">{projects.length}</h3>
              <p className="text-gray-500">Projetos Ativos</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Newspaper size={24} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">{news.length}</h3>
              <p className="text-gray-500">Notícias Publicadas</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Settings size={24} />
              </div>
              <h3 className="text-4xl font-bold text-primary mb-2">Ativo</h3>
              <p className="text-gray-500 mb-4">Sistema Online</p>
              <button 
                onClick={async () => {
                  if (window.confirm('Deseja sincronizar os projetos com os dados iniciais? Isso adicionará novos projetos mas não excluirá os existentes.')) {
                    try {
                      for (const p of INITIAL_PROJECTS) {
                        const { id, ...data } = p;
                        await setDoc(doc(db, 'projects', id), data, { merge: true });
                      }
                      fetchData();
                      toast.success('Projetos sincronizados!');
                    } catch {
                      toast.error('Erro ao sincronizar.');
                    }
                  }
                }}
                className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
              >
                <Save size={12} />
                Sincronizar Projetos
              </button>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-4 text-sm font-bold text-primary uppercase tracking-wider">Cliente</th>
                  <th className="px-8 py-4 text-sm font-bold text-primary uppercase tracking-wider">Trabalho</th>
                  <th className="px-8 py-4 text-sm font-bold text-primary uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={project.logo} alt={project.name} className="w-10 h-10 object-contain bg-gray-100 rounded-lg p-1" referrerPolicy="no-referrer" />
                        <span className="font-bold text-primary">{project.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-600">{project.work}</td>
                    <td className="px-8 py-6">
                      <div className="flex gap-3">
                        <button
                          onClick={() => setIsEditingProject(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-4 text-sm font-bold text-primary uppercase tracking-wider">Notícia</th>
                  <th className="px-8 py-4 text-sm font-bold text-primary uppercase tracking-wider">Data</th>
                  <th className="px-8 py-4 text-sm font-bold text-primary uppercase tracking-wider">Categoria</th>
                  <th className="px-8 py-4 text-sm font-bold text-primary uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {news.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.title} className="w-12 h-12 object-cover bg-gray-100 rounded-lg" referrerPolicy="no-referrer" />
                        <span className="font-bold text-primary line-clamp-1">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-600">{item.date}</td>
                    <td className="px-8 py-6">
                      <span className="bg-accent/10 text-accent text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-3">
                        <button
                          onClick={() => setIsEditingNews(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteNews(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveContent} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 space-y-8 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Título Hero</label>
                <input
                  type="text"
                  value={content.heroTitle}
                  onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Subtítulo Hero</label>
                <input
                  type="text"
                  value={content.heroSub}
                  onChange={(e) => setContent({ ...content, heroSub: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Texto Hero</label>
              <textarea
                value={content.heroText}
                onChange={(e) => setContent({ ...content, heroText: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Email de Contacto</label>
                <input
                  type="email"
                  value={content.email}
                  onChange={(e) => setContent({ ...content, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Telefone</label>
                <input
                  type="text"
                  value={content.phone}
                  onChange={(e) => setContent({ ...content, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary flex items-center gap-2">
              <Save size={20} />
              Guardar Alterações
            </button>
          </form>
        )}
      </main>

      {/* Project Edit Modal */}
      {isEditingProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={() => setIsEditingProject(null)} />
          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleSaveProject}
            className="relative w-full max-w-2xl bg-white rounded-3xl p-10 shadow-2xl space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-primary">
                {isEditingProject.id === 'new' ? 'Novo Projeto' : 'Editar Projeto'}
              </h3>
              <button type="button" onClick={() => setIsEditingProject(null)} className="text-gray-400 hover:text-primary">
                <X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Nome do Cliente</label>
                <input
                  type="text"
                  value={isEditingProject.name}
                  onChange={(e) => setIsEditingProject({ ...isEditingProject, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Tipo de Trabalho</label>
                <input
                  type="text"
                  value={isEditingProject.work}
                  onChange={(e) => setIsEditingProject({ ...isEditingProject, work: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary flex items-center gap-2">
                <ImageIcon size={16} />
                URL do Logo (Google Drive Link Direto)
              </label>
              <input
                type="text"
                value={isEditingProject.logo}
                onChange={(e) => setIsEditingProject({ ...isEditingProject, logo: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                placeholder="https://drive.google.com/uc?id=..."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary flex items-center gap-2">
                <LinkIcon size={16} />
                Link da Pasta (Drive)
              </label>
              <input
                type="text"
                value={isEditingProject.driveLink}
                onChange={(e) => setIsEditingProject({ ...isEditingProject, driveLink: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-primary flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Video size={16} />
                  Vídeos / Reels (YouTube ou MP4)
                </div>
                <label className="cursor-pointer text-accent hover:text-accent/80 text-xs flex items-center gap-1 bg-accent/10 px-2 py-1 rounded-lg transition-all">
                  {uploadingVideo ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Plus size={12} />
                  )}
                  {uploadingVideo ? 'A carregar...' : 'Upload MP4'}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    disabled={uploadingVideo}
                  />
                </label>
              </label>
              
              <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                {isEditingProject.reels?.map((reel, index) => (
                  <div key={index} className="flex gap-2 items-start bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={reel.title}
                        onChange={(e) => {
                          const newReels = [...(isEditingProject.reels || [])];
                          newReels[index].title = e.target.value;
                          setIsEditingProject({ ...isEditingProject, reels: newReels });
                        }}
                        placeholder="Título do Vídeo"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 outline-none focus:border-accent"
                      />
                      <input
                        type="text"
                        value={reel.url}
                        onChange={(e) => {
                          const newReels = [...(isEditingProject.reels || [])];
                          newReels[index].url = e.target.value;
                          setIsEditingProject({ ...isEditingProject, reels: newReels });
                        }}
                        placeholder="URL (YouTube Embed ou MP4)"
                        className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 outline-none focus:border-accent"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newReels = isEditingProject.reels?.filter((_, i) => i !== index);
                        setIsEditingProject({ ...isEditingProject, reels: newReels });
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newReels = [...(isEditingProject.reels || []), { title: '', url: '', campaign: 'Evento' }];
                    setIsEditingProject({ ...isEditingProject, reels: newReels });
                  }}
                  className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-accent hover:border-accent transition-all text-sm font-bold flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  Adicionar Link de Vídeo
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary flex items-center gap-2">
                <Video size={16} />
                Vídeo Principal (Destaque)
              </label>
              <input
                type="text"
                value={isEditingProject.videoUrl || ''}
                onChange={(e) => setIsEditingProject({ ...isEditingProject, videoUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                placeholder="https://www.youtube.com/embed/... ou link do ficheiro"
              />
            </div>

            <button type="submit" className="w-full btn-primary py-4 mt-4">
              Guardar Projeto
            </button>
          </motion.form>
        </div>
      )}

      {/* News Edit Modal */}
      {isEditingNews && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm" onClick={() => setIsEditingNews(null)} />
          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleSaveNews}
            className="relative w-full max-w-2xl bg-white rounded-3xl p-10 shadow-2xl space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-primary">
                {isEditingNews.id === 'new' ? 'Nova Notícia' : 'Editar Notícia'}
              </h3>
              <button type="button" onClick={() => setIsEditingNews(null)} className="text-gray-400 hover:text-primary">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Título da Notícia</label>
              <input
                type="text"
                value={isEditingNews.title}
                onChange={(e) => setIsEditingNews({ ...isEditingNews, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Data</label>
                <input
                  type="date"
                  value={isEditingNews.date}
                  onChange={(e) => setIsEditingNews({ ...isEditingNews, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary">Categoria</label>
                <input
                  type="text"
                  value={isEditingNews.category}
                  onChange={(e) => setIsEditingNews({ ...isEditingNews, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">URL da Imagem</label>
              <input
                type="text"
                value={isEditingNews.image}
                onChange={(e) => setIsEditingNews({ ...isEditingNews, image: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-primary">Resumo (Excerpt)</label>
              <textarea
                value={isEditingNews.excerpt}
                onChange={(e) => setIsEditingNews({ ...isEditingNews, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-accent outline-none resize-none"
                required
              />
            </div>

            <button type="submit" className="w-full btn-primary py-4 mt-4">
              Guardar Notícia
            </button>
          </motion.form>
        </div>
      )}

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-[110] bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 size={24} />
            <span className="font-bold">Alterações guardadas com sucesso!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
