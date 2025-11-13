// payload/collections/Matches.ts
import { CollectionConfig } from 'payload'

const teamLogoUrl = [
  { team: "Ulinzi Star", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910312/Ulinzi-Stars_tl47od.png" },
  { team: "Shabana Fc", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910316/shabanafc_mrzcxy.jpg" },
  { team: "Tusker Fc", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910313/Tusker-FC_eaeucx.png" },
  { team: "Gor Mahia Fc", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910297/Gor-Mahia_xc8n9c.png" },
  { team: "Mathare United", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910325/Mathare-United_ptlpih.png" },
  { team: "Nairobi United", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910321/Nai-united_treyoj.jpg" },
  { team: "Kariobangi Sharks", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910292/Kariobangi-Sharks_zjgvxd.png" },
  { team: "Kenya Police Fc", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910292/Police_qyg86z.png" },
  { team: "Bidco United", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910298/Bidco-FC-Logo_odxoos.png" },
  { team: "Bandari Fc", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910298/Bandari_wcacwy.png" },
  { team: "Posta Rangers Fc", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910318/Posta-Rangers_bc9rvb.png" },
  { team: "AFC Leaopards", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910308/AFC-Leopards_t6rhsj.png" },
  { team: "Sofapaka Fc", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910314/sofapaka_ltzbb8.png" },
  { team: "Kakamega Homeboyz", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910293/Kakamega-Homeboyz-1_m0wtw0.png" },
  { team: "Mara Sugar", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910292/marasugar_jivabw.jpg" },
  { team: "KCB Fc", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910292/KCB_pi1pfg.png" },
  { team: "Muranga Seal", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910321/muranga-seal_trzy7m.png" },
  { team: "APS Bomet", logoUrl: "https://res.cloudinary.com/dfuh1q6ic/image/upload/v1759910299/OIP-1_qngv38.jpg" }
]

export const Matches: CollectionConfig = {
  slug: 'matches',
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
        { label: 'MEN', value: 'men' },
        { label: 'WOMEN', value: 'women' },
        { label: 'YOUTH', value: 'youth' },
        { label: 'JUNIOR', value: 'junior' },
      ],
      required: true,
      defaultValue: 'men',
    },
    {
      name: 'homeTeam',
      type: 'select',
      options: teamLogoUrl.map(team => ({
        label: team.team,
        value: team.team,
      })),
      required: true,
      defaultValue: 'Muranga Seal',
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
    {
      name: 'ticketUrl',
      type: 'text',
      label: 'Ticket URL',
      admin: {
        description: 'Ticket purchase link (only for home games)',
        condition: (data) => data.homeTeam === 'Muranga Seal',
      },
    },
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
        { label: 'Premier League', value: 'premier-league' },
        { label: 'FKF Cup', value: 'fkf-cup' },
        { label: 'Super Cup', value: 'super-cup' },
        { label: 'Friendly Match', value: 'friendly' },
      ],
      required: true,
      defaultValue: 'premier-league',
    },
  ],
}