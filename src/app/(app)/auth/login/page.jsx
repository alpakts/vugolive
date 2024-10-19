import EmailAuth from '@/components/auth/register'
import React from 'react'

export const metadata = {
  title: "Giriş Yap | Kayıt Ol  | Vugo Live",
  description: 'Vugo Live, canlı yayın yapmanın en kolay yolu. Canlı yayın yap, izle ve sohbet et.',
}
const Page = () => {
  return (
    <div><EmailAuth></EmailAuth></div>
  )
}

export default Page