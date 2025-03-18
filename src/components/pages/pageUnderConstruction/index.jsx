import React from "react";
import { Hammer } from "lucide-react";

export default function PageUnderConstruction() {
  return (
    <div className="flex flex-1 items-center justify-center text-center ">
      <div className="flex flex-col items-center space-y-4">
        <Hammer className="h-20 w-20 text-gray-800" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Page Under Construction
        </h1>
        <p className="text-gray-600">
          We're working on it. Please check back later.
        </p>
      </div>
    </div>
  );
}