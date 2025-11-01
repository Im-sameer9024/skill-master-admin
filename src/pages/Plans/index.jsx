import TableComponent from "@/components/common/TableComponent";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlineVisibility } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa6";
import Spinner from "@/components/common/Spinner";
import { format, isValid } from "date-fns";
import Popup from "@/components/common/Popup";
import { PlansColumnsData } from "./Date";
import CreatePlansForm from "@/components/core/Plans/CreatePlansForm";
import DeletePlan from "@/components/core/Plans/DeletePlan";
import SinglePlanDetails from "@/components/core/Plans/SinglePlanDetails";
import EditPlan from "@/components/core/Plans/EditPlan";
import { useGetAllPlans } from "./hooks/usePlans";

// Move renderRow inside component to access proper data structure
const PlansPage = () => {
  const [showCreatePlan, setShowCreatePlan] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [showSinglePlan, setShowSinglePlan] = useState(false);
  const [planId, setPlanId] = useState(null);

  const openSinglePlan = (id) => {
    setShowSinglePlan(true);
    setPlanId(id);
  };

  const openDeleteModal = (id) => {
    setShowDeleteModal(true);
    setPlanId(id);
  };

  const openEditModal = (id) => {
    setShowEditPlan(true);
    setPlanId(id);
  };

  // API call
  const { data: plansResponse, isLoading, error } = useGetAllPlans();

  // console.log("Plans API Response:", plansResponse);

  // Safe date formatting function
  const formatDateSafe = (dateString, formatString = "MMM dd, yyyy") => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isValid(date) ? format(date, formatString) : "Invalid Date";
  };

  // Extract plans data from response
  const plansData = plansResponse?.data || [];

  // Render row function with proper data mapping
  const renderRow = (plan, index) => (
    <tr key={plan._id || index}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        {plan.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
        {plan.type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDateSafe(plan.startDate, "MMM dd, yyyy")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formatDateSafe(plan.endDate, "MMM dd, yyyy")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        {plan.price}₹
      </td>
      <td>
        <div className="flex items-center gap-1">
          {/* See Details */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openSinglePlan(plan._id)}
                variant="ghost"
                size="icon-sm"
                className="hover:bg-gray-200 rounded-full cursor-pointer"
              >
                <MdOutlineVisibility className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>See Details</p>
            </TooltipContent>
          </Tooltip>

          {/* Edit */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openEditModal(plan._id)}
                variant="ghost"
                size="icon-sm"
                className="hover:bg-gray-200 rounded-full cursor-pointer"
              >
                <CiEdit className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>

          {/* Delete */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openDeleteModal(plan._id)}
                variant="ghost"
                size="icon-sm"
                className="hover:bg-gray-200 rounded-full hover:text-destructive text-destructive/80 cursor-pointer"
              >
                <MdOutlineDeleteOutline className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </td>
    </tr>
  );

  //------------ Loading state ----------------------
  if (isLoading) {
    return (
      <div className="mt-6 flex justify-center items-center h-64">
        <Spinner />
        <p className="ml-3 text-gray-600">Loading plans...</p>
      </div>
    );
  }

  //--------------- Error state----------------------
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-4xl mx-auto">
        <p className="text-red-800 font-semibold mb-2">Error loading plans</p>
        <p className="text-red-600 text-sm mb-4">
          {error.response?.data?.message || error.message || "Failed to load plans"}
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plans Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Total Plans: {plansData.length}
          </p>
        </div>
        <Button
          onClick={() => setShowCreatePlan(true)}
          className="bg-darkSky/90 hover:bg-darkSky text-white cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out"
        >
          <FaPlus className="mr-2" />
          Add New Plan
        </Button>
      </div>

      {/*----------- popup for plan create----------  */}
      <Popup
        openModal={showCreatePlan}
        content={<CreatePlansForm setShowCreatePlan={setShowCreatePlan} />}
        width={"w-[70%]"}
      />

      {/*----------- popup for plan delete----------  */}
      <Popup
        openModal={showDeleteModal}
        content={
          <DeletePlan id={planId} setShowDeleteModal={setShowDeleteModal} />
        }
        width={"w-[40%]"}
      />

      {/*----------- popup for plan edit----------  */}
      <Popup
        openModal={showEditPlan}
        content={<EditPlan id={planId} setShowEditPlan={setShowEditPlan} />}
        width={"w-[70%]"}
      />

      {/*------------- popup for show the single plan in details ------------ */}
      <Popup
        openModal={showSinglePlan}
        content={
          <SinglePlanDetails
            id={planId}
            setShowSinglePlan={setShowSinglePlan}
          />
        }
        width={"w-[70%]"}
      />

      {plansData.length > 0 ? (
        <TableComponent
          columns={PlansColumnsData}
          data={plansData}
          renderRow={renderRow}
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Plans Found</h3>
            <p className="text-gray-500 mb-4">
              There are no plans available yet. Create your first plan to get started.
            </p>
            <Button
              onClick={() => setShowCreatePlan(true)}
              className="bg-darkSky/90 hover:bg-darkSky text-white"
            >
              <FaPlus className="mr-2" />
              Create First Plan
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansPage;