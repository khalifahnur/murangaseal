import type { CollectionConfig } from "payload";

  /* eslint-disable @typescript-eslint/no-explicit-any */
export const TechnicalCoach: CollectionConfig = {
  slug: "technical",
  admin: {
    useAsTitle: "name",
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
      name: "role",
      type: "select",
      options: [
        "Head Coach",
        "Assistant Coach",
        "Goalkeeping Coach",
        "Fitness Coach",
        "Physiotherapist",
        "Team Manager",
        "Analyst",
        "Kit Manager",
        "Trainer",
        "Welfare Officer",
        "Other",
      ],
      required: true,
      defaultValue: "Other",
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
        description: "Add fun trivia about the technical",
      },
    },

  ],
};
