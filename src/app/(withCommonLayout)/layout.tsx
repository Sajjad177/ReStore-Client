import Navbar from "@/components/ui/core/shared/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">{children}</main>
    </div>
  );
};

export default CommonLayout;
