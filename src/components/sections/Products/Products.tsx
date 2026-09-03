import React from 'react';
import { Container } from '../../common/Container/Container';
import { Button } from '../../common/Button/Button';
import { useCart } from '../../../context/CartContext';

const products = [
  {
    id: '1',
    name: 'Whey Protein Isolate',
    description: 'Pure protein with zero carbs. Perfect for lean muscle growth.',
    price: 49.99,
    discount: 20,
    image: 'https://deliherb.ru/files/products/27514_85.1024x768w.jpg',
    recommended: true,
  },
  {
    id: '2',
    name: 'Plant-Based Protein',
    description: 'Vegan protein blend with all essential amino acids.',
    price: 54.99,
    discount: 15,
    image: 'https://deliherb.ru/files/products/27514_85.1024x768w.jpg',
    recommended: false,
  },
  {
    id: '3',
    name: 'Casein Protein',
    description: 'Slow-release protein for overnight muscle recovery.',
    price: 44.99,
    discount: 10,
    image: 'https://deliherb.ru/files/products/27514_85.1024x768w.jpg',
    recommended: true,
  },
];

export const Products = () => {
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price * (1 - product.discount / 100),
      image: product.image,
    });
  };

  return (
    <section id="products" className="relative py-24 md:py-32 overflow-hidden">
      {/* 🎨 ATTRACTIVE GRADIENT BACKGROUND – no broken SVG */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500" />
      
      {/* Subtle glow blobs for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <Container>
        {/* Section header – white text for contrast */}
        <div className="text-center mb-16 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-5 shadow-lg border border-white/30">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            🔥 Premium Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white tracking-tight leading-tight drop-shadow-lg">
            Our <span className="bg-gradient-to-r from-yellow-200 to-orange-300 bg-clip-text text-transparent">Best Sellers</span>
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto mt-4 font-normal drop-shadow">
            High-quality protein supplements engineered to fuel your fitness journey and optimize results.
          </p>
        </div>

        {/* Product cards – COMPLETELY UNCHANGED (white cards, same prices, same badges) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">
          {products.map((product) => {
            const discountedPrice = product.price * (1 - product.discount / 100);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border/30 hover:border-primary/30 flex flex-col"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-bg/80 aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Save badge */}
                  {product.discount > 0 && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1 border border-white/20">
                        <span>🔥</span> Save -{product.discount}%
                      </div>
                    </div>
                  )}

                  {/* Recommended badge */}
                  {product.recommended && (
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1 border border-white/20">
                        <span>⭐</span> Recommended
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      Quick Add
                    </Button>
                  </div>
                </div>

                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg md:text-xl font-heading font-semibold text-secondary mb-1">
                      {product.name}
                    </h3>
                    {product.discount > 0 && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                        -{product.discount}%
                      </span>
                    )}
                  </div>
                  <p className="text-text/60 text-sm mb-4 flex-1">
                    {product.description}
                  </p>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-2xl font-bold text-primary">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-text/40 text-sm line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    variant="accent"
                    size="md"
                    fullWidth
                    onClick={() => handleAddToCart(product)}
                    className="group/btn relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Add to Cart
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};