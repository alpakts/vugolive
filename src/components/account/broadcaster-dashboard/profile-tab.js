// components/PublisherApplicationForm.js
"use client";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/web-components/button/button"; // CustomButton componentine referans
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { getCountryList, getUrl, makeUserHost, updateHostProfile, updateUserProfile } from "@/lib/services/api-service";
import { useDispatch } from "react-redux";
import { setApiUser } from "@/lib/slices/api-user-slice";
import PopupComp from "@/components/web-components/popup/popup";
import { FaSave } from "react-icons/fa";
const placeholderImage = "/add100.png";

// Form doğrulama şeması
const validationSchema = Yup.object({
  age: Yup.number().min(18, "18 yaşından büyük olmalısınız").required("Bu alan zorunludur"),
  fullName: Yup.string().required("Bu alan zorunludur"),
  about: Yup.string().required("Bu alan zorunludur"),
  intrests: Yup.string().required("Bu alan zorunludur"),
  bio: Yup.string()
    .max(80, "En fazla 80 karakter olmalıdır")
    .required("Bu alan zorunludur"),
  availabiltyHours: Yup.number()
    .min(1, "Günlük en az 1 saat aktif olmalısınız")
    .required("Bu alan zorunludur"),
  diamond_per_min: Yup.number()
    .min(0, "Geçerli bir değer girin")
    .required("Bu alan zorunludur"),
  country_id: Yup.string().required("Ülke seçmeniz gerekiyor"),
  billingAddress: Yup.string().required("Fatura Adresi zorunludur"),
  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("E-posta zorunludur"),
});

