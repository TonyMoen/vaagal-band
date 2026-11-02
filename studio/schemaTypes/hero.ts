import {defineType, defineField, defineArrayMember} from 'sanity'

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
    defineField({
      name: 'panels',
      title: 'Band Photos Side by Side',
      type: 'array',
      description:
        'Optional: photos shown in equal panels across the top of the homepage, in this order (four looks best). Set the hotspot on each face. When there are photos here, they are used instead of the Hero Image.',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Who is in the photo',
              type: 'string',
              description:
                'E.g. "Truls Vennman, trommeslager i Vågal, bak trommesettet". Read by search engines and screen readers.',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
