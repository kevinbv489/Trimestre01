import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, User, Calendar, Clock, Scissors, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SERVICIOS = [
  { id: 1, nombre: 'Manicura Clásica', duracion: '45 min', precio: '$25', categoria: 'Manos' },
  { id: 2, nombre: 'Manicura Semipermanente', duracion: '60 min', precio: '$35', categoria: 'Manos' },
  { id: 3, nombre: 'Uñas Acrílicas', duracion: '90 min', precio: '$55', categoria: 'Manos' },
  { id: 4, nombre: 'Nail Art / Diseño', duracion: '30 min', precio: '$20', categoria: 'Diseño' },
  { id: 5, nombre: 'Pedicura Clásica', duracion: '50 min', precio: '$35', categoria: 'Pies' },
  { id: 6, nombre: 'Pedicura Spa', duracion: '75 min', precio: '$50', categoria: 'Pies' },
  { id: 7, nombre: 'Depilación Piernas', duracion: '40 min', precio: '$30', categoria: 'Depilación' },
  { id: 8, nombre: 'Depilación Axilas', duracion: '15 min', precio: '$15', categoria: 'Depilación' },
  { id: 9, nombre: 'Tratamiento Spa Manos', duracion: '60 min', precio: '$45', categoria: 'Spa' },
];

const HORAS = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'];

