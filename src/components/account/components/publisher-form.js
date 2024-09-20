// components/PublisherApplicationForm.js
"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/web-components/button/button"; // CustomButton componentine referans
import Image from "next/image";
// Placeholder image and video
const placeholderImage = "/add100.png"; // Placeholder for images

// Form doğrulama şeması
const validationSchema = Yup.object({
  bio: Yup.string()
    .max(80, "En fazla 80 karakter olmalıdır")
    .required("Bu alan zorunludur"),
  hoursActive: Yup.number()
    .min(1, "Günlük en az 1 saat aktif olmalısınız")
    .required("Bu alan zorunludur"),
  diamondsPerMinute: Yup.number()
    .min(0, "Geçerli bir değer girin")
    .required("Bu alan zorunludur"),
  country: Yup.string().required("Ülke seçmeniz gerekiyor"),
  profession: Yup.string().required("Mesleğinizi belirtin"),
  email: Yup.string().email("Geçerli bir e-posta adresi girin").required("E-posta zorunludur"),
  agree: Yup.boolean().oneOf([true], "Koşulları kabul etmelisiniz"),
});

const PublisherApplicationForm = () => {
  const [uploadedPhotos, setUploadedPhotos] = useState(Array(5).fill(null)); // İlk 5 fotoğraf için yer tutucu
  const [uploadedVideos, setUploadedVideos] = useState(Array(2).fill(null)); // İlk 2 video için yer tutucu
  const [error, setError] = useState(null);

  // Fotoğraf yükleme fonksiyonu
  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newPhotos = [...uploadedPhotos];
      newPhotos[index] = URL.createObjectURL(file); // Resim URL oluştur
      setUploadedPhotos(newPhotos);

      // Eğer 5 fotoğraftan fazla yüklendiyse, yeni bir placeholder ekle (10'a kadar)
      if (newPhotos.filter(Boolean).length >= 5 && newPhotos.length < 10) {
        newPhotos.push(null);
        setUploadedPhotos(newPhotos);
      }
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
      if (newVideos.filter(Boolean).length >= 2 && newVideos.length < 4) {
        newVideos.push(null);
        setUploadedVideos(newVideos);
      }
    }
  };

  const handleSubmit = async (values) => {
    setError(null);
    try {
      // Form gönderim işlemleri buraya
      alert(JSON.stringify(values, null, 2));
    } catch (err) {
      setError("Form gönderiminde bir hata oluştu");
    }
  };

  return (
    <div className="text-white  flex flex-col gap-6 max-h-[80vh] overflow-auto">
      <div className="w-full max-w-md mx-auto space-y-4">
        <h2 className="text-center text-xl font-normal text-white">
          Yayıncılık İçin Başvuru Formu
        </h2>

        <Formik
          initialValues={{
            bio: '',
            hoursActive: '',
            diamondsPerMinute: '',
            country: '',
            profession: '',
            email: '',
            agree: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <div className="rounded-md shadow-sm space-y-5">
                {/* Fotoğraflar Alanı */}
                <div>
                  <label className="block text-gray-700">Fotoğraflar (En az 5, en fazla 10 fotoğraf yükleyin)</label>
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
                  <label className="block text-gray-700">Videolar (En az 2, en fazla 4 video yükleyin)</label>
                  <div className="flex flex-wrap gap-2">
                    {uploadedVideos.map((video, index) => (
                      <div key={index} className="relative">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(event) => handleVideoUpload(event, index)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <img
                          src={video || placeholderImage}
                          alt={`Video ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-md border border-gray-700"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="sr-only">Özgeçmiş</label>
                  <Field
                    id="bio"
                    name="bio"
                    type="text"
                    placeholder="Kendinden bahset (0/80)"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage name="bio" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Kaç Saat Aktif Oluyorsunuz */}
                <div>
                  <label htmlFor="hoursActive" className="sr-only">Kaç Saat Aktif Oluyorsunuz?</label>
                  <Field
                    id="hoursActive"
                    name="hoursActive"
                    type="number"
                    placeholder="Kaç saat aktif oluyorsunuz? (Günlük)"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage name="hoursActive" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Elmaslar */}
                <div>
                  <label htmlFor="diamondsPerMinute" className="sr-only">Elmaslar</label>
                  <Field
                    id="diamondsPerMinute"
                    name="diamondsPerMinute"
                    type="number"
                    placeholder="Dakika başına elmas"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage name="diamondsPerMinute" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Ülke */}
                <div>
                  <label htmlFor="country" className="sr-only">Ülke</label>
                  <Field
                    as="select"
                    id="country"
                    name="country"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  >
                    <option value="">Ülke Seç</option>
                    <option value="Türkiye">Türkiye</option>
                    <option value="Amerika">Amerika</option>
                    <option value="İngiltere">İngiltere</option>
                  </Field>
                  <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Meslek */}
                <div>
                  <label htmlFor="profession" className="sr-only">Mesleğiniz</label>
                  <Field
                    id="profession"
                    name="profession"
                    type="text"
                    placeholder="Mesleğiniz"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage name="profession" component="div" className="text-red-500 text-sm" />
                </div>

                {/* E-posta */}
                <div>
                  <label htmlFor="email" className="sr-only">E-posta</label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="İletişim E-posta"
                    className="appearance-none rounded-md w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Koşullar Checkbox */}
                <div className="flex items-center">
                  <Field
                    id="agree"
                    name="agree"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="agree" className="ml-2 block text-sm text-gray-400">
                    Kabul ediyorum. <span className="text-primary">Şartlar ve Koşullar</span>
                  </label>
                </div>
                  <ErrorMessage name="agree" component="div" className="text-red-500 text-sm ml-4" />
              </div>

              {/* Gönder Button */}
              <div>
                <CustomButton
                  type="submit"
                  className="bg-secondary hover:bg-secondary text-black w-full py-2 rounded-md"
                >
                  Gönder
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
};

export default PublisherApplicationForm;
