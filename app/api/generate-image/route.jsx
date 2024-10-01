import axios from "axios";
import { storage } from "@/configs/FirebaseConfig";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // Initialize Replicate client
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const input = {
      prompt: prompt,
      height: 1280,
      width: 1024,
      num_outputs: 1,
    };

    // Run the model on Replicate and fetch the output
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    );

    console.log(output);

    // Fetch the image data as an array buffer
    const imageUrl = output[0];
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = response.data;

    // Define the file name and reference
    const fileName = 'zenstudio-files/' + Date.now() + '.png';
    const storageRef = ref(storage, fileName);

    // Define metadata for the upload
    const metadata = {
      contentType: 'image/png',
    };

    // Upload the image buffer to Firebase Storage
    await uploadBytes(storageRef, imageBuffer, metadata);

    // Get the download URL
    const downloadUrl = await getDownloadURL(storageRef);
    console.log(downloadUrl);

    // Return the download URL in the response
    return NextResponse.json({ result: downloadUrl });
  } catch (e) {
    // Log the error and return an error response
    console.error("Error generating image:", e.message || e);

    return NextResponse.json(
      { error: e.message || "An error occurred while generating the image" },
      { status: 500 }
    );
  }
}
