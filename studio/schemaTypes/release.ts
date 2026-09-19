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
      name: 'slug',
      title: 'Song Page Address',
      type: 'slug',
      description:
        'The release gets its own page at vaagalband.no/<address>, with links to every streaming service. Click Generate. If left empty, the address is made from the title. Do not change it after the link has been shared.',
      options: {
        source: 'title',
        maxLength: 80,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/æ/g, 'ae')
            .replace(/ø/g, 'o')
            .replace(/å/g, 'a')
            .normalize('NFKD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/&/g, ' og ')
            .replace(/['’`´]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 80),
      },
    }),
    defineField({
      name: 'artistLine',
      title: 'Artists',
      type: 'string',
      description: 'Only for collaborations, e.g. "Vågal, Endless". Leave empty when Vågal is the only artist.',
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
      description: 'Album/single cover art. Upload the full size file (at least 1400 x 1400), the site scales it down.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      description:
        'A date in the future makes the song page show "Kommer <date>" and the pre-save button instead of the listening links.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'About the Release (Norwegian)',
      type: 'text',
      rows: 3,
      description:
        'Optional. One or two sentences shown on the song page. Without it the page shows title, artist and release year.',
    }),
    defineField({
      name: 'presaveUrl',
      title: 'Pre-save URL',
      type: 'url',
      description:
        'Optional. The pre-save link from the distributor (e.g. DistroKid HyperFollow). Shown on the song page until the release date.',
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
      description:
        'Link to music video or audio on YouTube. The song page also links to YouTube Music with the same video.',
    }),
    defineField({
      name: 'tidalUrl',
      title: 'Tidal URL',
      type: 'url',
    }),
    defineField({
      name: 'deezerUrl',
      title: 'Deezer URL',
      type: 'url',
    }),
    defineField({
      name: 'amazonMusicUrl',
      title: 'Amazon Music URL',
      type: 'url',
    }),
    defineField({
      name: 'pinToHero',
      title: 'Pin to Homepage Hero',
      type: 'boolean',
      description:
        'Leave off: the homepage hero shows the newest release that is out, by Release Date. Turn on to keep this release in the hero instead, for example an upcoming release with a pre-save link. Only one release should be pinned.',
      initialValue: false,
    }),
    defineField({
      name: 'isLatest',
      title: 'Feature as Latest Release (old)',
      type: 'boolean',
      deprecated: {reason: 'The homepage hero now follows Release Date. Use "Pin to Homepage Hero" for exceptions.'},
      hidden: true,
      readOnly: true,
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
