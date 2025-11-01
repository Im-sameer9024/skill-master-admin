import * as z from "zod";

//----------------------------- Zod validation schema for Create listening Item ----------------------------
export const createListeningItemSchema = z
  .object({
    title: z
      .string()
      .min(2, "Title must be at least 2 characters")
      .max(100, "Title must be less than 100 characters")
      .regex(
        /^[a-zA-Z0-9\s\-_]+$/,
        "Title can only contain letters, numbers, spaces, hyphens, and underscores"
      ),

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

    totalTime: z
      .string()
      .min(1, "Total time is required")
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 120,
        {
          message: "Total time must be between 1 and 120 minutes",
        }
      ),

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
  );

//-------------------zod validation schema for update listening Item-------------------------


  export const updateListeningItemSchema = z.object({
  title: z.string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Title can only contain letters, numbers, spaces, hyphens, and underscores"),
  
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
  
  totalTime: z.string()
    .min(1, "Total time is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 120, {
      message: "Total time must be between 1 and 120 minutes"
    }),
  
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
