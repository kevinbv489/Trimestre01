import { Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text font-semibold text-transparent">
                Belleza & Estilo
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Tu salón de belleza de confianza. Especialistas en uñas y depilación desde 2014.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="transition-colors hover:text-pink-400">Inicio</Link></li>
              <li><Link to="/servicios" className="transition-colors hover:text-pink-400">Servicios</Link></li>
              <li><Link to="/galeria" className="transition-colors hover:text-pink-400">Galería</Link></li>
              <li><Link to="/contacto" className="transition-colors hover:text-pink-400">Contacto</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Av. Principal #123, Centro Ciudad</li>
              <li>(555) 123-4567</li>
              <li>info@bellezaestilo.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-gray-400">
            Hecho con <Heart className="h-4 w-4 fill-pink-500 text-pink-500" /> © 2024 Belleza & Estilo
          </p>
        </div>
      </div>
    </footer>
  );
}
