/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUB_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
