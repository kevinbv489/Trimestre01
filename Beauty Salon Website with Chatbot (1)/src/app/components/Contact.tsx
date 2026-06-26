import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                Visítanos
              </h2>
              <p className="mt-4 text-gray-600">
                Estamos ubicados en el corazón de la ciudad, listos para brindarte el mejor servicio de belleza.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex gap-4 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-1">Dirección</h3>
                  <p className="text-sm text-gray-600">Av. Principal #123, Centro Ciudad</p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-1">Teléfono</h3>
                  <p className="text-sm text-gray-600">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-1">Email</h3>
                  <p className="text-sm text-gray-600">info@bellezaestilo.com</p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-600">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-1">Horario</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Lunes - Viernes: 9:00 AM - 7:00 PM</p>
                    <p>Sábado: 9:00 AM - 6:00 PM</p>
                    <p>Domingo: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="mb-4">Síguenos</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white transition-all hover:scale-110"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white transition-all hover:scale-110"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50 p-8">
            <h3 className="mb-6">Envíanos un Mensaje</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm">Nombre</label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm">Mensaje</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 text-white transition-all hover:scale-105 hover:shadow-xl"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
