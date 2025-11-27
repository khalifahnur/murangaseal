import { CollectionConfig } from 'payload';

export const MOTMVotes: CollectionConfig = {
  slug: 'motm-votes',
  access: {
    read: () => true,
    create: () => true,
    update: () => false,
    delete: () => false,
  },
fields: [
  {
    name: 'match',
    type: 'relationship',
    relationTo: 'matches',
    required: true,
    index: true,
  },
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