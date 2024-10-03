"use client";
import { UserButton } from '@clerk/nextjs';
import React, { useContext } from 'react';
import { CreditsContext } from '../../_context/CreditsContext';

function Header() {
  const { credits } = useContext(CreditsContext);

  return (
    <div className="p-3 px-5 flex items-center justify-between shadow-md">
      <div>
        <h1 className="font-bold text-xl text-gray-900">ZenStudio</h1>
      </div>
      <div className="flex gap-3 items-center">
        <span className="text-gray-800">Credits: {credits}</span>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
