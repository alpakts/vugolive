"use client";
import CustomButton from "@/components/web-components/button/button";
import { useAppSelector } from "@/lib/hooks";
import { getUrl, getUserProfile, updateUserProfile } from "@/lib/services/api-service";
import { setApiUser } from "@/lib/slices/api-user-slice";
import { FaCheck, FaPen, FaSave } from "react-icons/fa";
import { FiChevronLeft, FiX } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from 'yup';
import { useRef } from "react";
import PopupComp from "@/components/web-components/popup/popup";

const UpdateProfile = () => {
  const fileInputRef = useRef(null);
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const profileImageUrl = apiUser?.profileimages ? fileBaseUrl + apiUser?.profileimages : "/profile-placeholder.png";
  const profileSchema = yup.object().shape({
    fullName: yup.string().required("Kullanıcı adı zorunludur").min(2, "Kullanıcı adı en az 2 karakter olmalıdır"),
    about: yup.string().max(500, "Hakkımda alanı en fazla 500 karakter olabilir"),
    intrests: yup.string().max(200, "İlgi alanları en fazla 200 karakter olabilir"),
    gender: yup.number().oneOf([0, 1], "Geçerli bir cinsiyet seçiniz"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: apiUser?.fullName || "",
      about: apiUser?.about || "",
      intrests: apiUser?.interest || "",
      gender: apiUser?.gender || "",
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      try {
        const file = fileInputRef.current.files[0];
        let fileUrl = null;
        if (file) {
          const File = await getUrl(file);
          fileUrl = File?.data?.url;
        }
        if (apiUser.gender != values.gender) {
          values.rightChangeGender = 0;
        }
        const updateResult = await updateUserProfile(
          {
            user_id: apiUser.id,
            ...values,
          },
          fileUrl
        );
        if (updateResult.data.status) {
          getUserProfile(apiUser.id).then((res) => {
            dispatch(setApiUser(res.data.data));
          });
        }
        popupRef.current.triggerPopup("Profil güncellendi: " + values.fullName,<FaSave size={24} />);
      } catch (error) {
        alert(error.message);
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Get URL of the uploaded image
      formik.setFieldValue("profileImage", imageUrl); // Set the uploaded image as profile picture
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Butona tıklanınca input'u tetikle
  };

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white overflow-auto ">
      {/* Header */}
      <div className="flex items-center w-full px-4">
        <button className="text-base text-white mr-4">
          {/* Geri Butonu */}
          <FiChevronLeft size={24} />
        </button>
        <h1 className="text-base font-bold">PROFİL</h1>
      </div>

      {/* Profile Image */}
      <div className="relative mt-4">
        <img
          src={formik.values.profileImage || profileImageUrl} // Uploaded profile image will be shown here
          alt="Profile"
          className="w-32 h-32 rounded-full bg-gray-700 object-cover"
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

      <form onSubmit={formik.handleSubmit} className="w-full max-w-md px-4 mt-8">
        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            KULLANICI ADI
          </label>
          <input
            type="text"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
          )}
        </div>

        {/* About Input */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            HAKKIMDA
          </label>
          <input
            name="about"
            value={formik.values.about}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          />
          {formik.touched.about && formik.errors.about && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.about}</div>
          )}
        </div>

        {/* Interest Input */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            İLGİ ALANLARI (Virgülle ayırarak yazınız)
          </label>
          <input
            type="text"
            name="intrests"
            value={formik.values.intrests}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          />
          {formik.touched.intrests && formik.errors.intrests && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.interest}</div>
          )}
        </div>

        {/* Gender Input */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            CİNSİYET
          </label>
          <select
            name="gender"
            disabled={apiUser.rightChangeGender == 1 || !apiUser.rightChangeGender}
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-800"
          >
            <option value="" disabled>Seçiniz</option>
            <option value="0">Erkek</option>
            <option value="1">Kadın</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.gender}</div>
          )}
        </div>
        <div className="w-full">Cinsiyet bir kere değiştirilebilir!</div>

        <CustomButton type="submit" className="text-white w-full my-4 bg-gray-950">
          Güncelle
        </CustomButton>
      </form>
      <PopupComp ref={popupRef}></PopupComp>
    </div>
  );
};

export default UpdateProfile;
