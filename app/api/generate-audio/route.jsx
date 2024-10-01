import textToSpeech from "@google-cloud/text-to-speech"; 
import { storage } from "../../../configs/FirebaseConfig";  // Firebase storage config
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { NextResponse } from "next/server";

// Initialize the Google Text-to-Speech client
const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  try {
    const { text, id } = await req.json();

    // Check if text is valid
    if (!text || text.trim() === '') {
      console.error("No text provided for synthesis or text is empty.");
      return NextResponse.json({ error: "No text provided for synthesis" }, { status: 400 });
    }

    const storageRef = ref(storage, 'zenstudio-files/' + id + '.mp3');

    console.log("Text received for synthesis:", text);
    console.log("ID received:", id);

    // Construct the text-to-speech request
    const request = {
      input: { text },
      voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    // Convert the audio content to a buffer and upload to Firebase Storage
    const audioBuffer = Buffer.from(response.audioContent, 'binary');
    await uploadBytes(storageRef, audioBuffer, { contentType: 'audio/mp3' });

    // Get the download URL for the uploaded audio file
    const downloadUrl = await getDownloadURL(storageRef);

    console.log('Audio content successfully uploaded. Download URL:', downloadUrl);

    // Return the download URL in the response
    return NextResponse.json({ Result: downloadUrl });
    
  } catch (error) {
    console.error("Error in text-to-speech synthesis or Firebase Storage:", error);
    return NextResponse.json({ error: "Failed to synthesize speech or upload audio" }, { status: 500 });
  }
}
