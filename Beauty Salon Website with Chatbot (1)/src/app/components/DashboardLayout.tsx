import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import {
  LayoutDashboard, Calendar, Users, Scissors, CalendarDays,
  BarChart2, Settings, LogOut, Sparkles, Menu, X, Bell, Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Inicio', end: true },
  { to: '/dashboard/citas', icon: Calendar, label: 'Citas' },
  { to: '/dashboard/clientes', icon: Users, label: 'Clientes' },
  { to: '/dashboard/servicios', icon: Scissors, label: 'Servicios' },
  { to: '/dashboard/calendario', icon: CalendarDays, label: 'Calendario' },
  { to: '/dashboard/reportes', icon: BarChart2, label: 'Reportes' },
  { to: '/dashboard/configuracion', icon: Settings, label: 'Configuración' },
];

export default function DashboardLayout() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState<'login' | 'registro' | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className="flex h-screen bg-[#f4f5fb] overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-56 bg-[#0d0d1a] flex flex-col transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:flex-shrink-0`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-white font-bold text-sm tracking-wide">Nail. Art</p>
              <p className="text-gray-400 text-xs italic">María Salamanca</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
            {navItems.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group
                  ${isActive
                    ? 'bg-pink-500/20 text-pink-400 border-l-2 border-pink-500 pl-[10px]'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* User + logout */}
          <div className="px-3 pb-5 border-t border-white/10 pt-4 space-y-1">
            {usuario && (
              <div className="flex items-center gap-3 px-3 py-2 mb-1">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {usuario.avatar}
                </div>
                <div className="overflow-hidden">
                  <p className="text-white text-xs font-semibold truncate">{usuario.nombre}</p>
                  <p className="text-gray-500 text-[10px] truncate">{usuario.email}</p>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5 hover:text-red-400 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Overlay mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="flex items-center justify-between bg-white px-6 py-3 shadow-sm flex-shrink-0">
            <button
              className="lg:hidden text-gray-500 hover:text-pink-600 transition-colors"
              onClick={() => setSidebarOpen(v => !v)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="flex-1 lg:flex-none" />

            <div className="flex items-center gap-3">
              <button className="relative h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-pink-50 hover:text-pink-600 transition-colors">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-pink-500" />
              </button>
              <button
                onClick={() => navigate('/dashboard/citas')}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-white text-sm hover:scale-105 hover:shadow-md transition-all"
              >
                <Plus className="h-4 w-4" />
                Nueva cita
              </button>
              {usuario && (
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {usuario.avatar}
                </div>
              )}
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {modal && <AuthModal modo={modal} onClose={() => setModal(null)} />}
    </>
  );
}
