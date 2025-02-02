import React from 'react';

const SkeletonImage = ({ haveLine = false,count=0  }) => {
    const array = Array.from({ length: count });
    return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-4">
            {[...Array(count)].map((_, index) => (
              <div
                key={index} 
                role="status"
                className="space-y-2 flex flex-col justify-center items-center animate-pulse md:space-y-0 "
              >
                <div className="flex items-center justify-center w-full  bg-gray-300 h-64 rounded-2xl aspect-[0.75] ">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
      
                {haveLine && (
                  <div className="w-full py-4">
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      );
      

     
  
};

export default SkeletonImage;
