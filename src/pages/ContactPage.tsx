import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle,
} from 'lucide-react';

const WHATSAPP_NUMBER = '923001234567';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: '123 Farm Road, Gulshan-e-Iqbal, Karachi',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92 300 1234567',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@desigheeco.pk',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Sat 9am–7pm',
  },
];

const heroImg =
  'https://images.pexels.com/photos/6182692/pexels-photo-6182692.jpeg?auto=compress&cs=tinysrgb&w=1920';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Hi! I'd like to get in touch with Desi Ghee Co.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  const inputClass =
    'w-full bg-cream-100 border border-earth-200 rounded-xl px-4 py-3 text-earth-700 placeholder:text-earth-300 focus:outline-none focus:border-ghee-500 focus:ring-1 focus:ring-ghee-500 transition-colors';

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth-900/70 via-earth-900/50 to-earth-900/80" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream-100 leading-tight">
            Contact Us
          </h1>
          <p className="text-cream-200/90 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
            Have a question about our ghee or your order? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* FORM */}
            <Reveal className="lg:col-span-2">
              <div className="bg-cream-100 rounded-2xl p-5 sm:p-8 border border-earth-200/40 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-earth-800 mb-2">
                  Send us a message
                </h2>
                <p className="text-earth-500 text-sm mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-leaf-500/10 flex items-center justify-center mb-4">
                      <CheckCircle2 size={36} className="text-leaf-600" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-earth-800">
                      Message Sent!
                    </h3>
                    <p className="text-earth-500 mt-2 max-w-sm">
                      Your message preview is complete. This demo form does not send messages yet.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+92 300 1234567"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-earth-700 mb-1.5">
                          Subject
                        </label>
                        <input
                          type="text"
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us more..."
                        className={inputClass}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ghee-500 hover:bg-ghee-600 text-earth-900 font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-ghee-500/30"
                    >
                      <Send size={18} /> Send Message
                    </button>
                  </form>
                )}
              </div>
            </Reveal>

            {/* SIDEBAR */}
            <Reveal delay={1}>
              <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6">
                {/* Contact info */}
                <div className="bg-cream-100 rounded-2xl p-5 sm:p-8 border border-earth-200/40 shadow-sm md:row-span-2 lg:row-span-1">
                  <h2 className="font-serif text-xl font-bold text-earth-800 mb-5">
                    Get in touch
                  </h2>
                  <div className="space-y-5">
                    {contactInfo.map((info) => (
                      <div key={info.label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-ghee-500/10 flex items-center justify-center shrink-0">
                          <info.icon size={20} className="text-ghee-600" />
                        </div>
                        <div>
                          <p className="text-xs text-earth-400 font-medium uppercase tracking-wide">
                            {info.label}
                          </p>
                          <p className="text-earth-700 text-sm mt-0.5 break-words">{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp button */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle size={20} /> Chat on WhatsApp
                </button>

                {/* Map placeholder */}
                <div className="relative h-56 rounded-2xl overflow-hidden border border-earth-200/40 bg-earth-50">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <div className="w-12 h-12 rounded-full bg-ghee-500/20 flex items-center justify-center mb-3">
                      <MapPin size={24} className="text-ghee-600" />
                    </div>
                    <p className="font-serif text-sm font-semibold text-earth-700">
                      123 Farm Road, Gulshan-e-Iqbal
                    </p>
                    <p className="text-xs text-earth-400 mt-1">Karachi, Pakistan</p>
                  </div>
                  {/* Decorative grid lines to suggest a map */}
                  <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        'linear-gradient(#5C3A1E 1px, transparent 1px), linear-gradient(90deg, #5C3A1E 1px, transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
