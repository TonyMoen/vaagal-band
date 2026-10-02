import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main hero heading text (e.g., "VÅGAL")',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Secondary text below the title',
    }),
    defineField({
      name: 'musicVideoUrl',
      title: 'Featured Music Video (YouTube URL)',
      type: 'url',
      description: 'The video shown under "Siste musikkvideo" on the homepage. Paste the YouTube link.',
    }),
    defineField({
      name: 'musicVideoTitle',
      title: 'Featured Music Video Title',
      type: 'string',
      description: 'The song title, e.g. "Øst til Vest". Shown as "Vågal – <title> (musikkvideo)".',
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true, // Enable image cropping/focal point
      },
      description: 'Full-bleed background image for the hero section',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
