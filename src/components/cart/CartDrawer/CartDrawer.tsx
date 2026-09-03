import React, { useRef, useEffect, useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { Button } from '../../common/Button/Button';
import { CheckoutModal } from '../CheckoutModal/CheckoutModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on outside click – BUT only if checkout is NOT open
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // If checkout modal is open, don't close the drawer
      if (isCheckoutOpen) return;
      
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isCheckoutOpen, onClose]); // ✅ Add isCheckoutOpen dependency

  // Close checkout modal when cart closes
  useEffect(() => {
    if (!isOpen) {
      setIsCheckoutOpen(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity">
        <div
          ref={drawerRef}
          className={`
            absolute top-0 h-full bg-bg shadow-xl p-4 sm:p-6 overflow-y-auto transform transition-transform
            w-full sm:max-w-md
            right-0
          `}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-secondary">
              Your Cart ({totalItems})
            </h2>
            <button onClick={onClose} className="text-2xl text-text/50 hover:text-text">
              ✕
            </button>
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <p className="text-text/60 text-center py-12 text-sm sm:text-base">
              Your cart is empty.
            </p>
          ) : (
            <>
              <ul className="space-y-3 sm:space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">{item.name}</h4>
                        <p className="text-primary font-semibold text-sm sm:text-base">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 border border-border rounded hover:bg-primary/10 flex items-center justify-center text-sm sm:text-base"
                      >
                        −
                      </button>
                      <span className="w-6 sm:w-8 text-center text-sm sm:text-base font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 border border-border rounded hover:bg-primary/10 flex items-center justify-center text-sm sm:text-base"
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Total */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-between font-bold text-base sm:text-lg">
                  <span>Total</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="mt-4 space-y-2">
                  <Button variant="accent" fullWidth size="lg" onClick={handleCheckout}>
                    Checkout →
                  </Button>
                  <Button variant="secondary" fullWidth size="sm" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Checkout Modal – rendered outside the drawer */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
};