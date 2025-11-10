import { z } from "zod";

export const createListeningQuestionSchema = z.object({
  titleType: z.enum(["text", "audio"], {
    required_error: "Title type is required",
  }),

  title: z.string().optional(),

  titleAudio: z.any().optional(),

  options: z.array(
    z.object({
      text: z.string().min(1, "Option content is required"),
      isCorrect: z.boolean(),
    })
  ).min(2, "At least 2 options are required")
   .max(4, "Maximum 4 options allowed")
   .refine(
     (options) => options.some((option) => option.isCorrect === true),
     "At least one option must be marked as correct"
   ),

  answer: z.string().min(1, "Answer is required"),

  time: z.number().min(1, "Time must be at least 1 second")
            .max(300, "Time cannot exceed 300 seconds"),

  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
}).refine(
  (data) => {
    if (data.titleType === "text") {
      return data.title && data.title.trim().length > 0;
    }
    return true;
  },
  {
    message: "Title is required when title type is text",
    path: ["title"],
  }
).refine(
  (data) => {
    if (data.titleType === "audio") {
      return data.titleAudio && data.titleAudio.length > 0;
    }
    return true;
  },
  {
    message: "Audio file is required when title type is audio",
    path: ["titleAudio"],
  }
);

export const updateListeningQuestionSchema = z.object({
  titleType: z.enum(["text", "audio"], {
    required_error: "Title type is required",
  }),

  title: z.string().optional(),

  titleAudio: z.any().optional(),

  options: z.array(
    z.object({
      text: z.string().min(1, "Option content is required"),
      isCorrect: z.boolean(),
    })
  ).min(2, "At least 2 options are required")
   .max(4, "Maximum 4 options allowed")
   .refine(
     (options) => options.some((option) => option.isCorrect === true),
     "At least one option must be marked as correct"
   ),

  answer: z.string().min(1, "Answer is required"),

  time: z.number().min(1, "Time must be at least 1 second")
            .max(300, "Time cannot exceed 300 seconds"),

  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
}).refine(
  (data) => {
    if (data.titleType === "text") {
      return data.title && data.title.trim().length > 0;
    }
    return true;
  },
  {
    message: "Title is required when title type is text",
    path: ["title"],
  }
);