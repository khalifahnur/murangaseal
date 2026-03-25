import { CollectionConfig } from 'payload'

const teamLogoUrl = [
{ team: "Wempa Queens", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910321/muranga-seal_trzy7m.png" },
  { team: "Muranga Sparks Queens", logoUrl: "https://res.cloudinary.com/dtb4hsasc/image/upload/v1774434947/muranga_spark_a0gklx.png" },
  { team: "Desert Scorpions", logoUrl: "https://res.cloudinary.com/dtb4hsasc/image/upload/v1774434947/desert_scorpio_mqnbln.png" },
  { team: "Uweza Women", logoUrl: "https://res.cloudinary.com/dtb4hsasc/image/upload/v1774434947/uweza_soccer_arzkgp.png" },
  { team: "Black Panther QUeens", logoUrl: "https://res.cloudinary.com/dtb4hsasc/image/upload/v1774434946/black_panther_blsnoe.png" },
  { team: "Macmillian Queens", logoUrl: "https://res.cloudinary.com/dtb4hsasc/image/upload/v1774435088/placeholder_fadxot.svg" },
  { team: "Silver Wind Divas", logoUrl: "https://res.cloudinary.com/dtb4hsasc/image/upload/v1774435088/placeholder_fadxot.svg" },
  { team: "University Of Embu Queens", logoUrl: "https://res.cloudinary.com/dtb4hsasc/image/upload/v1774434946/ueq_otyazn.png" },
  { team: "Thika Startlets", logoUrl: "https://res.cloudinary.com/dtb4hsasc/image/upload/v1774435088/placeholder_fadxot.svg" },

]

export const WomenFixtures: CollectionConfig = {
  slug: 'wsl',
  admin: {
    useAsTitle: 'matchTitle',
    defaultColumns: ['matchTitle', 'homeTeam', 'awayTeam', 'matchDate', 'status', 'category'],
  },
  fields: [
    {
      name: 'matchTitle',
      type: 'text',
      required: true,
      admin: {
        description: 'Auto-generated match title',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.homeTeam && data?.awayTeam) {
              return `${data.homeTeam} vs ${data.awayTeam}`
            }
            return data?.matchTitle
          },
        ],
      },
    },
    {
      name: 'matchDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'WOMEN', value: 'women' },
      ],
      required: true,
      defaultValue: 'women',
    },
    {
      name: 'homeTeam',
      type: 'select',
      options: teamLogoUrl.map(team => ({
        label: team.team,
        value: team.team,
      })),
      required: true,
      defaultValue: 'Wempa Queens',
    },
    {
      name: 'awayTeam',
      type: 'select',
      options: teamLogoUrl.map(team => ({
        label: team.team,
        value: team.team,
      })),
      required: true,
    },
    {
      name: 'opponentLogo',
      type: 'select',
      label: 'Opponent Logo',
      options: teamLogoUrl.map(team => ({
        label: team.team,
        value: team.logoUrl,
      })),
      admin: {
        description: 'Select opponent team logo',
        //condition: (data) => data.awayTeam && data.awayTeam !== 'Muranga Seal',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            // Auto-select logo based on away team
            if (data?.awayTeam && !value) {
              const team = teamLogoUrl.find(t => t.team === data.awayTeam)
              return team?.logoUrl || null
            }
            return value
          },
        ],
      },
    },
    {
      name: 'venue',
      type: 'text',
      required: true,
      defaultValue: 'SportPesa Arena',
    },
    // {
    //   name: 'ticketUrl',
    //   type: 'text',
    //   label: 'Ticket URL',
    //   admin: {
    //     description: 'Ticket purchase link (only for home games)',
    //     condition: (data) => data.homeTeam === 'Muranga Seal',
    //   },
    // },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Live', value: 'live' },
        { label: 'Finished', value: 'finished' },
        { label: 'Postponed', value: 'postponed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'upcoming',
    },
    {
      name: 'score',
      type: 'group',
      fields: [
        {
          name: 'homeScore',
          type: 'number',
          admin: {
            condition: (data) => data.status === 'finished' || data.status === 'live',
          },
        },
        {
          name: 'awayScore',
          type: 'number',
          admin: {
            condition: (data) => data.status === 'finished' || data.status === 'live',
          },
        },
      ],
    },
    {
      name: 'competition',
      type: 'select',
      options: [
        { label: 'FKF WDIV.1 ZONE A', value: 'FKF WDIV.1 ZONE A' },
        { label: 'Super Cup', value: 'Super Cup' },
        { label: 'Mozzart Bet Cup', value: 'Mozzart Bet Cup' },
        { label: 'Friendly Match', value: 'Friendly Match' },
      ],
      required: true,
      defaultValue: 'FKF WDIV.1 ZONE A',
    },
    // {
    //   name: 'players',
    //   type: 'relationship',
    //   relationTo: 'players',
    //   hasMany: true,
    //   required: true,
    // },
    // {
    //   name: 'votingOpen',
    //   type: 'checkbox',
    //   defaultValue: true,
    // },
    // {
    //   name: 'winner',
    //   type: 'relationship',
    //   relationTo: 'players',
    //   admin: { position: 'sidebar' },
    // },
    //         {
    //       name: "slug",
    //       type: "text",
    //       unique: true,
    //       required: true,
    //       admin: {
    //         position: "sidebar",
    //       },
    //       hooks: {
    //         beforeChange: [
    //           ({ data, originalDoc }) => {
    //             if (data?.matchTitle && !data.slug) {
    //               const baseSlug = data.matchTitle
    //                 .toLowerCase()
    //                 .replace(/[^a-z0-9]+/g, "-")
    //                 .replace(/(^-|-$)/g, "");
    //               return originalDoc?.id
    //                 ? `${baseSlug}-${originalDoc.id.slice(-6)}`
    //                 : baseSlug;
    //             }
    //             return data?.slug;
    //           },
    //         ],
    //       },
    //     },
  ],
}