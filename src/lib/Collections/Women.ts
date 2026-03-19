import type { CollectionConfig } from "payload";

  /* eslint-disable @typescript-eslint/no-explicit-any */
export const Women: CollectionConfig = {
  slug: "women",
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