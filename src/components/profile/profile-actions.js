import React from "react";
import Image from "next/image";
import CustomButton from "@/components/web-components/button/button";
import SlidingModal from "@/components/web-components/modals/sliding-modal";
import ReportUser from "@/components/account/components/report-user";

const ProfileActions = ({ host, onMessageClick, slidingModalRef, onShareClick }) => (
  <div className="px-2">
    <h1 className="text-base flex items-center gap-2 font-bold mt-4 capitalize text-white lg:text-3xl">
      {host.fullName} <span className="text-sm"> {host.age}</span>
      {host.is_host === 2 && <Image src="/verified.png" width={20} height={20} />}
    </h1>
    <div className="text-sm opacity-75 flex gap-x-2 my-2 lg:text-base">{host.about}</div>

    <CustomButton className="bg-gray-900 text-xs text-white" onClick={onMessageClick}>
      SOHBETİ BAŞLAT {host.fullName}
    </CustomButton>
    <CustomButton className="bg-gray-900 text-xs text-white" onClick={onShareClick}>
      PAYLAŞ {host.fullName} PROFİLİ
    </CustomButton>

    <SlidingModal ref={slidingModalRef} OpenButton={<CustomButton className="bg-gray-900 text-xs text-white w-full">ŞİKAYET ET {host.fullName}</CustomButton>}>
      <ReportUser host={host} />
    </SlidingModal>
  </div>
);

export default ProfileActions;
