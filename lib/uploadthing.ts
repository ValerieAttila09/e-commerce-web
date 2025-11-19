// src/server/uploadthing.ts
import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }) // Allow only images up to 4MB
    .onUploadComplete(({ file }) => {
      console.log("File uploaded:", file.ufsUrl);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
