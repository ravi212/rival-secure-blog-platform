import React from "react";

export const Spinner = ({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin ${sizeClasses[size]} ${className}`}
    />
  );
};

export const LoadingOverlay = ({
  message = "Loading...",
}: {
  message?: string;
}) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="space-y-4 text-center">
      <div className="inline-block">
        <Spinner size="lg" />
      </div>
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  </div>
);

export const Loader = ({ fullScreen = false }: { fullScreen?: boolean }) => {
  if (fullScreen) {
    return <LoadingOverlay />;
  }

  return (
    <div className="flex items-center justify-center p-8">
      <Spinner size="md" />
    </div>
  );
};
