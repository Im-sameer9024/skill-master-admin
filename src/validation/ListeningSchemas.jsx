import * as z from "zod";

//----------------------------- Zod validation schema for Create listening Item ----------------------------
export const createListeningItemSchema = z
  .object({
    title: z
      .string()
      .min(2, "Title must be at least 2 characters")
      .max(100, "Title must be less than 100 characters"),

    audio_title: z
      .string()
      .min(2, "Audio title must be at least 2 characters")
      .max(100, "Audio title must be less than 100 characters"),

    fileType: z.enum(["audio", "video"], {
      required_error: "File type is required",
    }),

    file: z
      .instanceof(FileList)
      .refine((files) => files?.length === 1, "File is required")
      .refine((files) => {
        const file = files[0];
        const maxSize = 100 * 1024 * 1024; // 100MB
        return file?.size <= maxSize;
      }, "File size must be less than 100MB"),

    instructions: z
      .string()
      .min(10, "Instructions must be greater than 10 characters"),
    

    description: z
      .string()
      .min(10, "Description must be greater than 10 characters")
      ,

    status: z.enum(["active", "inactive"], {
      required_error: "Status is required",
    }),
  })
  .refine(
    (data) => {
      // Custom validation for file type and file format matching
      if (!data.file || data.file.length === 0) return true;

      const file = data.file[0];
      if (data.fileType === "audio" && !file.type.startsWith("audio/")) {
        return false;
      }
      if (data.fileType === "video" && !file.type.startsWith("video/")) {
        return false;
      }
      return true;
    },
    {
      message: "File format does not match selected file type",
      path: ["file"],
    }
  )
  .refine(
    (data) => {
      // Ensure title and audio_title are different
      return data.title !== data.audio_title;
    },
    {
      message: "Item title and audio title should be different",
      path: ["audio_title"],
    }
  );

//-------------------zod validation schema for update listening Item-------------------------


export const updateListeningItemSchema = z.object({
  title: z.string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  
  audio_title: z.string()
    .min(2, "Audio title must be at least 2 characters")
    .max(100, "Audio title must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Audio title can only contain letters, numbers, spaces, hyphens, and underscores"),
  
  fileType: z.enum(["audio", "video"], {
    required_error: "File type is required",
  }),
  
  file: z.instanceof(FileList)
    .optional()
    .refine((files) => !files || files.length === 0 || files.length === 1, "Please select only one file")
    .refine((files) => {
      if (!files || files.length === 0) return true;
      const file = files[0];
      const maxSize = 100 * 1024 * 1024; // 100MB
      return file?.size <= maxSize;
    }, "File size must be less than 100MB"),
  
  instructions: z.string()
    .min(1, "Instructions are required")
    .refine((value) => {
      // Check if instructions have actual content (not just HTML tags)
      const hasTextContent = value
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim().length > 0;
      return hasTextContent;
    }, "Instructions must contain actual text content"),
  
  description: z.string()
    .optional()
    .refine((value) => {
      if (!value) return true; // Optional field
      // Check if description has actual content (not just HTML tags)
      const hasTextContent = value
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .trim().length > 0;
      return hasTextContent;
    }, "Description must contain actual text content"),
  
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
}).refine((data) => {
  // Custom validation for file type and file format matching (only if file is provided)
  if (!data.file || data.file.length === 0) return true;
  
  const file = data.file[0];
  if (data.fileType === "audio" && !file.type.startsWith('audio/')) {
    return false;
  }
  if (data.fileType === "video" && !file.type.startsWith('video/')) {
    return false;
  }
  return true;
}, {
  message: "File format does not match selected file type",
  path: ["file"],
});
