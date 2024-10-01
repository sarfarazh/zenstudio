import axios from "axios"; // Import axios
import { storage } from "@/configs/FirebaseConfig";
import { getDownloadURL, uploadString, ref } from "firebase/storage"; // Import ref from Firebase
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // Initialize Replicate client
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN, // Ensure this token is correctly set
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

    // Save to Firebase
    const base64Image = "data:image/png;base64," + (await ConvertImage(output[0]));
    const fileName = 'zenstudio-files/' + Date.now() + '.png';
    const storageRef = ref(storage, fileName); // Properly define ref

    await uploadString(storageRef, base64Image, 'data_url');

    const downloadUrl = await getDownloadURL(storageRef);
    console.log(downloadUrl);

    // Return the first result from the array of outputs
    return NextResponse.json({ result: downloadUrl });
  } catch (e) {
    // Log the error and return a descriptive error response
    console.error("Error generating image:", e.message || e);

    // Return a NextResponse with the error message
    return NextResponse.json(
      { error: e.message || "An error occurred while generating the image" },
      { status: 500 }
    );
  }
}

// Convert image URL to base64
const ConvertImage = async (imageUrl) => {
  try {
    const resp = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    const base64Image = Buffer.from(resp.data).toString('base64');
    return base64Image;
  } catch (e) {
    // Log the error and return a descriptive error response
    console.error("Error generating image:", e.message || e);

    // Return a NextResponse with the error message
    return NextResponse.json(
      { error: e.message || "An error occurred while generating the image" },
      { status: 500 }
    );
  }
};
