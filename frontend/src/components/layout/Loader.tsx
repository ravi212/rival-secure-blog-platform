import React from "react";

export const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="space-y-4 text-center">
      <div className="inline-block">
        <div className="h-12 w-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);
