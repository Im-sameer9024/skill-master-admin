/* eslint-disable react-hooks/exhaustive-deps */
import { useCreateListeningQuestion } from "@/pages/ListeningQuestions/hooks/useListeningQuestions";
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoClose } from "react-icons/io5";
import { Loader2, Plus, Trash2, AlertCircle, X, Play, Save } from "lucide-react";
import { toast } from "sonner";
import QuillEditor from "@/components/common/QuillEditor/QuillEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { createListeningQuestionSchema } from "@/validation/ListeningQuestionSchemas";

const CreateListeningQuestion = ({ setShowCreateListeningQuestion }) => {
  const { id } = useParams(); // listening_item_id

  const [audioPreview, setAudioPreview] = useState(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState("");
  const [optionContents, setOptionContents] = useState({}); // Separate state for option contents
  const [savedOptions, setSavedOptions] = useState({}); // Track which options are saved
  const [titleContent, setTitleContent] = useState(""); // Separate state for title content
  const [isTitleSaved, setIsTitleSaved] = useState(true); // Track if title is saved

  //---------------------api for create Listening Question ----------------------
  const {
    mutate: createListeningQuestion,
    isPending: isSubmitting,
    error: apiError,
  } = useCreateListeningQuestion();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createListeningQuestionSchema),
    defaultValues: {
      title: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      answer: "",
      type: "text",
      audioFile: null,
      status: "active",
    },
  });

  const audioFile = watch("audioFile");
  const selectedType = watch("type");
  const selectedStatus = watch("status");
  const options = watch("options") || [];
  const answer = watch("answer");
  const formTitle = watch("title");

  // Initialize option contents and title
  useEffect(() => {
    const initialContents = {};
    const initialSaved = {};
    options.forEach((option, index) => {
      initialContents[index] = option?.text || "";
      initialSaved[index] = true; // Mark as saved initially if there's content
    });
    setOptionContents(initialContents);
    setSavedOptions(initialSaved);
    
    // Initialize title content
    setTitleContent(formTitle || "");
    setIsTitleSaved(true);
  }, []);

  // Handle title content change (local state only)
  const handleTitleChange = useCallback((value) => {
    setTitleContent(value);
    setIsTitleSaved(false); // Mark as unsaved when content changes
  }, []);

  // Save title to form state
  const saveTitle = async () => {
    setValue("title", titleContent);
    setIsTitleSaved(true);
    
    // Trigger validation
    await trigger("title");
    toast.success("Title saved successfully!");
  };

  // Handle option content change (local state only)
  const handleOptionContentChange = useCallback((index, value) => {
    setOptionContents(prev => ({
      ...prev,
      [index]: value
    }));
    // Mark as unsaved when content changes
    setSavedOptions(prev => ({
      ...prev,
      [index]: false
    }));
  }, []);

  // Save individual option to form state
  const saveOption = async (index) => {
    const content = optionContents[index] || "";
    
    // Update form state
    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      text: content,
    };
    setValue("options", newOptions);

    // Mark as saved
    setSavedOptions(prev => ({
      ...prev,
      [index]: true
    }));

    // Trigger validation
    await trigger(`options.${index}.text`);
    await trigger("options");

    toast.success(`Option ${String.fromCharCode(65 + index)} saved successfully!`);
  };

  // Save all options and title
  const saveAll = async () => {
    let hasChanges = false;

    // Save title if unsaved
    if (!isTitleSaved) {
      setValue("title", titleContent);
      setIsTitleSaved(true);
      hasChanges = true;
    }

    // Save options
    const newOptions = [...options];
    options.forEach((_, index) => {
      const content = optionContents[index] || "";
      if (newOptions[index].text !== content) {
        newOptions[index] = {
          ...newOptions[index],
          text: content,
        };
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setValue("options", newOptions);
      
      // Mark all as saved
      const allSaved = {};
      options.forEach((_, index) => {
        allSaved[index] = true;
      });
      setSavedOptions(allSaved);

      await trigger(["title", "options"]);
      toast.success("All changes saved successfully!");
    } else {
      toast.info("No changes to save.");
    }
  };

  //---------------------------------handle submit function -----------------------------------

  const onSubmit = async (data) => {
    // First, save all unsaved content (title and options)
    await saveAll();
    
    // Re-trigger validation to get latest state
    const isValid = await trigger();
    
    if (!isValid) {
      toast.error("Please fix validation errors before submitting.");
      return;
    }

    const formData = new FormData();

    // Append basic fields
    formData.append("listening_item_id", id);
    formData.append("title", data.title);
    formData.append("answer", data.answer);
    formData.append("status", data.status);
    formData.append("type", data.type);
    formData.append("sequence", "1");

    // Append audio file if type is audio
    if (data.type === "audio" && data.audioFile && data.audioFile[0]) {
      formData.append("audioFile", data.audioFile[0]);
    }

    // Append options
    data.options.forEach((option, index) => {
      formData.append(`options[${index}][text]`, option.text);
      formData.append(
        `options[${index}][isCorrect]`,
        option.isCorrect.toString()
      );
    });

    console.log("Submitting data:", data);

    // createListeningQuestion(formData, {
    //   onSuccess: () => {
    //     toast.success("Listening question created successfully!");
    //     setShowCreateListeningQuestion(false);
    //     reset();
    //     setOptionContents({});
    //     setSavedOptions({});
    //     setTitleContent("");
    //     setIsTitleSaved(true);
    //     if (audioPreviewUrl) {
    //       URL.revokeObjectURL(audioPreviewUrl);
    //     }
    //   },
    //   onError: (error) => {
    //     toast.error(
    //       error.response?.data?.message || "Failed to create listening question"
    //     );
    //   },
    // });
  };

  // Handle audio preview
  useEffect(() => {
    if (audioFile && audioFile.length > 0) {
      const file = audioFile[0];
      const url = URL.createObjectURL(file);
      setAudioPreviewUrl(url);
      setAudioPreview({ type: "audio", url });
    } else {
      setAudioPreview(null);
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
        setAudioPreviewUrl("");
      }
    }

    return () => {
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
      }
    };
  }, [audioFile]);

  const handleAudioChange = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.startsWith('audio/')) {
        toast.error("Please select an audio file");
        setValue("audioFile", null);
        return;
      }

      // Validate file size (50MB)
      const maxSize = 50 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error("File size must be less than 50MB");
        setValue("audioFile", null);
        return;
      }

      clearErrors("audioFile");
      await trigger("audioFile");
    }
  };

  const removeAudioPreview = () => {
    setValue("audioFile", null);
    setAudioPreview(null);
    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl);
      setAudioPreviewUrl("");
    }
    clearErrors("audioFile");
  };

  const handleCorrectAnswerChange = async (index) => {
    const newOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setValue("options", newOptions);

    // Set answer to corresponding letter (a, b, c, d)
    const answerLetter = String.fromCharCode(97 + index);
    setValue("answer", answerLetter);
    
    await trigger(["options", "answer"]);
  };

  const addOption = async () => {
    if (options.length < 4) {
      const newOptions = [...options, { text: "", isCorrect: false }];
      setValue("options", newOptions);
      
      // Update local state for the new option
      const newIndex = newOptions.length - 1;
      setOptionContents(prev => ({
        ...prev,
        [newIndex]: ""
      }));
      setSavedOptions(prev => ({
        ...prev,
        [newIndex]: true
      }));
      
      await trigger("options");
    }
  };

  const removeOption = async (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setValue("options", newOptions);

      // Update local state
      setOptionContents(prev => {
        const newContents = { ...prev };
        delete newContents[index];
        // Reindex the contents
        const reindexedContents = {};
        newOptions.forEach((_, newIndex) => {
          const oldIndex = newIndex >= index ? newIndex + 1 : newIndex;
          reindexedContents[newIndex] = newContents[oldIndex] || "";
        });
        return reindexedContents;
      });

      setSavedOptions(prev => {
        const newSaved = { ...prev };
        delete newSaved[index];
        // Reindex the saved states
        const reindexedSaved = {};
        newOptions.forEach((_, newIndex) => {
          const oldIndex = newIndex >= index ? newIndex + 1 : newIndex;
          reindexedSaved[newIndex] = newSaved[oldIndex] || true;
        });
        return reindexedSaved;
      });

      // If removed option was correct, update answer
      if (options[index].isCorrect) {
        const correctIndex = newOptions.findIndex((opt) => opt.isCorrect);
        if (correctIndex !== -1) {
          const answerLetter = String.fromCharCode(97 + correctIndex);
          setValue("answer", answerLetter);
        } else {
          setValue("answer", "");
        }
      }
      
      await trigger(["options", "answer"]);
    }
  };

  const handleCancel = () => {
    setShowCreateListeningQuestion(false);
    reset();
    setOptionContents({});
    setSavedOptions({});
    setTitleContent("");
    setIsTitleSaved(true);

    // Clean up preview URL
    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl);
    }
  };

  // Check if any content is unsaved
  const hasUnsavedContent = !isTitleSaved || Object.values(savedOptions).some(saved => !saved);

  return (
    <div className="font-fontContent p-6 max-h-[90vh] overflow-y-auto">
      {/*------------------ Header----------------- */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Create New Listening Question
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Add a new listening question with rich text support
          </p>
        </div>
        <Button
          onClick={handleCancel}
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
          disabled={isSubmitting}
        >
          <IoClose className="h-5 w-5" />
        </Button>
      </div>

      {/*-------------- API Error Message--------------- */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error creating listening question
              </h3>
              <p className="text-sm text-red-600 mt-1">
                {apiError.response?.data?.message ||
                  "Failed to create listening question"}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/*------------------- Question Title with QuillEditor------------------------------ */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Question Title *
            </Label>
            <div className="flex items-center gap-2">
              {!isTitleSaved && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={saveTitle}
                  disabled={isSubmitting}
                  className="flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-700"
                >
                  <Save className="h-3 w-3" />
                  Save Title
                </Button>
              )}
              {!isTitleSaved && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Unsaved
                </span>
              )}
            </div>
          </div>
          <QuillEditor
            value={titleContent}
            onChange={handleTitleChange}
            placeholder="Enter your question title here..."
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.title.message}
            </p>
          )}
        </div>

        {/*--------------- Options Section--------------------- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">
              Options * (Minimum 2, Maximum 4)
            </Label>
            <div className="flex items-center gap-2">
              {hasUnsavedContent && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={saveAll}
                  disabled={isSubmitting}
                  className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100"
                >
                  <Save className="h-4 w-4" />
                  Save All
                </Button>
              )}
              {options.length < 4 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  disabled={isSubmitting}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Option
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {options.map((option, index) => {
              const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
              const isSaved = savedOptions[index];

              return (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                        {optionLetter}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Option {optionLetter}
                      </span>
                      {!isSaved && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Unsaved
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {!isSaved && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => saveOption(index)}
                          disabled={isSubmitting}
                          className="flex items-center gap-1 bg-green-50 hover:bg-green-100 text-green-700"
                        >
                          <Save className="h-3 w-3" />
                          Save
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant={option.isCorrect ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCorrectAnswerChange(index)}
                        disabled={isSubmitting}
                        className={
                          option.isCorrect
                            ? "bg-green-600 hover:bg-green-700"
                            : ""
                        }
                      >
                        {option.isCorrect ? "Correct" : "Mark Correct"}
                      </Button>

                      {options.length > 2 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeOption(index)}
                          disabled={isSubmitting}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Option Content - Separate state for each editor */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Option Content *
                    </Label>
                    <QuillEditor
                      value={optionContents[index] || ""}
                      onChange={(value) => handleOptionContentChange(index, value)}
                      placeholder={`Enter option ${optionLetter} content...`}
                      height="150px"
                      key={`option-${index}`}
                    />
                    {errors.options?.[index]?.text && (
                      <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.options[index].text.message}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Validation Errors */}
          {errors.options &&
            typeof errors.options === "object" &&
            !Array.isArray(errors.options) && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.options.message}
              </p>
            )}

          {/* Selected Answer Display */}
          {answer && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <span className="font-medium">Selected Answer:</span> Option{" "}
                {answer.toUpperCase()}
              </p>
            </div>
          )}
        </div>

        {/*---------------- Type for audio Field -------------- */}
        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-medium text-gray-700">
            Type
          </Label>
          <Select
            onValueChange={(value) => setValue("type", value)}
            disabled={isSubmitting}
            value={selectedType}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="text" className="cursor-pointer">
                  Text
                </SelectItem>
                <SelectItem value="audio" className="cursor-pointer">
                  Audio
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/*---------------- audio field ------------ */}
        {selectedType === "audio" && (
          <div className="space-y-2">
            <Label htmlFor="audioFile" className="text-sm font-medium text-gray-700">
              Audio File *
            </Label>
            <Input
              id="audioFile"
              type="file"
              accept="audio/*"
              className={`w-full ${
                errors.audioFile ? "border-red-500 focus:ring-red-500" : ""
              }`}
              disabled={isSubmitting}
              {...register("audioFile", {
                onChange: handleAudioChange,
              })}
            />
            {errors.audioFile && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.audioFile.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Supported formats: MP3, WAV, AAC. Max file size: 50MB
            </p>
          </div>
        )}

        {/*------------------- Audio Preview------------------------- */}
        {audioPreview && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium text-gray-700">
                Audio Preview
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={removeAudioPreview}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded border">
              <div className="p-2 bg-blue-100 rounded-full">
                <Play className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {audioFile[0]?.name}
                </p>
                <p className="text-xs text-gray-500">
                  Audio file • {(audioFile[0]?.size / (1024 * 1024)).toFixed(2)}{" "}
                  MB
                </p>
              </div>
              <audio controls className="h-8">
                <source src={audioPreview.url} type={audioFile[0]?.type} />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        )}

        {/*----------------------- Status Field----------------------- */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium text-gray-700">
            Status
          </Label>
          <Select
            onValueChange={(value) => setValue("status", value)}
            disabled={isSubmitting}
            value={selectedStatus}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="active" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Active
                  </div>
                </SelectItem>
                <SelectItem value="inactive" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Inactive
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="min-w-[100px] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[100px] bg-darkSky hover:bg-darkSky/90 text-white transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Creating...
              </>
            ) : (
              "Create Question"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateListeningQuestion;