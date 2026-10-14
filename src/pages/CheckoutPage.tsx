import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Reveal } from '@/components/Reveal';
import {
  ShoppingBag, CheckCircle2, Truck, ShieldCheck, MapPin,
  CreditCard, Wallet, Banknote, Building2, ArrowLeft,
} from 'lucide-react';

const CITIES = [
  'Karachi', 'Lahore', 'Islamabad', 'Faisalabad',
  'Rawalpindi', 'Multan', 'Peshawar', 'Quetta', 'Other',
];

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote, desc: 'Pay when you receive' },
  { id: 'jazzcash', label: 'JazzCash', icon: Wallet, desc: 'Mobile wallet transfer' },
  { id: 'easypaisa', label: 'Easypaisa', icon: CreditCard, desc: 'Mobile wallet transfer' },
  { id: 'bank', label: 'Bank Transfer', icon: Building2, desc: 'Direct bank deposit' },
];

const DELIVERY_FEE = 200;
const FREE_DELIVERY_THRESHOLD = 3000;

export function CheckoutPage() {
  const { items, total, couponDiscount, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderNo, setOrderNo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    city: '',
    address: '',
    notes: '',
  });

  const deliveryFee = total >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const grandTotal = total - couponDiscount + deliveryFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const num = `DGC-${Date.now().toString()}`;
    try {
      const saved = JSON.parse(localStorage.getItem('demo-orders') || '[]');
      localStorage.setItem('demo-orders', JSON.stringify([...saved, { number: num, phone: form.phone, created: new Date().toISOString() }]));
    } catch {
      alert('Order could not be saved. Please allow browser storage and try again.');
      return;
    }
    setOrderNo(num);
    setPlaced(true);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputClass =
    'w-full bg-cream-100 border border-earth-200 rounded-xl px-4 py-3 text-earth-700 placeholder:text-earth-300 focus:outline-none focus:border-ghee-500 focus:ring-1 focus:ring-ghee-500 transition-colors';

  // ─── Empty cart state ───────────────────────────────────────────
  if (items.length === 0 && !placed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-earth-400" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-earth-800">Your cart is empty</h1>
          <p className="text-earth-500 mt-3">
            Add some delicious ghee to your cart before checking out.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-ghee-500 hover:bg-ghee-600 text-earth-900 font-bold px-8 py-4 rounded-xl transition-colors mt-6 shadow-lg shadow-ghee-500/30"
          >
            Browse Products <ArrowLeft size={18} className="rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  // ─── Order confirmation ─────────────────────────────────────────
  if (placed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <Reveal>
          <div className="text-center max-w-lg bg-cream-100 rounded-3xl p-6 sm:p-12 border border-earth-200/40 shadow-lg">
            <div className="w-20 h-20 rounded-full bg-leaf-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={44} className="text-leaf-600" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth-800">
              Preview Order Saved!
            </h1>
            <p className="text-earth-500 mt-3">
              This demonstration order is saved on your device. No payment was charged or shipment booked. You can find it on the order tracking page.
            </p>
            <div className="bg-cream-50 rounded-xl p-4 mt-6 border border-earth-100">
              <p className="text-sm text-earth-400">Your Order Number</p>
              <p className="font-serif text-xl sm:text-2xl font-bold text-ghee-600 mt-1 break-all">{orderNo}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                to="/shop"
                className="flex-1 text-center bg-ghee-500 hover:bg-ghee-600 text-earth-900 font-bold px-6 py-3.5 rounded-xl transition-colors"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="flex-1 text-center bg-earth-700 hover:bg-earth-800 text-cream-100 font-medium px-6 py-3.5 rounded-xl transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  // ─── Checkout form ──────────────────────────────────────────────
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-cream-50 border-b border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth-800">Checkout</h1>
          <p className="text-earth-500 mt-2">Complete your order below</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* LEFT: Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery details */}
            <Reveal>
              <div className="bg-cream-100 rounded-2xl p-5 sm:p-8 border border-earth-200/40 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <MapPin size={22} className="text-ghee-600" />
                  <h2 className="font-serif text-xl font-bold text-earth-800">
                    Delivery Details
                  </h2>
                </div>

                <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+92 300 1234567"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1.5">
                      City
                    </label>
                    <select
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select your city
                      </option>
                      {CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1.5">
                      Address
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={3}
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House #, Street, Area, Landmark"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1.5">
                      Delivery Notes <span className="text-earth-400">(optional)</span>
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any special instructions for delivery..."
                      className={inputClass}
                    />
                  </div>
                </form>
              </div>
            </Reveal>

            {/* Payment method */}
            <Reveal delay={1}>
              <div className="bg-cream-100 rounded-2xl p-5 sm:p-8 border border-earth-200/40 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <CreditCard size={22} className="text-ghee-600" />
                  <h2 className="font-serif text-xl font-bold text-earth-800">
                    Payment Method
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? 'border-ghee-500 bg-ghee-500/5'
                          : 'border-earth-200 hover:border-ghee-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-ghee-500 focus:ring-ghee-400"
                      />
                      <method.icon size={22} className="text-ghee-600 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-earth-700">{method.label}</p>
                        <p className="text-xs text-earth-400">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Order summary */}
          <Reveal delay={2}>
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="bg-cream-100 rounded-2xl p-5 sm:p-6 border border-earth-200/40 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-earth-800 mb-4">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream-200 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-earth-700 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-earth-400">
                          {item.size} × {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-ghee-600 mt-0.5">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-2 pt-4 border-t border-earth-100 text-sm">
                  <div className="flex justify-between text-earth-500">
                    <span>Subtotal</span>
                    <span>Rs. {total.toLocaleString()}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-leaf-600">
                      <span>Discount</span>
                      <span>− Rs. {couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-earth-500">
                    <span>Delivery</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-leaf-600 font-medium">FREE</span>
                      ) : (
                        `Rs. ${deliveryFee.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-earth-800 pt-2 border-t border-earth-100">
                    <span>Total</span>
                    <span className="text-ghee-600">
                      Rs. {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {total < FREE_DELIVERY_THRESHOLD && (
                  <p className="text-xs text-earth-400 mt-3 text-center">
                    Add Rs. {(FREE_DELIVERY_THRESHOLD - total).toLocaleString()} more for
                    FREE delivery
                  </p>
                )}

                <button
                  type="submit"
                  form="checkout-form"
                  className="w-full bg-ghee-500 hover:bg-ghee-600 text-earth-900 font-bold px-6 py-4 rounded-xl transition-colors mt-5 shadow-lg shadow-ghee-500/30"
                >
                  Save Preview Order
                </button>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-5 text-xs text-earth-400 text-center">
                  <span className="flex items-center gap-1">
                    <Truck size={16} className="text-ghee-500" /> Fast Delivery
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={16} className="text-ghee-500" /> Demo checkout · No payment charged
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
