/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_EMBED_SRC?: string;
  readonly VITE_SWIGGY_URL?: string;
  readonly VITE_ZOMATO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
