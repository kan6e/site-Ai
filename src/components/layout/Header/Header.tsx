import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../common/Container/Container';
import { Button } from '../../common/Button/Button';
import { useCart } from '../../../context/CartContext';
import { CartDrawer } from '../../cart/CartDrawer/CartDrawer';
import { BuyNowModal } from './BuyNowModal';

export const Header = () => {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  const navLinks = [
    { path: '#hero', label: 'Home' },
    { path: '#whyus', label: 'Why Us' },
    { path: '#products', label: 'Products' },
    { path: '#faq', label: 'FAQ' },
    { path: '#testimonials', label: 'Testimonials' },
    { path: '#contact', label: 'Contact' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId) as HTMLElement;
    if (target) {
      const headerOffset = 70;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="border-b border-border bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="text-xl sm:text-2xl font-heading font-bold text-secondary whitespace-nowrap">
              <span className="text-primary">Boost</span>Lab
            </Link>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleScroll(e, link.path)}
                  className="text-sm text-text/70 hover:text-primary transition cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="accent"
                size="sm"
                className="hidden sm:inline-flex text-sm"
                onClick={() => setIsBuyModalOpen(true)}
              >
                Buy Now
              </Button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 sm:p-2 text-text/70 hover:text-primary transition"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden pb-4 flex flex-col gap-2 sm:gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleScroll(e, link.path)}
                  className="text-sm sm:text-base text-text/70 hover:text-primary transition py-1.5 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
              <Button
                variant="accent"
                size="sm"
                fullWidth
                className="mt-2"
                onClick={() => setIsBuyModalOpen(true)}
              >
                Buy Now
              </Button>
            </nav>
          )}
        </Container>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <BuyNowModal isOpen={isBuyModalOpen} onClose={() => setIsBuyModalOpen(false)} />
    </>
  );
};