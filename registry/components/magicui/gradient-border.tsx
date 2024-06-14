import React from "react";
import { cn } from "@/lib/utils";

interface StyledInputProps {
  className?: string;
  children: React.ReactNode;
}

const GradiantBorder: React.FC<StyledInputProps> = ({
  className,
  children,
}) => {
  return (
    <div className="relative w-fit ">
      <div
        className={cn(
          "absolute inset-0 rounded-lg bg-gradient-to-br from-pink-200 to-yellow-200",
          className,
        )}
      ></div>

      <div className=" rounded-[calc(1.5rem-1px)] bg-gray-50 p-0.5">
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

export default GradiantBorder;
