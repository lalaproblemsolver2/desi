import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const WHATSAPP_NUMBER = '923001234567';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, coupon, couponDiscount, applyCoupon, removeCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);

  const handleApplyCoupon = () => {
    if (applyCoupon(couponInput)) {
      setCouponError(false);
      setCouponInput('');
    } else {
      setCouponError(true);
    }
  };

  const finalTotal = total - couponDiscount;

  const handleWhatsAppCheckout = () => {
    const orderText = items.map((i) => `• ${i.name} (${i.size}) × ${i.quantity} — Rs. ${(i.price * i.quantity).toLocaleString()}`).join('%0a');
    const msg = encodeURIComponent(`Hi! I'd like to order:%0a%0a${orderText}%0a%0aTotal: Rs. ${finalTotal.toLocaleString()}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-earth-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-cream-100 shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-earth-200/50">
          <h2 className="font-serif text-lg font-bold text-earth-800 flex items-center gap-2">
            <ShoppingBag size={20} className="text-ghee-500" />
            Your Cart ({items.length})
          </h2>
          <button onClick={closeCart} className="p-2 text-earth-500 hover:text-earth-800 transition-colors">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mb-4">
                <ShoppingBag size={36} className="text-earth-300" />
              </div>
              <p className="text-earth-500 mb-2">Your cart is empty</p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="text-ghee-600 hover:text-ghee-700 font-medium text-sm underline"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-cream-50 rounded-xl p-3 border border-earth-100">
                  <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-earth-700 truncate">{item.name}</h3>
                    <p className="text-xs text-earth-400">Size: {item.size}</p>
                    {item.subscribe && (
                      <p className="text-xs text-leaf-500 font-medium">Monthly Subscription (-10%)</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-cream-200 hover:bg-earth-200 flex items-center justify-center transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-cream-200 hover:bg-earth-200 flex items-center justify-center transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-ghee-600">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-earth-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <div className="bg-cream-50 rounded-xl p-3 border border-earth-100">
                {coupon ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-leaf-600 font-medium">Coupon "{coupon}" applied!</span>
                    <button onClick={removeCoupon} className="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => { setCouponInput(e.target.value); setCouponError(false); }}
                        placeholder="Coupon code (try WELCOME10)"
                        className="flex-1 min-w-0 px-3 py-2 text-base sm:text-sm bg-cream-100 border border-earth-200 rounded-lg focus:outline-none focus:border-ghee-500"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-earth-700 hover:bg-earth-800 text-cream-100 text-sm font-medium rounded-lg transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-xs text-red-500 mt-1">Invalid coupon code</p>}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-earth-200/50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-3">
            {couponDiscount > 0 && (
              <div className="flex justify-between text-sm text-leaf-600">
                <span>Discount ({coupon})</span>
                <span>- Rs. {couponDiscount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-earth-600">Subtotal</span>
              <span className="font-serif text-xl font-bold text-ghee-600">Rs. {total.toLocaleString()}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between items-center font-bold">
                <span className="text-earth-700">Total</span>
                <span className="font-serif text-xl text-leaf-600">Rs. {finalTotal.toLocaleString()}</span>
              </div>
            )}
            <div className="flex gap-2">
              <Link
                to="/checkout"
                onClick={closeCart}
                className="flex-1 bg-ghee-500 hover:bg-ghee-600 text-earth-900 text-sm font-bold px-4 py-3 rounded-xl text-center transition-colors"
              >
                Checkout
              </Link>
              <button
                onClick={handleWhatsAppCheckout}
                className="bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-bold px-4 py-3 rounded-xl transition-colors flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>
            </div>
            <p className="text-xs text-earth-400 text-center">Free delivery in Karachi on orders above Rs. 3,000</p>
          </div>
        )}
      </div>
    </>
  );
}
