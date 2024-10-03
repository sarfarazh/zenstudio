// src/contexts/CreditsContext.js

import React, { createContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs/db';
import { Users } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export const CreditsContext = createContext();

export const CreditsProvider = ({ children }) => {
  const { user } = useUser();
  const [credits, setCredits] = useState(null);

  const fetchCredits = async () => {
    try {
      const result = await db
        .select({ credits: Users.credits })
        .from(Users)
        .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));
      setCredits(result[0]?.credits ?? 0);
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCredits();
    }
  }, [user]);

  return (
    <CreditsContext.Provider value={{ credits, fetchCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};
