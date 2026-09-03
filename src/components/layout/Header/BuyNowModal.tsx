import React, { useState, useRef, FormEvent, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { Button } from '../../common/Button/Button';

interface BuyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BuyNowModal = ({ isOpen, onClose }: BuyNowModalProps) => {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validate = (): boolean => {
    const { name, phone } = formData;
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
      setSuccess(true);
      setFormData({ name: '', phone: '' });
      // Auto-close after 4 seconds
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 4000);
    }, 120000); // ⬅️ 120 SECONDS (2 minutes)
  };

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSuccess(false);
    setLoading(false);
    setError('');
    setFormData({ name: '', phone: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-text/40 hover:text-text transition text-2xl"
        >
          ✕
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-heading font-bold text-secondary mb-2">
              Thank You!
            </h3>
            <p className="text-text/70 text-sm mb-4">
              We'll call you shortly to complete your order.
            </p>
            <Button variant="accent" size="md" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h3 className="text-xl font-heading font-semibold text-secondary">
                Buy Now – We'll Call You
              </h3>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="buy-name" className="text-xs font-medium text-text/60 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  id="buy-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  disabled={loading}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="buy-phone" className="text-xs font-medium text-text/60 uppercase tracking-wider">
                  Phone Number *
                </label>
                <InputMask
                  id="buy-phone"
                  name="phone"
                  type="tel"
                  mask="+1 (999) 999-9999"
                  maskChar=""
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  disabled={loading}
                />
                <p className="text-[10px] text-text/40 mt-1">Enter your US phone number</p>
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
                    Call Me
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};