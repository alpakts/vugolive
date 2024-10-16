"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../loading";
import AccounHome from "@/components/account/account";
import withAuth from "@/hocs/with-auth";
import AccountHeader from "@/components/account/account-header";

const Page = () => {
  const apiUser = useSelector((state) => state.apiUser?.apiUser);
  debugger;
  if (!apiUser) {
    return <Loading></Loading>;
  }

  return (
    <div className="px-4 py-5 min-h-screen text-white">
   <AccountHeader user={apiUser} />
      <div className="h-[1px] w-full bg-gray-900"></div>
      <AccounHome></AccounHome>
    </div>
  );
};

export default withAuth(Page);
