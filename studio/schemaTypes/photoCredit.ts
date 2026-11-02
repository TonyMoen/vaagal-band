import {defineField} from 'sanity'

/**
 * The photographer of an image. Not shown on the page: it goes into the site's
 * structured data, so search engines can credit the photo.
 */
export const photoCreditField = defineField({
  name: 'credit',
  title: 'Photographer',
  type: 'string',
  description:
    'Credited in the page metadata for search engines (not shown on the page), e.g. "Ole Marius Førrisdahl".',
})
