import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProduct, getRelatedProducts } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { useCart } from '@/context/CartContext';
import { reviews } from '@/data/reviews';
import {
  ShoppingBag, Check, Truck, ShieldCheck, RotateCcw, Star,
  Heart, Share2, Minus, Plus, ChevronRight,
} from 'lucide-react';

const WHATSAPP_NUMBER = '923001234567';

export function ProductDetailPage() {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  const { addItem, closeCart } = useCart();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] ?? null);
  const [quantity, setQuantity] = useState(1);
  const [subscribe, setSubscribe] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'benefits' | 'reviews'>('description');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSelectedSize(product?.sizes[0] ?? null);
    setSelectedImage(0);
    setQuantity(1);
    setSubscribe(false);
    setAdded(false);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-earth-700">Product not found</h1>
          <Link to="/shop" className="text-ghee-600 hover:underline mt-2 inline-block">Back to shop</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.slug);
  const productReviews = reviews.filter((r) => r.product === product.name);

  const finalPrice = subscribe ? Math.round(selectedSize!.price * 0.9) : selectedSize!.price;

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize!.label}${subscribe ? '-subscription' : ''}`,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      size: selectedSize!.label,
      price: finalPrice,
      quantity,
      subscribe,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    closeCart();
    navigate('/checkout');
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hi! I'd like to order: ${product.name} (${selectedSize!.label}) × ${quantity} — Rs. ${(finalPrice * quantity).toLocaleString()}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-earth-400 min-w-0">
          <Link to="/" className="hover:text-ghee-600">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-ghee-600">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-earth-700 truncate">{product.name}</span>
        </nav>
      </div>

      {/* Product section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image gallery */}
          <div className="w-full max-w-xl mx-auto md:max-w-none md:sticky md:top-24 md:self-start">
            <div className="relative rounded-3xl overflow-hidden bg-cream-200 aspect-square mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-ghee-500 text-earth-900 text-sm font-semibold px-4 py-2 rounded-full shadow-md">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? 'border-ghee-500' : 'border-earth-200 hover:border-ghee-300'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(product.rating) ? 'text-ghee-500 fill-ghee-500' : 'text-earth-200'}
                />
              ))}
              <span className="text-sm text-earth-400 ml-1">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-earth-800 leading-tight">{product.name}</h1>
            <p className="text-earth-500 mt-3 leading-relaxed">{product.shortDescription}</p>

            {/* Size selector */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-earth-700 mb-2">Select Size</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    disabled={size.stock === 0}
                    className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      selectedSize?.label === size.label
                        ? 'border-ghee-500 bg-ghee-500/10 text-ghee-700'
                        : 'border-earth-200 text-earth-600 hover:border-ghee-300'
                    } ${size.stock === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {size.label}
                    <span className="block text-xs text-earth-400">Rs. {size.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription option */}
            <div className="mt-4 p-4 bg-leaf-500/5 border border-leaf-500/20 rounded-xl">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                  className="w-5 h-5 rounded border-earth-300 text-leaf-500 focus:ring-leaf-400"
                />
                <div>
                  <span className="text-sm font-medium text-leaf-700">Subscribe & Save 10%</span>
                  <p className="text-xs text-earth-400">Deliver every month • Pause or cancel anytime</p>
                </div>
              </label>
            </div>

            {/* Quantity + Price */}
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-cream-200 rounded-xl p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 rounded-lg bg-cream-100 hover:bg-cream-300 flex items-center justify-center transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-semibold text-earth-700">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-9 rounded-lg bg-cream-100 hover:bg-cream-300 flex items-center justify-center transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-ghee-600">
                  Rs. {(finalPrice * quantity).toLocaleString()}
                </p>
                {subscribe && (
                  <p className="text-xs text-leaf-600 font-medium">Includes 10% subscription discount</p>
                )}
              </div>
            </div>

            {/* Stock status */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
              {selectedSize && selectedSize.stock > 0 ? (
                <>
                  <Check size={16} className="text-leaf-600" />
                  <span className="text-leaf-600 font-medium">In Stock</span>
                  {selectedSize.stock <= 10 && (
                    <span className="text-red-500">— Only {selectedSize.stock} left!</span>
                  )}
                </>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-earth-700 hover:bg-earth-800 text-cream-100 font-bold px-4 sm:px-6 py-3.5 sm:py-4 whitespace-nowrap rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {added ? <><Check size={20} /> Added!</> : <><ShoppingBag size={20} /> Add to Cart</>}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-ghee-500 hover:bg-ghee-600 text-earth-900 font-bold px-4 sm:px-6 py-3.5 sm:py-4 whitespace-nowrap rounded-xl transition-colors"
                >
                  Buy Now
                </button>
              </div>
              <button
                onClick={handleWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order on WhatsApp
              </button>
            </div>

            {/* Quick actions */}
            <div className="flex gap-4 mt-4 text-sm">
              <button className="flex items-center gap-1.5 text-earth-500 hover:text-ghee-600 transition-colors">
                <Heart size={16} /> Wishlist
              </button>
              <button className="flex items-center gap-1.5 text-earth-500 hover:text-ghee-600 transition-colors">
                <Share2 size={16} /> Share
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-earth-100">
              <div className="text-center">
                <Truck size={24} className="text-ghee-500 mx-auto mb-1" />
                <p className="text-xs text-earth-500">Free delivery over Rs. 3,000</p>
              </div>
              <div className="text-center">
                <ShieldCheck size={24} className="text-ghee-500 mx-auto mb-1" />
                <p className="text-xs text-earth-500">100% Pure & Lab Tested</p>
              </div>
              <div className="text-center">
                <RotateCcw size={24} className="text-ghee-500 mx-auto mb-1" />
                <p className="text-xs text-earth-500">Easy returns within 7 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 lg:mt-16">
          <div className="flex gap-1 border-b border-earth-200 mb-6 overflow-x-auto scrollbar-hide">
            {(['description', 'benefits', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-5 py-3 text-sm font-medium whitespace-nowrap shrink-0 border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? 'border-ghee-500 text-ghee-600'
                    : 'border-transparent text-earth-500 hover:text-earth-700'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${productReviews.length || product.reviewCount})` : tab}
              </button>
            ))}
          </div>

          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none">
                <p className="text-earth-600 leading-relaxed">{product.description}</p>
                <h4 className="font-serif text-lg font-semibold text-earth-800 mt-6 mb-2">How It's Made</h4>
                <p className="text-earth-600 leading-relaxed">{product.howMade}</p>
                <h4 className="font-serif text-lg font-semibold text-earth-800 mt-6 mb-2">Storage Instructions</h4>
                <p className="text-earth-600 leading-relaxed">{product.storage}</p>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div className="space-y-3">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-cream-50 rounded-xl border border-earth-100">
                    <div className="w-8 h-8 rounded-full bg-leaf-500/10 flex items-center justify-center shrink-0">
                      <Check size={16} className="text-leaf-600" />
                    </div>
                    <span className="text-earth-700">{benefit}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {productReviews.length > 0 ? (
                  productReviews.map((review) => (
                    <div key={review.id} className="p-5 bg-cream-50 rounded-xl border border-earth-100">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <p className="font-medium text-earth-700">{review.name}</p>
                          <p className="text-xs text-earth-400">{review.city} • {review.date}</p>
                        </div>
                        <div className="ml-auto flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < review.rating ? 'text-ghee-500 fill-ghee-500' : 'text-earth-200'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-earth-600 text-sm">{review.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-earth-400">Reviews are loading from our verified customers.</p>
                    <p className="text-earth-400 text-sm mt-1">Rated {product.rating}/5 from {product.reviewCount} verified purchases.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold text-earth-800 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {relatedProducts.map((p, i) => (
                <Reveal key={p.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
