export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  avatar: string;
  date: string;
  product: string;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Ayesha Khan',
    city: 'Karachi',
    rating: 5,
    text: 'This ghee tastes exactly like my Dadi used to make. The aroma when you open the jar is incredible. I will never buy factory ghee again.',
    avatar: 'https://images.pexels.com/photos/3290499/pexels-photo-3290499.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    date: '2025-09-10',
    product: 'Desi Cow Ghee (Bilona)',
  },
  {
    id: 'r2',
    name: 'Bilal Ahmed',
    city: 'Lahore',
    rating: 5,
    text: 'Ordered the A2 Cow Ghee for my mother who has digestion issues. The difference is remarkable. She can actually digest this ghee without any discomfort. Worth every rupee.',
    avatar: 'https://images.pexels.com/photos/3228887/pexels-photo-3228887.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    date: '2025-09-12',
    product: 'A2 Cow Ghee (Premium)',
  },
  {
    id: 'r3',
    name: 'Fatima Noor',
    city: 'Islamabad',
    rating: 5,
    text: 'The gift box was a hit at my sister\'s wedding. Beautifully packaged and the quality is unmatched. The makhan was so fresh and creamy.',
    avatar: 'https://images.pexels.com/photos/3868929/pexels-photo-3868929.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    date: '2025-09-15',
    product: 'Family Combo Gift Box',
  },
  {
    id: 'r4',
    name: 'Imran Siddiqui',
    city: 'Karachi',
    rating: 5,
    text: 'Cash on delivery and the product arrived in 2 days. The ghee has that grainy texture and rich golden color that tells you it\'s real. Highly recommended.',
    avatar: 'https://images.pexels.com/photos/6605420/pexels-photo-6605420.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    date: '2025-09-18',
    product: 'Desi Cow Ghee (Bilona)',
  },
  {
    id: 'r5',
    name: 'Zainab Malik',
    city: 'Faisalabad',
    rating: 4,
    text: 'The buffalo ghee is so creamy and rich. My parathas have never tasted better. Only wish the 1kg was a bit cheaper but the quality justifies it.',
    avatar: 'https://images.pexels.com/photos/13010849/pexels-photo-13010849.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    date: '2025-09-22',
    product: 'Desi Buffalo Ghee',
  },
  {
    id: 'r6',
    name: 'Hassan Raza',
    city: 'Rawalpindi',
    rating: 5,
    text: 'I\'ve been buying from Desi Ghee Co. for 6 months now. The consistency in quality is impressive. Every batch is as good as the last. The subscription option saves me so much hassle.',
    avatar: 'https://images.pexels.com/photos/7562185/pexels-photo-7562185.jpeg?auto=compress&cs=tinysrgb&h=200&w=200',
    date: '2025-09-25',
    product: 'Desi Cow Ghee (Bilona)',
  },
];
