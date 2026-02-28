import React from "react";

export interface AlertProps {
  type: "error" | "success" | "info" | "warning";
  message: string;
  title?: string;
  onClose?: () => void;
  dismissible?: boolean;
}

const alertStyles = {
  error: "bg-red-50 border-red-200 text-red-700",
  success: "bg-green-50 border-green-200 text-green-700",
  info: "bg-blue-50 border-blue-200 text-blue-700",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
};

const alertIcons = {
  error: "⚠️",
  success: "✓",
  info: "ℹ",
  warning: "⚡",
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      type,
      message,
      title,
      onClose,
      dismissible = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`p-4 border rounded-lg ${alertStyles[type]} text-sm`}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="text-lg shrink-0">{alertIcons[type]}</span>
            <div>
              {title && <p className="font-semibold mb-1">{title}</p>}
              <p>{message}</p>
            </div>
          </div>
          {dismissible && onClose && (
            <button
              onClick={onClose}
              className="text-lg font-bold hover:opacity-70 shrink-0 ml-4"
              aria-label="Close alert"
            >
              ×
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";
