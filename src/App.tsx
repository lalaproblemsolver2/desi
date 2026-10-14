import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { HomePage } from '@/pages/HomePage';
import { ShopPage } from '@/pages/ShopPage';
import { ProcessPage } from '@/pages/ProcessPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { ContactPage } from '@/pages/ContactPage';
import { BlogPage } from '@/pages/BlogPage';
import { BlogPostPage } from '@/pages/BlogPostPage';
import { InfoPage, FAQPage, TrackOrderPage } from '@/pages/InfoPages';

function Site() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <AnnouncementBar /><Header />
    <main id="main-content"><Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/product/:slug" element={<ProductDetailPage />} />
      <Route path="/process" element={<ProcessPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<BlogPostPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/track-order" element={<TrackOrderPage />} />
      {['about', 'lab-reports', 'privacy-policy', 'return-policy'].map(path => <Route key={path} path={`/${path}`} element={<InfoPage kind={path} />} />)}
      <Route path="*" element={<div className="text-center py-24"><h1 className="text-4xl mb-6">Page not found</h1><Link className="text-ghee-600 underline" to="/">Return home</Link></div>} />
    </Routes></main>
    <Footer /><CartDrawer /><WhatsAppFloat />
  </>;
}
export default function App() {
  return <BrowserRouter><LanguageProvider><CartProvider><Site /></CartProvider></LanguageProvider></BrowserRouter>;
}
