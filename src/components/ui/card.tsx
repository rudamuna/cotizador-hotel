import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

function Card({ className, ...props }: CardProps) {
  return <div className={`rounded-lg border bg-white p-4 shadow-sm ${className}`} {...props} />;
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`pt-2 ${className}`} {...props} />;
}

export { Card, CardContent };
