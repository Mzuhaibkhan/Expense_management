/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_REST_COUNTRIES_URL: string;
  readonly VITE_EXCHANGE_RATE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