const ProfileForm = () => {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const [countries, setCountries] = useState([]);
  const apiUser = useAppSelector((state) => state.apiUser.apiUser);
  const [uploadedPhotos, setUploadedPhotos] = useState(Array(5).fill(null)); // İlk 5 fotoğraf için yer tutucu
  const [uploadedVideos, setUploadedVideos] = useState(Array(2).fill(null)); // İlk 2 video için yer tutucu
  const [error, setError] = useState(null);
  const popupRef = useRef();
  const triggerPopup = ()=>{
    popupRef.current.triggerPopup(<FaSave></FaSave>, "Profiliniz başarıyla güncellendi");
  }
  const dispatch = useDispatch();
  useEffect(() => {
    getCountryList().then((response) => {
      setCountries(response.data.data);
    });
    const videos = apiUser?.video ? apiUser.video.map((video) => fileBaseUrl + video.video) : [];
    if (videos.length <= 2) videos.push(null);

    const images = apiUser?.images ? apiUser.images.map((image) => fileBaseUrl + image.image) : [];
    if (images.length <= 5) images.push(null);

    setUploadedPhotos(images);
    setUploadedVideos(videos);
  }, [apiUser]);
  // Fotoğraf yükleme fonksiyonu
  const handleImageUpload = async (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newPhotos = [...uploadedPhotos];
      newPhotos[index] = URL.createObjectURL(file); // Resim URL oluştur
      setUploadedPhotos(newPhotos);

      // Eğer 5 fotoğraftan fazla yüklendiyse, yeni bir placeholder ekle (10'a kadar)
      if (newPhotos.length >= 5 && newPhotos.length < 10) {
        newPhotos.push(null);
        setUploadedPhotos(newPhotos);
      }

      // URL oluşturulduğunda serbest bırakma
      return () => URL.revokeObjectURL(file);
    }
  };

  // Video yükleme fonksiyonu
  const handleVideoUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newVideos = [...uploadedVideos];
      newVideos[index] = URL.createObjectURL(file); // Video URL oluştur
      setUploadedVideos(newVideos);

      // Eğer 2 videodan fazla yüklendiyse, yeni bir placeholder ekle (4'e kadar)
      if (newVideos.length >= 2 && newVideos.length < 4) {
        newVideos.push(null);
        setUploadedVideos(newVideos);
      }

      // URL oluşturulduğunda serbest bırakma
      return () => URL.revokeObjectURL(file);
    }
  };

  const handleSubmit = async (values) => {
    setError(null);
    try {
      const imagesToSend = uploadedPhotos.filter((photo) => photo !== null);
      const videosToSend = uploadedVideos.filter((video) => video !== null);
      values.user_id=apiUser.id;
      updateHostProfile(values,imagesToSend,videosToSend).then((response) => {
        dispatch(setApiUser(response.data.data));
        triggerPopup();
      });
    } catch (err) {
      setError("Form gönderiminde bir hata oluştu");
    }
  };

  return (
    <div className="text-white  flex flex-col gap-6 max-h-[80vh] overflow-auto">
      <div className="w-full max-w-md mx-auto space-y-4">
        <Formik
          initialValues={{
            age: apiUser.age || "",
            fullName: apiUser.fullName || "",
            about: apiUser.about || "",
            intrests: apiUser.intrests?.join(',') || "",
            bio: apiUser.bio || "",
            availabiltyHours: apiUser.availabiltyHours || "",
            diamond_per_min: apiUser.diamond_per_min || "",
            country_id: apiUser.country_data?.id || "",
            billingAddress: apiUser.billingAddress || "",
            email: apiUser.email || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <div className="rounded-md shadow-sm space-y-5">
                {/* Fotoğraflar Alanı */}
                <div>
                  <label className="block text-gray-700">
                    Fotoğraflar (En az 5, en fazla 10 fotoğraf yükleyin)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {uploadedPhotos.map((photo, index) => (
                      <div key={index} className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleImageUpload(event, index)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <Image
                          src={photo || placeholderImage}
                          alt={`Fotoğraf ${index + 1}`}
                          width={0}
                          sizes="100vw"
                          height={0}
                          className="w-20 h-20 object-cover rounded-md border border-gray-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Videolar Alanı */}
                <div>
                  <label className="block text-gray-700">
                    Videolar (En az 2, en fazla 4 video yükleyin)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {uploadedVideos.map((video, index) => (
                      <div key={index} className="relative">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(event) => handleVideoUpload(event, index)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {video ? (
                          <video
                            src={video || placeholderImage}
                            alt={`Video ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-md border border-gray-700"
                          />
                        ) : (
                          <img
                            src={placeholderImage}
                            alt={`Video ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-md border border-gray-700"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" >
                    Yaş
                  </label>
                  <Field
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Yaşınız"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                 {/* Bio */}
                 <div>
                  <label htmlFor="bio" >
                    Kullanıcı Adı
                  </label>
                  <Field
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Kullanıcı Adınız"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                 {/* Bio */}
                 <div>
                  <label htmlFor="bio" >
                    Hakkında
                  </label>
                  <Field
                    id="about"
                    name="about"
                    type="text"
                    placeholder="Kendini Anlat"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="about"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                 {/* Bio */}
                 <div>
                  <label htmlFor="bio" >
                    İlgi Alanlarınız (Örn: Oyun, Spor, Müzik)
                  </label>
                  <Field
                    id="intrests"
                    name="intrests"
                    type="text"
                    placeholder="Kendinden bahset (0/80)"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="intrests"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                 {/* Bio */}
                 <div>
                  <label htmlFor="bio" >
                    Özgeçmiş
                  </label>
                  <Field
                    id="bio"
                    name="bio"
                    type="text"
                    placeholder="Kendinden bahset (0/80)"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Kaç Saat Aktif Oluyorsunuz */}
                <div>
                  <label htmlFor="availabiltyHours" >
                    Kaç Saat Aktif Oluyorsunuz?
                  </label>
                  <Field
                    id="availabiltyHours"
                    name="availabiltyHours"
                    type="number"
                    placeholder="Kaç saat aktif oluyorsunuz? (Günlük)"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="availabiltyHours"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Elmaslar */}
                <div>
                  <label htmlFor="diamond_per_min" >
                    Elmaslar (Dakika başına)
                  </label>
                  <Field
                    id="diamond_per_min"
                    name="diamond_per_min"
                    type="number"
                    placeholder="Dakika başına elmas"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="diamond_per_min"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Ülke */}
                <div>
                  <label htmlFor="country_id" >
                    Ülke
                  </label>
                  <Field
                    as="select"
                    id="country_id"
                    name="country_id"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  >
                    <option disabled selected value="">Ülke Seç</option>
                    {
                      countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.country_name}
                        </option>
                      ))
                    }
                  </Field>
                  <ErrorMessage
                    name="country_id"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Meslek */}
                <div>
                  <label htmlFor="billingAddress" >
                    Fatura Adresi
                  </label>
                  <Field
                    id="billingAddress"
                    name="billingAddress"
                    type="text"
                    placeholder="Mesleğiniz"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="billingAddress"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* E-posta */}
                <div>
                  <label htmlFor="email" >
                    E-posta
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="İletişim E-posta"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
             
              </div>

              {/* Gönder Button */}
              <div>
                <CustomButton
                  type="submit"
                  className="bg-secondary hover:bg-secondary text-black w-full py-2 rounded-md"
                >
                  PROFİLİ GÜNCELLE
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
      <PopupComp ref={popupRef} />
    </div>
  );
};

export default ProfileForm;
