// components/Profile.js
"use client";
import CustomButton from "@/components/web-components/button/button";
import { useAppSelector } from "@/lib/hooks";
import { getUserProfile, saveProfile, updateUserProfile } from "@/lib/services/api-service";
import { setApiUser } from "@/lib/slices/api-user-slice";
import { useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";

const UpdateProfile = () => {
  const fileInputRef = useRef(null);
  const [username, setUsername] = useState("alper");
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("/profile-placeholder.png"); // Default profile image
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Get URL of the uploaded image
      setProfileImage(imageUrl); // Set the uploaded image as profile picture
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Butona tıklanınca input'u tetikle
  };
  
  const handleUpdate = async () => {
    debugger;
    const updateResult =  await updateUserProfile({
      user_id:apiUser.id,
      fullName: username,
    },fileInputRef.current.files[0]);
    if (updateResult.data.status) {
      getUserProfile(apiUser.id).then((res) => {
        dispatch(setApiUser(res.data.data));
      });
      
    }
    alert("Kullanıcı adı güncellendi: " + username);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white">
      {/* Header */}
      <div className="flex items-center w-full px-4">
        <button className="text-base text-white mr-4">
          {/* Geri Butonu */}
          <FiChevronLeft size={24} />
        </button>
        <h1 className="text-base font-bold">PROFİL</h1>
      </div>

      {/* Profile Image */}
      <div className="relative mt-8">
        <img
          src={profileImage} // Uploaded profile image will be shown here
          alt="Profile"
          className="w-40 h-40 rounded-full bg-gray-700 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="shadow-lg" onClick={handleButtonClick}>
            <FaPen size={24} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }} // Görünmez yap
            accept="image/*" // Sadece görüntü dosyaları kabul edilsin
          />
        </div>
      </div>

      {/* Username Input */}
      <div className="w-full max-w-md px-4 mt-8">
        <label className="block text-gray-400 text-sm font-bold mb-2">
          KULLANICI ADI
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
        />
        <CustomButton
          className="text-white w-full my-4 bg-gray-950"
          onClick={handleUpdate}
        >
          Güncelle
        </CustomButton>
      </div>

    </div>
  );
};

export default UpdateProfile;
