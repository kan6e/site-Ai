import React from "react";
import { Container } from "../../common/Container/Container";
import { Button } from "../../common/Button/Button";
import { useCart } from "../../../context/CartContext";

// Inline SVG icons for trust indicators
const StarIcon = () => (
  <svg className="w-4 h-4 text-yellow-300 fill-current" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-green-300"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const TrophyIcon = () => (
  <svg
    className="w-4 h-4 text-blue-300"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

export const Hero = () => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: "1",
      name: "BoostLab Energy Drink",
      price: 29.99,
      image: "https://deliherb.ru/files/products/27514_85.1024x768w.jpg",
    });
  };

  const handleShopNow = () => {
    const target = document.querySelector("#products");
    if (target) {
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Vibrant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />

      {/* Decorative glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="relative z-10 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-4 md:space-y-6 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/30 shadow-sm mx-auto md:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              ⚡ Best Seller – 10k+ Sold
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight drop-shadow-lg">
              Fuel Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-300 relative inline-block">
                Performance
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-300/50 rounded-full"></span>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 max-w-md mx-auto md:mx-0 leading-relaxed drop-shadow">
              Premium sports drinks and supplements crafted to boost your
              energy, endurance, and recovery.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start pt-2">
              <Button
                size="lg"
                onClick={handleShopNow}
                className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-primary to-primary/80 text-white border-0 hover:from-primary/90 hover:to-primary/70"
              >
                Shop Now
              </Button>
              <Button
                variant="accent"
                size="lg"
                onClick={handleAddToCart}
                className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-accent to-orange-500 text-white border-0"
              >
                Add to Cart – $29.99
              </Button>
            </div>

            {/* Trust indicators – NOW WITH SVG ICONS */}
            <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start pt-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <StarIcon />
                <span className="text-white text-sm">4.9/5</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <CheckIcon />
                <span className="text-white text-sm">100% Natural</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <TrophyIcon />
                <span className="text-white text-sm">Pro Trusted</span>
              </div>
            </div>
          </div>

          {/* Right – image with floating animation */}
          <div className="flex justify-center relative z-10">
            <div className="relative animate-float">
              {/* Glass glow behind image */}
              <div className="absolute inset-0 bg-white/30 rounded-full blur-3xl scale-90 -z-10"></div>
              <div className="absolute -inset-2 bg-gradient-to-br from-white/40 to-primary/10 rounded-3xl blur-2xl -z-10"></div>

              {/* Image with glass border */}
              <div className="relative p-1 rounded-3xl bg-gradient-to-br from-white/50 to-white/10 backdrop-blur-sm shadow-2xl">
                <img
                  src="https://deliherb.ru/files/products/27514_85.1024x768w.jpg"
                  alt="Sports drink and supplements"
                  className="w-full max-w-md aspect-square object-cover rounded-2xl 
                             transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-black/80 backdrop-blur-sm text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xl border border-white/20">
                🔥 20% OFF
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Custom CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
