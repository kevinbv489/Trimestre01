import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Users, Star, ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];

const proximasCitas = [
  { hora: '10:00 AM', nombre: 'Ana Rodríguez', servicio: 'Manicura', color: 'bg-pink-400' },
  { hora: '11:00 AM', nombre: 'Laura Gómez', servicio: 'Pedicura', color: 'bg-purple-500', activa: true },
  { hora: '02:00 PM', nombre: 'Sofía Martínez', servicio: 'Uñas acrílicas', color: 'bg-pink-300' },
  { hora: '03:00 PM', nombre: 'Andrea Torres', servicio: 'Diseño en gel', color: 'bg-violet-400' },
  { hora: '04:10 PM', nombre: 'Camila Torres', servicio: 'Diseño en gel', color: 'bg-fuchsia-400' },
];

function MiniCalendar() {
  const today = new Date(2026, 5, 22); // 22 junio 2026
  const [mes, setMes] = useState(today.getMonth());
  const [año, setAño] = useState(today.getFullYear());

  const primerDiaSemana = new Date(año, mes, 1).getDay();
  // Adjust: week starts Monday (0=Sun → move to end)
  const offset = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1;
  const diasEnMes = new Date(año, mes + 1, 0).getDate();
  const celdas: (number | null)[] = Array(offset).fill(null);
  for (let i = 1; i <= diasEnMes; i++) celdas.push(i);

  // Días con citas
  const conCitas = new Set([5, 10, 15, 18, 22, 25]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Calendario</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { if (mes === 0) { setMes(11); setAño(y => y-1); } else setMes(m => m-1); }}
            className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-pink-100 hover:text-pink-600 transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[110px] text-center">
            {MESES[mes]} {año}
          </span>
          <button
            onClick={() => { if (mes === 11) { setMes(0); setAño(y => y+1); } else setMes(m => m+1); }}
            className="h-7 w-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-pink-100 hover:text-pink-600 transition-colors"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Cabecera días */}
      <div className="grid grid-cols-7 mb-2">
        {DIAS.map(d => (
          <div key={d} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Días */}
      <div className="grid grid-cols-7 gap-y-1">
        {celdas.map((dia, i) => {
          if (!dia) return <div key={i} />;
          const esHoy = dia === today.getDate() && mes === today.getMonth() && año === today.getFullYear();
          const tieneCita = conCitas.has(dia);
          return (
            <div key={i} className="flex flex-col items-center">
              <button
                className={`h-8 w-8 rounded-full text-xs flex items-center justify-center transition-all
                  ${esHoy
                    ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white font-bold shadow'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                  }`}
              >
                {dia}
              </button>
              {tieneCita && !esHoy && (
                <span className="h-1 w-1 rounded-full bg-pink-400 mt-0.5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Saludo */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          ¡Bienvenida{usuario ? `, ${usuario.nombre.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-sm text-gray-400 mt-0.5">Aquí tienes un resumen de tu negocio:</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0">
            <Calendar className="h-6 w-6 text-pink-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">12</p>
            <p className="text-xs text-gray-400 mt-0.5">Citas de hoy</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
            <Users className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">48</p>
            <p className="text-xs text-gray-400 mt-0.5">Clientes activos</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-fuchsia-50 flex items-center justify-center flex-shrink-0">
            <Star className="h-6 w-6 text-fuchsia-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">8</p>
            <p className="text-xs text-gray-400 mt-0.5">Servicios más solicitados</p>
          </div>
        </div>
      </div>

      {/* Calendar + Próximas citas */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Calendario */}
        <div className="lg:col-span-3">
          <MiniCalendar />
        </div>

        {/* Próximas citas */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700">Próximas citas</h3>
            <button
              onClick={() => navigate('/dashboard/citas')}
              className="text-xs text-pink-500 hover:text-pink-700 transition-colors"
            >
              Ver todas →
            </button>
          </div>

          <div className="space-y-3">
            {proximasCitas.map((cita, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer
                  ${cita.activa ? 'bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100' : 'hover:bg-gray-50'}`}
              >
                <span className="text-[11px] text-gray-400 w-16 flex-shrink-0 font-medium">{cita.hora}</span>
                <span className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${cita.color}`} />
                <div className="overflow-hidden flex-1">
                  <p className="text-sm font-medium text-gray-800 truncate">{cita.nombre}</p>
                  <p className="text-[11px] text-gray-400 truncate">{cita.servicio}</p>
                </div>
                {cita.activa && (
                  <span className="text-[10px] bg-pink-500 text-white rounded-full px-2 py-0.5 flex-shrink-0">
                    Ahora
                  </span>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/dashboard/citas')}
            className="mt-4 w-full rounded-xl border-2 border-dashed border-pink-200 py-2.5 text-xs text-pink-400 hover:border-pink-400 hover:text-pink-600 transition-all"
          >
            + Nueva cita
          </button>
        </div>
      </div>
    </div>
  );
}
