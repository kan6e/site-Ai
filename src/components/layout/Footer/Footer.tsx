import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../common/Container/Container';
import { Button } from '../../common/Button/Button';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/instagram.svg', label: 'Instagram', url: '#' },
    { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/x.svg', label: 'Twitter / X', url: '#' },
    { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/facebook.svg', label: 'Facebook', url: '#' },
    { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/youtube.svg', label: 'YouTube', url: '#' },
    { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/linkedin.svg', label: 'LinkedIn', url: '#' },
  ];

  const paymentIcons = [
    'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/visa.svg',
    'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/mastercard.svg',
    'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/paypal.svg',
    'https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/stripe.svg',
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />

      {/* Decorative glow blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <Container>
        <div className="relative z-10 pt-14 pb-6">
          {/* Main footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-10 border-b border-white/10">
            {/* Brand column */}
            <div className="space-y-4">
              <Link
                to="/"
                className="text-2xl font-heading font-bold text-white inline-block hover:text-accent transition-colors duration-300"
              >
                <span className="text-primary">Boost</span>Lab
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Premium sports drinks and supplements crafted to boost your energy, endurance, and recovery.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-white/5 rounded-full text-gray-300 text-xs border border-white/10">
                  🏆 10k+ Customers
                </span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-gray-300 text-xs border border-white/10">
                  ⭐ 4.9/5 Rating
                </span>
              </div>
            </div>

            {/* Quick links – Shop */}
            <div>
              <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
                Shop
              </h4>
              <ul className="space-y-2.5">
                {['Drinks', 'Powders', 'Bundles', 'Best Sellers', 'New Arrivals'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links – Support */}
            <div>
              <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
                Support
              </h4>
              <ul className="space-y-2.5">
                {['FAQs', 'Shipping Info', 'Returns', 'Contact Us', 'Track Order'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-primary transition-all duration-200 text-sm hover:translate-x-1 inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-5">
              <div>
                <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-3">
                  Stay in Touch
                </h4>
                <p className="text-gray-400 text-xs mb-3">
                  Subscribe for exclusive offers and updates.
                </p>
                {/* Responsive form: stacks on small screens, side‑by‑side on larger */}
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition w-full sm:w-auto"
                    required
                  />
                  <Button
                    type="submit"
                    variant="accent"
                    size="sm"
                    className="px-4 py-2.5 whitespace-nowrap text-xs font-semibold w-full sm:w-auto"
                  >
                    {subscribed ? '✓ Subscribed' : 'Subscribe'}
                  </Button>
                </form>
                {subscribed && (
                  <p className="text-green-400 text-xs mt-1 animate-pulse">
                    ✓ Thanks for subscribing!
                  </p>
                )}
              </div>

              {/* Social links - wrap on small screens */}
              <div>
                <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-3">
                  Follow Us
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 group"
                    >
                      <img
                        src={social.icon}
                        alt={social.label}
                        className="w-5 h-5 object-contain filter brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs text-center sm:text-left">
              &copy; {year} <span className="text-gray-300">BoostLab</span>. All rights reserved.
            </p>

            {/* Payment badges - wrap on small screens */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-500 text-[10px] uppercase tracking-wider">
                Secure Payments
              </span>
              <div className="flex flex-wrap gap-2">
                {paymentIcons.map((icon, i) => (
                  <span
                    key={i}
                    className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center p-1.5 hover:border-white/30 transition-all duration-200"
                  >
                    <img
                      src={icon}
                      alt="Payment method"
                      className="w-full h-full object-contain filter brightness-0 invert opacity-40 hover:opacity-80 transition-opacity"
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gray-500 hover:text-accent text-xs flex items-center gap-1 transition-colors duration-200 group"
            >
              <span>Back to top</span>
              <span className="group-hover:translate-y-[-2px] transition-transform duration-200">↑</span>
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};