import { Link } from 'react-router-dom';
import {
  Beef, Sprout, Leaf, HandHeart, Sparkles, FlaskConical,
  ArrowRight, Check, X, Quote,
} from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProcessVideo } from '@/components/ProcessVideo';

const heroBg = 'https://images.pexels.com/photos/6182692/pexels-photo-6182692.jpeg?auto=compress&cs=tinysrgb&w=1920';

const processSteps = [
  {
    icon: Beef,
    title: 'Grass-Fed Cow',
    image: 'https://images.pexels.com/photos/28962623/pexels-photo-28962623.jpeg?auto=compress&cs=tinysrgb&w=940',
    desc: 'Our journey begins with free-grazing indigenous Gir and Sahiwal cows. They roam open pastures, grazing on natural grasses and herbs — never given synthetic hormones or factory feed. Happy, healthy cows produce the richest, most nutritious milk.',
  },
  {
    icon: Sprout,
    title: 'Fresh Milk',
    image: 'https://images.pexels.com/photos/33708857/pexels-photo-33708857.jpeg?auto=compress&cs=tinysrgb&w=940',
    desc: 'Every morning at dawn, our farmers hand-milk the cows with care and devotion. The warm, fresh milk is collected in clean vessels and brought immediately to our kitchen — nothing sits, nothing is wasted, and nothing is added.',
  },
  {
    icon: Leaf,
    title: 'Curd in Clay Pot',
    image: 'https://images.pexels.com/photos/17962521/pexels-photo-17962521.jpeg?auto=compress&cs=tinysrgb&w=940',
    desc: 'The milk is boiled and then set aside in traditional earthen matka pots to curdle naturally overnight. A starter culture of curd transforms the milk into thick, tangy dahi — the foundation of all true Bilona ghee.',
  },
  {
    icon: HandHeart,
    title: 'Hand Churning',
    image: 'https://images.pexels.com/photos/6182692/pexels-photo-6182692.jpeg?auto=compress&cs=tinysrgb&w=940',
    desc: 'This is the heart of the Bilona method. A wooden madhani is rhythmically churned through the curd by hand — back and forth, for hours. No electricity, no motors. This slow, patient churning separates the butter from the buttermilk.',
  },
  {
    icon: Sparkles,
    title: 'Makhan Extraction',
    image: 'https://images.pexels.com/photos/23940098/pexels-photo-23940098.jpeg?auto=compress&cs=tinysrgb&w=940',
    desc: 'The freshly churned white butter — makhan — is carefully collected and washed in cool water. This is the precious substance that holds all the aroma, flavor, and nutrients. In modern methods, this step is skipped entirely.',
  },
  {
    icon: FlaskConical,
    title: 'Slow-Cooked Ghee',
    image: 'https://images.pexels.com/photos/33260/honey-sweet-syrup-organic.jpg?auto=compress&cs=tinysrgb&w=940',
    desc: 'The makhan is slowly simmered on a low wood fire until the moisture evaporates and the milk solids turn golden. The clear golden ghee is then filtered into sterilized glass jars — pure, fragrant, and granular, exactly as it should be.',
  },
];

const comparisonData = [
  { feature: 'Method', bilona: 'Hand-churned with wooden madhani', modern: 'Machine cream-separation' },
  { feature: 'Starting Material', bilona: 'Curd (dahi) — fermented overnight', modern: 'Direct milk cream' },
  { feature: 'Aroma & Flavor', bilona: 'Rich, nutty, deep traditional aroma', modern: 'Flat, neutral, lifeless' },
  { feature: 'Grain Texture', bilona: 'Natural granular (danedar) texture', modern: 'Smooth, waxy, uniform' },
  { feature: 'Nutrient Retention', bilona: 'High — Vitamins A, K2, CLA preserved', modern: 'Stripped during processing' },
  { feature: 'Additives', bilona: 'Zero — absolutely nothing added', modern: 'Often blended with vegetable oil' },
  { feature: 'Shelf Life', bilona: '12–18 months, naturally stable', modern: 'Relies on preservatives' },
  { feature: 'Time per Batch', bilona: '2–3 days of patient work', modern: 'Mass-produced in hours' },
];

