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

/**
 * Band members query - fetches all band members sorted by order
 * Returns: Array of { _id, name, alias, instrument, inspiration, hobby, food, bio, image, order }
 */
export const bandMembersQuery = `*[_type == "bandMember"] | order(order asc) {
  _id,
  name,
  alias,
  instrument,
  inspiration,
  hobby,
  food,
  bio,
  image,
  order
}`
