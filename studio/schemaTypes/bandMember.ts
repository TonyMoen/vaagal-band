import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'bandMember',
  title: 'Band Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the band member',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alias',
      title: 'Alias / Stage Name',
      type: 'string',
      description: 'Stage name or nickname (e.g., "Mr Caravan")',
    }),
    defineField({
      name: 'instrument',
      title: 'Instrument',
      type: 'string',
      description: 'Primary instrument or role (e.g., "Vokalist", "Gitarist")',
    }),
    defineField({
      name: 'inspiration',
      title: 'Musical Inspiration',
      type: 'string',
      description: 'Musical influences and inspirations',
    }),
    defineField({
      name: 'hobby',
      title: 'Hobby',
      type: 'string',
      description: 'Favorite hobby or interest',
    }),
    defineField({
      name: 'food',
      title: 'Favorite Food',
      type: 'string',
      description: 'Favorite food',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      description: 'Extended biography (optional)',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Band member photo',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 1, 2, 3...)',
      initialValue: 99,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'instrument',
      media: 'image',
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
