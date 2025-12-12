import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'release',
  title: 'Release',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Song or album name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseType',
      title: 'Release Type',
      type: 'string',
      options: {
        list: [
          {title: 'Single', value: 'single'},
          {title: 'EP', value: 'EP'},
          {title: 'Album', value: 'album'},
        ],
        layout: 'radio',
      },
      initialValue: 'single',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Album/single cover art',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Spotify URL',
      type: 'url',
      description: 'Link to release on Spotify',
    }),
    defineField({
      name: 'appleMusicUrl',
      title: 'Apple Music URL',
      type: 'url',
      description: 'Link to release on Apple Music',
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Link to music video or audio on YouTube',
    }),
    defineField({
      name: 'isLatest',
      title: 'Feature as Latest Release',
      type: 'boolean',
      description: 'Enable to feature this release on the homepage hero. Only one release should be marked as latest.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'releaseType',
      media: 'coverImage',
    },
  },
  orderings: [
    {
      title: 'Release Date (Newest)',
      name: 'releaseDateDesc',
      by: [{field: 'releaseDate', direction: 'desc'}],
    },
    {
      title: 'Release Date (Oldest)',
      name: 'releaseDateAsc',
      by: [{field: 'releaseDate', direction: 'asc'}],
    },
  ],
})
