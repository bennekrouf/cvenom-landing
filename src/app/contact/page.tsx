'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMail, FiMapPin, FiLinkedin } from 'react-icons/fi';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from '../../../lib/i18n';
import ContactForm from '../../../components/ContactForm';
import { WhatsAppButton } from '../../../components/WhatsApp';

export default function Contact() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const t = useTranslation(lang);

  useEffect(() => {
    const savedTheme = localStorage.getItem('cvenom-theme') || 'light';
    const savedLang = localStorage.getItem('cvenom-lang') || 'en';
    setTheme(savedTheme as 'light' | 'dark');
    setLang(savedLang as 'en' | 'fr');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('cvenom-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const changeLang = (newLang: 'en' | 'fr') => {
    setLang(newLang);
    localStorage.setItem('cvenom-lang', newLang);
  };

  return (
    <div className="min-h-screen">
      <nav className="nav-container">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">cvenom</Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent">
              <button
                onClick={() => changeLang('en')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${lang === 'en' ? 'text-[#FF6B00]' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                EN
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => changeLang('fr')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${lang === 'fr' ? 'text-[#FF6B00]' : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                FR
              </button>
            </div>

            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {lang === 'en' ? 'Get in Touch' : 'Contactez-nous'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {lang === 'en'
                ? 'Ready to optimize your CV? We\'re here to help you transform your career prospects.'
                : 'Prêt à optimiser votre CV ? Nous sommes là pour vous aider à transformer vos perspectives de carrière.'
              }
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {lang === 'en' ? 'Contact Information' : 'Informations de Contact'}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#FF6B00]/10 rounded-lg flex items-center justify-center">
                      <FiMail className="h-6 w-6 text-[#FF6B00]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:contact@cvenom.com" className="text-muted-foreground hover:text-[#FF6B00] transition-colors">
                        contact@cvenom.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp</h3>
                      <p className="text-muted-foreground mb-2">
                        {lang === 'en' ? 'Quick response via WhatsApp' : 'Réponse rapide via WhatsApp'}
                      </p>
                      <WhatsAppButton
                        message={lang === 'en'
                          ? "Hello, I'm interested in Cvenom's AI-powered CV optimization. Can you help me?"
                          : "Bonjour, je suis intéressé par l'optimisation de CV par IA de Cvenom. Pouvez-vous m'aider ?"
                        }
                        source="contact_page"
                        className="text-sm"
                      >
                        {lang === 'en' ? 'Message on WhatsApp' : 'Message sur WhatsApp'}
                      </WhatsAppButton>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <FiLinkedin className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">LinkedIn</h3>
                      <a href="https://linkedin.com/company/cvenom" className="text-muted-foreground hover:text-blue-500 transition-colors">
                        linkedin.com/company/cvenom
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent p-6 rounded-xl border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <FiMapPin className="h-6 w-6 text-[#FF6B00]" />
                  <h3 className="text-lg font-semibold">
                    {lang === 'en' ? 'Office' : 'Bureau'}
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  {lang === 'en'
                    ? 'We operate globally with remote-first approach. Reach out via email or WhatsApp for fastest response.'
                    : 'Nous opérons mondialement avec une approche remote-first. Contactez-nous par email ou WhatsApp pour une réponse rapide.'
                  }
                </p>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
