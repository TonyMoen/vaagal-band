import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'promoterMaterials',
  title: 'Promoter Materials',
  type: 'document',
  fields: [
    defineField({
      name: 'technicalRider',
      title: 'Technical Rider (PDF)',
      type: 'file',
      description: 'Upload stage plot and input list PDF',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'hospitalityRider',
      title: 'Hospitality Rider',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Catering, dressing room, travel requirements (with formatting)',
    }),
    defineField({
      name: 'bandBioShort',
      title: 'Band Bio (Short)',
      type: 'text',
      rows: 3,
      description: 'Brief band description (1-2 sentences)',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'bandBioLong',
      title: 'Band Bio (Long)',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Full band biography with rich text formatting',
    }),
    defineField({
      name: 'pressPhotos',
      title: 'Press Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
      description: 'High-resolution band photos for press use',
    }),
    defineField({
      name: 'logoFiles',
      title: 'Logo Files',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: '.png,.svg',
          },
        },
      ],
      description: 'Band logo in PNG and SVG formats',
    }),
    defineField({
      name: 'googleDriveUrl',
      title: 'Google Drive Promo Kit',
      type: 'url',
      description: 'Link to Google Drive folder with full promo kit',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Booking Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Booking Phone',
      type: 'string',
      description: 'Optional phone number for booking inquiries',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Promoter Materials',
        subtitle: 'Press kit and rider information',
      }
    },
  },
})
