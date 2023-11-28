export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MQTT_URI: string
      NEXT_PUBLIC_MQTT_PORT: number
      NEXT_PUBLIC_MQTT_USERNAME: string
      NEXT_PUBLIC_MQTT_PASSWORD: string
      TURSO_AUTH_TOKEN: string
      TURSO_DATABASE_URL: string
      NEXT_PUBLIC_API_NEEDED_TOKEN_ACCESS_BEARER: string
    }
  }
}
