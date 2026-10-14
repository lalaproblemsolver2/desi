export interface BlogPost {
  slug: string;
  title: string;
  titleUrdu: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'desi-halwa-recipe',
    title: 'Grandmother\'s Desi Ghee Halwa — The Ultimate Comfort Dessert',
    titleUrdu: 'دادی کی desi گھی کی حلوہ',
    excerpt: 'Rich, warm, and aromatic — this traditional halwa made with pure Bilona ghee is the dessert every Pakistani household needs.',
    content: `There is something magical about the aroma of ghee roasting in a kitchen. It transports you to your grandmother's home, where every dish was made with patience and love.

## The Secret is in the Ghee

The key to a perfect halwa is the quality of your ghee. Factory-made ghee simply cannot replicate the depth of flavor that Bilona ghee brings. The grainy texture, the nutty aroma, the golden color — these are markers of true Desi Ghee.

## Ingredients

- 1 cup semolina (sooji)
- 1/2 cup Desi Ghee Co. Cow Ghee
- 1 cup sugar
- 2.5 cups water
- Cardamom pods, crushed
- Almonds and pistachios for garnish

## Method

1. Heat ghee in a heavy-bottomed pan on medium flame
2. Add semolina and roast until golden brown — about 8-10 minutes
3. Meanwhile, bring water and sugar to a boil separately
4. Carefully add the hot sugar syrup to the roasted semolina
5. Stir continuously to avoid lumps
6. Add crushed cardamom and cook until ghee separates
7. Garnish with nuts and serve warm

The result? A halwa that tastes like home.`,
    image: 'https://images.pexels.com/photos/20446403/pexels-photo-20446403.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Recipes',
    date: '2025-09-15',
    readTime: '5 min',
    author: 'Amma\'s Kitchen',
  },
  {
    slug: 'perfect-paratha',
    title: 'The Perfect Crispy Paratha — Why Ghee Makes All the Difference',
    titleUrdu: 'پرفیکٹ پراٹھا',
    excerpt: 'Flaky, crispy, and golden — learn why Desi Ghee is the only fat you should use for your parathas.',
    content: `A paratha without ghee is like a garden without flowers — technically fine, but missing the soul.

## Why Ghee, Not Oil?

Ghee has a higher smoke point than most oils, which means your paratha gets crispy without burning. The fat also creates distinct layers in the dough, giving that signature flakiness.

## The Layering Technique

1. Make a soft dough with atta and water, rest for 20 minutes
2. Roll out, spread ghee, fold, roll again — repeat 3 times
3. Cook on a hot tawa, brushing ghee on both sides
4. Press gently with a spatula to puff up the layers

Use 1 tablespoon of Desi Ghee Co. Cow Ghee per paratha for the perfect balance of crispiness and flavor.`,
    image: 'https://images.pexels.com/photos/37555450/pexels-photo-37555450.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Recipes',
    date: '2025-09-20',
    readTime: '4 min',
    author: 'Chef Saima',
  },
  {
    slug: 'daal-tarka-ghee',
    title: 'Daal Tarka — The Final Touch That Changes Everything',
    titleUrdu: 'دال ترکہ',
    excerpt: 'That sizzling sound of ghee hitting spices — it\'s not just cooking, it\'s a ritual. Here\'s how to nail the perfect tarka.',
    content: `The tarka (tempering) is the soul of Pakistani daal. It's the moment when raw spices meet hot ghee and release their essential oils into the dish.

## The Perfect Tarka

Heat 2-3 tablespoons of Desi Ghee Co. Cow Ghee until shimmering. Add cumin seeds and let them splutter. Add dried red chilies, garlic, and curry leaves. Pour this sizzling mixture over your cooked daal.

## Why Bilona Ghee for Tarka?

Bilona ghee has a complex, nutty flavor that enhances — never overpowers — the spices. Factory ghee can taste flat or waxy. The difference is immediately noticeable in the final dish.`,
    image: 'https://images.pexels.com/photos/37180955/pexels-photo-37180955.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    category: 'Recipes',
    date: '2025-09-28',
    readTime: '3 min',
    author: 'Chef Saima',
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
