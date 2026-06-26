import BookingWizard from '../components/BookingWizard';
import { Sparkles } from 'lucide-react';

export default function DashboardCitasPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Agendar Cita</h1>
        <p className="text-sm text-gray-400 mt-0.5">Elige servicio, fecha y hora disponible</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-2xl">
        <div className="h-1.5 bg-gradient-to-r from-pink-500 to-purple-600" />
        <BookingWizard />
      </div>
    </div>
  );
}
