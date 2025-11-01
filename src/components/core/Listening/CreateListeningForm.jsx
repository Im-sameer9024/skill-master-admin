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
import React from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateListening } from "@/pages/Listening/hooks/useListening";

const CreateListeningForm = ({ setShowCreateListening }) => {
  const {
    mutate: createListening,
    isPending: isSubmitting,
    error: apiError,
  } = useCreateListening();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      isfree: null,
      number_of_items: null,
      status:""
    },
  });

  const selectedIsFree = watch("isfree");
  const selectedStatus = watch("status")

  const onSubmit = (data) => {
    console.log("data of submitting", data);

    // Convert isfree from string to boolean
    const submitData = {
      ...data,
      isfree: data.isfree === "true", // Convert to boolean
    };

    console.log("data", submitData);

    createListening(submitData, {
      onSuccess: () => {
        toast.success("Listening category created successfully!");
        setShowCreateListening(false);
        reset();
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Failed to create listening category"
        );
      },
    });
  };

  const handleCancel = () => {
    setShowCreateListening(false);
    reset();
  };

  return (
    <div className="font-fontContent p-6 max-h-[90vh] overflow-y-auto">
      {/*------------------ Header----------------- */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Create New Listening
          </h2>
          <p className="text-sm text-gray-600 mt-1">Add a new listening</p>
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
              <IoClose className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error creating listening category
              </h3>
              <p className="text-sm text-red-600 mt-1">
                {apiError.response?.data?.message ||
                  "Failed to create listening category"}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Title and Plan Type Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title Field */}
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Category Title *
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter category title..."
              className={`w-full ${
                errors.title ? "border-red-500 focus:ring-red-500" : ""
              }`}
              disabled={isSubmitting}
              {...register("title")}
            />
          </div>

          {/* Plan Type Field */}
          <div className="space-y-2">
            <Label
              htmlFor="isfree"
              className="text-sm font-medium text-gray-700"
            >
              Plan Type *
            </Label>
            <Select
              onValueChange={(value) => setValue("isfree", value)}
              disabled={isSubmitting}
              value={selectedIsFree}
            >
              <SelectTrigger
                className={`w-full ${
                  errors.isfree ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select plan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Plan Type</SelectLabel>
                  <SelectItem value="true" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Free
                    </div>
                  </SelectItem>
                  <SelectItem value="false" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Paid
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/*------------- number of items ------------ */}
          <div>

            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Number of Items
            </Label>
            <Input
              id="number_of_items"
              type="number"
              placeholder="Enter Number of Items"
              className={`w-full ${
                errors.title ? "border-red-500 focus:ring-red-500" : ""
              }`}
              disabled={isSubmitting}
              {...register("number_of_items")}
            />

          </div>

          {/*---------------------- Plan status ------------------- */}
          <div className="space-y-2">
            <Label
              htmlFor="status"
              className="text-sm font-medium text-gray-700"
            >
              Plan Status 
            </Label>
            <Select
              onValueChange={(value) => setValue("status", value)}
              disabled={isSubmitting}
              value={selectedStatus}
            >
              <SelectTrigger
                className={`w-full ${
                  errors.isfree ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select plan status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Plan Type</SelectLabel>
                  <SelectItem value="active" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive" className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      InActive
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
              "Create Listening"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateListeningForm;
