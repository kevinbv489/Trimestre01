import { useState } from 'react';
import { X, Eye, EyeOff, Sparkles, User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

interface AuthModalProps {
  modo: 'login' | 'registro';
  onClose: () => void;
}

export default function AuthModal({ modo: modoInicial, onClose }: AuthModalProps) {
  const [modo, setModo] = useState(modoInicial);
  const [verPass, setVerPass] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const initiales = (n: string) => {
    const parts = n.trim().split(' ');
    return parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (modo === 'registro') {
      if (!nombre || !email || !telefono || !password) {
        setError('Por favor completa todos los campos.');
        return;
      }
      login({
        nombre,
        email,
        telefono,
        avatar: initiales(nombre).toUpperCase(),
        citasAnteriores: 0,
      });
    } else {
      if (!email || !password) {
        setError('Ingresa tu email y contraseña.');
        return;
      }
      // Mock: cualquier credencial válida
      login({
        nombre: email.split('@')[0].replace('.', ' '),
        email,
        telefono: '',
        avatar: email.slice(0, 2).toUpperCase(),
        citasAnteriores: 3,
      });
    }

    onClose();
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header decorativo */}
        <div className="h-2 w-full bg-gradient-to-r from-pink-500 to-purple-600" />

        <div className="p-8">
          {/* Cerrar */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg mb-3">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Nail. Art
            </h2>
            <p className="text-sm italic text-gray-400">María Salamanca</p>
          </div>

          {/* Tabs */}
          <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
            <button
              onClick={() => { setModo('login'); setError(''); }}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                modo === 'login' ? 'bg-white shadow text-pink-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => { setModo('registro'); setError(''); }}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                modo === 'registro' ? 'bg-white shadow text-pink-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {modo === 'registro' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20"
              />
            </div>

            {modo === 'registro' && (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20"
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type={verPass ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 pl-10 pr-10 py-3 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20"
              />
              <button
                type="button"
                onClick={() => setVerPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {verPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 py-3 text-white font-medium hover:scale-[1.02] hover:shadow-lg transition-all"
            >
              {modo === 'login' ? 'Ingresar' : 'Crear cuenta'}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
            <button
              onClick={() => { setModo(modo === 'login' ? 'registro' : 'login'); setError(''); }}
              className="text-pink-500 hover:text-pink-700 font-medium"
            >
              {modo === 'login' ? 'Regístrate aquí' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
