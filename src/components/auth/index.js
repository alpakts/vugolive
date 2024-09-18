'use client';
import React from 'react'
import { signInWithPopup } from 'firebase/auth'; 
import { auth, provider } from '../../../firebaseConfig';
import Image from 'next/image';
import CustomButton from '@/components/web-components/button/button';
import { useDispatch } from 'react-redux';
import { setUser } from '@/lib/slices/userSlice';
import { useRouter, useSearchParams } from 'next/navigation';

const AuthHome = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const params = useSearchParams();
    const handleLogin = async () => {
        try {
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          dispatch(setUser(user))
          router.push(params.get('callbackUrl') ??'/account');
        } catch (error) {
          console.error('Error during login:', error);
        }
      };
  return (
    <div className='text-white pt-20 px-4 flex flex-col gap-6 min-h-screen '>
    <div className='text-center'>DEVAM ETMEK İÇİN OTURUM AÇIN</div>
    <Image className='mx-auto' src={'/logo.png'} width={50} height={50}></Image>
    <div className='text-center'>Aşağıdaki mevcut yöntemlerden herhangi birini kullanarak oturum açın ve profilleri keşfetmeye başlayın</div>
    <CustomButton
      onClick={handleLogin}
      className='flex gap-2 px-3 py-2 items-center justify-center w-4/5 mx-auto bg-blue-500  hover:text-white '
     
    >
      <span><Image src={'/google.logo.svg'} width={20} height={20}></Image></span>Google ile Giriş Yap
    </CustomButton>
    <CustomButton
      className='flex gap-2 px-3 py-2 items-center justify-center w-4/5 mx-auto text-black bg-secondary'
      
    >
      <span><Image src={'/mail-logo.svg'} width={20} height={20}></Image></span>E-posta ile Giriş Yap
    </CustomButton>
    </div>
  )
}

export default AuthHome