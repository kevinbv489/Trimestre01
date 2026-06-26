import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Bienvenida a nuestro salón de belleza. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuanto')) {
      return 'Nuestros precios varían según el servicio:\n• Manicura: $25-40\n• Pedicura: $35-50\n• Depilación: desde $15\n• Uñas acrílicas: $45-60\n¿Te gustaría saber más sobre algún servicio específico?';
    }

    if (lowerMessage.includes('horario') || lowerMessage.includes('hora') || lowerMessage.includes('abierto')) {
      return 'Nuestro horario es:\nLunes a Viernes: 9:00 AM - 7:00 PM\nSábado: 9:00 AM - 6:00 PM\nDomingo: 10:00 AM - 4:00 PM';
    }

    if (lowerMessage.includes('reserva') || lowerMessage.includes('cita') || lowerMessage.includes('agendar')) {
      return 'Para agendar una cita puedes:\n• Llamarnos al (555) 123-4567\n• Enviarnos un WhatsApp\n• Visitar nuestro salón directamente\n¿Qué servicio te interesa?';
    }

    if (lowerMessage.includes('servicio') || lowerMessage.includes('ofrecen') || lowerMessage.includes('hacen')) {
      return 'Ofrecemos diversos servicios:\n✨ Manicura y pedicura\n✨ Uñas acrílicas y gel\n✨ Depilación con cera\n✨ Diseño de uñas\n✨ Tratamientos de manos y pies\n¿Sobre cuál te gustaría saber más?';
    }

    if (lowerMessage.includes('ubicación') || lowerMessage.includes('dirección') || lowerMessage.includes('donde')) {
      return 'Nos encontramos en Av. Principal #123, Centro Ciudad.\nPuedes llegar fácilmente en transporte público o contamos con estacionamiento disponible.';
    }

    if (lowerMessage.includes('gracias')) {
      return '¡De nada! Estamos aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?';
    }

    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos')) {
      return '¡Hola! ¿En qué puedo ayudarte hoy? Puedo informarte sobre nuestros servicios, precios, horarios y más.';
    }

    return 'Gracias por tu mensaje. Para mejor atención, puedes preguntarme sobre:\n• Servicios disponibles\n• Precios\n• Horarios\n• Cómo agendar una cita\n• Ubicación\n\n¿Qué te gustaría saber?';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
        aria-label="Chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 rounded-t-2xl bg-gradient-to-br from-pink-500 to-purple-600 p-4 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Asistente Virtual</h3>
              <p className="text-xs text-white/80">En línea</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 whitespace-pre-line ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
              />
              <button
                onClick={handleSend}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white transition-all hover:scale-105"
                aria-label="Enviar"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
