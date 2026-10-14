import { useParams, Link } from 'react-router-dom';
import { Reveal } from '@/components/Reveal';
import { getBlogPost, blogPosts } from '@/data/blog';
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from 'lucide-react';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Render the markdown-like content field.
 * Splits on ## for section headers, and renders
 * bullet lists (- ) and numbered lists (1. ) as <ul>/<ol>.
 */
function renderContent(content: string) {
  const sections = content.split(/^## /m);
  const intro = sections[0].trim();
  const rest = sections.slice(1);

  const renderBlock = (text: string, keyBase: string) => {
    const lines = text.trim().split('\n');
    const blocks: JSX.Element[] = [];
    let listBuffer: string[] = [];
    let listType: 'ul' | 'ol' | null = null;

    const flushList = (idx: number) => {
      if (listBuffer.length === 0) return;
      const items = listBuffer.map((item, j) => (
        <li key={`${keyBase}-li-${idx}-${j}`} className="text-earth-600 leading-relaxed">
          {item}
        </li>
      ));
      if (listType === 'ol') {
        blocks.push(
          <ol key={`${keyBase}-ol-${idx}`} className="list-decimal list-inside space-y-2 my-4">
            {items}
          </ol>
        );
      } else {
        blocks.push(
          <ul key={`${keyBase}-ul-${idx}`} className="list-disc list-inside space-y-2 my-4">
            {items}
          </ul>
        );
      }
      listBuffer = [];
      listType = null;
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed === '') {
        flushList(idx);
        return;
      }
      const bulletMatch = trimmed.match(/^- (.+)/);
      const numberMatch = trimmed.match(/^\d+\. (.+)/);
      if (bulletMatch) {
        if (listType && listType !== 'ul') flushList(idx);
        listType = 'ul';
        listBuffer.push(bulletMatch[1]);
        return;
      }
      if (numberMatch) {
        if (listType && listType !== 'ol') flushList(idx);
        listType = 'ol';
        listBuffer.push(numberMatch[1]);
        return;
      }
      flushList(idx);
      blocks.push(
        <p key={`${keyBase}-p-${idx}`} className="text-earth-600 leading-relaxed mb-4">
          {trimmed}
        </p>
      );
    });
    flushList(lines.length);

    return blocks;
  };

  return (
    <div>
      {/* Intro paragraphs (before any ##) */}
      {intro && <div key="intro">{renderBlock(intro, 'intro')}</div>}

      {/* Each ## section */}
      {rest.map((section, i) => {
        const newlineIdx = section.indexOf('\n');
        const heading = newlineIdx === -1 ? section.trim() : section.slice(0, newlineIdx).trim();
        const body = newlineIdx === -1 ? '' : section.slice(newlineIdx + 1);
        return (
          <div key={`sec-${i}`}>
            <h2 className="font-serif text-2xl font-bold text-earth-800 mt-8 mb-4">{heading}</h2>
            {body && renderBlock(body, `sec-${i}`)}
          </div>
        );
      })}
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-earth-700">Article not found</h1>
          <p className="text-earth-500 mt-2">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-ghee-600 hover:text-ghee-700 font-medium mt-4"
          >
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="flex items-center gap-2 text-sm text-earth-400 min-w-0">
          <Link to="/" className="hover:text-ghee-600">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-ghee-600">Blog</Link>
          <span>/</span>
          <span className="text-earth-700 truncate min-w-0">{post.title}</span>
        </nav>
      </div>

      {/* HERO IMAGE */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/9] bg-cream-200 shadow-lg">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-900/60 to-transparent" />
          <span className="absolute top-4 left-4 bg-ghee-500 text-earth-900 text-sm font-semibold px-4 py-2 rounded-full shadow-md">
            {post.category}
          </span>
        </div>
      </div>

      {/* ARTICLE BODY */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-ghee-600 hover:text-ghee-700 font-medium mb-6"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-earth-800 leading-tight">
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 pb-6 border-b border-earth-100 text-sm text-earth-500">
          <span className="flex items-center gap-1.5">
            <User size={16} className="text-ghee-500" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={16} className="text-ghee-500" /> {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={16} className="text-ghee-500" /> {post.readTime} read
          </span>
        </div>

        {/* Content */}
        <div className="mt-8">{renderContent(post.content)}</div>
      </article>

      {/* RELATED POSTS */}
      {related.length > 0 && (
        <section className="bg-cream-50 border-t border-earth-100 py-14 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Reveal className="text-center mb-10">
              <span className="text-ghee-600 font-medium text-sm uppercase tracking-wider">
                Keep Reading
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-earth-800 mt-2">
                Related Articles
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rp, i) => (
                <Reveal key={rp.slug} delay={(i + 1) as 1 | 2}>
                  <Link
                    to={`/blog/${rp.slug}`}
                    className="group flex bg-cream-100 rounded-2xl overflow-hidden border border-earth-200/40 hover:border-ghee-500/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-28 sm:w-40 shrink-0 overflow-hidden bg-cream-200">
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col justify-center min-w-0">
                      <span className="text-xs text-ghee-600 font-medium">{rp.category}</span>
                      <h3 className="font-serif text-base font-bold text-earth-800 leading-snug mt-1 group-hover:text-ghee-600 transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-ghee-600 font-medium text-sm mt-3 group-hover:gap-3 transition-all">
                        Read <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
