// import type { CollectionConfig } from "payload";

// export const Players: CollectionConfig = {
//   slug: "players",
//   admin: {
//     useAsTitle: "name",
//     defaultColumns: ["jerseyNumber", "name", "position", "nickname"],
//     group: "Team",
//   },
//   fields: [
//     {
//       name: "mugshot",
//       type: "text",
//       label: "Mugshot (Cloudinary URL)",
//       required: true,
//       admin: {
//         description:
//           "Paste Cloudinary image URL (e.g. https://res.cloudinary.com/yourcloud/image/upload/v123456/players/salah.jpg)",
//         placeholder: "https://res.cloudinary.com/...",
//       },
//       validate: (url: any) => {
//         if (!url.startsWith("https://res.cloudinary.com/")) {
//           return "Must be a valid Cloudinary URL";
//         }
//         return true;
//       },
//     },

//     {
//       name: "jerseyNumber",
//       type: "number",
//       label: "Jersey Number",
//       min: 1,
//       max: 99,
//       required: true,
//       unique: true,
//       admin: {
//         position: "sidebar",
//       },
//     },

//     {
//       name: "position",
//       type: "select",
//       required: true,
//       options: [
//         { label: "Goalkeeper", value: "GK" },
//         { label: "Defender", value: "DEF" },
//         { label: "Midfielder", value: "MID" },
//         { label: "Forward", value: "FWD" },
//         { label: "Centre-Back", value: "CB" },
//         { label: "Left-Back", value: "LB" },
//         { label: "Right-Back", value: "RB" },
//         { label: "Defensive Midfielder", value: "CDM" },
//         { label: "Central Midfielder", value: "CM" },
//         { label: "Attacking Midfielder", value: "CAM" },
//         { label: "Left Winger", value: "LW" },
//         { label: "Right Winger", value: "RW" },
//         { label: "Striker", value: "ST" },
//       ],
//       admin: {
//         isSortable: true,
//       },
//     },

//     {
//       name: "name",
//       type: "text",
//       required: true,
//       label: "Full Name",
//     },

//     {
//       name: "nickname",
//       type: "text",
//       label: "Nickname",
//       admin: {
//         placeholder: "e.g. The Egyptian King, El Niño",
//       },
//     },
//     {
//       name: "height",
//       type: "number",
//       label: "Height (cm)",
//       min: 150,
//       max: 220,
//       admin: {
//         step: 1,
//         placeholder: "e.g. 175",
//       },
//     },
//     {
//       name: "previousClub",
//       type: "text",
//       label: "Previous Club",
//       admin: {
//         placeholder: "e.g. AS Roma, Basel, Chelsea",
//       },
//     },

//     {
//       name: "roleModel",
//       type: "text",
//       label: "Role Model",
//       admin: {
//         placeholder: "e.g. Zinedine Zidane, Ronaldo Nazário",
//       },
//     },

//     {
//       name: "funFacts",
//       type: "array",
//       label: "Fun Facts",
//       minRows: 1,
//       maxRows: 10,
//       fields: [
//         {
//           name: "fact",
//           type: "text",
//           required: true,
//         },
//       ],
//       admin: {
//         description: "Add cool trivia about the player",
//       },
//     },

//     {
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
//             if (data?.name && !data.slug) {
//               const baseSlug = data.title
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
//   ],
// };

import type { CollectionConfig } from "payload";

  /* eslint-disable @typescript-eslint/no-explicit-any */
export const Players: CollectionConfig = {
  slug: "players",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["jerseyNumber", "name", "position", "nickname"],
    group: "Team",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      unique: true,
      required: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ data, originalDoc }) => {
            if (data?.name && !data.slug) {
              const baseSlug = data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return originalDoc?.id
                ? `${baseSlug}-${originalDoc.id.slice(-6)}`
                : baseSlug;
            }
            return data?.slug;
          },
        ],
      },
    },

    {
      name: "jerseyNumber",
      type: "text",
      required: true,
      admin: { position: "sidebar" },
    },

    {
      name: "name",
      type: "text",
      required: true,
      label: "Full Name ",
    },

    {
      name: "firstName",
      type: "text",
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          ({ data, value }) => {
            if (value) return value;
            if (data?.name) {
              const parts = data.name.trim().split(" ");
              return parts[0];
            }

            return value;
          },
        ],
      },
    },
    {
      name: "lastName",
      type: "text",
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          ({ data, value }) => {
            if (value) return value;
            if (data?.name) {
              const parts = data.name.trim().split(" ");
              return parts.slice(1).join(" ") || parts[0];
            }

            return value;
          },
        ],
      },
    },
    {
      name: "positionGroup",
      type: "select",
      required: true,
      options: [
        { label: "Goalkeepers", value: "goalkeepers" },
        { label: "Defenders", value: "defenders" },
        { label: "Midfielders", value: "midfielders" },
        { label: "Forwards", value: "forwards" },
      ],
      admin: {
        description: "Used to group players on the team page",
      },
    },
    {
      name: "position",
      type: "text",
      required: true,
      label: "Position (e.g. RW, ST, CDM)",
    },

    {
      name: "mugshot",
      type: "text",
      label: "Mugshot (Cloudinary URL)",
      required: true,
      admin: {
        description: "Paste Cloudinary image URL",
        placeholder: "https://res.cloudinary.com/...",
      },
      validate: (url: any) => {
        if (!url.startsWith("https://res.cloudinary.com/")) {
          return "Must be a valid Cloudinary URL";
        }
        return true;
      },
    },

    {
      name: "nickname",
      type: "text",
      label: "Nickname",
    },

    {
      name: "height",
      type: "number",
      label: "Height (cm)",
      min: 150,
      max: 220,
    },

    {
      name: "previousClub",
      type: "text",
      label: "Previous Club",
    },

    {
      name: "roleModel",
      type: "text",
      label: "Role Model",
    },

    {
      name: "funFacts",
      type: "array",
      fields: [
        {
          name: "fact",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "Add fun trivia about the player",
      },
    },

    {
      name: "captain",
      type: "checkbox",
      label: "Is Captain",
      defaultValue: false,
    },

    {
      name: "loaned",
      type: "checkbox",
      label: "Loaned Player",
      defaultValue: false,
    },
    {
      name: "loanFrom",
      type: "text",
      label: "Loaned From",
      admin: {
        condition: (_, sibling) => sibling?.loaned,
      },
    },
  ],
};
