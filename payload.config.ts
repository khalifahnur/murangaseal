import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";
import { Matches } from "@/lib/Collections/Match";

export default buildConfig({
  editor: lexicalEditor(),

  collections: [
    // Collection for News
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
 
    Matches
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "mongodb://localhost:27017/loca_db",
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
});
