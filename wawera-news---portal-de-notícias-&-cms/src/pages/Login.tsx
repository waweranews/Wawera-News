import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, AlertCircle, LogIn } from 'lucide-react';
import { auth, loginWithGoogle, onAuthStateChanged } from '../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'comercial0waweranews@gmail.com') {
        navigate('/admin');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await loginWithGoogle();
      if (result.user.email !== 'comercial0waweranews@gmail.com') {
        setError('Acesso negado. Apenas o administrador principal pode aceder ao painel.');
        await auth.signOut();
      } else {
        navigate('/admin');
      }
    } catch (err) {
      setError('Erro ao fazer login com Google. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Keeping legacy login for now but recommending Google
    if (email === 'comercial0waweranews@gmail.com' && password === 'Wawera@2026') {
      localStorage.setItem('isLoggedIn', 'true');
      setTimeout(() => {
        navigate('/admin');
        setLoading(false);
      }, 1000);
    } else {
      setError('Credenciais inválidas. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <img src="https://i.imgur.com/fAZ6NKn.png" alt="Wawera News" className="h-16 mx-auto mb-6" referrerPolicy="no-referrer" />
          <h1 className="text-3xl font-bold text-primary">Painel Admin</h1>
          <p className="text-gray-500 mt-2">Acesse para gerir o seu portfólio</p>
        </div>

        <div className="mb-8">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-gray-100 hover:border-accent hover:bg-accent/5 transition-all font-bold text-primary"
          >
            <LogIn size={20} className="text-accent" />
            Entrar com Google
          </button>
          
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400">ou use credenciais</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-primary ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary ml-1">Palavra-passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl text-sm animate-shake">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading ? 'Acessando...' : (
              <>
                Entrar no Painel
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <a href="/" className="text-sm text-gray-400 hover:text-accent transition-colors">
            Voltar para o site
          </a>
        </div>
      </motion.div>
    </div>
  );
}
