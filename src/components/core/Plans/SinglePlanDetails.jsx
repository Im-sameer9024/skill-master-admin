import { Button } from "@/components/ui/button";
import { useGetSinglePlan } from "@/pages/Plans/hooks/usePlans";
import {
  Loader2,
  Calendar,
  DollarSign,
  Tag,
  Clock,
  FileText,
  BadgeCheck,
  CheckCircle,
} from "lucide-react";
import React from "react";
import { IoClose } from "react-icons/io5";
import { format, isValid } from "date-fns";

const SinglePlanDetails = ({ id, setShowSinglePlan }) => {
  const { data: planResponse, isLoading, error } = useGetSinglePlan(id);

  const handleCancel = () => {
    setShowSinglePlan(false);
  };

  // Safe date formatting function
  const formatDateSafe = (dateString, formatString = "MMM dd, yyyy") => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isValid(date) ? format(date, formatString) : "Invalid Date";
  };

  // Safe number formatting for price
  const formatPrice = (price) => {
    if (!price && price !== 0) return "N/A";
    return `₹${parseFloat(price).toLocaleString("en-IN")}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 text-gray-600">Loading plan details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-red-800 font-semibold mb-2">
              Error Loading Plan
            </h3>
            <p className="text-red-600 text-sm mb-4">
              {error.response?.data?.message || "Failed to load plan details"}
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

  const plan = planResponse?.data;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden mx-auto">
        {/*------------------ Header------------- */}
        <div className="flex justify-between items-start p-4 sm:p-6 border-b bg-white">
          <div className="flex-1 min-w-0 mr-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 truncate">
              {plan?.name || "No Name"}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              {/* Plan Type */}
              {plan?.type && (
                <div className="flex items-center gap-2 bg-blue-50 px-2 sm:px-3 py-1 rounded-lg shrink-0">
                  <Tag className="h-3 w-3 text-blue-600 shrink-0" />
                  <span className="font-medium text-blue-700 text-xs sm:text-sm">
                    {plan.type}
                  </span>
                </div>
              )}
            </div>
          </div>
          <Button
            onClick={handleCancel}
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-gray-100 rounded-full transition-colors shrink-0"
          >
            <IoClose className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Plan Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600 shrink-0" />
                Plan Information
              </h3>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500 shrink-0">
                    Plan Name
                  </span>
                  <span className="text-sm text-gray-900 font-medium text-right sm:text-left wrap-break-word">
                    {plan?.name}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500 shrink-0">
                    Plan Type
                  </span>
                  <span className="text-sm text-gray-900 font-medium text-right sm:text-left">
                    {plan?.type || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing & Duration */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600 shrink-0" />
                Pricing & Duration
              </h3>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500 shrink-0">
                    Price
                  </span>
                  <span className="text-lg font-bold text-green-600 text-right sm:text-left">
                    {formatPrice(plan?.price)}
                  </span>
                </div>
                
                {plan?.discount_price && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-500 shrink-0">
                      Discount Price
                    </span>
                    <span className="text-lg font-bold text-green-600 text-right sm:text-left">
                      {formatPrice(plan?.discount_price)}
                    </span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500 shrink-0">
                    Start Date
                  </span>
                  <span className="text-sm text-gray-900 font-medium flex items-center gap-1 justify-end sm:justify-start">
                    <Calendar className="h-3 w-3 shrink-0" />
                    {formatDateSafe(plan?.startDate, "MMM dd, yyyy")}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500 shrink-0">
                    End Date
                  </span>
                  <span className="text-sm text-gray-900 font-medium flex items-center gap-1 justify-end sm:justify-start">
                    <Calendar className="h-3 w-3 shrink-0" />
                    {formatDateSafe(plan?.endDate, "MMM dd, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500 shrink-0">
                    Start Date
                  </span>
                  <span className="text-sm text-gray-900 font-medium flex items-center gap-1 justify-end sm:justify-start">
                    <Clock className="h-3 w-3 shrink-0" />
                    {formatDateSafe(plan?.startDate, "MMM dd, yyyy")}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-500 shrink-0">
                    End Date
                  </span>
                  <span className="text-sm text-gray-900 font-medium flex items-center gap-1 justify-end sm:justify-start">
                    <Clock className="h-3 w-3 shrink-0" />
                    {formatDateSafe(plan?.endDate, "MMM dd, yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/*------------------ Features of the Plan ---------- */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Features of Plan
            </h3>
            
            {/* Basic Features */}
            <div className="space-y-4">
              <div className="flex flex-col gap-3 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-gray-700 shrink-0">
                    Basic Features
                  </span>
                  {(!plan?.features?.basicFeatures || plan.features.basicFeatures.length === 0) && (
                    <span className="text-sm text-gray-500">N/A</span>
                  )}
                </div>
                {plan?.features?.basicFeatures && plan.features.basicFeatures.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                    {plan.features.basicFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm text-gray-700 wrap-break-word">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Listening Features */}
              <div className="flex flex-col gap-3 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-gray-700 shrink-0">
                    Listening Features
                  </span>
                  {(!plan?.features?.listeningFeatures || plan.features.listeningFeatures.length === 0) && (
                    <span className="text-sm text-gray-500">N/A</span>
                  )}
                </div>
                {plan?.features?.listeningFeatures && plan.features.listeningFeatures.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                    {plan.features.listeningFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm text-gray-700 wrap-break-word">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Speaking Features */}
              <div className="flex flex-col gap-3 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-gray-700 shrink-0">
                    Speaking Features
                  </span>
                  {(!plan?.features?.speakingFeatures || plan.features.speakingFeatures.length === 0) && (
                    <span className="text-sm text-gray-500">N/A</span>
                  )}
                </div>
                {plan?.features?.speakingFeatures && plan.features.speakingFeatures.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                    {plan.features.speakingFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm text-gray-700 wrap-break-word">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Writing Features */}
              <div className="flex flex-col gap-3 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-gray-700 shrink-0">
                    Writing Features
                  </span>
                  {(!plan?.features?.writingFeatures || plan.features.writingFeatures.length === 0) && (
                    <span className="text-sm text-gray-500">N/A</span>
                  )}
                </div>
                {plan?.features?.writingFeatures && plan.features.writingFeatures.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
                    {plan.features.writingFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm text-gray-700 wrap-break-word">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-gray-50">
          <div className="flex justify-end">
            <Button onClick={handleCancel} variant="outline" className="w-full sm:w-auto">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePlanDetails;