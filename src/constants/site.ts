import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import type { BusinessHours, NavLink, SocialLink } from '@/types';

export const SITE = {
  name: 'EMBER',
  legalName: 'Ember Restaurant',
  tagline: 'Modern Mediterranean & European Fine Dining',
  shortDescription:
    'Live-fire Mediterranean and European cooking, seasonal ingredients, and quiet hospitality.',
  url: 'https://www.ember-restaurant.com',
} as const;

/**
 * Anchor targets, in page order. Kept as one source of truth so the Navbar's
 * active-section indicator (useActiveSection) and every internal "scroll to"
 * link reference the same ids as the <section> elements actually render.
 */
export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  whyChooseUs: 'why-choose-us',
  signatureDishes: 'signature-dishes',
  menu: 'menu',
  gallery: 'gallery',
  orderOnline: 'order-online',
  reservation: 'reservation',
  testimonials: 'testimonials',
  contact: 'contact',
} as const;

/** Primary navigation, per the sitemap — intentionally a subset of all sections. */
export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'Home', href: `#${SECTION_IDS.home}` },
  { id: 'about', label: 'About', href: `#${SECTION_IDS.about}` },
  { id: 'menu', label: 'Menu', href: `#${SECTION_IDS.menu}` },
  { id: 'gallery', label: 'Gallery', href: `#${SECTION_IDS.gallery}` },
  { id: 'order-online', label: 'Order Online', href: `#${SECTION_IDS.orderOnline}` },
  { id: 'reservation', label: 'Reservation', href: `#${SECTION_IDS.reservation}` },
  { id: 'contact', label: 'Contact', href: `#${SECTION_IDS.contact}` },
];

export const BOOK_A_TABLE_HREF = `#${SECTION_IDS.reservation}`;

export const CONTACT = {
  addressLine1: '24 Harbourview Lane',
  addressLine2: 'Downtown District',
  phoneDisplay: '+1 (555) 014-2200',
  phoneHref: 'tel:+15550142200',
  email: 'hello@ember-restaurant.com',
  mapEmbedSrc:
    import.meta.env.VITE_GOOGLE_MAPS_EMBED_SRC ||
    'https://maps.google.com/maps?q=Downtown&t=&z=13&ie=UTF8&iwloc=&output=embed',
} as const;

export const HOURS_SHORT = 'Tue – Sun · 5:30 PM – 11 PM';

export const BUSINESS_HOURS: BusinessHours[] = [
  { days: 'Tuesday – Thursday', hours: '5:30 PM – 11:00 PM' },
  { days: 'Friday – Saturday', hours: '5:30 PM – 11:30 PM' },
  { days: 'Sunday', hours: '5:00 PM – 10:00 PM' },
  { days: 'Monday', hours: 'Closed' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/ember.restaurant', icon: FiInstagram },
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/ember.restaurant', icon: FiFacebook },
  { id: 'twitter', label: 'Twitter / X', href: 'https://twitter.com/ember_restaurant', icon: FiTwitter },
];

export const ORDER_LINKS = {
  swiggy: import.meta.env.VITE_SWIGGY_URL || 'https://www.swiggy.com',
  zomato: import.meta.env.VITE_ZOMATO_URL || 'https://www.zomato.com',
} as const;

export const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8+'] as const;

/** Reservation seating windows offered in the time <select>. */
export const RESERVATION_TIME_SLOTS = [
  '5:30 PM',
  '6:00 PM',
  '6:30 PM',
  '7:00 PM',
  '7:30 PM',
  '8:00 PM',
  '8:30 PM',
  '9:00 PM',
  '9:30 PM',
] as const;
