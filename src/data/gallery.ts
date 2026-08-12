import type { GalleryImage } from '@/types';
import { unsplashUrl } from '@/lib/utils';

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'gal-01', src: unsplashUrl('1541832676-9b763b0239ab', 700), alt: 'Charcoal-grilled octopus plated with salsa verde', category: 'food', width: 900, height: 1150 },
  { id: 'gal-02', src: unsplashUrl('1527682555062-9a6d851c5199', 900), alt: 'Wood-fired oven glowing with embers', category: 'kitchen', width: 1200, height: 850 },
  { id: 'gal-03', src: unsplashUrl('1701723284923-18f236a6f134', 900), alt: 'Dining room bathed in warm evening light', category: 'interior', width: 1200, height: 900 },
  { id: 'gal-04', src: unsplashUrl('1763685805275-1845419c01a1', 700), alt: 'Head chef plating a dish in the open kitchen', category: 'chef', width: 900, height: 1100 },
  { id: 'gal-05', src: unsplashUrl('1623073284788-0d846f75e329', 800), alt: 'Close-up of saffron risotto with crisped sage', category: 'food', width: 1000, height: 1000 },
  { id: 'gal-06', src: unsplashUrl('1469234496837-d0101f54be3e', 700), alt: 'Candlelit table setting for two', category: 'ambience', width: 900, height: 1200 },
  { id: 'gal-07', src: unsplashUrl('1657593091045-3927d4967afe', 900), alt: 'Bar counter with hand-crafted cocktails', category: 'ambience', width: 1200, height: 800 },
  { id: 'gal-08', src: unsplashUrl('1760169799369-2b8574466735', 800), alt: 'Chefs at work preparing food in the kitchen', category: 'kitchen', width: 1000, height: 1250 },
  { id: 'gal-09', src: unsplashUrl('1529543544282-ea669407fca3', 900), alt: 'Wood-fired lamb rack resting before service', category: 'food', width: 1200, height: 900 },
  { id: 'gal-10', src: unsplashUrl('1609238000857-303bf54099b1', 700), alt: 'Private dining nook with sage-green banquette', category: 'interior', width: 900, height: 1150 },
  { id: 'gal-11', src: unsplashUrl('1761095596765-c8abe01d3aea', 900), alt: 'Chef plating a dish in the professional kitchen', category: 'chef', width: 1200, height: 850 },
  { id: 'gal-12', src: unsplashUrl('1776333887723-7d36db4d788c', 700), alt: 'Dessert plating with citrus and dark chocolate', category: 'food', width: 900, height: 1100 },
  { id: 'gal-13', src: unsplashUrl('1701722952679-beffce26d77a', 900), alt: 'Warmly lit dining room at golden hour', category: 'interior', width: 1200, height: 900 },
  { id: 'gal-14', src: unsplashUrl('1687723547516-308ac9cefba9', 800), alt: 'Guests seated at a reserved table', category: 'ambience', width: 1000, height: 1000 },
  { id: 'gal-15', src: unsplashUrl('1675670579446-8692392f91dc', 700), alt: 'Fresh pasta plated tableside', category: 'food', width: 900, height: 1150 },
];