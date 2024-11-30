import { Loader } from "lucide-react";
import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 w-full h-screen z-10 bg-background grid place-items-center">
      <Loader size={20} className="ml-2 animate-spin text-primary" />
    </div>
  );
};

export default Spinner;
