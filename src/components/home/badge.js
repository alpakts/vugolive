'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import SlidingModal from '../web-components/modals/sliding-modal';
import ForYou from '../account/components/for-you';

const Badges = () => {
  const router = useRouter();
  return (
    <div className=" pb-4 grid grid-cols-3 gap-2">
      {/* Top Yayıncılar Badge */}
      <div className="flex flex-col items-centertext-center rounded-lg  shadow-md"  onClick={()=>{
        router.push('/ranking?at=2')
      }}>
        <video
          muted
          autoPlay
          loop
          
          className="w-full h-full rounded-lg"
        >
          <source src="/top-stream-vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Top Destekçiler Badge */}
      <div className="flex flex-col items-centertext-center rounded-lg  shadow-md" onClick={()=>{
        router.push('/ranking?at=0')
      }}>
        <video
          muted
          autoPlay
          loop
          className="w-full h-full rounded-lg object-cover"
        >
          <source src="/top-support-vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


      {/* Aile Badge */}
      <div className="flex flex-col items-center text-center rounded-lg shadow-md">
      <SlidingModal
          OpenButton={
            <Image src={'/hi-to.jpg'} width={100} height={100} sizes='50vw' className='w-full h-full rounded-lg'/>
          }
        >
          <ForYou />
        </SlidingModal>
      </div>
    </div>
  );
};

export default Badges;
