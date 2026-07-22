import * as Sentry from '@sentry/nuxt'

Sentry.init({
  dsn: 'https://313bef354243b6ca9dfa30603e8c85e2@o1373533.ingest.us.sentry.io/4511381616918528',
  tracesSampleRate: 0.1,
})
