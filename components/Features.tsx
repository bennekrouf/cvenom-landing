'use client';

import { motion } from 'framer-motion';
import { Zap, Globe, Target, MessageSquare, FileText, BarChart3 } from 'lucide-react';
import { Translations } from '../lib/types';

const icons = [Zap, Globe, Target, MessageSquare, FileText, BarChart3];

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Features({ t }: { t: Translations }) {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.features.title}</h2>
          <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {t.features.items.map((feature, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group"
              >
                <div className="bg-[hsl(var(--background))] border border-[hsl(var(--border))] rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="w-16 h-16 bg-[#FF6B00]/10 rounded-2xl flex items-center justify-center mb-6 text-[#FF6B00] group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
