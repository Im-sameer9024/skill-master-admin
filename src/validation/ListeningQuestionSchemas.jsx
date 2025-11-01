import { z } from 'zod';

// Helper function to check if at least one option is correct
const hasCorrectOption = (options) => {
  return options && options.some(option => option.isCorrect === true);
};

// Helper function to check if all options have content
const allOptionsHaveContent = (options) => {
  return options && options.every(option => 
    option.text && 
    option.text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0
  );
};

// Helper function to check for duplicate options
const hasNoDuplicateOptions = (options) => {
  if (!options) return true;
  const optionTexts = options.map(option => 
    option.text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().toLowerCase()
  ).filter(text => text.length > 0);
  return new Set(optionTexts).size === optionTexts.length;
};

// Helper function to check if answer matches a correct option
const answerMatchesCorrectOption = (data) => {
  if (!data.answer || !data.options) return false;
  
  const answerIndex = data.answer.charCodeAt(0) - 97; // Convert 'a' to 0, 'b' to 1, etc.
  return data.options[answerIndex]?.isCorrect === true;
};

export const createListeningQuestionSchema = z.object({
  title: z.string()
    .min(1, "Question title is required")
    .refine(
      (value) => value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0,
      "Question title cannot be empty"
    ),
  
  options: z.array(
    z.object({
      text: z.string()
        .min(1, "Option content is required")
        .refine(
          (value) => value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0,
          "Option content cannot be empty"
        ),
      isCorrect: z.boolean()
    })
  )
  .min(2, "At least 2 options are required")
  .max(4, "Maximum 4 options allowed")
  .refine(hasCorrectOption, "At least one option must be marked as correct")
  .refine(allOptionsHaveContent, "All options must have content")
  .refine(hasNoDuplicateOptions, "Options must be unique"),
  
  answer: z.string()
    .min(1, "Answer is required")
    .regex(/^[a-d]$/, "Answer must be a letter between a and d"),
  
  type: z.enum(["text", "audio"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be either 'text' or 'audio'"
  }),
  
  audioFile: z.any()
    .optional()
    .superRefine((files, ctx) => {
      // Get the current form data from the context
      const formData = ctx.formData;
      const type = formData?.get('type');
      
      // If type is audio, validate the file
      if (type === 'audio') {
        if (!files || files.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Audio file is required when type is 'audio'",
          });
          return;
        }
        
        const file = files[0];
        
        // Validate file type
        const validTypes = [
          'audio/mpeg', 
          'audio/wav', 
          'audio/aac', 
          'audio/x-m4a', 
          'audio/mp4',
          'audio/mp3',
          'audio/x-wav'
        ];
        
        if (!validTypes.includes(file.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File must be an audio file (MP3, WAV, AAC, M4A)",
          });
        }
        
        // Validate file size (50MB)
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "File size must be less than 50MB",
          });
        }
      }
    }),
  
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
    invalid_type_error: "Status must be either 'active' or 'inactive'"
  })
}).refine(
  answerMatchesCorrectOption,
  {
    message: "Answer must match the correct option",
    path: ["answer"]
  }
);