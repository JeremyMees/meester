import * as Sentry from '@sentry/nuxt'

Sentry.init({
  dsn: 'https://313bef354243b6ca9dfa30603e8c85e2@o1373533.ingest.us.sentry.io/4511381616918528',

  // Enable logs to be sent to Sentry
  enableLogs: true,

  // Enable sending of user PII (Personally Identifiable Information)
  // https://docs.sentry.io/platforms/javascript/guides/nuxt/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
})
