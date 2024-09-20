"use client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import Loading from "../loading";
import AccounHome from "@/components/account/account";
import withAuth from "@/hocs/with-auth";
import AccountHeader from "@/components/account/account-header";

const Page = () => {
  const user = useSelector((state) => state.user.user?.reloadUserInfo);
  if (!user) {
    return <Loading></Loading>;
  }
  return (
    <div className="px-4 py-5 min-h-screen text-white">
   <AccountHeader user={user} />
      <div className="h-[1px] w-full bg-gray-900"></div>
      <AccounHome></AccounHome>
    </div>
  );
};

export default withAuth(Page);
