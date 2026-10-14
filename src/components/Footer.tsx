import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-earth-900 text-cream-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ghee-400 to-ghee-600 flex items-center justify-center">
                <span className="font-serif text-xl font-bold text-earth-900">G</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-cream-100 block leading-none">Desi Ghee Co.</span>
                <span className="text-xs text-ghee-400">Pure. Traditional. Bilona.</span>
              </div>
            </div>
            <p className="text-sm text-cream-200/80 leading-relaxed">
              100% pure organic Desi Ghee made with the traditional Bilona method. From our family farm to your kitchen — the way our grandmothers did.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-earth-700 hover:bg-ghee-500 flex items-center justify-center transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-earth-700 hover:bg-ghee-500 flex items-center justify-center transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-earth-700 hover:bg-ghee-500 flex items-center justify-center transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-base font-semibold text-ghee-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-ghee-400 transition-colors">Shop All Products</Link></li>
              <li><Link to="/process" className="hover:text-ghee-400 transition-colors">Our Bilona Process</Link></li>
              <li><Link to="/about" className="hover:text-ghee-400 transition-colors">About Our Farm</Link></li>
              <li><Link to="/lab-reports" className="hover:text-ghee-400 transition-colors">Lab Reports & Purity</Link></li>
              <li><Link to="/blog" className="hover:text-ghee-400 transition-colors">Blog & Recipes</Link></li>
              <li><Link to="/track-order" className="hover:text-ghee-400 transition-colors">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-serif text-base font-semibold text-ghee-400 mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:text-ghee-400 transition-colors">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-ghee-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/return-policy" className="hover:text-ghee-400 transition-colors">Return & Refund Policy</Link></li>
              <li><Link to="/contact" className="hover:text-ghee-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/track-order" className="hover:text-ghee-400 transition-colors">Order Tracking</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-semibold text-ghee-400 mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-ghee-400 mt-0.5 shrink-0" />
                <span>123 Farm Road, Gulshan-e-Iqbal, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-ghee-400 shrink-0" />
                <a href="tel:+923001234567" className="hover:text-ghee-400 transition-colors">+92 300 1234567</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-ghee-400 shrink-0" />
                <a href="mailto:hello@desigheeco.pk" className="hover:text-ghee-400 transition-colors">hello@desigheeco.pk</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-ghee-400 shrink-0" />
                <span>Mon - Sat: 9am - 7pm</span>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-cream-200/60 mt-10 border-t border-earth-700/50 pt-5">Storefront preview · Sample catalogue, reviews, and contact details. Checkout saves demonstration orders on this device.</p>
        {/* Payment methods */}
        <div className="mt-12 pt-8 border-t border-earth-700/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-cream-200/60">We Accept:</span>
              <span className="text-xs bg-earth-700 px-3 py-1.5 rounded">COD</span>
              <span className="text-xs bg-earth-700 px-3 py-1.5 rounded">JazzCash</span>
              <span className="text-xs bg-earth-700 px-3 py-1.5 rounded">Easypaisa</span>
              <span className="text-xs bg-earth-700 px-3 py-1.5 rounded">Bank Transfer</span>
              <span className="text-xs bg-earth-700 px-3 py-1.5 rounded">Visa / Mastercard</span>
            </div>
            <p className="text-xs text-cream-200/60 text-center sm:text-right">
              © 2026 Desi Ghee Co. All rights reserved. Made with love in Pakistan.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
