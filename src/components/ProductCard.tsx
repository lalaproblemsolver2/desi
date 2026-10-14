import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const WHATSAPP_NUMBER = '923001234567';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSize] = useState(product.sizes[0]);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize.label}`,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      size: selectedSize.label,
      price: selectedSize.price,
      quantity: 1,
      subscribe: false,
    });
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(`Hi! I'd like to order: ${product.name} (${selectedSize.label}) — Rs. ${selectedSize.price}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <div className="group relative bg-cream-100 rounded-2xl overflow-hidden border border-earth-200/50 hover:border-ghee-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-ghee-900/10">
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden aspect-square">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-ghee-500 text-earth-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {product.badge}
          </span>
        )}
        {product.sizes[0].stock <= 10 && product.sizes[0].stock > 0 && (
          <span className="absolute top-3 right-3 bg-red-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Low Stock
          </span>
        )}
      </Link>

      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-xs ${i < Math.floor(product.rating) ? 'text-ghee-500' : 'text-earth-200'}`}
            >
              ★
            </span>
          ))}
          <span className="text-xs text-earth-400 ml-1">({product.reviewCount})</span>
        </div>

        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif text-lg font-semibold text-earth-800 hover:text-ghee-600 transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-earth-400 mt-1 line-clamp-2">{product.shortDescription}</p>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {product.sizes.map((s) => (
            <span key={s.label} className="text-xs text-earth-500 bg-earth-50 px-2 py-0.5 rounded">
              {s.label}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-xs text-earth-400">From</span>
            <p className="font-serif text-xl font-bold text-ghee-600">Rs. {product.priceFrom.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-earth-700 hover:bg-earth-800 text-cream-100 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} /> Add to Cart
          </button>
          <button
            onClick={handleWhatsApp}
            className="bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
            aria-label="Order on WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
