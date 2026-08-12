import type { Feature } from '@/types';
import { IconLeaf, IconChefHat, IconFlame } from '@/components/ui/icons';

export const FEATURES: Feature[] = [
  {
    id: 'fresh-ingredients',
    title: 'Fresh Ingredients',
    description:
      'Sourced daily from local growers and trusted purveyors, every ingredient arrives at peak season — nothing frozen, nothing rushed.',
    icon: IconLeaf,
  },
  {
    id: 'master-chefs',
    title: 'Master Chefs',
    description:
      'A kitchen led by chefs trained across the Mediterranean and Europe, each plate finished with technique refined over decades.',
    icon: IconChefHat,
  },
  {
    id: 'authentic-recipes',
    title: 'Authentic Recipes',
    description:
      'Time-honored methods and live-fire technique, reimagined with a contemporary hand — flavor that still respects where it comes from.',
    icon: IconFlame,
  },
];
