import { CollectionConfig } from "payload";

  /* eslint-disable @typescript-eslint/no-explicit-any */
export const Highlights: CollectionConfig = {
  slug: "highlights",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "score", "featured", "createdAt"],
    group: "Media",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Video Title",
      admin: {
        placeholder: "e.g. GOALS | 2-1 MURANGA SEAL VS KCB",
      },
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Full Match", value: "FULL_MATCH" },
        { label: "Goals & Highlights", value: "GOALS" },
        { label: "Best Moments", value: "BEST_MOMENTS" },
        { label: "Press Conference", value: "PRESS_CONFERENCE" },
        { label: "Training", value: "TRAINING" },
      ],
      defaultValue: "GOALS",
      admin: {
        description: "Categorize the highlight type",
      },
    },
    {
      name: "score",
      type: "text",
      label: "Scoreline",
      admin: {
        placeholder: "2-1",
        description: "Leave empty if not applicable",
      },
    },
    {
      name: "teams",
      type: "text",
      required: true,
      label: "Teams",
      admin: {
        placeholder: "MURANGA SEAL VS KCB",
      },
    },
    {
      name: "youtubeUrl",
      type: "text",
      required: true,
      label: "YouTube URL",
      validate: (val: any) => {
        if (!val) return "YouTube URL is required";
        const youtubeRegex =
          /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|watch\?v=)|youtu\.be\/)[\w-]{11}.*$/;
        if (!youtubeRegex.test(val)) {
          return "Please enter a valid YouTube URL";
        }
        return true;
      },
      admin: {
        placeholder:
          "https://www.youtube.com/watch?v=abc123 or https://youtu.be/abc123",
      },
    },
    {
      name: "thumbnail",
      type: "text",
      required: true,
      admin: {
        description:
          "Paste your Cloudinary image URL here (e.g., https://res.cloudinary.com/your-cloud/image/upload/v1234567890/your-image.jpg)",
      },
      validate: (url: any) => {
        if (!url.startsWith("https://res.cloudinary.com/")) {
          return "Must be a valid Cloudinary URL";
        }
        return true;
      },
    },
    {
      name: "duration",
      type: "text",
      label: "Duration",
      admin: {
        placeholder: "e.g. 8:45",
        description: "Format: minutes:seconds",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      label: "Featured Highlight",
      defaultValue: false,
      admin: {
        description: "Show this on homepage or featured section",
      },
    },
  ],
  timestamps: true,
};
