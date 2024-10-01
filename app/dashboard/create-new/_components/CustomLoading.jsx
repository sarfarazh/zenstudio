import React from 'react';
import Image from 'next/image';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          {/* Title for the dialog */}
          <AlertDialogTitle>Processing your request</AlertDialogTitle>

          {/* Description for accessibility */}
          <AlertDialogDescription>
            Please wait while we generate your video. Do not refresh the page or navigate away.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Content with image and message */}
        <div className="bg-white flex flex-col items-center my-10 justify-center">
          <Image src={'/progress.gif'} width={100} height={100} alt="Loading animation" />
          <h2>Generating your video... Do not refresh</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;
