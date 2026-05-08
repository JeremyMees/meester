import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '08xftl8w',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
    appId: 'b3bgmqpovbrt3mez5ywnzcv6',
  },
  typegen: {
    path: '../web/shared/utils/sanity-queries.ts',
    schema: './schema.json',
    generates: '../web/shared/types/sanity.ts',
  },
})
