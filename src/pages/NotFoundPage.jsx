import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="  flex items-center justify-center ">
      <div className="max-w-2xl w-full text-center">
        {/* Content */}
        <div className="space-y-6">
          {/* Error Code */}
          <h1 className="text-9xl font-bold text-gray-900 tracking-tighter">
            4<span className="text-red-600">0</span>4
          </h1>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
            <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
              Oops! The page you're looking for seems to have wandered off into
              the digital void.
            </p>
            <p className="text-gray-500">
              Don't worry, let's get you back to familiar territory.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              asChild
              className="bg-darkSky/90 hover:bg-darkSky text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Go to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
