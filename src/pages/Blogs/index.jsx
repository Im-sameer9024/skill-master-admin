/* eslint-disable react-hooks/exhaustive-deps */
import TableComponent from "@/components/common/TableComponent";
import React, { useState, useEffect } from "react";
import { BlogColumnsData } from "./Data";
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
import PaginationComponent from "@/components/common/PaginationComponent";
import { useGetAllBlogs } from "./hooks/useBlogs";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "@/components/common/Spinner";
import { format } from "date-fns";
import Popup from "@/components/common/Popup";
import CreateBlogForm from "@/components/core/Blogs/CreateBlogForm";
import SingleBlogDetails from "@/components/core/Blogs/SingleBlogDetails";
import DeleteBlog from "@/components/core/Blogs/DeleteBlog";
import EditBlogForm from "@/components/core/Blogs/EditBlogForm";

// Move renderRow inside component to access proper data structure
const BlogsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showCreateBlog, setShowCreateBlog] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditBlog, setShowEditBlog] = useState(false);

  const [showSingleBlog, setShowSingleBlog] = useState(false);
  const [blogId, setBlogId] = useState(null);

  const openSingleBlog = (id) => {
    setShowSingleBlog(true);
    setBlogId(id);
  };

  const openDeleteModal = (id) => {
    setShowDeleteModal(true);
    setBlogId(id);
  };

  const openEditModal = (id) => {
    setShowEditBlog(true);
    setBlogId(id);
  }

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
  const { data: blogsData, isLoading, error } = useGetAllBlogs(page, limit);

  // console.log("blogs data is here", blogsData);

  //----------------function for change the page----------------

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Render row function with proper data mapping
  const renderRow = (blog, index) => (
    <tr key={blog._id || index}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {(page - 1) * limit + index + 1}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
        {blog.title}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
        {blog.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {format(new Date(blog.createAt), "MMM dd, yyyy")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            blog.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {blog.status || "Active"}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-1">
          {/* See Details */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => openSingleBlog(blog._id)}
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
                onClick={() => openEditModal(blog._id)}
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
                onClick={() => openDeleteModal(blog._id)}
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
      </div>
    );
  }

  //--------------- Error state----------------------
  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error loading blogs: {error.message}</p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-2 bg-red-600 hover:bg-red-700"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setShowCreateBlog(true)}
          className="bg-darkSky/90 hover:bg-darkSky text-white cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out"
        >
          <FaPlus className="mr-2" />
          Add New Blog
        </Button>
      </div>

      {/*----------- popup for blog create----------  */}
      <Popup
        openModal={showCreateBlog}
        content={<CreateBlogForm setShowCreateBlog={setShowCreateBlog} />}
        width={"w-[70%]"}
      />

      {/*----------- popup for blog delete----------  */}
      <Popup
        openModal={showDeleteModal}
        content={
          <DeleteBlog id={blogId} setShowDeleteModal={setShowDeleteModal} />
        }
        width={"w-[40%]"}
      />

      {/*----------- popup for blog edit----------  */}
      <Popup
        openModal={showEditBlog}
        content={<EditBlogForm id={blogId} setShowEditBlog={setShowEditBlog} />}
        width={"w-[70%]"}
      />

      {/*------------- popup for show the single blog in details ------------ */}
      <Popup
        openModal={showSingleBlog}
        content={
          <SingleBlogDetails
            id={blogId}
            setShowSingleBlog={setShowSingleBlog}
          />
        }
        width={"w-[70%]"}
      />

      <TableComponent
        columns={BlogColumnsData}
        data={blogsData?.data || []}
        renderRow={renderRow}
      />

      <PaginationComponent
        handlePageChange={handlePageChange}
        currentPage={page}
        totalPages={blogsData?.totalPage || 1}
      />
    </div>
  );
};

export default BlogsPage;
