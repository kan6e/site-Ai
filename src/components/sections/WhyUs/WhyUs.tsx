import React from 'react';
import { Container } from '../../common/Container/Container';

interface ReasonItem {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

const reasons: ReasonItem[] = [
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/2917/2917995.png',
    title: 'Lab-Tested',
    desc: 'Every batch verified for purity and potency.',
    color: 'from-amber-400 to-orange-500'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/14748/14748972.png',
    title: 'Natural Ingredients',
    desc: 'No artificial sweeteners or fillers.',
    color: 'from-emerald-400 to-teal-500'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/625/625398.png',
    title: 'Pro Endorsed',
    desc: 'Trusted by athletes worldwide.',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/17959/17959577.png',
    title: 'Fast Delivery',
    desc: 'Get your order in 2–3 business days.',
    color: 'from-purple-400 to-pink-500'
  },
];

export const WhyUs = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* 📸 GYM BACKGROUND PHOTO – with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-black/70" /> {/* Dark overlay for readability */}

      {/* Subtle glow blobs for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="relative z-10">
          {/* Section header */}
          <div className="text-center text-white mb-16 md:mb-20">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-5 border border-white/10 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black tracking-tight leading-tight">
              Why <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">BoostLab</span>?
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mt-4 font-normal">
              We're committed to premium quality, complete transparency, and your ultimate physical success.
            </p>
          </div>

          {/* Grid of premium cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {reasons.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white/[0.06] backdrop-blur-xl rounded-3xl p-6 md:p-8 text-center 
                           border border-white/[0.10] hover:border-white/30 
                           shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] 
                           transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.10]"
              >
                {/* Icon container with gradient */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl 
                                bg-gradient-to-br ${item.color} 
                                flex items-center justify-center p-3
                                shadow-lg shadow-black/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <img 
                    src={item.icon} 
                    alt={item.title} 
                    className="w-full h-full object-contain brightness-0 invert select-none pointer-events-none" 
                  />
                </div>
                
                {/* Card text */}
                <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-2.5 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

