"use client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import Loading from "../loading";
import AccounHome from "@/components/account/account";
import withAuth from "@/hocs/with-auth";

const Page = () => {
  const user = useSelector((state) => state.user.user?.reloadUserInfo);
  if (!user) {
    return <Loading></Loading>;
  }
  return (
    <div className="px-4 py-5 min-h-screen text-white">
      <div className="flex flex-row flex-nowrap  justify-between mb-7 ">
        <div className="flex gap-5 flex-row items-center ">
          <Image
            className="outline rounded-full bg-white outline-gray-900 outline-offset-2 outline-[8px]"
            src={user.photoUrl ?? "/profile-placeholder.png"}
            width={70}
            height={70}
          />
          <span>{user.displayName}</span>
        </div>
        <Image src={"/edit-icon.svg"} width={40} height={40} />
      </div>
      <div className="h-[1px] w-full bg-gray-900"></div>
      <AccounHome></AccounHome>
    </div>
  );
};

export default withAuth(Page);
