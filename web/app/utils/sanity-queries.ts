const imageFragment = `
  hotspot,
  crop,
  "assetRef": asset._ref,
  "url": asset->url,
  "altText": coalesce(asset->altText[$language], ""),
  "title": coalesce(asset->title[$language], ""),
  "description": coalesce(asset->description[$language], ""),
`

const linkFragment = `
  "type": link.type,
  "url": coalesce(link.url, link.internalLink->slug.current),
  "blank": link.blank,
  "parameters": link.parameters,
  "anchor": link.anchor
`

const projectFragment = `
  _id,
  title,
  description,
  thumbnail { ${imageFragment} },
  "link": { ${linkFragment} }
`

const testimonialFragment = `
  _id,
  name,
  client,
  description,
`

export const pageQuery = groq`
  *[
    _type in ["page"] &&
    slug.current == $slug &&
    language == $language
  ][0]{
    ...,
    content[]{
      ...,
      _type == "hero" => {
        ...,
        buttons[]{
          ...,
          "link": { ${linkFragment} }
        }
      },
      _type == "projectOverview" => {
        ...,
        projects[]->{${projectFragment}}
      },
      _type == "testimonialSlider" => {
        ...,
        testimonials[]->{${testimonialFragment}}
      },
    },
    "seo": {
      "_type": "seo",
      "title": coalesce(seo.title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "keywords": coalesce(seo.keywords, []),
    },
  }
`
