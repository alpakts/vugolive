"use client";
import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/web-components/button/button";
import { getReportReason, reportUser } from "@/lib/services/api-service";
import Link from "next/link";
import PopupComp from "@/components/web-components/popup/popup";

// Form validasyon şeması
const validationSchema = Yup.object({
  reportReason: Yup.string().required("Lütfen bir şikayet nedeni seçin."),
  reportContent: Yup.string()
    .min(10, "Şikayet içeriği en az 10 karakter olmalıdır.")
    .required("Şikayet içeriği zorunludur."),
});
import { TbReportAnalytics } from "react-icons/tb";

const ReportForm = ({ host,closeModal }) => {
    const popupRef = useRef(null);
  const [reportReasons, setReportReasons] = useState([]);

  // Şikayet nedenlerini almak için API çağrısı
  useEffect(() => {
    getReportReason().then((res) => {
      setReportReasons(res.data.data);
    });
  }, []);

  // Şikayet gönderme işlemi
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await reportUser( values.reportReason,values.reportContent,host.id,);
      handleShowPopup(<TbReportAnalytics />,'Şikayetiniz alındı');
      setTimeout(() => {
        closeModal();
      }, 1500);
    } catch (error) {
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
    setSubmitting(false);
  };
  const handleShowPopup = (icon,children) => {
    if (popupRef.current) {
      popupRef.current.triggerPopup(icon,children); 
    }
  };
  return (
    <div className="text-white pt-20 px-4 flex flex-col gap-6 min-h-screen">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-center text-xl font-normal text-white">
            Şikayet Formu
          </h2>
        </div>
        <Formik
          initialValues={{ reportReason: "", reportContent: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              {/* Şikayet nedeni dropdown */}
              <div className="rounded-md shadow-sm space-y-5">
                <div>
                  <label htmlFor="reportReason" className="sr-only">
                    Şikayet Nedeni
                  </label>
                  <Field
                    as="select"
                    name="reportReason"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  >
                    <option value="">Lütfen bir neden seçin</option>
                    {reportReasons.map((reason, index) => (
                      <option key={index} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="reportReason"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Şikayet içeriği */}
                <div>
                  <label htmlFor="reportContent" className="sr-only">
                    Şikayet İçeriği
                  </label>
                  <Field
                    name="reportContent"
                    as="textarea"
                    rows="4"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white bg-gray-800 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Şikayetinizin detaylarını yazınız..."
                  />
                  <ErrorMessage
                    name="reportContent"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Şikayet Et butonu */}
              <div>
                <CustomButton
                  type="submit"
                  className="bg-gray-900 hover:bg-primary text-white w-full py-2 rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Gönderiliyor..." : `Şikayet Et ${host?.fullName}`}
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
        {/* Gizlilik Politikası */}
        <div className="mt-6 text-center text-gray-400">
          <Link href="/kvkk" className="text-secondary hover:text-primary">
            Gizlilik Politikası
          </Link>
        </div>
      </div>
      <PopupComp ref={popupRef}></PopupComp>
    </div>
  );
};

export default ReportForm;
