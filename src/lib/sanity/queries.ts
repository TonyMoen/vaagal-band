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
 * Also feeds the song pages (/<slug>), so it carries every streaming link.
 * Keep the projection in sync with scripts/prerender-songs.mjs.
 */
export const releasesQuery = `*[_type == "release"] | order(releaseDate desc) {
  _id,
  title,
  slug,
  artistLine,
  releaseType,
  coverImage,
  releaseDate,
  description,
  presaveUrl,
  spotifyUrl,
  appleMusicUrl,
  youtubeUrl,
  tidalUrl,
  deezerUrl,
  amazonMusicUrl,
  isLatest
}`

/**
 * Latest release query - the release the homepage hero promotes.
 * The newest release that is out ($today is YYYY-MM-DD in Norway), so the hero
 * keeps up with Sanity on its own. A release with "Pin to homepage hero" wins
 * instead, also before its date, which is how an upcoming release gets its
 * pre-save button on the front page.
 * Returns: Single release object or null
 */
export const latestReleaseQuery = `*[_type == "release" && (pinToHero == true || releaseDate <= $today)]
  | order(select(pinToHero == true => 1, 0) desc, releaseDate desc)[0] {
  _id,
  title,
  slug,
  artistLine,
  releaseType,
  coverImage,
  releaseDate,
  presaveUrl,
  spotifyUrl,
  appleMusicUrl,
  youtubeUrl,
  pinToHero
}`

/**
 * Promoter materials query - fetches the press kit and rider content
 * Returns: Single promoterMaterials document with all fields
 */
export const promoterMaterialsQuery = `*[_type == "promoterMaterials"][0] {
  _id,
  "technicalRider": technicalRider.asset->url,
  hospitalityRider,
  bandBioShort,
  bandBioLong,
  pressPhotos,
  "logoFiles": logoFiles[].asset->url,
  googleDriveUrl,
  contactEmail,
  contactPhone
}`
