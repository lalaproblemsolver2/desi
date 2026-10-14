import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { products, productCategories } from '@/data/products';
import { SlidersHorizontal, X } from 'lucide-react';

export function ShopPage() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (queryParam) {
      const q = queryParam.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
      );
    }

    if (selectedCats.length > 0) {
      result = result.filter((p) => selectedCats.includes(p.category));
    }

    result = result.filter((p) => p.priceFrom >= priceRange[0] && p.priceFrom <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case 'price-high':
        result.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
    }

    return result;
  }, [selectedCats, sortBy, priceRange, queryParam]);

  const toggleCat = (cat: string) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCats([]);
    setSortBy('featured');
    setPriceRange([0, 10000]);
  };

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-earth-50 border-b border-earth-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 text-center">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth-800">Shop Pure Desi Ghee</h1>
          <p className="text-earth-500 mt-2 max-w-xl mx-auto">
            Hand-churned Bilona ghee, fresh makhan, and premium gift boxes — all lab-tested and pure
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {queryParam && (
          <p className="text-earth-500 mb-4">
            Search results for: <span className="font-medium text-earth-700">"{queryParam}"</span>
          </p>
        )}

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-60 xl:w-64 shrink-0 self-start sticky top-28">
            <FilterContent
              selectedCats={selectedCats}
              toggleCat={toggleCat}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              clearFilters={clearFilters}
            />
          </aside>

          {/* Mobile filter drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-earth-900/40 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
              <div className="absolute right-0 top-0 bottom-0 w-72 max-w-[85vw] bg-cream-100 shadow-2xl p-5 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-serif text-lg font-bold text-earth-800">Filters</h3>
                  <button onClick={() => setShowFilters(false)} className="p-2 text-earth-500">
                    <X size={22} />
                  </button>
                </div>
                <FilterContent
                  selectedCats={selectedCats}
                  toggleCat={toggleCat}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  clearFilters={clearFilters}
                />
              </div>
            </div>
          )}

          {/* Products */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="text-sm text-earth-500">
                Showing <span className="font-medium text-earth-700">{filtered.length}</span> products
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 text-sm text-earth-600 bg-cream-200 px-3 py-2 rounded-lg"
                >
                  <SlidersHorizontal size={16} /> Filters
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-base sm:text-sm bg-cream-100 border border-earth-200 rounded-lg px-3 py-2 text-earth-600 focus:outline-none focus:border-ghee-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-earth-400 text-lg">No products found matching your filters.</p>
                <button onClick={clearFilters} className="text-ghee-600 hover:underline mt-2 font-medium">
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
                {filtered.map((product, i) => (
                  <Reveal key={product.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface FilterContentProps {
  selectedCats: string[];
  toggleCat: (cat: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  clearFilters: () => void;
}

function FilterContent({ selectedCats, toggleCat, priceRange, setPriceRange, clearFilters }: FilterContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-base font-semibold text-earth-800 mb-3">Categories</h3>
        <div className="space-y-2">
          {productCategories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCats.includes(cat.id)}
                onChange={() => toggleCat(cat.id)}
                className="w-4 h-4 rounded border-earth-300 text-ghee-500 focus:ring-ghee-400"
              />
              <span className="text-sm text-earth-600 group-hover:text-ghee-600 transition-colors">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-base font-semibold text-earth-800 mb-3">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-ghee-500"
          />
          <div className="flex justify-between text-sm text-earth-500">
            <span>Rs. {priceRange[0].toLocaleString()}</span>
            <span>Rs. {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="text-sm text-ghee-600 hover:text-ghee-700 font-medium underline"
      >
        Clear all filters
      </button>
    </div>
  );
}
