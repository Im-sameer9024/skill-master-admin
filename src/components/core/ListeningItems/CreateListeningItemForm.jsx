"use client"; // Remove if not using Next.js (Vite doesn't need it)

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateListeningItem } from "@/pages/ListeningItems/hooks/useListeningItem";
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"; // Vite + React Router
import { IoClose } from "react-icons/io5";
import { Loader2, AlertCircle, Play, X, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuillEditor from "@/components/common/QuillEditor/QuillEditor";

/* --------------------------------------------------------------
   1. LOCAL STATE FOR ONE MEDIA ITEM
   -------------------------------------------------------------- */
const initialMediaState = {
  title: "",
  file: null,
  previewUrl: "",
  fileError: null,
};

const CreateListeningItemForm = ({ setShowCreateListeningItem }) => {
  const { listening_id } = useParams(); // React Router

  /* ------------------- 2. FORM ------------------- */
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      type: "",
      status: "",
      instructions: "",
      description: "",
    },
  });

  const watchedType = watch("type");
  const watchedInstructions = watch("instructions");
  const watchedDescription = watch("description");

  /* ------------------- 3. UI STATE ------------------- */
  const [mediaItems, setMediaItems] = useState([initialMediaState]);
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [instructionsUnsaved, setInstructionsUnsaved] = useState(false);
  const [descriptionUnsaved, setDescriptionUnsaved] = useState(false);

  /* ------------------- 4. QUILL HANDLERS ------------------- */
  const onInstructionChange = useCallback((value) => {
    setInstructions(value);
    setInstructionsUnsaved(true);
  }, []);

  const onDescriptionChange = useCallback((value) => {
    setDescription(value);
    setDescriptionUnsaved(true);
  }, []);

  /* ------------------- 5. API ------------------- */
  const {
    mutate: createListeningItem,
    isPending: isSubmitting,
    error: apiError,
  } = useCreateListeningItem();

  /* ------------------- 6. PREVIEW CLEANUP ------------------- */
  useEffect(() => {
    return () => {
      mediaItems.forEach(
        (m) => m.previewUrl && URL.revokeObjectURL(m.previewUrl)
      );
    };
  }, [mediaItems]);

  /* ------------------- 7. TYPE CHANGE ------------------- */
  const handleTypeChange = (value) => {
    setValue("type", value, { shouldValidate: true });
    clearErrors("type");

    // Revoke old previews and reset
    const cleared = mediaItems.map((m) => {
      if (m.previewUrl) URL.revokeObjectURL(m.previewUrl);
      return { ...initialMediaState };
    });
    setMediaItems(cleared);
  };

  /* ------------------- 8. MEDIA HELPERS ------------------- */
  const addMedia = () => setMediaItems((prev) => [...prev, initialMediaState]);

  const removeMedia = (idx) => {
    setMediaItems((prev) => {
      const copy = [...prev];
      if (copy[idx].previewUrl) URL.revokeObjectURL(copy[idx].previewUrl);
      return copy.filter((_, i) => i !== idx);
    });
  };

  const setMediaTitle = (idx, title) => {
    setMediaItems((prev) =>
      prev.map((m, i) => (i === idx ? { ...m, title } : m))
    );
  };

  const setMediaFile = (idx, file) => {
    const newItems = [...mediaItems];
    if (newItems[idx].previewUrl) URL.revokeObjectURL(newItems[idx].previewUrl);

    let fileError = null;
    if (file) {
      const isAudio = watchedType === "audio";
      const isVideo = watchedType === "video";

      if (isAudio && !file.type.startsWith("audio/"))
        fileError = "Please select an audio file.";
      if (isVideo && !file.type.startsWith("video/"))
        fileError = "Please select a video file.";
    }

    const preview = file ? URL.createObjectURL(file) : "";
    newItems[idx] = { ...newItems[idx], file, previewUrl: preview, fileError };
    setMediaItems(newItems);
  };

  const mediaHasErrors = mediaItems.some((m) => m.fileError);
  const mediaAllValid = mediaItems.every((m) => m.title && m.file);

  /* ------------------- 9. SAVE QUILL ------------------- */
  const saveQuillContent = async () => {
    let changed = false;

    if (instructions !== watchedInstructions) {
      setValue("instructions", instructions, { shouldValidate: true });
      setInstructionsUnsaved(false);
      changed = true;
    }
    if (description !== watchedDescription) {
      setValue("description", description, { shouldValidate: true });
      setDescriptionUnsaved(false);
      changed = true;
    }

    if (changed) {
      await trigger(["instructions", "description"]);
      toast.success("Editor changes saved!");
    }
  };

  /* ------------------- 10. SUBMIT ------------------- */
  const onSubmit = async (data) => {
    if (!watchedType) return toast.error("Please select type (audio/video)");
    if (!mediaAllValid || mediaHasErrors)
      return toast.error(`All ${watchedType}s must have title and file.`);

    const isValid = await trigger();
    if (!isValid) return toast.error("Fix form errors.");

    const fd = new FormData();
    fd.append("title", data.title);
    fd.append("type", data.type);
    fd.append("instruction", data.instructions);
    fd.append("description", data.description);
    fd.append("status", data.status);
    fd.append("listening_id", listening_id);

    mediaItems.forEach((m, i) => {
      fd.append("files", m.file);
      fd.append(`titles[${i}]`, m.title);
    });

    createListeningItem(fd, {
      onSuccess: () => {
        toast.success("Item created!");
        setShowCreateListeningItem(false);
        reset();
        setInstructions("");
        setDescription("");
        setMediaItems([initialMediaState]);
        setValue("type", "");
      },
      onError: (err) => {
        toast.error(err.response?.data?.message ?? "Failed");
      },
    });
  };

  /* ------------------- 11. CANCEL ------------------- */
  const handleCancel = () => {
    setShowCreateListeningItem(false);
    reset();
    setInstructions("");
    setDescription("");
    setMediaItems([initialMediaState]);
    setValue("type", "");
  };

  /* ------------------- 12. HELPERS ------------------- */
  const accepted =
    watchedType === "audio"
      ? "audio/*"
      : watchedType === "video"
      ? "video/*"
      : "*/*";
  const mediaLabel = watchedType
    ? watchedType.charAt(0).toUpperCase() + watchedType.slice(1)
    : "Media";

  return (
    <div className="font-fontContent p-6 max-h-[90vh] overflow-y-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Create New Listening Item
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Add multiple {mediaLabel.toLowerCase()} files with titles
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          <IoClose className="h-5 w-5" />
        </Button>
      </div>

      {/* API ERROR */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="text-sm text-red-800">
              {apiError.response?.data?.message || "Failed to create item"}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* TITLE + TYPE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Item Title *</Label>
            <Input
              id="title"
              placeholder="Enter title..."
              disabled={isSubmitting}
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="type">Type *</Label>
            <Select
              value={watchedType}
              onValueChange={handleTypeChange}
              disabled={isSubmitting}
              className="w-full"
            >
              <SelectTrigger className={errors.type ? "border-red-500 w-full" : "w-full"}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Media Type</SelectLabel>
                  <SelectItem value="audio">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Audio
                    </div>
                  </SelectItem>
                  <SelectItem value="video">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      Video
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.type.message}
              </p>
            )}
          </div>
        </div>

        {/* STATUS */}
        <div className="w-full gap-6">
          <div className="space-y-2 w-full">
            <Label htmlFor="status">Status *</Label>

            <Select
              onValueChange={(v) => setValue("status", v)}
              disabled={isSubmitting}
              className="w-full"
            >
              <SelectTrigger
                className={`w-full ${errors.status ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select status" />
              </SelectTrigger>

              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>

                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      Active
                    </div>
                  </SelectItem>

                  <SelectItem value="inactive">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                      Inactive
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {errors.status && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        <hr className="my-8" />

        {/* MULTI MEDIA */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {mediaLabel} Files * ({mediaItems.length})
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMedia}
              disabled={isSubmitting || !watchedType}
              className="flex items-center gap-1 text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              <Plus className="h-4 w-4" />
              Add {mediaLabel}
            </Button>
          </div>

          {!watchedType && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
              <AlertCircle className="inline h-4 w-4 mr-1" />
              Select type first to add files.
            </div>
          )}

          {watchedType &&
            mediaItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-lg bg-gray-50 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-medium">
                    {mediaLabel} Item {idx + 1}
                  </h4>
                  {mediaItems.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMedia(idx)}
                      disabled={isSubmitting}
                      className="h-7 w-7 text-red-500 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* TITLE */}
                <div className="space-y-2">
                  <Label>{mediaLabel} Title *</Label>
                  <Input
                    placeholder={`Title for ${mediaLabel.toLowerCase()} ${
                      idx + 1
                    }`}
                    value={item.title}
                    onChange={(e) => setMediaTitle(idx, e.target.value)}
                    disabled={isSubmitting}
                  />
                  {!item.title && (
                    <p className="text-xs text-red-600">Title required.</p>
                  )}
                </div>

                {/* FILE */}
                <div className="space-y-2">
                  <Label>{mediaLabel} File *</Label>
                  <Input
                    type="file"
                    accept={accepted}
                    onChange={(e) => setMediaFile(idx, e.target.files?.[0])}
                    disabled={isSubmitting}
                  />
                  {item.fileError && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {item.fileError}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {watchedType === "video"
                      ? "MP4, AVI, MOV – max 100 MB"
                      : "MP3, WAV, AAC – max 100 MB"}
                  </p>
                </div>

                {/* PREVIEW */}
                {item.file && !item.fileError && (
                  <div className="border rounded-lg p-3 bg-white">
                    {watchedType === "audio" ? (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Play className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {item.file.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(item.file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                        <audio controls className="h-8">
                          <source src={item.previewUrl} type={item.file.type} />
                        </audio>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 rounded-full">
                            <Play className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {item.file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(item.file.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <video controls className="w-full rounded max-h-48">
                          <source src={item.previewUrl} type={item.file.type} />
                        </video>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* INSTRUCTIONS */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Instructions *</Label>
            {instructionsUnsaved && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                Unsaved
              </span>
            )}
          </div>
          <QuillEditor
            value={instructions}
            onChange={onInstructionChange}
            placeholder="Enter instructions..."
            height="200px"
          />
          {errors.instructions && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.instructions.message}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Description</Label>
            {descriptionUnsaved && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                Unsaved
              </span>
            )}
          </div>
          <QuillEditor
            value={description}
            onChange={onDescriptionChange}
            placeholder="Enter description (optional)..."
            height="200px"
          />
        </div>

        {/* SAVE QUILL */}
        {(instructionsUnsaved || descriptionUnsaved) && (
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={saveQuillContent}
              disabled={isSubmitting}
              className="flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700"
            >
              Save Changes
            </Button>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-darkSky hover:bg-darkSky/90 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Creating...
              </>
            ) : (
              "Create Item"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateListeningItemForm;
