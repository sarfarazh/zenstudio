import axios from "axios";
import { storage } from "@/configs/FirebaseConfig";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      console.error('No prompt provided for image generation');
      return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });
    }

    // Initialize Replicate client
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const input = {
      prompt,
      height: 1280,
      width: 1024,
      num_outputs: 1,
    };

    // Run the model on Replicate and fetch the output
    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
      { input }
    );

    const imageUrl = output[0];
    if (!imageUrl) {
      console.error('No image URL returned by the model');
      return NextResponse.json({ error: 'Image generation failed' }, { status: 422 });
    }

    // Fetch the image data as an array buffer
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = response.data;

    // Define the file name and Firebase reference
    const fileName = 'zenstudio-files/' + Date.now() + '.png';
    const storageRef = ref(storage, fileName);

    // Upload the image buffer to Firebase Storage
    await uploadBytes(storageRef, imageBuffer, { contentType: 'image/png' });

    // Get the download URL for the uploaded image
    const downloadUrl = await getDownloadURL(storageRef);
    console.log('Generated image download URL:', downloadUrl);

    // Return the download URL
    return NextResponse.json({ result: downloadUrl });
    
  } catch (e) {
    // Log the error for debugging
    console.error("Error generating image:", e.message || e);

    // Return a detailed error message
    return NextResponse.json(
      { error: e.message || "An error occurred while generating the image" },
      { status: 500 }
    );
  }
}
