import React, { useState, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { Container } from '../../common/Container/Container';
import { Button } from '../../common/Button/Button';

// Inline SVG icons (no external library needed)
const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, phone: value }));
    if (error) setError('');
  };

  const validate = (): boolean => {
    const { name, phone, message } = formData;
    if (!name.trim()) {
      setError('Name is required.');
      return false;
    }
    if (!phone.trim()) {
      setError('Phone number is required.');
      return false;
    }
    const phoneDigits = phone.replace(/[^\d]/g, '');
    if (phoneDigits.length < 11) {
      setError('Please enter a complete phone number with area code.');
      return false;
    }
    if (!message.trim()) {
      setError('Message is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      setFormData({ name: '', phone: '', message: '' });
      setShowModal(true);
    }, 2000);
  };

  const handleHomeClick = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background photo – city lights */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://media.gettyimages.com/id/2236748508/photo/city-lights-usa-northeatern.jpg?s=612x612&w=0&k=20&c=q1UiouIBxLcy2694ZnIuhcpjGVFya7t7fd-ql06bgJ4=')`,
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-start z-10">
          {/* Left – Text (glass card) */}
          <div className="space-y-6 bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/50">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Get in touch
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-secondary leading-tight">
              Need Help? <br />
              <span className="text-primary">We're Here</span>
            </h2>

            <p className="text-text/80 text-base md:text-lg max-w-sm leading-relaxed">
              Have questions about our products, orders, or anything else? 
              Reach out – our team is ready to assist you.
            </p>

            <div className="space-y-3 pt-2">
              {/* Phone */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-bg/80 hover:bg-primary/5 transition group cursor-default">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-xs text-text/50 uppercase tracking-wider">Phone</p>
                  <p className="text-sm md:text-base font-medium text-secondary">+1 (000) 000-0000</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-bg/80 hover:bg-primary/5 transition group cursor-default">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition">
                  <EnvelopeIcon />
                </div>
                <div>
                  <p className="text-xs text-text/50 uppercase tracking-wider">Email</p>
                  <p className="text-sm md:text-base font-medium text-secondary">hello@boostlab.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-bg/80 hover:bg-primary/5 transition group cursor-default">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition">
                  <MapPinIcon />
                </div>
                <div>
                  <p className="text-xs text-text/50 uppercase tracking-wider">Address</p>
                  <p className="text-sm md:text-base font-medium text-secondary">123 Fitness Ave, NYC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right – Form (glass card) */}
          <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/50">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h3 className="text-xl font-heading font-semibold text-secondary">
                Send us a message
              </h3>
            </div>

            {error && (
              <div className="mb-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-text/60 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition placeholder:text-text/30"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-medium text-text/60 uppercase tracking-wider">
                    Phone *
                  </label>
                  <InputMask
                    id="phone"
                    name="phone"
                    type="tel"
                    mask="+1 (999) 999-9999"
                    maskChar=""
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition placeholder:text-text/30"
                    disabled={loading}
                  />
                  <p className="text-[10px] text-text/40 mt-1">Enter your US phone number</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium text-text/60 uppercase tracking-wider">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition placeholder:text-text/30 resize-y"
                  disabled={loading}
                />
              </div>

              <Button
                variant="accent"
                size="lg"
                fullWidth
                type="submit"
                disabled={loading}
                className="mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </Container>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full mx-4 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-3">
              Thanks for reaching out!
            </h3>
            <p className="text-text/70 text-sm md:text-base mb-6">
              We've received your message and will get back to you shortly.
            </p>
            <Button variant="accent" size="lg" fullWidth onClick={handleHomeClick}>
              Home
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};