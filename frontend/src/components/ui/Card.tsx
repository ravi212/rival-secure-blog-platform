import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`bg-white rounded-lg shadow-lg border border-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
);

Card.displayName = "Card";

export const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
    {children}
  </div>
);

export const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`px-6 py-4 ${className}`}>{children}</div>;

export const CardFooter = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-lg ${className}`}>
    {children}
  </div>
);
