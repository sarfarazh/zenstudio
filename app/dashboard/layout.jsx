"use client";
import React from 'react';
import Header from './_components/Header';
import SideNav from './_components/SideNav';
import { VideoDataProvider } from '../_context/VideoDataContext'; // Import provider
import { CreditsProvider } from '../_context/CreditsContext';

function DashboardLayout({ children }) {
  return (
    <CreditsProvider>
    <VideoDataProvider> {/* Wrap the layout with the provider */}
      <div>
        <div className='hidden md:block h-screen bg-white fixed mt-[65px] w-64'>
          <SideNav />
        </div>
        <div>
          <Header />
          <div className='md:ml-64 p-10'>
            {children}
          </div>
        </div>
      </div>
    </VideoDataProvider>
    </CreditsProvider>
  );
}

export default DashboardLayout;
