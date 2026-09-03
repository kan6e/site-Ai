import React, { useState } from "react";
import { Container } from "../../common/Container/Container";

interface FAQItem {
  q: string;
  a: string;
  icon: string;
}

const faqs: FAQItem[] = [
  {
    q: "How much caffeine is in your drinks?",
    a: "Our drinks contain 80mg of caffeine per serving – just the right amount for a clean energy boost without jitters.",
    icon: "https://cdn-icons-png.flaticon.com/512/2511/2511629.png",
  },
  {
    q: "Are your products vegan?",
    a: "Yes, all BoostLab products are 100% plant-based and certified vegan.",
    icon: "https://cdn-icons-png.flaticon.com/512/4909/4909206.png",
  },
  {
    q: "Do you offer subscriptions?",
    a: "Absolutely! Subscribe and save 15% on every recurring order with free shipping.",
    icon: "https://cdn-icons-png.flaticon.com/512/5571/5571224.png",
  },
  {
    q: "What’s your return policy?",
    a: "We offer a 30-day money-back guarantee – no questions asked.",
    icon: "https://cdn-icons-png.flaticon.com/512/11153/11153363.png",
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* 🌙 CALM DARK GRADIENT – neutral and soothing */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900" />

      {/* Soft, subtle glow blobs – very low opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Section header – white text stays */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-5 shadow-lg border border-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
              Support Center
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight drop-shadow-lg">
              Frequently Asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
                Questions
              </span>
            </h2>

            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto mt-4 font-normal drop-shadow">
              Everything you need to know about BoostLab. Can't find answers?{" "}
              <a
                href="#contact"
                className="text-white font-medium hover:text-gray-300 transition-colors underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                Contact our support team
              </a>
              .
            </p>
          </div>

          {/* FAQ list – cards remain the same (white/glass) */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`group relative rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] border-primary/30"
                      : "bg-white/60 backdrop-blur-md border-black/[0.04] hover:border-primary/20 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 md:py-6 text-left flex items-center justify-between gap-4 select-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon container */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center p-2 transition-all duration-300 ${
                          isOpen
                            ? "bg-primary/10 shadow-md shadow-primary/5 scale-110 rotate-3"
                            : "bg-secondary/5 group-hover:bg-primary/5 group-hover:scale-105"
                        }`}
                      >
                        <img 
                          src={faq.icon} 
                          alt="" 
                          className="w-full h-full object-contain pointer-events-none select-none" 
                        />
                      </div>

                      {/* Question text */}
                      <span
                        className={`font-semibold text-base md:text-lg transition-colors duration-200 ${
                          isOpen
                            ? "text-secondary"
                            : "text-secondary/90 group-hover:text-primary"
                        }`}
                      >
                        {faq.q}
                      </span>
                    </div>

                    {/* Arrow indicator */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
                        isOpen
                          ? "bg-primary border-primary text-white rotate-180"
                          : "bg-white border-black/[0.06] text-secondary/60 group-hover:border-primary/30 group-hover:text-primary"
                      }`}
                    >
                      <svg
                        className="w-3.5 h-3.5 stroke-[3]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Answer reveal */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 md:pb-7 pl-6 text-text/70 leading-relaxed border-t border-black/[0.02] mt-1 pt-4">
                        <div className="flex items-start gap-3 bg-secondary/[0.02] p-4 rounded-xl border border-black/[0.01]">
                          <span className="text-primary text-base select-none mt-0.5">
                            💡
                          </span>
                          <p className="text-sm md:text-base font-normal text-secondary/70">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA – adjusted for dark background */}
          <div className="text-center mt-12 bg-white/40 backdrop-blur-sm border border-white/20 rounded-2xl p-5 max-w-xl mx-auto shadow-sm">
            <p className="text-white/80 text-sm">
              Still have questions?{" "}
              <a
                href="#contact"
                className="text-white font-semibold hover:text-gray-300 transition-colors inline-flex items-center gap-1 group"
              >
                Reach out to our team
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};