interface Props { titulo: string; descripcion: string; }

export default function DashboardPlaceholderPage({ titulo, descripcion }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mb-4">
        <span className="text-2xl">✨</span>
      </div>
      <h2 className="text-xl font-bold text-gray-700">{titulo}</h2>
      <p className="text-sm text-gray-400 mt-2 max-w-xs">{descripcion}</p>
    </div>
  );
}
