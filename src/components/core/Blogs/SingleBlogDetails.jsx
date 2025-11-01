import { Button } from "@/components/ui/button";
import { useGetSingleBlog } from "@/pages/Blogs/hooks/useBlogs";
import { Loader2 } from "lucide-react";
import { IoClose } from "react-icons/io5";

const { VITE_CLIENT_IMAGE_URL } = import.meta.env;

const SingleBlogDetails = ({ id, setShowSingleBlog }) => {
  const data = {
    blog_id: id,
  };

  const { data: SingleBLog, isLoading, error } = useGetSingleBlog(data);

  const imageUrl = `${VITE_CLIENT_IMAGE_URL}/${SingleBLog?.data?.image}`;

  console.log("data of Single Blog", SingleBLog);

  // Cancel form
  const handleCancel = () => {
    setShowSingleBlog(false);
  };

  if (isLoading) {
    <div className="flex justify-center items-center min-h-64">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
      </div>
    </div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-red-800 font-semibold mb-2">
              Error Loading Blog
            </h3>
            <p className="text-red-600 text-sm mb-4">
              {error.response?.data?.message || "Failed to load blog details"}
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

  return (
    <div className="font-fontContent  p-6 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 ">
        <h2 className="text-2xl font-bold text-gray-900">
          {SingleBLog?.data?.title}{" "}
          <span
            className={`text-sm mx-4 ${
              SingleBLog?.data?.status === "active"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {SingleBLog?.data?.status}
          </span>{" "}
        </h2>
        <Button
          onClick={handleCancel}
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-gray-100 rounded-full transition-colors"
          type="button"
        >
          <IoClose className="h-5 w-5" />
        </Button>
      </div>

      {/* description  */}

      <div>
        <h2 className="text-2xl font-bold text-gray-900">Description</h2>
        <p className=" border rounded-2xl p-4 mt-3">
          {SingleBLog?.data?.description}
        </p>
      </div>

      {/* image  */}
      <div className=" mt-6  p-4">
        <img
          src={imageUrl}
          alt="image"
          className=" h-[200px] object-contain w-full"
        />
      </div>
    </div>
  );
};

export default SingleBlogDetails;
