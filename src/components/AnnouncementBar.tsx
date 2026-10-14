export function AnnouncementBar() {
  const messages = [
    'Free delivery in Karachi on orders above Rs. 3,000',
    'Cash on Delivery available across Pakistan',
    'Discover the traditional Bilona process',
    'Explore ghee, fresh makhan, and thoughtful gifts',
  ];

  return (
    <div className="bg-earth-800 text-cream-100 text-xs sm:text-sm py-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-2">
            <span className="text-ghee-400">✦</span>
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
