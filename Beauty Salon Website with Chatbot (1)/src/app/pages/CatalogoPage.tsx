import { useNavigate } from 'react-router';
import { Hand, Footprints, Sparkles, Paintbrush, Heart, Star, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const servicios = [
  {
    icon: Hand,
    titulo: 'Manicura',
    descripcion: 'Cuidado completo de uñas de manos con tratamientos nutritivos y diseños personalizados.',
    precio: 'Desde $25',
    duracion: '45 min',
    gradient: 'from-pink-400 to-pink-600',
    bg: 'from-pink-50 to-pink-100',
  },
  {
    icon: Footprints,
    titulo: 'Pedicura',
    descripcion: 'Tratamiento relajante para tus pies con exfoliación, masaje y esmaltado profesional.',
    precio: 'Desde $35',
    duracion: '50 min',
    gradient: 'from-purple-400 to-purple-600',
    bg: 'from-purple-50 to-purple-100',
  },
  {
    icon: Sparkles,
    titulo: 'Uñas Acrílicas',
    descripcion: 'Extensiones de uñas duraderas y hermosas con acabado profesional.',
    precio: 'Desde $45',
    duracion: '90 min',
    gradient: 'from-pink-500 to-purple-500',
    bg: 'from-pink-50 to-purple-50',
  },
  {
    icon: Paintbrush,
    titulo: 'Diseño de Uñas',
    descripcion: 'Nail art personalizado con las últimas tendencias y técnicas de decoración.',
    precio: 'Desde $30',
    duracion: '30 min',
    gradient: 'from-rose-400 to-pink-600',
    bg: 'from-rose-50 to-pink-100',
  },
  {
    icon: Heart,
    titulo: 'Depilación',
    descripcion: 'Depilación con cera de alta calidad para una piel suave y radiante.',
    precio: 'Desde $15',
    duracion: '15-40 min',
    gradient: 'from-fuchsia-400 to-purple-600',
    bg: 'from-fuchsia-50 to-purple-50',
  },
  {
    icon: Star,
    titulo: 'Tratamientos Spa',
    descripcion: 'Tratamientos especiales de hidratación y rejuvenecimiento para manos y pies.',
    precio: 'Desde $40',
    duracion: '60 min',
    gradient: 'from-violet-400 to-purple-600',
    bg: 'from-violet-50 to-purple-50',
  },
];

export default function CatalogoPage() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Bienvenida */}
        {usuario && (
          <div className="flex items-center gap-4 bg-white rounded-2xl shadow-sm border border-pink-100 p-5 mb-10">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              {usuario.avatar}
            </div>
            <div>
              <p className="text-gray-500 text-sm">¡Bienvenida de nuevo!</p>
              <p className="font-bold text-gray-800 text-lg">{usuario.nombre}</p>
              {usuario.citasAnteriores > 0 && (
                <p className="text-xs text-pink-500">{usuario.citasAnteriores} citas anteriores con nosotras ✨</p>
              )}
            </div>
          </div>
        )}

        {/* Encabezado */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm text-pink-700 mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Nuestros Servicios</span>
          </div>
          <h2 className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            ¿Qué te hacemos hoy?
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Elige el servicio que más te guste y agenda tu cita al instante
          </p>
        </div>

        {/* Grid servicios */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicios.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
              >
                {/* Color top bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${s.gradient}`} />

                <div className="p-6">
                  {/* Icono */}
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.gradient}`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="mb-1 text-gray-800">{s.titulo}</h3>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed">{s.descripcion}</p>

                  {/* Info precio/duración */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`bg-gradient-to-r ${s.gradient} bg-clip-text font-bold text-transparent text-lg`}>
                      {s.precio}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-50 rounded-full px-3 py-1">
                      {s.duracion}
                    </span>
                  </div>

                  {/* Botón agendar */}
                  <button
                    onClick={() => navigate('/contacto')}
                    className={`w-full rounded-xl bg-gradient-to-r ${s.gradient} py-2.5 text-white text-sm font-medium flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-md transition-all`}
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar este servicio
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA general */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/contacto')}
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-10 py-4 text-white font-medium hover:scale-105 hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            <Calendar className="h-5 w-5" />
            Agendar mi cita ahora
          </button>
        </div>
      </div>
    </section>
  );
}
