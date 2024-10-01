import textToSpeech from "@google-cloud/text-to-speech"; 
import { storage } from "../../../configs/FirebaseConfig"; // Import storage
import { getDownloadURL, uploadBytes, ref, getStorage } from "firebase/storage";
import { NextResponse } from "next/server";
const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  const { text, id } = await req.json();

  const storageRef=ref(storage,'zenstudio-files/'+id+'.mp3');

  

  console.log("Text received for synthesis:", text);
  console.log("ID received:", id);

  // Check if text is valid
  if (!text || text.trim() === '') {
    console.error("No text provided for synthesis or text is empty.");
    return NextResponse.json({ error: "No text provided for synthesis" });
  }

  // Construct the request
  const request = {
    input: { text: text },
    voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    // // Write the binary audio content to a local file
    // const writeFile = util.promisify(fs.writeFile);
    // await writeFile(`output_${id}.mp3`, response.audioContent, 'binary');

    const audioBuffer=Buffer.from(response.audioContent,'binary');

    await uploadBytes(storageRef,audioBuffer,{contentType:'audio/mp3'});
    
    const downloadUrl=await getDownloadURL(storageRef);

    console.log('Audio content written to file:', `output_${id}.mp3`);
    console.log(downloadUrl);

    return NextResponse.json({ Result: downloadUrl });
  } catch (error) {
    console.error("Error in text-to-speech synthesis:", error);
    return NextResponse.json({ error: "Failed to synthesize speech" });
  }
}
