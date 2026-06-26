import { useState } from 'react';
import { Sparkles, Star, LogIn, UserPlus } from 'lucide-react';
import salonBg from '../../imports/WhatsApp_Image_2026-06-10_at_06.53.53.jpeg';
import AuthModal from './AuthModal';

export default function Hero() {
  const [modal, setModal] = useState<'login' | 'registro' | null>(null);

  return (
    <>
      <section
        className="relative min-h-[600px]"
        style={{
          backgroundImage: `url(${salonBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/70 via-purple-900/60 to-pink-900/70" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-pink-500/30 px-4 py-2 text-sm text-pink-200 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                <span>Salón de Belleza Premium</span>
              </div>

              <h1 className="bg-gradient-to-r from-pink-300 to-purple-200 bg-clip-text text-5xl font-bold text-transparent lg:text-6xl">
                Nail. Art
              </h1>
              <p className="italic text-pink-200 text-2xl -mt-3">María Salamanca</p>

              <p className="text-lg text-pink-100">
                Especialistas en manicura, pedicura, depilación y cuidado de uñas.
                Más de 10 años embelleciendo tus manos y pies con los mejores tratamientos y productos profesionales.
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-white">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>+5000 clientas satisfechas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white">
                  <Sparkles className="h-5 w-5 text-pink-300" />
                  <span>Productos de alta calidad</span>
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setModal('registro')}
                  className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 text-white transition-all hover:scale-105 hover:shadow-xl flex items-center gap-2"
                >
                  <UserPlus className="h-5 w-5" />
                  Registrarse
                </button>
                <button
                  onClick={() => setModal('login')}
                  className="rounded-full border-2 border-white/60 px-8 py-3 text-white transition-all hover:bg-white/10 backdrop-blur-sm flex items-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  Iniciar Sesión
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white/20">
                <img
                  src={salonBg}
                  alt="Nuestro salón de belleza"
                  className="h-[420px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-pink-400/30 blur-3xl" />
                <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-purple-400/30 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {modal && <AuthModal modo={modal} onClose={() => setModal(null)} />}
    </>
  );
}
