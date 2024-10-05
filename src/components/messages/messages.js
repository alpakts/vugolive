'use client';
import withAuth from "@/hocs/with-auth";
import ProfileCard from "./message-cart";

 function Messages() {
  const profiles = [
    {
      name: 'Ayşe',
      id : 1,
      age: 40,
      message: 'Merhaba',
      timeAgo: '2 weeks ago',
      imageUrl: 'https://img.freepik.com/premium-photo/beautiful-usa-girl-friendly-carefree-smile-looking-positive-relaxed-happy_564692-49407.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728086400&semt=ais_hybrid', // Profil resminin yolunu burada belirtin
    },
    {
      name: 'Sare',
      id : 2,
      age: 24,
      message: '250',
      timeAgo: '2 weeks ago',
      imageUrl: 'https://img.freepik.com/premium-photo/beautiful-usa-girl-friendly-carefree-smile-looking-positive-relaxed-happy_564692-49407.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728086400&semt=ais_hybrid',
    },
    {
      name: 'Sinem',
      id : 3,
      age: 24,
      message: 'Sa',
      timeAgo: '1 month ago',
      imageUrl: 'https://img.freepik.com/premium-photo/beautiful-usa-girl-friendly-carefree-smile-looking-positive-relaxed-happy_564692-49407.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1728086400&semt=ais_hybrid',
    },
  ];

  return (
    <div className="min-h-screen flex p-4  justify-center">
      <div className="max-w-md w-full">
        {profiles.map((profile, index) => (
          <ProfileCard key={index} {...profile} />
        ))}
      </div>
    </div>
  );
}
export default withAuth(Messages);
