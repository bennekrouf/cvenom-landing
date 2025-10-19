'use client';

import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  number?: string;
  message?: string;
  className?: string;
  children?: React.ReactNode;
  source?: string;
}

export const WhatsAppButton = ({
  number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+1234567890",
  message = "Hello, I'd like to learn more about Cvenom's AI-powered CV optimization.",
  className = "",
  children = "Contact via WhatsApp",
  source = "contact_button"
}: WhatsAppButtonProps) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`;

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('WhatsApp Contact', {
        props: {
          source: source
        }
      });
    }
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors ${className}`}
    >
      <FaWhatsapp className="h-5 w-5" />
      {children}
    </a>
  );
};

export const FloatingWhatsApp = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+1234567890";
  const whatsappMessage = "Hello, I'm interested in Cvenom's AI-powered CV optimization. Can you help me?";
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  const handleClick = () => {
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible('WhatsApp Contact', {
        props: {
          source: 'floating_button'
        }
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 md:hidden z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Contact via WhatsApp"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>
    </div>
  );
};
