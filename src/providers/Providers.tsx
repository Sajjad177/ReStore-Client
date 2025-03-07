"use client";

import UserProvider from "@/context/UserContext";

// there we rapping all the providers

const Provider = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Provider;
