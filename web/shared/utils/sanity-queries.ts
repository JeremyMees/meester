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
  "url": select(
    link.type == "email" => "mailto:" + link.email,
    link.type == "phone" => "tel:" + link.phone,
    coalesce(link.url, link.internalLink->slug.current)
  ),
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
    _type in ["page", "policy"] &&
    slug.current == $slug &&
    language == $language
  ][0]{
    ...,
    content[]{
      ...,
      _type == "buttonLink" => {
        ...,
        "link": { ${linkFragment} }
      },
      _type == "inlineLink" => {
        ...,
        "link": { ${linkFragment} }
      },
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

export const configQuery = groq`
  *[
    _type == "config" &&
    language == $language
  ]{
    navigation{
      cta{
        ...,
        "link": { ${linkFragment} }
      },
      links[]{
        ...,
        _type == "navigationLink" => {
          ...,
          "link": { ${linkFragment} }
        },
      }
    },
    footer{
      ...,
      columns[]{
        ...,
        _type == "footerColumnEmail" => {
          ...,
          "link": { ${linkFragment} }
        },
        _type == "footerColumnAddress" => {
          ...,
          "link": { ${linkFragment} }
        },
        _type == "footerColumnSocials" => {
          ...,
          socials[]{
            ...,
            "link": { ${linkFragment} }
          }
        }
      },
      policies[]{
        ...,
        _type == "navigationLink" => {
          ...,
          "link": { ${linkFragment} }
        }
      }
    }
  }[0]
`

export const metadataQuery = groq`
  *[_type == "translation.metadata"] {
    "translations": translations[defined(value->slug.current)] {
      "_id": value->_id,
      "slug": value->slug.current,
      "language": value->language
    }
  }
`

export const unlinkedQuery = groq`
  *[
    _type in ["page", "policy"] &&
    defined(slug.current) &&
    !(_id in $linkedIds)
  ] {
    _id,
    "slug": slug.current,
    language
  }
`
