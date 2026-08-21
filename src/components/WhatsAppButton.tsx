import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function WhatsAppButton() {
  const whatsappNumber = "2348137167298"; 
  const message = "Hello Leadwood & G&V Support, I am interested in your furniture and housing services.";

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center justify-center group active:scale-95 transition-transform"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={26} className="sm:w-7 sm:h-7" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold uppercase tracking-widest text-[10px]">
        Chat with us
      </span>
    </motion.a>
  );
}
