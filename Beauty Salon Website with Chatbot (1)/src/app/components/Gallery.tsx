import { Sparkles } from 'lucide-react';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600',
    alt: 'Manicura profesional',
  },
  {
    url: 'https://images.unsplash.com/photo-1758225490983-0fae7961e425?w=600',
    alt: 'Salón de belleza',
  },
  {
    url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600',
    alt: 'Diseño de uñas',
  },
  {
    url: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600',
    alt: 'Pedicura spa',
  },
  {
    url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600',
    alt: 'Uñas decoradas',
  },
];

export default function Gallery() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm text-pink-700 mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Galería</span>
          </div>
          <h2 className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            Nuestro Trabajo
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Mira algunos de nuestros trabajos más recientes y déjate inspirar
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
