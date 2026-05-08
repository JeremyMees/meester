export function useGlobalConfig() {
  const { locale } = useI18n()
  const sanity = useSanity()

  return useAsyncData(
    'config',
    () =>
      sanity.fetch<ConfigQueryResult>(configQuery, { language: locale.value }),
    { watch: [locale] },
  )
}
