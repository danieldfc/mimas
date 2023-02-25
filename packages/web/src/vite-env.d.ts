/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL_API: string
  readonly CHOKIDAR_USEPOLLING: string
  readonly VITE_APP_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