// Horas ocupadas por día (mock)
const HORAS_OCUPADAS: Record<string, string[]> = {
  '2026-06-11': ['9:00 AM', '10:30 AM', '2:00 PM'],
  '2026-06-12': ['11:00 AM', '3:00 PM', '4:30 PM'],
  '2026-06-13': ['9:30 AM', '12:00 PM', '5:00 PM'],
  '2026-06-16': ['10:00 AM', '11:30 AM', '2:30 PM', '4:00 PM'],
  '2026-06-17': ['9:00 AM', '3:30 PM'],
};

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS_SEMANA = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function formatFecha(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatFechaLegible(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
}

export default function BookingWizard() {
  const { usuario } = useAuth();
  const USUARIO = usuario ?? { nombre: 'Invitada', telefono: '', email: '', avatar: '?', citasAnteriores: 0 };
  const [paso, setPaso] = useState(1);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<number[]>([]);
  const [mes, setMes] = useState(5); // junio = índice 5
  const [año, setAño] = useState(2026);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>('');
  const [horaSeleccionada, setHoraSeleccionada] = useState<string>('');
  const [notas, setNotas] = useState('');
  const [confirmado, setConfirmado] = useState(false);

  const hoy = new Date(2026, 5, 10);

  // Generar días del calendario
  const primerDia = new Date(año, mes, 1).getDay();
  const diasEnMes = new Date(año, mes + 1, 0).getDate();
  const celdas: (number | null)[] = Array(primerDia).fill(null);
  for (let i = 1; i <= diasEnMes; i++) celdas.push(i);

  const toggleServicio = (id: number) => {
    setServiciosSeleccionados(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const serviciosElegidos = SERVICIOS.filter(s => serviciosSeleccionados.includes(s.id));
  const totalMinutos = serviciosElegidos.reduce((acc, s) => acc + parseInt(s.duracion), 0);
  const totalPrecio = serviciosElegidos.reduce((acc, s) => acc + parseInt(s.precio.replace('$', '')), 0);

  const esDiaDisponible = (dia: number) => {
    const d = new Date(año, mes, dia);
    return d >= hoy && d.getDay() !== 0; // sin domingos en el pasado
  };

  const horasOcupadas = fechaSeleccionada ? (HORAS_OCUPADAS[fechaSeleccionada] || []) : [];

  const pasos = [
    { n: 1, label: 'Servicio', icon: Scissors },
    { n: 2, label: 'Fecha', icon: Calendar },
    { n: 3, label: 'Hora', icon: Clock },
    { n: 4, label: 'Confirmar', icon: Check },
  ];

  if (confirmado) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 shadow-xl">
          <Check className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          ¡Cita Confirmada!
        </h2>
        <p className="text-gray-500 mb-8">Te esperamos en Nail. Art</p>
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 max-w-sm w-full text-left space-y-3">
          <div className="flex items-center gap-2 text-gray-700">
            <User className="h-4 w-4 text-pink-500" />
            <span className="text-sm">{USUARIO.nombre}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="h-4 w-4 text-pink-500" />
            <span className="text-sm">{formatFechaLegible(fechaSeleccionada)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="h-4 w-4 text-pink-500" />
            <span className="text-sm">{horaSeleccionada}</span>
          </div>
          <div className="pt-2 border-t border-pink-100">
            {serviciosElegidos.map(s => (
              <div key={s.id} className="flex justify-between text-sm text-gray-600 py-1">
                <span>{s.nombre}</span>
                <span className="text-pink-600">{s.precio}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-pink-100 mt-2">
              <span>Total</span>
              <span className="text-purple-600">${totalPrecio}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => { setConfirmado(false); setPaso(1); setServiciosSeleccionados([]); setFechaSeleccionada(''); setHoraSeleccionada(''); setNotas(''); }}
          className="mt-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 text-white hover:scale-105 transition-all"
        >
          Agendar otra cita
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Perfil de usuaria */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 mb-8 border border-pink-100">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          {USUARIO.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800">{USUARIO.nombre}</span>
            <span className="text-xs bg-pink-100 text-pink-700 rounded-full px-2 py-0.5">{USUARIO.citasAnteriores} citas</span>
          </div>
          <p className="text-sm text-gray-500">{USUARIO.telefono}</p>
          <p className="text-xs text-gray-400">{USUARIO.email}</p>
        </div>
        <Sparkles className="h-5 w-5 text-pink-400 flex-shrink-0" />
      </div>

      {/* Barra de pasos */}
      <div className="flex items-center justify-between mb-8">
        {pasos.map((p, i) => {
          const Icon = p.icon;
          const activo = paso === p.n;
          const hecho = paso > p.n;
          return (
            <div key={p.n} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all
                  ${hecho ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white' :
                    activo ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg scale-110' :
                    'bg-gray-100 text-gray-400'}`}>
                  {hecho ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={`text-xs ${activo || hecho ? 'text-pink-600' : 'text-gray-400'}`}>{p.label}</span>
              </div>
              {i < pasos.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-5 ${hecho ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* PASO 1: Elegir servicios */}
      {paso === 1 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">¿Qué te vamos a hacer hoy?</h3>
          <p className="text-sm text-gray-500 mb-6">Puedes elegir uno o varios servicios</p>
          {['Manos', 'Pies', 'Diseño', 'Depilación', 'Spa'].map(cat => {
            const serviciosCat = SERVICIOS.filter(s => s.categoria === cat);
            return (
              <div key={cat} className="mb-5">
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2">{cat}</p>
                <div className="space-y-2">
                  {serviciosCat.map(s => {
                    const sel = serviciosSeleccionados.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        onClick={() => toggleServicio(s.id)}
                        className={`w-full flex items-center justify-between rounded-xl px-4 py-3 border transition-all text-left
                          ${sel ? 'border-pink-400 bg-gradient-to-r from-pink-50 to-purple-50 shadow-sm' : 'border-gray-200 bg-white hover:border-pink-200'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all
                            ${sel ? 'border-pink-500 bg-pink-500' : 'border-gray-300'}`}>
                            {sel && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span className="text-sm text-gray-700">{s.nombre}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span>{s.duracion}</span>
                          <span className="text-pink-600 font-semibold">{s.precio}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {serviciosSeleccionados.length > 0 && (
            <div className="sticky bottom-4 bg-white rounded-2xl shadow-xl border border-pink-100 p-4 flex items-center justify-between mt-4">
              <div>
                <p className="text-sm text-gray-500">{serviciosSeleccionados.length} servicio(s) · {totalMinutos} min</p>
                <p className="font-bold text-purple-600">${totalPrecio} total</p>
              </div>
              <button
                onClick={() => setPaso(2)}
                className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 text-white text-sm flex items-center gap-2 hover:scale-105 transition-all"
              >
                Continuar <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* PASO 2: Calendario */}
      {paso === 2 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">Elige tu fecha</h3>
          <p className="text-sm text-gray-500 mb-6">Selecciona el día que mejor te quede</p>
          <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-4">
            {/* Nav mes */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => { if (mes === 0) { setMes(11); setAño(y => y - 1); } else setMes(m => m - 1); }}
                className="h-8 w-8 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-pink-600 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-semibold text-gray-700">{MESES[mes]} {año}</span>
              <button
                onClick={() => { if (mes === 11) { setMes(0); setAño(y => y + 1); } else setMes(m => m + 1); }}
                className="h-8 w-8 rounded-full bg-pink-50 hover:bg-pink-100 flex items-center justify-center text-pink-600 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            {/* Cabecera días */}
            <div className="grid grid-cols-7 mb-2">
              {DIAS_SEMANA.map(d => (
                <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
              ))}
            </div>
            {/* Celdas */}
            <div className="grid grid-cols-7 gap-1">
              {celdas.map((dia, i) => {
                if (!dia) return <div key={i} />;
                const fechaStr = `${año}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
                const disponible = esDiaDisponible(dia);
                const seleccionado = fechaSeleccionada === fechaStr;
                const tieneOcupadas = (HORAS_OCUPADAS[fechaStr] || []).length > 0;
                return (
                  <button
                    key={i}
                    disabled={!disponible}
                    onClick={() => { setFechaSeleccionada(fechaStr); setHoraSeleccionada(''); }}
                    className={`aspect-square rounded-xl text-sm flex flex-col items-center justify-center transition-all relative
                      ${!disponible ? 'text-gray-300 cursor-not-allowed' :
                        seleccionado ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-md scale-105' :
                        'hover:bg-pink-50 text-gray-700'}`}
                  >
                    {dia}
                    {disponible && tieneOcupadas && !seleccionado && (
                      <span className="absolute bottom-1 h-1 w-1 rounded-full bg-pink-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-pink-400 inline-block" /> Tiene citas ese día</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-gray-200 inline-block" /> No disponible</span>
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={() => setPaso(1)} className="flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors text-sm">
              <ChevronLeft className="h-4 w-4" /> Volver
            </button>
            <button
              disabled={!fechaSeleccionada}
              onClick={() => setPaso(3)}
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 text-white text-sm flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Continuar <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* PASO 3: Horas */}
      {paso === 3 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">Elige tu hora</h3>
          <p className="text-sm text-gray-500 mb-1">{formatFechaLegible(fechaSeleccionada)}</p>
          <p className="text-xs text-gray-400 mb-6">Duración estimada: {totalMinutos} min</p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {HORAS.map(hora => {
              const ocupada = horasOcupadas.includes(hora);
              const seleccionada = horaSeleccionada === hora;
              return (
                <button
                  key={hora}
                  disabled={ocupada}
                  onClick={() => setHoraSeleccionada(hora)}
                  className={`rounded-xl py-3 text-sm font-medium border transition-all relative overflow-hidden
                    ${ocupada ? 'bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed' :
                      seleccionada ? 'bg-gradient-to-br from-pink-500 to-purple-600 border-transparent text-white shadow-md scale-105' :
                      'bg-white border-pink-100 text-gray-700 hover:border-pink-400 hover:bg-pink-50'}`}
                >
                  {ocupada && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-gray-300 line-through">{hora}</span>
                    </span>
                  )}
                  {!ocupada && hora}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="h-3 w-8 rounded bg-gradient-to-r from-pink-500 to-purple-600 inline-block" /> Disponible
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-8 rounded bg-gray-200 inline-block" /> Ocupada
            </span>
          </div>
          <div className="flex justify-between mt-6">
            <button onClick={() => setPaso(2)} className="flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors text-sm">
              <ChevronLeft className="h-4 w-4" /> Volver
            </button>
            <button
              disabled={!horaSeleccionada}
              onClick={() => setPaso(4)}
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-2 text-white text-sm flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Continuar <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* PASO 4: Confirmación */}
      {paso === 4 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">Confirma tu cita</h3>
          <p className="text-sm text-gray-500 mb-6">Revisa los detalles antes de confirmar</p>

          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-5 space-y-4 mb-6">
            {/* Usuaria */}
            <div className="flex items-center gap-3 pb-3 border-b border-pink-100">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                {USUARIO.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-sm">{USUARIO.nombre}</p>
                <p className="text-xs text-gray-500">{USUARIO.telefono}</p>
              </div>
            </div>
            {/* Fecha y hora */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-pink-500" />
                <span className="text-sm text-gray-700">{formatFechaLegible(fechaSeleccionada)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-700">{horaSeleccionada}</span>
              </div>
            </div>
            {/* Servicios */}
            <div className="space-y-2 pt-1">
              {serviciosElegidos.map(s => (
                <div key={s.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{s.nombre}</span>
                  <div className="flex gap-3 text-xs text-gray-400">
                    <span>{s.duracion}</span>
                    <span className="text-pink-600 font-semibold">{s.precio}</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-pink-100 font-bold">
                <span className="text-gray-700">Total · {totalMinutos} min</span>
                <span className="text-purple-600">${totalPrecio}</span>
              </div>
            </div>
          </div>

          {/* Notas */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-2">¿Alguna nota especial? (opcional)</label>
            <textarea
              value={notas}
              onChange={e => setNotas(e.target.value)}
              rows={3}
              placeholder="Ej: prefiero tono nude, tengo uñas frágiles..."
              className="w-full rounded-xl border border-pink-100 bg-pink-50/30 px-4 py-3 text-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 resize-none"
            />
          </div>

          <div className="flex justify-between">
            <button onClick={() => setPaso(3)} className="flex items-center gap-2 text-gray-500 hover:text-pink-600 transition-colors text-sm">
              <ChevronLeft className="h-4 w-4" /> Volver
            </button>
            <button
              onClick={() => setConfirmado(true)}
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-3 text-white flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
            >
              <Check className="h-4 w-4" /> Confirmar Cita
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
