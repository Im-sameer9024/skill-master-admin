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
import {
  Loader2,
  Plus,
  Trash2,
  AlertCircle,
  X,
  Play,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import QuillEditor from "@/components/common/QuillEditor/QuillEditor";
import { zodResolver } from "@hookform/resolvers/zod";
import { createListeningQuestionSchema } from "@/validation/ListeningQuestionSchemas";

const CreateListeningQuestion = ({ setShowCreateListeningQuestion }) => {
  const { listening_item_id, audio_id } = useParams();

  const [audioPreview, setAudioPreview] = useState(null);
  const [audioPreviewUrl, setAudioPreviewUrl] = useState("");
  const [optionContents, setOptionContents] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  //---------------------api for create Listening Question ----------------------
  const {
    mutate: createListeningQuestion,
    isPending: isSubmitting,
    error: apiError,
  } = useCreateListeningQuestion(listening_item_id, audio_id);

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
      type: "text",
      titleAudio: null,
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      answer: "",
      time: 30,
      status: "active",
    },
  });

  const titleAudio = watch("titleAudio");
  const selectedStatus = watch("status");
  const options = watch("options") || [];
  const answer = watch("answer");
  const watchedTitleType = watch("titleType");

  // Initialize option contents
  useEffect(() => {
    const initContents = {};
    for (let i = 0; i < 4; i++) {
      initContents[i] = "";
    }
    setOptionContents(initContents);
    setHasUnsavedChanges(false);
  }, []);

  // Handle title type change
  const handleTitleTypeChange = async (value) => {
    setValue("titleType", value);
    clearErrors(["title", "titleAudio"]);

    if (value === "text") {
      setValue("titleAudio", null);
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
        setAudioPreviewUrl("");
        setAudioPreview(null);
      }
    } else {
      setValue("title", "");
    }
    
    // Trigger validation after changing type
    await trigger("titleType");
  };

  // Handle option content change
  const handleOptionContentChange = useCallback((index, value) => {
    setOptionContents((prev) => ({
      ...prev,
      [index]: value,
    }));
    setHasUnsavedChanges(true);
  }, []);

  // Save all content to form state
  const saveAll = async () => {
    let changed = false;
    const newOptions = [...options];

    options.forEach((opt, i) => {
      const localContent = optionContents[i] || "";
      if (opt.text !== localContent) {
        newOptions[i] = { ...opt, text: localContent };
        changed = true;
      }
    });

    if (changed) {
      setValue("options", newOptions, { shouldValidate: true });
      setHasUnsavedChanges(false);
      const isValid = await trigger("options");
      if (isValid) {
        toast.success("All changes saved!");
      }
      return isValid;
    }
    return true;
  };

  // Handle title audio file change
  const handleTitleAudioChange = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Basic validation
      if (!file.type.startsWith("audio/")) {
        toast.error("Please select an audio file");
        setValue("titleAudio", null);
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        toast.error("File size must be less than 50MB");
        setValue("titleAudio", null);
        return;
      }

      clearErrors("titleAudio");
      await trigger("titleAudio");
    }
  };

  // Handle audio preview
  useEffect(() => {
    if (watchedTitleType === "audio" && titleAudio && titleAudio.length > 0) {
      const file = titleAudio[0];
      const url = URL.createObjectURL(file);
      setAudioPreviewUrl(url);
      setAudioPreview({
        type: "audio",
        url: url,
        file: file,
      });
    } else {
      setAudioPreview(null);
      if (audioPreviewUrl) {
        URL.revokeObjectURL(audioPreviewUrl);
        setAudioPreviewUrl("");
      }
    }

    return () => {
      if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
    };
  }, [titleAudio, watchedTitleType]);

  const removeAudioPreview = () => {
    setValue("titleAudio", null);
    setAudioPreview(null);
    if (audioPreviewUrl) {
      URL.revokeObjectURL(audioPreviewUrl);
      setAudioPreviewUrl("");
    }
    clearErrors("titleAudio");
  };

  // Handle submit function
  const onSubmit = async (data) => {
    console.log("Submit triggered!", data); // Debug log
    
    // Save unsaved changes first
    if (hasUnsavedChanges) {
      const saved = await saveAll();
      if (!saved) {
        toast.error("Please fix option errors before submitting.");
        return;
      }
    }

    // Get the latest form values after saving
    const currentOptions = watch("options");
    
    // Validate all fields
    const isValid = await trigger();
    if (!isValid) {
      console.log("Validation errors:", errors); // Debug log
      toast.error("Please fix all validation errors before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("titleType", data.titleType);
    formData.append("answer", data.answer);
    formData.append("status", data.status);
    formData.append("time", data.time);
    formData.append("sequence", "1");

    if (data.titleType === "text") {
      formData.append("title", data.title);
    } else if (data.titleType === "audio" && data.titleAudio && data.titleAudio[0]) {
      formData.append("titleAudio", data.titleAudio[0]);
    }

    // Use currentOptions to ensure we have the latest saved data
    currentOptions.forEach((option, index) => {
      formData.append(`options[${index}][text]`, option.text);
      formData.append(`options[${index}][isCorrect]`, option.isCorrect);
    });

    console.log("Submitting form data..."); // Debug log

    createListeningQuestion(formData, {
      onSuccess: () => {
        toast.success("Listening question created successfully!");
        setShowCreateListeningQuestion(false);
        reset();
        setOptionContents({});
        setHasUnsavedChanges(false);
        if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
      },
      onError: (error) => {
        console.error("Submission error:", error); // Debug log
        toast.error(
          error.response?.data?.message || "Failed to create listening question"
        );
      },
    });
  };

  const handleCorrectAnswerChange = async (index) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setValue("options", newOptions, { shouldValidate: true });
    setValue("answer", String.fromCharCode(97 + index));
    await trigger(["options", "answer"]);
  };

  const addOption = async () => {
    if (options.length < 4) {
      const newOptions = [...options, { text: "", isCorrect: false }];
      setValue("options", newOptions);
      setOptionContents((prev) => ({ ...prev, [newOptions.length - 1]: "" }));
      setHasUnsavedChanges(true);
      await trigger("options");
    }
  };

  const removeOption = async (index) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setValue("options", newOptions);

      setOptionContents((prev) => {
        const newContents = { ...prev };
        delete newContents[index];
        const reindexedContents = {};
        newOptions.forEach((_, newIndex) => {
          const oldIndex = newIndex >= index ? newIndex + 1 : newIndex;
          reindexedContents[newIndex] = newContents[oldIndex] || "";
        });
        return reindexedContents;
      });

      setHasUnsavedChanges(true);

      if (options[index].isCorrect) {
        const correctIndex = newOptions.findIndex((opt) => opt.isCorrect);
        if (correctIndex !== -1) {
          setValue("answer", String.fromCharCode(97 + correctIndex));
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
    setHasUnsavedChanges(false);
    if (audioPreviewUrl) URL.revokeObjectURL(audioPreviewUrl);
  };

  

  return (
    <div className="font-fontContent p-6 max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Create New Listening Question
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Add a new listening question with flexible title format
          </p>
        </div>
        <Button
          onClick={handleCancel}
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-gray-100 rounded-full"
          type="button"
          disabled={isSubmitting}
        >
          <IoClose className="h-5 w-5" />
        </Button>
      </div>

      {/* API Error Message */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error creating listening question
              </h3>
              <p className="text-sm text-red-600 mt-1">
                {apiError.response?.data?.message || "Failed to create listening question"}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title Type Selection */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titleType" className="text-sm font-medium text-gray-700">
              Title Type *
            </Label>
            <Select
              value={watchedTitleType}
              onValueChange={handleTitleTypeChange}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select title type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Title Type</SelectLabel>
                  <SelectItem value="text">Text Title</SelectItem>
                  <SelectItem value="audio">Audio Title</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.titleType && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.titleType.message}
              </p>
            )}
          </div>

          {/* Title Field Based on Type */}
          {watchedTitleType === "text" ? (
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Question Title (Text) *
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter question title..."
                className={errors.title ? "border-red-500" : ""}
                disabled={isSubmitting}
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.title.message}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titleAudio" className="text-sm font-medium text-gray-700">
                  Question Title (Audio) *
                </Label>
                <Input
                  id="titleAudio"
                  type="file"
                  accept="audio/*"
                  className={errors.titleAudio ? "border-red-500" : ""}
                  disabled={isSubmitting}
                  {...register("titleAudio", {
                    onChange: handleTitleAudioChange,
                  })}
                />
                {errors.titleAudio && (
                  <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.titleAudio.message}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Supported formats: MP3, WAV, AAC. Max file size: 50MB
                </p>
              </div>

              {/* Audio Preview */}
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
                        {audioPreview.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Audio file • {(audioPreview.file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <audio controls className="h-8">
                      <source src={audioPreview.url} type={audioPreview.file.type} />
                    </audio>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Time and Status Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="time" className="text-sm font-medium text-gray-700">
              Time (seconds) *
            </Label>
            <Input
              id="time"
              type="number"
              min="1"
              max="300"
              placeholder="30"
              className={errors.time ? "border-red-500" : ""}
              disabled={isSubmitting}
              {...register("time", { valueAsNumber: true })}
            />
            {errors.time && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.time.message}
              </p>
            )}
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="status" className="text-sm font-medium text-gray-700">
              Status *
            </Label>
            <Select
              onValueChange={(value) => setValue("status", value)}
              disabled={isSubmitting}
              value={selectedStatus}
              className="w-full"
            >
              <SelectTrigger className={errors.status ? "border-red-500 w-full" : "w-full"}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        {/* Options Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">
              Options * (Minimum 2, Maximum 4)
            </Label>
            <div className="flex items-center gap-2">
              {hasUnsavedChanges && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                  Unsaved Changes
                </span>
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
              const optionLetter = String.fromCharCode(65 + index);
              const currentContent = optionContents[index] || "";

              return (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-bold">
                        {optionLetter}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Option {optionLetter}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant={option.isCorrect ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCorrectAnswerChange(index)}
                        disabled={isSubmitting}
                        className={option.isCorrect ? "bg-green-600 hover:bg-green-700" : ""}
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

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Option Content *
                    </Label>
                    <QuillEditor
                      value={currentContent}
                      onChange={(value) => handleOptionContentChange(index, value)}
                      placeholder={`Enter option ${optionLetter} content...`}
                      height="150px"
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

          {hasUnsavedChanges && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={saveAll}
              disabled={isSubmitting}
              className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700"
            >
              <Save className="h-4 w-4" />
              Save All Options
            </Button>
          )}

          {errors.options && (
            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.options.message || errors.options.root?.message}
            </p>
          )}

          {answer && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <span className="font-medium">Selected Answer:</span> Option {answer.toUpperCase()}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[100px] bg-darkSky hover:bg-darkSky/90 text-white"
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