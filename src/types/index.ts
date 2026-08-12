import type { IconType } from 'react-icons';

/** A single navbar / footer link. `href` is a same-page anchor (e.g. "#about"). */
export interface NavLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly icon: IconType;
}

export interface BusinessHours {
  readonly days: string;
  readonly hours: string;
}

/** A single animated statistic in the About section (e.g. "12 Years of Experience"). */
export interface Stat {
  readonly id: string;
  readonly value: number;
  readonly suffix?: string;
  readonly label: string;
}

/** A "Why Choose Us" feature card. */
export interface Feature {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: IconType;
}

/** A featured dish in the "Signature Dishes" showcase. */
export interface SignatureDish {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  /** Optional photo URL. Omit to render the on-brand placeholder art (see ResponsiveImage). */
  readonly image?: string;
  readonly imageAlt: string;
  readonly isChefRecommendation?: boolean;
}

const MENU_CATEGORIES = [
  'starters',
  'main-course',
  'pizza',
  'pasta',
  'desserts',
  'drinks',
] as const;

export type MenuCategoryId = (typeof MENU_CATEGORIES)[number];

export interface MenuCategoryMeta {
  readonly id: MenuCategoryId;
  readonly label: string;
}

export type DietaryType = 'veg' | 'non-veg';

/** A single item within the full interactive menu. */
export interface MenuItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  /** Optional photo URL. Omit to render the on-brand placeholder art (see ResponsiveImage). */
  readonly image?: string;
  readonly imageAlt: string;
  readonly category: MenuCategoryId;
  readonly dietary: DietaryType;
  readonly isSignature?: boolean;
}

export const GALLERY_CATEGORIES = [
  'all',
  'food',
  'ambience',
  'chef',
  'kitchen',
  'interior',
] as const;

export type GalleryCategoryId = (typeof GALLERY_CATEGORIES)[number];

/** A single photograph in the Gallery masonry grid. */
export interface GalleryImage {
  readonly id: string;
  /** Optional photo URL. Omit to render the on-brand placeholder art (see ResponsiveImage). */
  readonly src?: string;
  readonly alt: string;
  readonly category: Exclude<GalleryCategoryId, 'all'>;
  /** Aspect ratio hint (width:height) used to size the masonry grid — kept as intrinsic
   *  pixel dimensions so a future real photo can drop in without layout shift. */
  readonly width: number;
  readonly height: number;
}

/** A single customer review in the Testimonials slider. */
export interface Testimonial {
  readonly id: string;
  readonly name: string;
  readonly role?: string;
  /** Optional avatar photo URL. Omit to render an initials monogram avatar. */
  readonly image?: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
  readonly quote: string;
}

/** Form values for the Reservation section (React Hook Form). */
export interface ReservationFormValues {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly guests: string;
  readonly date: string;
  readonly time: string;
  readonly specialRequest?: string;
}

/** Form values for the Contact section (React Hook Form). */
export interface ContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly message: string;
}

/** Discriminated result type returned by the (client-only, demo) form handlers. */
export type FormSubmissionResult =
  | { readonly status: 'success'; readonly message: string }
  | { readonly status: 'error'; readonly message: string };
