import React, { useState } from 'react';
import { Container } from '../../common/Container/Container';

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  stars: number;
  avatar: string;
  date: string;
}

const testimonials: TestimonialItem[] = [
  { 
    name: 'Sarah M.', 
    role: 'Marathon Runner', 
    text: 'BoostLab gave me the edge I needed. My recovery time improved dramatically. The energy feels completely clean without any crash later.', 
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1607556114526-058f5efdf49e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mjl8fHxlbnwwfHx8fHw%3D',
    date: '2 days ago'
  },
  { 
    name: 'James K.', 
    role: 'CrossFit Coach', 
    text: 'Clean ingredients and great taste – I recommend this to all my athletes. It has become a core part of our daily training regimen.', 
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1441690636075-59519564be46?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3xTcU9XTnFqS2x0VXx8ZW58MHx8fHx8',
    date: '1 week ago'
  },
  { 
    name: 'Emma W.', 
    role: 'Cyclist', 
    text: 'Finally a drink that doesn\'t upset my stomach. Perfect for long rides and high-endurance sessions. Highly recommended!', 
    stars: 5,
    avatar: 'https://images.unsplash.com/photo-1666143923404-75e5b6ee25e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Nnx8fGVufDB8fHx8fA%3D%3D',
    date: '2 weeks ago'
  },
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-gray-800 to-black">
      {/* Subtle glow blobs – neutral and clean */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] opacity-20" />
      </div>

      <Container>
        {/* Header – white text, no photo needed */}
        <div className="text-center mb-16 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-5 shadow-lg border border-white/20">
            ⭐ Wall of Fame
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight drop-shadow-lg">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">Customers Say</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-xl mx-auto mt-4 font-normal drop-shadow">
            Real feedback from athletes and fitness enthusiasts who upgraded their performance with BoostLab.
          </p>
        </div>

        {/* Slider container – cards remain white */}
        <div className="max-w-2xl mx-auto relative z-10 px-4 sm:px-12 md:px-0">
          
          {/* Card – white background, shadow */}
          <div className="relative bg-white shadow-[0_30px_70px_rgba(0,0,0,0.06)] border border-primary/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 min-h-[320px] sm:min-h-[280px] flex flex-col justify-between">
            
            <span className="absolute top-6 right-8 text-7xl text-primary/5 font-serif select-none pointer-events-none">”</span>

            {testimonials.map((t, idx) => {
              const isActive = current === idx;
              return (
                <div 
                  key={idx} 
                  className={`w-full flex flex-col justify-between transition-all duration-500 ease-in-out ${
                    isActive 
                      ? 'relative opacity-100 pointer-events-auto scale-100 block' 
                      : 'absolute inset-0 opacity-0 pointer-events-none scale-[0.98] hidden'
                  }`}
                  style={{ display: isActive ? 'flex' : 'none' }}
                >
                  <div>
                    {/* Stars + Date */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex gap-0.5">
                        {[...Array(t.stars)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-text/40">{t.date}</span>
                    </div>

                    {/* Comment text */}
                    <p className="text-base md:text-xl text-secondary/90 font-medium leading-relaxed italic mb-8">
                      “{t.text}”
                    </p>
                  </div>

                  {/* Author profile */}
                  <div className="flex items-center gap-4 border-t border-black/[0.04] pt-6 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden shadow-inner border-2 border-white ring-4 ring-primary/10 flex-shrink-0">
                      <img 
                        src={t.avatar} 
                        alt={t.name} 
                        className="w-full h-full object-cover select-none pointer-events-none" 
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-base md:text-lg text-secondary">{t.name}</h4>
                      <p className="text-xs md:text-sm font-semibold text-primary">{t.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-[-12px] md:left-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-black/[0.06] text-secondary shadow-md hover:shadow-xl hover:border-primary hover:text-primary active:scale-95 flex items-center justify-center transition-all duration-200 z-20 group"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={next}
            className="absolute right-[-12px] md:right-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border border-black/[0.06] text-secondary shadow-md hover:shadow-xl hover:border-primary hover:text-primary active:scale-95 flex items-center justify-center transition-all duration-200 z-20 group"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2.5 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`rounded-full transition-all duration-300 ${
                  current === idx ? 'w-8 h-2.5 bg-primary shadow-sm shadow-primary/30' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
};