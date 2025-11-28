import { CollectionConfig } from 'payload';

export const PlayerOfTheMonth: CollectionConfig = {
  slug: 'player-of-the-month',
  admin: {
    useAsTitle: 'monthYear',
    defaultColumns: ['monthYear', 'isActive', 'winner'],
  },
  access: { read: () => true },
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
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (data.isActive && operation === 'create' || operation === 'update') {
          // Auto-deactivate all others when one is activated
          const payload = req.payload;
          await payload.update({
            collection: 'player-of-the-month',
            where: { id: { not_equals: data.id } },
            data: { isActive: false },
          });
        }
        return data;
      },
    ],
  },
};