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

/**
 * All releases query - fetches all releases sorted by date (newest first)
 * Returns: Array of { _id, title, releaseType, coverImage, releaseDate, spotifyUrl, appleMusicUrl, youtubeUrl, isLatest }
 */
export const releasesQuery = `*[_type == "release"] | order(releaseDate desc) {
  _id,
  title,
  releaseType,
  coverImage,
  releaseDate,
  spotifyUrl,
  appleMusicUrl,
  youtubeUrl,
  isLatest
}`

/**
 * Latest release query - fetches the release marked as featured for homepage
 * Returns: Single release object or null
 */
export const latestReleaseQuery = `*[_type == "release" && isLatest == true][0] {
  _id,
  title,
  releaseType,
  coverImage,
  releaseDate,
  spotifyUrl,
  appleMusicUrl,
  youtubeUrl
}`
