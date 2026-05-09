export function useSeo(
  sanitySeo: MaybeRefOrGetter<NonNullable<PageQueryResult>['seo'] | undefined>,
) {
  const { locale } = useI18n()
  const { urlFor } = useImageBuilder()

  const title = computed(
    () => stripStega(toValue(sanitySeo)?.title) || defaultSeo.name,
  )

  const description = computed(
    () => stripStega(toValue(sanitySeo)?.description) || defaultSeo.description,
  )

  const image = computed(() => {
    const img = toValue(sanitySeo)?.image
    return img ? urlFor(img).width(1200).height(630).url() : '/social-share.png'
  })

  useSeoMeta({
    description: () => description.value,
    ogTitle: () => title.value,
    ogDescription: () => description.value,
    ogType: 'website',
    ogLocale: () => locale.value,
    ogImage: () => image.value,
    twitterTitle: () => title.value,
    twitterDescription: () => description.value,
    twitterCard: 'summary_large_image',
  })
}
