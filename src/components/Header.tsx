import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Globe } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LanguageContext';
import { products } from '@/data/products';

const WHATSAPP_NUMBER = '923001234567';

const navLinks = [
  { to: '/', labelEn: 'Home', labelUr: 'صفحہ اول' },
  { to: '/shop', labelEn: 'Shop', labelUr: 'خریداری' },
  { to: '/process', labelEn: 'Our Process', labelUr: 'ہمارا طریقہ' },
  { to: '/about', labelEn: 'About Us', labelUr: 'ہمارے بارے میں' },
  { to: '/lab-reports', labelEn: 'Lab Reports', labelUr: 'لیب رپورٹس' },
  { to: '/blog', labelEn: 'Blog', labelUr: 'بلاگ' },
  { to: '/contact', labelEn: 'Contact', labelUr: 'رابطہ' },
];

export function Header() {
  const { itemCount, openCart } = useCart();
  const { lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const searchResults = searchQuery
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-cream-100/95 backdrop-blur-md shadow-lg shadow-earth-900/5'
            : 'bg-cream-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-earth-700"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-ghee-400 to-ghee-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="font-serif text-xl lg:text-2xl font-bold text-earth-900">G</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-serif text-lg lg:text-xl font-bold text-earth-800 leading-none block">Desi Ghee Co.</span>
                <span className="text-xs text-ghee-600 leading-none">Pure. Traditional. Bilona.</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium whitespace-nowrap transition-colors relative group ${
                    location.pathname === link.to
                      ? 'text-ghee-600'
                      : 'text-earth-600 hover:text-ghee-600'
                  }`}
                >
                  {lang === 'en' ? link.labelEn : link.labelUr}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-ghee-500 transition-all duration-300 ${
                    location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-0.5 sm:gap-2 xl:gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-earth-600 hover:text-ghee-600 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <button
                onClick={toggle}
                className="p-2 text-earth-600 hover:text-ghee-600 transition-colors flex items-center gap-1"
                aria-label="Switch language"
              >
                <Globe size={20} />
                <span className="text-xs font-medium">{lang === 'en' ? 'UR' : 'EN'}</span>
              </button>

              <button
                onClick={openCart}
                className="relative p-2 text-earth-600 hover:text-ghee-600 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-ghee-500 text-earth-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="hidden xl:inline">Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-cream-100 shadow-lg border-t border-earth-200/50 animate-fade-in">
            <div className="max-w-3xl mx-auto px-4 py-4 max-h-[70vh] overflow-y-auto">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-earth-400" />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for ghee, makhan, gift boxes..."
                    className="w-full pl-10 pr-4 py-3 bg-cream-50 border border-earth-200 rounded-xl text-base text-earth-700 focus:outline-none focus:border-ghee-500"
                  />
                </div>
              </form>
              {searchResults.length > 0 && (
                <div className="mt-3 space-y-2">
                  {searchResults.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 p-2 hover:bg-cream-200 rounded-lg transition-colors"
                    >
                      <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-medium text-earth-700">{p.name}</p>
                        <p className="text-xs text-ghee-600">Rs. {p.priceFrom.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-earth-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-cream-100 shadow-2xl animate-slide-in-right p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <span className="font-serif text-lg font-bold text-earth-800">Menu</span>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-earth-600">
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'bg-ghee-500/10 text-ghee-600'
                      : 'text-earth-600 hover:bg-cream-200'
                  }`}
                >
                  {lang === 'en' ? link.labelEn : link.labelUr}
                </Link>
              ))}
              <Link
                to="/track-order"
                className="px-4 py-3 rounded-xl text-sm font-medium text-earth-600 hover:bg-cream-200 transition-colors"
              >
                Track Order
              </Link>
              <Link
                to="/faq"
                className="px-4 py-3 rounded-xl text-sm font-medium text-earth-600 hover:bg-cream-200 transition-colors"
              >
                FAQ
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-medium px-4 py-3 rounded-xl"
              >
                Order on WhatsApp
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
