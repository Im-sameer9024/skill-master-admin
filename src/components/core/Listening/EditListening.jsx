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
import {
  useGetListeningById,
  useUpdateListeningById,
} from "@/pages/Listening/hooks/useListening";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

const EditListening = ({ id, setShowEditListening }) => {
  //------------- api for data ---------
  const { data: SingleListening, isLoading: SingleListeningLoading } =
    useGetListeningById(id);

  // console.log("single ",SingleListening);

  const {
    mutate: updateListening,
    isPending: isUpdating,
    error: apiError,
  } = useUpdateListeningById();

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
      isfree: "",
      number_of_items: "",
      status: "",
    },
  });



  // Add this useEffect to populate form with existing data
  useEffect(() => {
    if (SingleListening && SingleListening.data) {
      reset({
        title: SingleListening.data.title,
        isfree: SingleListening.data?.isfree,
        number_of_items: SingleListening.data.number_of_items,
        status: SingleListening.data?.status,
      });
    }
  }, [SingleListening, reset]);

    const selectedIsFree = watch("isfree");
  const selectedStatus = watch("status");

  const onSubmit = (data) => {
    // console.log("Update data:", data);

    // Convert isfree from string to boolean and ensure number_of_items is number
    const updateData = {
      ...data,
      isfree: data.isfree === "true", // Convert to boolean
      number_of_items: data.number_of_items
        ? parseInt(data.number_of_items)
        : null,
    };

    // console.log("Final update data:", updateData);

    updateListening(
      {
        id: id,
        data: updateData,
      },
      {
        onSuccess: () => {
          toast.success("Listening updated successfully!");
          setShowEditListening(false);
          reset();
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message || "Failed to update listening"
          );
        },
      }
    );
  };

  const handleCancel = () => {
    setShowEditListening(false);
    reset();
  };

  // Show loading state while fetching data
  if (SingleListeningLoading) {
    return (
      <div className="font-fontContent p-6 max-h-[90vh] overflow-y-auto flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <p>Loading listening data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-fontContent p-6 max-h-[90vh] overflow-y-auto">
      {/*------------------ Header----------------- */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edit Listening</h2>
          <p className="text-sm text-gray-600 mt-1">Update listening details</p>
        </div>
        <Button
          onClick={handleCancel}
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
          disabled={isUpdating}
        >
          <IoClose className="h-5 w-5" />
        </Button>
      </div>

      {/*------------ Current Listening Section ------------ */}
      {SingleListening && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold  mb-3 flex items-center gap-2">
            Current Listening Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex  items-baseline gap-2">
              <span className="text-sm font-medium text-gray-700">Title:</span>
              <p className="text-gray-900 font-semibold">
                {SingleListening.data.title || "No title"}
              </p>
            </div>
            <div className=" flex items-baseline gap-2">
              <span className="text-sm font-medium text-gray-700">Type:</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-semibold">
                  {SingleListening.data.isfree ? "Free" : "Paid"}
                </span>
              </div>
            </div>
            <div className=" flex items-baseline gap-2">
              <span className="text-sm font-medium text-gray-700">
                Number of Items:
              </span>
              <p className="text-gray-900 font-semibold mt-1">
                {SingleListening?.data?.number_of_items || "N/A"}
              </p>
            </div>
            <div className=" flex items-baseline gap-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <div className="flex items-center gap-2">
                <span
                  className={`font-semibold capitalize ${
                    SingleListening.data.status === "active"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {SingleListening.data.status || "No status"}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              These are the current values. Use the form below to make changes.
            </p>
          </div>
        </div>
      )}

      {/*-------------- API Error Message--------------- */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="shrink-0">
              <IoClose className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error updating listening
              </h3>
              <p className="text-sm text-red-600 mt-1">
                {apiError.response?.data?.message ||
                  "Failed to update listening"}
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
              disabled={isUpdating}
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Title cannot exceed 100 characters",
                },
              })}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <IoClose className="h-3 w-3" />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Plan Type Field */}
          <div className="space-y-2">
            <Label
              htmlFor="isfree"
              className="text-sm font-medium text-gray-700"
            >
              Type *
            </Label>
            <Select
              onValueChange={(value) => setValue("isfree", value)}
              disabled={isUpdating}
              value={selectedIsFree}
            >
              <SelectTrigger
                className={`w-full ${
                  errors.isfree ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Plan Type</SelectLabel>
                  <SelectItem value={true} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Free
                    </div>
                  </SelectItem>
                  <SelectItem value={false} className="cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      Paid
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.isfree && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <IoClose className="h-3 w-3" />
                {errors.isfree.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Select whether this category is free or requires payment
            </p>
          </div>

          {/*------------- Number of Items ------------ */}
          <div className="space-y-2">
            <Label
              htmlFor="number_of_items"
              className="text-sm font-medium text-gray-700"
            >
              Number of Items
            </Label>
            <Input
              id="number_of_items"
              type="number"
              placeholder="Enter Number of Items"
              className={`w-full ${
                errors.number_of_items
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }`}
              disabled={isUpdating}
              {...register("number_of_items", {
                min: {
                  value: 0,
                  message: "Number of items cannot be negative",
                },
                max: {
                  value: 1000,
                  message: "Number of items cannot exceed 1000",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Please enter a valid number",
                },
              })}
            />
            {errors.number_of_items && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <IoClose className="h-3 w-3" />
                {errors.number_of_items.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Enter the number of items in this listening category (0-30)
            </p>
          </div>

          {/*---------------------- Status ------------------- */}
          <div className="space-y-2">
            <Label
              htmlFor="status"
              className="text-sm font-medium text-gray-700"
            >
              Status *
            </Label>
            <Select
              onValueChange={(value) => setValue("status", value)}
              disabled={isUpdating}
              value={selectedStatus}
            >
              <SelectTrigger
                className={`w-full ${
                  errors.status ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
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
            {errors.status && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <IoClose className="h-3 w-3" />
                {errors.status.message}
              </p>
            )}
            <p className="text-xs text-gray-500">
              Choose the current status of the listening category
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isUpdating}
            className="min-w-[100px] hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isUpdating}
            className="min-w-[100px] bg-darkSky hover:bg-darkSky/90 text-white transition-colors"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Update Listening"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditListening;
