'use client';
import Loading from '@/app/(app)/loading';
import { useAppSelector } from '@/lib/hooks';
import { getPaymentHistory} from '@/lib/services/api-service';
import { useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';



export default function History() {
    const apiUser = useAppSelector((state) => state.apiUser.apiUser);
    const [history, setHistory] = useState([]);
    useEffect(() => {
        if (apiUser == null) {
            return;
            
        }
        getPaymentHistory(apiUser.id,0,20).then((response) => {
            debugger;
            setHistory(response.data.data);
        });
        
    }, [apiUser]);
    if (apiUser == null) {
      return <Loading></Loading>;
        
    }
    return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header section with a back button and title */}
      <div className="flex items-center px-4 py-4 border-b border-gray-700">
        <button className="text-white mr-4" onClick={()=>{
          window.location.href = '/account';
        }}>
          <FiChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">
          TALEP GÖNDER
        </h1>
      </div>
      <div className='p-4'>
      { history && history.map((item, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md mb-4">
                <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold">Elmas </h2>
                    <p className="text-4xl font-extrabold mt-4">{item.amount}</p>
                    <p className="text-xs text-gray-400 mt-1">Tarih: {item.created_at}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">Durum: {item.status}</p>
                </div>
                </div>
            </div>
            ))}

      </div>

    </div>
  );
}
