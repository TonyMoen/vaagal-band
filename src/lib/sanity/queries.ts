// GROQ queries for Sanity CMS content

/**
 * Hero content query - fetches the first hero document
 * Returns: { _id, title, subtitle, image }
 */
export const heroQuery = `*[_type == "hero"][0] {
  _id,
  title,
  subtitle,
  image
}`

// Story 2.3: Band members query will be added here
