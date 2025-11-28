import { CollectionConfig } from 'payload';

export const POTMVotes: CollectionConfig = {
  slug: 'potm-votes',
  access: {
    read: () => true,
    create: () => true,
  },
fields: [
  {
      name: 'month',
      type: 'relationship',
      relationTo: 'player-of-the-month',
      required: true,
      index: true,
    },
  // {
  //   name: 'match',
  //   type: 'relationship',
  //   relationTo: 'matches',
  //   required: true,
  //   index: true,
  // },
  {
    name: 'player',
    type: 'relationship',
    relationTo: 'players',
    required: true,
  },
  {
    name: 'votedBy',
    type: 'relationship',
    relationTo: 'users',
    index: true,
  },
  {
    name: 'ipAddress',
    type: 'text',
    index: true,
  },
  {
    name: 'userAgent',
    type: 'text',
  },
],

};