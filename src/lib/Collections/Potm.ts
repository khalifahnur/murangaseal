import { CollectionConfig } from 'payload';

export const PlayerOfTheMonth: CollectionConfig = {
  slug: 'player-of-the-month',
  admin: {
    useAsTitle: 'monthYear',
    defaultColumns: ['monthYear', 'isActive', 'winner'],
  },
  fields: [
    {
      name: 'monthYear',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Format: 2025-03' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Only one month can be active at a time' },
    },
    {
      name: 'candidates',
      type: 'relationship',
      relationTo: 'players',
      hasMany: true,
      required: true,
    },
    {
      name: 'winner',
      type: 'relationship',
      relationTo: 'players',
      admin: { position: 'sidebar' },
    },
  ],
};