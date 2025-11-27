import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { Matches } from "@/lib/Collections/Match";
import { Players } from "@/lib/Collections/players";
import { Highlights } from "@/lib/Collections/Highlights";
import { MOTMVotes } from "@/lib/Collections/MotmVotes";

export default buildConfig({
  editor: lexicalEditor(),

  collections: [
    {
      slug: "news",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          maxLength: 200,
        },
        {
          name: "excerpt",
          type: "textarea",
          maxLength: 400,
        },
        {
          name: "content",
          type: "richText",
          //editor: slateEditor(),  // Rich text editor for non-devs
          required: true,
        },
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
                if (data?.title && !data.slug) {
                  const baseSlug = data.title
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
        // {
        //   name: 'featuredImage',
        //   type: 'upload',
        //   //relationTo: 'media' as const,
        // },

        {
          name: "cloudinaryUrl",
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
          name: "publishDate",
          type: "date",
          required: true,
        },
      ],
    },
 
    Matches,
    Players,
    Highlights,
    MOTMVotes
  ],
  // endpoints: [
  // {
  //   path: '/api/vote-motm',
  //   method: 'post',
  //   handler: voteMOTM,
  // },
//],

  secret: process.env.PAYLOAD_SECRET || "",
 db: mongooseAdapter({
  url: process.env.MONGODB_URI || "mongodb://localhost:27017/loca_db",
  connectOptions: {
    maxPoolSize: 10,
    connectTimeoutMS: 60000, 
    socketTimeoutMS: 90000,  
    serverSelectionTimeoutMS: 60000, 
    heartbeatFrequencyMS: 10000,
    maxIdleTimeMS: 30000,
    retryWrites: true,
    retryReads: true,
  },
}),
  sharp,
});
