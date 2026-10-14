import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, HandHeart, Sparkles, Search } from 'lucide-react';
import { faqs } from '@/data/faqs';
import { ProcessVideo } from '@/components/ProcessVideo';

function Page({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return <div className="min-h-[60vh]"><div className="bg-earth-50 border-b border-earth-100 text-center px-5 py-10 sm:py-14"><span className="eyebrow justify-center">DESI GHEE CO.</span><h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl mt-4">{title}</h1><p className="text-earth-500 mt-4 max-w-xl mx-auto">{subtitle}</p></div><div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">{children}</div></div>;
}

export function InfoPage({ kind }: { kind: string }) {
  if (kind === 'about') return <Page title="Rooted in tradition." subtitle="A familiar flavour. A slower craft. A place at your family table."><div className="grid md:grid-cols-2 gap-10 items-center"><ProcessVideo /><div><h2 className="font-serif text-2xl sm:text-3xl mb-5">A story that starts with dahi.</h2><p className="text-earth-500 leading-relaxed">Desi Ghee Co. brings together a collection of ghee and makhan inspired by the Bilona tradition. Our website celebrates the care that goes into churning curd and gently simmering butter into ghee.</p><p className="text-earth-500 leading-relaxed mt-4">Explore the process, discover the collection, and find a little inspiration for your kitchen.</p><Link to="/process" className="primary-button mt-6">See the Bilona journey <ArrowRight size={18}/></Link></div></div><div className="grid sm:grid-cols-3 gap-6 mt-14">{[{icon: HandHeart,title:'Respect for the craft',text:'Discover the traditional curd-to-butter method.'},{icon: Leaf,title:'Everyday inspiration',text:'Bring familiar flavour to your favourite recipes.'},{icon: Sparkles,title:'Thoughtfully presented',text:'Explore a collection for cooking and gifting.'}].map(({icon: Icon,title,text})=><div key={title} className="p-6 bg-earth-50 rounded-2xl"><Icon className="text-ghee-600"/><h3 className="font-serif text-xl mt-4">{title}</h3><p className="text-sm text-earth-500 mt-2">{text}</p></div>)}</div></Page>;
  if (kind === 'lab-reports') return <Page title="Purity, with transparency." subtitle="Product documentation should be as clear as the ingredients."><div className="bg-cream-50 border border-earth-200 rounded-2xl p-5 sm:p-8"><h2 className="font-serif text-2xl mb-4">Batch reports</h2><p className="text-earth-500 leading-relaxed">Verified laboratory reports have not been uploaded to this preview. No certificates or test results are available to download yet.</p><p className="text-earth-500 leading-relaxed mt-4">For a live store, this page will contain the batch number, testing date, laboratory name, and original report for each product.</p><Link to="/contact" className="primary-button mt-6">Ask about a product <ArrowRight size={18}/></Link></div></Page>;
  const privacy = kind === 'privacy-policy';
  return <Page title={privacy ? 'Privacy & your data' : 'Returns & order support'} subtitle={privacy ? 'How this local website preview handles your information.' : 'A clear starting point for customer care.'}><div className="space-y-8 max-w-3xl mx-auto">{(privacy ? [
    ['Your shopping basket','Your basket is stored in this browser using local storage so it can stay available after you refresh.'],
    ['Preview orders','Checkout creates a demonstration order stored on this device. It does not send the order to a business or charge a payment.'],
    ['External services','External photographs and fonts may load from their providers. WhatsApp links open an external service when selected.'],
    ['Remove local information','You can clear this site’s browser data to remove saved basket and demonstration orders.'],
  ] : [
    ['Before ordering','This is a local storefront preview. Purchases and payments are not processed. A live store’s return terms must be confirmed by the business.'],
    ['Damaged or incorrect items','For a live order, keep your order reference and photographs of the packaging and contact the seller for help.'],
    ['Food product returns','Eligibility for returns of opened or perishable items must be agreed with the seller before purchase.'],
  ]).map(([title,text])=><section key={title}><h2 className="font-serif text-2xl mb-3">{title}</h2><p className="text-earth-500 leading-relaxed">{text}</p></section>)}</div></Page>;
}

export function FAQPage() {
  return <Page title="A little clarity." subtitle="Answers about the Bilona process, the collection, and this store preview."><div className="space-y-3 max-w-3xl mx-auto">{faqs.map(item=><details key={item.question} className="group rounded-2xl bg-cream-50 border border-earth-200 px-5 sm:px-6 py-4 sm:py-5"><summary className="font-medium cursor-pointer text-earth-700">{item.question}</summary><p className="text-earth-500 leading-relaxed mt-4 text-sm">{item.answer}</p></details>)}</div></Page>;
}

export function TrackOrderPage() {
  const [order, setOrder] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState('');
  function track(e: React.FormEvent) {
    e.preventDefault();
    try {
      const saved = JSON.parse(localStorage.getItem('demo-orders') || '[]');
      const match = saved.find((item: {number: string; phone: string}) => item.number.toUpperCase() === order.trim().toUpperCase() && item.phone.replace(/\D/g,'') === phone.replace(/\D/g,''));
      setResult(match ? 'Preview order saved on this device. This is a demonstration; no shipment has been booked.' : 'No matching preview order found on this device. Check your order number and the phone number used at checkout.');
    } catch { setResult('Saved orders could not be read. Please check your browser storage settings.'); }
  }
  return <Page title="Track your order" subtitle="Look up a demonstration order saved in this browser."><form onSubmit={track} className="max-w-lg mx-auto rounded-2xl border border-earth-200 bg-cream-50 p-5 sm:p-7 space-y-5"><label className="block text-sm font-medium">Order number<input required value={order} onChange={e=>setOrder(e.target.value)} placeholder="DGC-..." className="mt-2 w-full p-3 border border-earth-200 rounded-xl bg-cream-100"/></label><label className="block text-sm font-medium">Phone number<input required type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone used at checkout" className="mt-2 w-full p-3 border border-earth-200 rounded-xl bg-cream-100"/></label><button className="primary-button w-full justify-center"><Search size={18}/>Find order</button>{result && <p role="status" className="text-sm text-earth-600 bg-earth-50 rounded-xl p-4">{result}</p>}</form></Page>;
}