export function ProcessPage() {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth-900/70 via-earth-900/60 to-earth-900/85" />
        <div className="absolute inset-0 bg-grain opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-3xl">
            <span className="inline-block bg-ghee-500/20 backdrop-blur-sm border border-ghee-400/30 text-ghee-300 text-sm font-medium px-4 py-1.5 rounded-full mb-4 animate-fade-in">
              ✦ An Ancient Tradition
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream-100 leading-tight animate-fade-up">
              The Bilona Method
            </h1>
            <p className="text-cream-200/90 text-base sm:text-lg mt-4 max-w-2xl leading-relaxed animate-fade-up reveal-delay-1">
              For over 5,000 years, Indian households have made ghee the Bilona way — churning curd by hand, extracting butter with patience, and slow-cooking it into liquid gold. We honor that tradition in every single jar.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
        <div className="text-center mb-8"><span className="eyebrow justify-center">THE CRAFT IN MOTION</span><h2 className="font-serif text-3xl sm:text-4xl mt-3">Watch the traditional Bilona process</h2><p className="text-earth-500 mt-3">From curd and hand-churning to golden ghee.</p></div>
        <ProcessVideo />
      </section>
      {/* INTRO */}
      <section className="py-16 lg:py-20 bg-cream-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <span className="text-ghee-600 font-medium text-sm uppercase tracking-wider">Why It Matters</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-800 mt-2 mb-6">
              The Slow Way Is the Right Way
            </h2>
            <p className="text-earth-500 leading-relaxed text-base sm:text-lg">
              Modern ghee is made by separating cream directly from milk with machines, then heating it. It's fast, cheap, and easy — but it strips away the soul of ghee. The Bilona method takes longer because it goes through curd first, and that's exactly what preserves the aroma, the granular texture, and the nutrients our grandmothers prized.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 6-STEP TIMELINE */}
      <section className="py-16 lg:py-24 bg-earth-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-jute opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-14">
            <span className="text-ghee-600 font-medium text-sm uppercase tracking-wider">The Journey</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-800 mt-2">
              Six Steps, Six Days of Patience
            </h2>
            <p className="text-earth-500 mt-2 max-w-xl mx-auto">
              Every jar of our ghee passes through these six careful stages — each done by hand
            </p>
          </Reveal>

          <div className="space-y-12 lg:space-y-20">
            {processSteps.map((step, i) => {
              const reversed = i % 2 === 1;
              return (
                <Reveal key={i}>
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Image */}
                    <div className={`relative ${reversed ? 'md:order-2' : ''}`}>
                      <div className="relative rounded-3xl overflow-hidden shadow-xl">
                        <img
                          src={step.image}
                          alt={step.title}
                          loading="lazy"
                          className="w-full h-[240px] sm:h-[320px] lg:h-[360px] object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-earth-900/30 to-transparent" />
                      </div>
                      <div className="absolute -top-3 -left-2 sm:-top-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-ghee-500 flex items-center justify-center shadow-lg">
                        <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-earth-900" />
                      </div>
                    </div>

                    {/* Text */}
                    <div className={reversed ? 'md:order-1' : ''}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-serif text-4xl sm:text-5xl font-bold text-ghee-200">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="h-px flex-1 bg-earth-200" />
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-earth-800 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-earth-500 leading-relaxed text-base lg:text-lg">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-16 lg:py-24 bg-cream-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Reveal className="text-center mb-12">
            <span className="text-ghee-600 font-medium text-sm uppercase tracking-wider">The Difference</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-800 mt-2">
              Bilona vs Modern Cream Method
            </h2>
            <p className="text-earth-500 mt-2 max-w-xl mx-auto">
              Why the old way still makes the best ghee
            </p>
          </Reveal>

          <Reveal delay={1}>
            {/* Mobile: stacked cards */}
            <div className="md:hidden space-y-3">
              {comparisonData.map((row) => (
                <div key={row.feature} className="rounded-2xl border border-earth-200/50 bg-cream-50 p-4 shadow-sm">
                  <p className="font-serif text-base font-semibold text-earth-800 mb-3">{row.feature}</p>
                  <p className="flex items-start gap-2 text-sm text-leaf-600 font-medium">
                    <Check size={16} className="mt-0.5 shrink-0 text-leaf-500" />
                    <span><span className="block text-[11px] uppercase tracking-wide text-earth-400 font-semibold">Bilona</span>{row.bilona}</span>
                  </p>
                  <p className="flex items-start gap-2 text-sm text-earth-400 mt-3">
                    <X size={16} className="mt-0.5 shrink-0 text-earth-300" />
                    <span><span className="block text-[11px] uppercase tracking-wide text-earth-400 font-semibold">Modern</span>{row.modern}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Tablet & desktop: table */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-earth-200/50 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-earth-800 text-cream-100">
                    <th className="text-left p-4 font-serif text-base">Feature</th>
                    <th className="text-left p-4 font-serif text-base">
                      <span className="text-ghee-400">Bilona Method</span>
                    </th>
                    <th className="text-left p-4 font-serif text-base text-cream-200/70">Modern Cream Method</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-cream-50' : 'bg-cream-100'}>
                      <td className="p-4 font-medium text-earth-700 text-sm">{row.feature}</td>
                      <td className="p-4 text-sm">
                        <span className="flex items-start gap-2 text-leaf-600 font-medium">
                          <Check size={16} className="mt-0.5 shrink-0 text-leaf-500" />
                          {row.bilona}
                        </span>
                      </td>
                      <td className="p-4 text-sm">
                        <span className="flex items-start gap-2 text-earth-400">
                          <X size={16} className="mt-0.5 shrink-0 text-earth-300" />
                          {row.modern}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUOTE / TESTIMONIAL */}
      <section className="py-20 lg:py-28 bg-earth-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <Quote size={48} className="text-ghee-500 mx-auto mb-6" />
            <blockquote className="font-serif text-xl sm:text-3xl lg:text-4xl text-cream-100 leading-relaxed italic">
              "Ghee made with patience is ghee made with love. When you churn by hand, you feel the rhythm of your grandmother's kitchen — and that love finds its way into every drop."
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-ghee-500 flex items-center justify-center text-earth-900 font-serif font-bold text-lg">
                A
              </div>
              <div className="text-left">
                <p className="font-semibold text-cream-100">Ammi Razia</p>
                <p className="text-sm text-cream-200/60">Master ghee-maker, 40 years of tradition</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-ghee-500/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-earth-800 mb-4">
              Taste the Tradition
            </h2>
            <p className="text-earth-500 leading-relaxed mb-8 max-w-xl mx-auto">
              Every jar carries 5,000 years of wisdom. Bring home pure Bilona ghee — made by hand, tested in labs, and delivered with care.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-ghee-500 hover:bg-ghee-600 text-earth-900 font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-ghee-500/30"
              >
                Shop Pure Ghee
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-cream-100 hover:bg-cream-200 text-earth-700 font-medium px-8 py-4 rounded-xl border border-earth-200 transition-colors"
              >
                Meet Our Farm
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
