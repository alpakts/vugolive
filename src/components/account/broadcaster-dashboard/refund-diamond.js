'use client';
import Loading from '@/app/(app)/loading';
import PopupComp from '@/components/web-components/popup/popup';
import { useAppSelector } from '@/lib/hooks';
import { getAppSettings, getPaymentGateWayList, requestRedeem } from '@/lib/services/api-service';
import { Formik, Field, Form } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BsDiamondFill } from 'react-icons/bs';
import { FiChevronLeft } from 'react-icons/fi';
import * as Yup from 'yup';

const RequestSchema = (minThresh) => Yup.object().shape({
  bank: Yup.string().required('Banka seçimi zorunludur.'),
  accountInfo: Yup.string().required('Hesap bilgisi zorunludur.'),
  diamond: Yup.number().min(minThresh, `Elmas miktarı eşit ya da yüksek olmalıdır: ${minThresh}`).required('Elmas miktarı zorunludur.'),
});

function handleSubmit(values, { setSubmitting, resetForm }) {
  console.log('Form submitted with values:', values);
  const router = useRouter();
  setTimeout(() => {
    requestRedeem(apiUser.id,values.diamond,values.accountInfo,values.bank).then(() => {
        popupRef.current.triggerPopup(BsDiamondFill, 'istek Başarıyla Gönderildi');
        router.push('/account/host-panel');
        
        }
    );
    setSubmitting(false);
  }, 1000);
}

export default function RefundDiamond() {
    const apiUser = useAppSelector((state) => state.apiUser.apiUser);
    const [appSettings, setAppSettings] = useState(null);
    const [banks, setBanks] = useState(null);
    const popupRef = useRef(null);
    useEffect(() => {
        getAppSettings().then((response) => {
            setAppSettings(response.data.data);
        });
        getPaymentGateWayList().then((response) => {
            setBanks(response.data.data);
        });
    }, []);
    if (apiUser == null) {
      return <Loading></Loading>;
        
    }
    return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header section with a back button and title */}
      <div className="flex items-center px-4 py-4 border-b border-gray-700">
        <button className="text-white mr-4" onClick={()=>{
          window.location.href = '/account/host-panel';
        }}>
          <FiChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">
          TALEP GÖNDER
        </h1>
      </div>
      <div className='p-4'>
      <div className="mt-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Elmas </h2>
                <p className="text-4xl font-extrabold mt-4">{apiUser?.diamond}</p>
                <p className="text-xs text-gray-400 mt-1">Minimum Çekim Miktarı: {appSettings?.app?.min_thershold}</p>
                <p className="text-xs text-gray-400">1000 Elmas = 1$ → ₺ 0.001</p>
              </div>
              <img className="h-12" src="/logo.png" alt="Vugo Logo" />
            </div>
          </div>
        </div>

        <Formik
          initialValues={{ bank: '', accountInfo: '' }}
          validationSchema={RequestSchema(appSettings?.app?.min_thershold)}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-6">
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Ödeme Seçenekleri</label>
                <Field
                  as="select"
                  name="bank"
                  className="w-full p-3 rounded-md bg-gray-800 text-white"
                >
                <option disabled value="">Seçiniz</option>
                {banks?.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                        {bank.payment_getway}
                    </option>
                ))}
                </Field>
                {errors.bank && touched.bank ? (
                  <div className="text-red-500 text-sm mt-1">{errors.bank}</div>
                ) : null}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Hesap Bilgileri</label>
                <Field
                  name="accountInfo"
                  type="text"
                  className="w-full p-3 rounded-md bg-gray-800 text-white"
                />
                {errors.accountInfo && touched.accountInfo ? (
                  <div className="text-red-500 text-sm mt-1">{errors.accountInfo}</div>
                ) : null}
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">Elmas Miktarı</label>
                <Field
                  name="diamond"
                  type="number"
                  className="w-full p-3 rounded-md bg-gray-800 text-white"
                />
                {errors.diamond && touched.diamond ? (
                  <div className="text-red-500 text-sm mt-1">{errors.diamond}</div>
                ) : null}
              </div>

              <div className="mt-8">
                <button type="submit" className="w-full p-4 bg-blue-600 rounded-md text-white font-bold">
                  GÖNDER
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <PopupComp ref={popupRef}  />

    </div>
  );
}
