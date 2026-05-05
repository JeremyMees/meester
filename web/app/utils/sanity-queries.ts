const pageBuilderBlocks = `
  content[]{
    ...,
    _type == "hero" => {
      ...,
      buttons[]{
        ...,
        "link": link->slug.current
      }
    },
    _type == "projectOverview" => {
      ...,
      projects[]->{
        _id,
        title,
        description,
        category,
        thumbnail,
        link
      }
    },
  },
`

export const pageQuery = groq`
  *[
    _type in ["page"] &&
    slug.current == $slug &&
    language == $language
  ][0]{
    ...,
    ${pageBuilderBlocks}
    "seo": {
      "_type": "seo",
      "title": coalesce(seo.title, ""),
      "description": coalesce(seo.description,  ""),
      "image": seo.image,
      "keywords": coalesce(seo.keywords, []),
    },
  }
`
