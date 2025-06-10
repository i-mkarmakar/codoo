"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";

const DashboardPage = () => {
  const { user } = useUser();
  return(
    <div>
      <div>{ user?.firstName }</div>
      <div></div>
    </div>
  )
};

export default DashboardPage;
