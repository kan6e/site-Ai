import React, { useState, useRef, FormEvent, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { Button } from '../../common/Button/Button';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // 🆕 Store order details before clearing cart
  const [orderDetails, setOrderDetails] = useState<{
    name: string;
    address: string;
    phone: string;
    items: typeof items;
    total: number;
  } | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validate = (): boolean => {
    const { name, address, phone } = formData;
    if (!name.trim()) {
      setError('Name is required.');
      return false;
    }
    if (!address.trim()) {
      setError('Address is required.');
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

    // 🆕 Save order details BEFORE clearing cart
    setOrderDetails({
      name: formData.name.trim(),
      address: formData.address.trim(),
      phone: formData.phone.trim(),
      items: [...items], // copy current items
      total: totalPrice,
    });

    setLoading(true);
    setError('');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Clear cart AFTER saving details
      clearCart();
    }, 3000); // 120 seconds delay
  };

  const handleHomeClick = () => {
    setSuccess(false);
    setOrderDetails(null);
    setFormData({ name: '', address: '', phone: '' });
    onClose();
    navigate('/');
  };

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSuccess(false);
    setLoading(false);
    setError('');
    setFormData({ name: '', address: '', phone: '' });
    setOrderDetails(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 max-w-md w-full relative max-h-[90vh] overflow-y-auto border border-white/30"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-text/40 hover:text-text transition text-2xl z-10"
        >
          ✕
        </button>

        {success && orderDetails ? (
          // ✅ SUCCESS STATE – uses saved orderDetails
          <div className="text-center py-4">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-secondary mb-2">
              Order Confirmed!
            </h3>
            <p className="text-text/60 text-sm mb-6">
              Thank you for your order. We'll deliver it to:
            </p>

            {/* Delivery details */}
            <div className="bg-bg/80 rounded-xl p-4 md:p-6 text-left space-y-2 mb-6 border border-border/50">
              <div className="flex items-start gap-2">
                <span className="text-primary text-sm font-medium w-16">Name:</span>
                <span className="text-secondary font-medium">{orderDetails.name}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary text-sm font-medium w-16">Address:</span>
                <span className="text-secondary">{orderDetails.address}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary text-sm font-medium w-16">Phone:</span>
                <span className="text-secondary">{orderDetails.phone}</span>
              </div>
              <div className="border-t border-border/50 pt-3 mt-2">
                <div className="flex items-start gap-2">
                  <span className="text-primary text-sm font-medium w-16">Items:</span>
                  <span className="text-secondary">
                    {orderDetails.items.map((item) => (
                      <span key={item.id} className="block text-sm">
                        {item.name} × {item.quantity} – ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-border/50">
                <span className="text-primary text-sm font-medium w-16">Total:</span>
                <span className="text-xl font-bold text-accent">${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>

            <Button variant="accent" size="lg" fullWidth onClick={handleHomeClick}>
              🏠 Home
            </Button>
          </div>
        ) : (
          // 📝 FORM STATE
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-primary rounded-full"></div>
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-secondary">
                Delivery Details
              </h3>
            </div>

            {/* Order summary mini */}
            <div className="bg-bg/80 rounded-xl p-4 mb-6 border border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-text/60">Items:</span>
                <span className="font-medium text-secondary">
                  {items.length} products
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text/60">Total:</span>
                <span className="font-bold text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="checkout-name" className="text-xs font-medium text-text/60 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  id="checkout-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  disabled={loading}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-address" className="text-xs font-medium text-text/60 uppercase tracking-wider">
                  Delivery Address *
                </label>
                <input
                  id="checkout-address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St, City, ZIP"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  disabled={loading}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-phone" className="text-xs font-medium text-text/60 uppercase tracking-wider">
                  Phone Number *
                </label>
                <InputMask
                  id="checkout-phone"
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
                className="mt-4"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Place Order
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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