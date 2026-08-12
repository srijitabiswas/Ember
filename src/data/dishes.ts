import type { SignatureDish } from '@/types';
import { unsplashUrl } from '@/lib/utils';

export const SIGNATURE_DISHES: SignatureDish[] = [
  {
    id: 'charcoal-grilled-octopus',
    name: 'Charcoal-Grilled Octopus',
    description: 'Smoked paprika, confit potato, salsa verde, finished over an open flame.',
    price: 28,
    image: unsplashUrl('1541832676-9b763b0239ab', 900),
    imageAlt: 'Charcoal-grilled octopus finished with salsa verde',
    isChefRecommendation: true,
  },
  {
    id: 'wood-fired-lamb-rack',
    name: 'Wood-Fired Lamb Rack',
    description: 'Rosemary ember-crust, charred aubergine purée, pomegranate jus.',
    price: 42,
    image: unsplashUrl('1529543544282-ea669407fca3', 900),
    imageAlt: 'Wood-fired lamb rack with aubergine purée',
    isChefRecommendation: true,
  },
  {
    id: 'burrata-heirloom-tomato',
    name: 'Burrata & Heirloom Tomato',
    description: 'Torched cherry tomatoes, basil oil, aged balsamic, sourdough crumb.',
    price: 19,
    image: unsplashUrl('1624036096842-6e4eadb5a792', 900),
    imageAlt: 'Burrata with torched heirloom tomatoes and basil oil',
  },
  {
    id: 'saffron-risotto-al-forno',
    name: 'Saffron Risotto al Forno',
    description: 'Slow-roasted butternut, crisped sage, pecorino, brown butter.',
    price: 24,
    image: unsplashUrl('1623073284788-0d846f75e329', 900),
    imageAlt: 'Saffron risotto with roasted butternut and crisped sage',
  },
  {
    id: 'ember-roasted-branzino',
    name: 'Ember-Roasted Branzino',
    description: 'Whole roasted, fennel ash, citrus beurre blanc, charred lemon.',
    price: 36,
    image: unsplashUrl('1467003909585-2f8a72700288', 900),
    imageAlt: 'Whole ember-roasted branzino with charred lemon',
    isChefRecommendation: true,
  },
  {
    id: 'dark-chocolate-olive-oil-torte',
    name: 'Dark Chocolate & Olive Oil Torte',
    description: 'Sea salt, blood orange, toasted almond, espresso crumble.',
    price: 14,
    image: unsplashUrl('1776333887723-7d36db4d788c', 900),
    imageAlt: 'Dark chocolate and olive oil torte with blood orange',
  },
];
