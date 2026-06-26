import { useState } from 'react';
import { Sparkles, Phone, LogOut, ChevronDown, Calendar } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();
  const [menuUsuario, setMenuUsuario] = useState(false);
  const [modal, setModal] = useState<'login' | 'registro' | null>(null);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    setMenuUsuario(false);
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text font-bold text-transparent text-sm">
                  Nail. Art
                </span>
                <span className="text-xs italic text-gray-400 -mt-0.5">María Salamanca</span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className={`transition-colors text-sm ${isActive('/') ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'}`}>
                Inicio
              </Link>
              {usuario && (
                <Link to="/catalogo" className={`transition-colors text-sm ${isActive('/catalogo') ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'}`}>
                  Catálogo
                </Link>
              )}
              <Link to="/galeria" className={`transition-colors text-sm ${isActive('/galeria') ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'}`}>
                Galería
              </Link>
              <Link to="/contacto" className={`transition-colors text-sm ${isActive('/contacto') ? 'text-pink-600' : 'text-gray-600 hover:text-pink-600'}`}>
                Contacto
              </Link>
            </nav>

            {/* Derecha */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-pink-600" />
                <span>(555) 123-4567</span>
              </div>

              {usuario ? (
                <div className="relative">
                  <button
                    onClick={() => setMenuUsuario(v => !v)}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 px-3 py-1.5 hover:shadow-sm transition-all"
                  >
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {usuario.avatar}
                    </div>
                    <span className="text-sm text-gray-700 hidden sm:block max-w-[100px] truncate">{usuario.nombre.split(' ')[0]}</span>
                    <ChevronDown className="h-3 w-3 text-gray-400" />
                  </button>

                  {menuUsuario && (
                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-pink-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-pink-50">
                        <p className="text-sm font-semibold text-gray-800">{usuario.nombre}</p>
                        <p className="text-xs text-gray-400 truncate">{usuario.email}</p>
                      </div>
                      <button
                        onClick={() => { navigate('/dashboard'); setMenuUsuario(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-pink-50 hover:text-pink-600 flex items-center gap-2 transition-colors"
                      >
                        <Sparkles className="h-4 w-4" /> Ver catálogo
                      </button>
                      <button
                        onClick={() => { navigate('/dashboard/citas'); setMenuUsuario(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-pink-50 hover:text-pink-600 flex items-center gap-2 transition-colors"
                      >
                        <Calendar className="h-4 w-4" /> Agendar cita
                      </button>
                      <div className="border-t border-pink-50 mt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-50 flex items-center gap-2 transition-colors"
                        >
                          <LogOut className="h-4 w-4" /> Cerrar sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setModal('login')}
                  className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2 text-sm text-white transition-all hover:shadow-lg hover:scale-105"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {modal && <AuthModal modo={modal} onClose={() => setModal(null)} />}
    </>
  );
}
