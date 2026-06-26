import { Hand, Footprints, Sparkles, Paintbrush, Heart, Star } from 'lucide-react';

const services = [
  {
    icon: Hand,
    title: 'Manicura',
    description: 'Cuidado completo de uñas de manos con tratamientos nutritivos y diseños personalizados.',
    price: 'Desde $25',
    gradient: 'from-pink-400 to-pink-600',
  },
  {
    icon: Footprints,
    title: 'Pedicura',
    description: 'Tratamiento relajante para tus pies con exfoliación, masaje y esmaltado profesional.',
    price: 'Desde $35',
    gradient: 'from-purple-400 to-purple-600',
  },
  {
    icon: Sparkles,
    title: 'Uñas Acrílicas',
    description: 'Extensiones de uñas duraderas y hermosas con acabado profesional.',
    price: 'Desde $45',
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    icon: Paintbrush,
    title: 'Diseño de Uñas',
    description: 'Nail art personalizado con las últimas tendencias y técnicas de decoración.',
    price: 'Desde $30',
    gradient: 'from-rose-400 to-pink-600',
  },
  {
    icon: Heart,
    title: 'Depilación',
    description: 'Depilación con cera de alta calidad para una piel suave y radiante.',
    price: 'Desde $15',
    gradient: 'from-fuchsia-400 to-purple-600',
  },
  {
    icon: Star,
    title: 'Tratamientos Spa',
    description: 'Tratamientos especiales de hidratación y rejuvenecimiento para manos y pies.',
    price: 'Desde $40',
    gradient: 'from-violet-400 to-purple-600',
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm text-pink-700 mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Nuestros Servicios</span>
          </div>
          <h2 className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            Servicios Especializados
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios de belleza con productos premium y técnicas profesionales
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient}`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="mb-2">{service.title}</h3>
                <p className="mb-4 text-sm text-gray-600">{service.description}</p>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text font-semibold text-transparent`}>
                    {service.price}
                  </span>
                  <button className="text-sm text-pink-600 transition-colors hover:text-pink-700">
                    Reservar →
                  </button>
                </div>

                {/* Hover Effect */}
                <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${service.gradient} opacity-0 blur-3xl transition-opacity group-hover:opacity-10`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
