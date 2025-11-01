/* eslint-disable react-hooks/exhaustive-deps */
import TableComponent from "@/components/common/TableComponent";
import React, { useState, useEffect } from "react";
import { usersColumnsData } from "./Data";
import { Button } from "@/components/ui/button";
import { MdOutlineVisibility } from "react-icons/md";
import { useGetAllUsers } from "./hooks/useUsers";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "@/components/common/Spinner";
import Popup from "@/components/common/Popup";
import SingleUserDetails from "@/components/core/Users/SingleUserDetails";
import PaginationComponent from "@/components/common/PaginationComponent";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const UsersPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showSingleUser, setShowSingleUser] = useState(false);
  const [userId, setUserId] = useState(null);

  const openSingleUser = (id) => {
    setShowSingleUser(true);
    setUserId(id);
  };

  // Get initial page and limit from URL or defaults
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialLimit = parseInt(searchParams.get("limit")) || 10;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  // Sync URL with state
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page);
    if (limit !== 10) params.set("limit", limit);

    navigate(`${location.pathname}?${params}`, { replace: true });
  }, [page, limit, navigate, location.pathname]);

  // Read URL parameters on mount and when location changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlPage = parseInt(searchParams.get("page")) || 1;
    const urlLimit = parseInt(searchParams.get("limit")) || 10;

    if (urlPage !== page) setPage(urlPage);
    if (urlLimit !== limit) setLimit(urlLimit);
  }, [location.search]);

  // API call
  const { data: usersData, isLoading, error } = useGetAllUsers(page, limit);

  // console.log("users data is here", usersData);

  // Function for changing the page
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Safe date formatting function

  // Render row function with proper data mapping
  const renderRow = (user, index) => (
    <tr key={user._id || index}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {(page - 1) * limit + index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        {user.firstName} {user.lastName}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user?.languageLevel || "N/A"}
      </td>

      <td className="  pl-4 ">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => openSingleUser(user._id)}
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
      </td>
    </tr>
  );

  //------------ Loading state ----------------------
  if (isLoading) {
    return (
      <div className="mt-6 flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  //--------------- Error state----------------------
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error loading users: {error.message}</p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
        <div className="text-sm text-gray-500">
          Total Users: {usersData?.totalUsers || 0}
        </div>
      </div>

      {/* Popup for showing single user details */}
      <Popup
        openModal={showSingleUser}
        content={
          <SingleUserDetails
            id={userId}
            setShowSingleUser={setShowSingleUser}
          />
        }
        width={"w-[70%]"}
      />

      <TableComponent
        columns={usersColumnsData}
        data={usersData?.data || []}
        renderRow={renderRow}
      />

      <PaginationComponent
        handlePageChange={handlePageChange}
        currentPage={page}
        totalPages={usersData?.totalPages || 1}
      />
    </div>
  );
};

export default UsersPage;
