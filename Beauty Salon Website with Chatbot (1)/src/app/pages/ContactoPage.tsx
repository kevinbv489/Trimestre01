import BookingWizard from '../components/BookingWizard';
import Contact from '../components/Contact';
import { Sparkles } from 'lucide-react';

export default function ContactoPage() {
  return (
    <>
      {/* Sección agendar cita */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50 min-h-screen">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm text-pink-700 mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Nail. Art — María Salamanca</span>
            </div>
            <h2 className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Agenda tu Cita
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Elige tus servicios, fecha y hora favorita
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
            <BookingWizard />
          </div>
        </div>
      </section>

      {/* Sección contacto / info */}
      <Contact />
    </>
  );
}
