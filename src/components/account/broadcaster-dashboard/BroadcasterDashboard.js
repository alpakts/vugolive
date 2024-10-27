'use client';
import { useState } from 'react';
import { FiChevronLeft, FiHome, FiMessageSquare, FiUser } from 'react-icons/fi';
import DashboardTab from './dashboard-tab';
import Messages from '@/components/messages/messages';
import withAuth from '@/hocs/with-auth';
import ProfileForm from './profile-tab';
import Link from 'next/link';

 function BroadcasterDashboard() {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header section with a back button and title */}
      <div className="flex items-center px-4 py-4 border-b border-gray-700">
        <Link href='/account' className="text-white mr-4" >
          <FiChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold">
          {activeTab === 'dashboard' && 'YAYINCI GÖSTERGE PANELİ'}
          {activeTab === 'messages' && 'MESAJLAR'}
          {activeTab === 'profile' && 'PROFİL'}
        </h1>
      </div>

      {activeTab === 'dashboard' && <DashboardTab />}

      {activeTab === 'messages' && (
          <Messages />
      )}

      {activeTab === 'profile' && (
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold mb-2">Profil</h2>
          <ProfileForm></ProfileForm>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-900 grid grid-cols-3 py-3 z-10 text-sm">
        {/* Navigation button to the dashboard */}
        <button
          className={`flex flex-col items-center text-white ${
            activeTab === 'dashboard' ? 'text-primary' : ''
          }`}
          onClick={() => setActiveTab('dashboard')}
        >
          <FiHome size={24} className="mb-1" />
          Gösterge Paneli
        </button>
        {/* Navigation button to the messages */}
        <button
          className={`flex flex-col items-center text-white ${
            activeTab === 'messages' ? 'text-primary' : ''
          }`}
          onClick={() => setActiveTab('messages')}
        >
          <FiMessageSquare size={24} className="mb-1" />
          Mesaj
        </button>
        {/* Navigation button to the profile */}
        <button
          className={`flex flex-col items-center text-white ${
            activeTab === 'profile' ? 'text-primary' : ''
          }`}
          onClick={() => setActiveTab('profile')}
        >
          <FiUser size={24} className="mb-1" />
          Profil
        </button>
      </div>
    </div>
  );
}
export default withAuth(BroadcasterDashboard);
