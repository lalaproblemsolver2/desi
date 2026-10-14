import { Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { blogPosts } from '@/data/blog';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const heroImg =
  'https://images.pexels.com/photos/20689446/pexels-photo-20689446.jpeg?auto=compress&cs=tinysrgb&w=1920';

export function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[50vh] min-h-[360px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth-900/70 via-earth-900/50 to-earth-900/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center">
          <div className="inline-flex items-center gap-2 bg-ghee-500/20 backdrop-blur-sm border border-ghee-400/30 text-ghee-300 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <BookOpen size={16} /> Stories & Recipes
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream-100 leading-tight">
            Blog &amp; Recipes
          </h1>
          <p className="text-cream-200/90 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
            Traditional recipes, cooking tips, and the stories behind pure Desi Ghee
          </p>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-12">
            <span className="text-ghee-600 font-medium text-sm uppercase tracking-wider">
              From Our Kitchen
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-800 mt-2">
              Latest Articles
            </h2>
            <p className="text-earth-500 mt-2 max-w-xl mx-auto">
              Discover the magic of cooking with pure Bilona ghee
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-cream-100 rounded-2xl overflow-hidden border border-earth-200/40 hover:border-ghee-500/30 hover:shadow-xl transition-all duration-300 h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-cream-200">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-ghee-500 text-earth-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                      {post.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-xl font-bold text-earth-800 leading-snug group-hover:text-ghee-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-earth-500 mt-3 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5 pt-4 border-t border-earth-100 text-xs text-earth-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} /> {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} /> {post.readTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-ghee-600 font-medium text-sm mt-4 group-hover:gap-3 transition-all">
                      Read More <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
