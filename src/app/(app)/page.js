import HomeIndex from "@/components/home";
import Script from "next/script";

export const metadata = {
  title: 'Vugo Live | Canlı Yayınlar',
  description: 'Vugo Live | Canlı Yayınlar',
  keywords: 'canlı yayın, Vugo Live, yayın izle, canlı performanslar, etkinlikler'
}
// canlı yayın listesinde  yine elmas canlı yayın üzerinde görünecek
// hits kısmı en son aşamada anlar olarak değişecek
// mesaj kısmında görüntülü arama olacak
export default function Home() {
  return (
    <div>
      <HomeIndex></HomeIndex>
      <Script
        id="tawk-to-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/676d83ca49e2fd8dfefe5818/1ig1slka6';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />
    </div>
  );
 
}