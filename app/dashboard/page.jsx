"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import EmptyState from './_components/EmptyState';
import Link from 'next/link';
import VideoList from './_components/VideoList';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

function Dashboard() {
  const [videoList, setVideoList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetVideoList();
    }
  }, [user]);

  const GetVideoList = async () => {
    try {
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.createdBy, user?.primaryEmailAddress?.emailAddress));
      setVideoList(result);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
        <Link href={'/dashboard/create-new'}>
          <Button>+ Create New</Button>
        </Link>
      </div>
      {videoList.length === 0 && (
        <div>
          <EmptyState />
        </div>
      )}
      {videoList.length > 0 && <VideoList videoList={videoList} />}
    </div>
  );
}

export default Dashboard;
