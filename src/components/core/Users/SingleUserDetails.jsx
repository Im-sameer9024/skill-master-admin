// components/core/Users/SingleUserDetails.jsx
import { Button } from "@/components/ui/button";
import { useGetSingleUser } from "@/pages/Users/hooks/useUsers";
import { Loader2, Calendar, Mail, User, Globe } from "lucide-react";
import React from "react";
import { IoClose } from "react-icons/io5";
import { format, isValid } from "date-fns";

const SingleUserDetails = ({ id, setShowSingleUser }) => {
  const { data: userData, isLoading, error } = useGetSingleUser(id);

  const handleCancel = () => {
    setShowSingleUser(false);
  };

  // Safe date formatting function
  const formatDateSafe = (dateString, formatString = "MMM dd, yyyy") => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isValid(date) ? format(date, formatString) : "Invalid Date";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-red-800 font-semibold mb-2">
              Error Loading User
            </h3>
            <p className="text-red-600 text-sm mb-4">
              {error.response?.data?.message || "Failed to load user details"}
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="sm"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const user = userData?.data;

  return (
    <div className="font-fontContent p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
        <Button
          onClick={handleCancel}
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-gray-100 rounded-full transition-colors"
        >
          <IoClose className="h-5 w-5" />
        </Button>
      </div>

      {/* User Information */}
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Language Level</p>
                <p className="font-medium">{user?.languageLevel || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Joined Date</p>
                <p className="font-medium">
                  {formatDateSafe(user?.createdAt, "MMMM dd, yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserDetails;
