
"use client";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/web-components/button/button"; // CustomButton componentine referans
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { getCountryList, makeUserHost} from "@/lib/services/api-service";
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

const PublisherApplicationForm = () => {
  const fileBaseUrl = process.env.NEXT_PUBLIC_FILE_URL;
  const [countries, setCountries] = useState([]);
  const  [imageError, setImageError] = useState(null);
  const [videoError, setVideoError] = useState(null);
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
    const videos =Array(2).fill(null);
    if (videos.length < 4) videos.push(null);

    const images = Array(5).fill(null);
    if (images.length < 10) images.push(null);

    setUploadedPhotos(images);
    setUploadedVideos(videos);
  }, []);
  const handleImageUpload = async (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newPhotos = [...uploadedPhotos];
      newPhotos[index] = file; 
      setUploadedPhotos(newPhotos);

      if (newPhotos.length >= 5 && newPhotos.length < 10) {
        newPhotos.push(null);
        setUploadedPhotos(newPhotos);
      }

      return () => URL.revokeObjectURL(file);
    }
  };

  const handleVideoUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newVideos = [...uploadedVideos];
      newVideos[index] = file; 
      setUploadedVideos(newVideos);
      if (newVideos.length >= 2 && newVideos.length < 4) {
        newVideos.push(null);
        setUploadedVideos(newVideos);
      }

      return () => URL.revokeObjectURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setError(null);
    setSubmitting(true);
    try {
      const imagesToSend = uploadedPhotos.filter((image) => image instanceof File);
      const videosToSend = uploadedVideos.filter((video) => video instanceof File);
  
      values.user_id = apiUser?.id;
  
      if (uploadedVideos.filter((video) => video).length < 2) {
        setVideoError("En az 2 video yüklemeniz gerekiyor");
        setError("En az 2 video yüklemeniz gerekiyor");
        setSubmitting(false);
        return;
      }
  
      if (uploadedPhotos.filter((photo) => photo).length < 5) {
        setImageError("En az 5 fotoğraf yüklemeniz gerekiyor");
        setError("En az 5 fotoğraf yüklemeniz gerekiyor");
        setSubmitting(false);
        return;
      }
  
      setImageError(null);
      setVideoError(null);
      values.id = apiUser?.id;
      const response = await makeUserHost(values, imagesToSend, videosToSend);
      
      dispatch(setApiUser(response.data.data));
      triggerPopup();
    } catch (err) {
      setError("Form gönderiminde bir hata oluştu");
    } finally {
      setSubmitting(false); 
    }
  };
  const handleImageDelete = (index) => {
     const newPhotos = uploadedPhotos.filter((photo) => photo !== uploadedPhotos[index]);
    setUploadedPhotos(newPhotos);
    if (uploadedPhotos.length <10 && newPhotos.filter((photo) => photo == null).length <2) {
      newPhotos.push(null);
      setUploadedPhotos(newPhotos);

    }
  }
  const handleVideoDelete = (index) => {
    const newVideos = uploadedVideos.filter((video) => video !== uploadedVideos[index]);
   setUploadedVideos(newVideos);
   if (uploadedVideos.length < 4 && uploadedVideos.filter((video) => video == null).length <2) {
    newVideos.push(null);
    setUploadedVideos(newVideos);
   }
 }
  

  return (
    <div className="text-white  flex flex-col gap-6 max-h-[80vh] overflow-auto">
    
      <div className="w-full max-w-md mx-auto space-y-4">
        <Formik
          initialValues={{
            age: "",
            fullName:"",
            about: "",
            intrests:"",
            bio: "",
            availabiltyHours: "",
            diamond_per_min: "",
            country_id:"",
            billingAddress:"",
            email: "",
          }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({isSubmitting}) => (
            <Form className="space-y-6">
              <div className="rounded-md shadow-sm space-y-5">
                {/* Fotoğraflar Alanı */}
                <div>
                  <label className="block text-gray-700">
                    Fotoğraflar (En az 5, en fazla 10 fotoğraf yükleyin)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {uploadedPhotos.map((photo, index) =>{
                      return(
                        <div key={index} className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleImageUpload(event, index)}
                          className={`absolute inset-0 opacity-0 cursor-pointer ${photo ? 'hidden' : ''}`}
                        />
                        <Image
                          src={ photo !=null ? photo instanceof File ? URL.createObjectURL(photo) : fileBaseUrl + photo?.image :placeholderImage}
                          alt={`Fotoğraf ${index + 1}`}
                          width={0}
                          sizes="100vw"
                          onClick={()=>handleImageDelete(index)}
                          height={0}
                          className={`w-20 h-20 object-cover  rounded-md border border-gray-700`}
                        />
                      </div>
                      )
                    })}
                  </div>
                  {imageError && <div className="text-red-500 text-sm mt-2">{imageError}</div>}
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
                          className={`absolute inset-0 opacity-0 cursor-pointer ${video ? 'hidden' : ''}`}
                        />
                        {video ? (
                          <video
                            src={video instanceof File ? URL.createObjectURL(video) :fileBaseUrl+ video?.video || placeholderImage}
                            alt={`Video ${index + 1}`}
                            onClick={()=>handleVideoDelete(index)}
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
                  {videoError && <div className="text-red-500 text-sm mt-2">{videoError}</div>}
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

              <div>
              {
                isSubmitting ? (
                  <CustomButton
                    type="button"
                    className="bg-secondary hover:bg-secondary text-black w-full py-2 rounded-md"
                    disabled
                  >
                    GÜNCELLENİYOR
                  </CustomButton>
                ) : (
                  <CustomButton
                    type="submit"
                    className="bg-secondary hover:bg-secondary text-black w-full py-2 rounded-md"
                  >
                    PROFİLİ GÜNCELLE
                  </CustomButton>
                )
              }
              
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

export default PublisherApplicationForm;
