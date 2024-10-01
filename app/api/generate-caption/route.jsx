import { AssemblyAI } from 'assemblyai';
import { NextResponse } from 'next/server';

// Initialize the AssemblyAI client once
const client = new AssemblyAI({
  apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
});

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();

    if (!audioFileUrl) {
      console.error('No audio file URL provided');
      return NextResponse.json({ error: 'No audio file URL provided' }, { status: 400 });
    }

    const config = {
      audio_url: audioFileUrl,
    };

    // Transcribe the audio using AssemblyAI
    const transcript = await client.transcripts.transcribe(config);

    // Check if the transcription was successful and contains words
    if (transcript?.words) {
      console.log('Transcription words:', transcript.words);

      // Return the transcription words with a key 'result'
      return NextResponse.json({ result: transcript.words });
    } else {
      console.error('Transcription failed, no words found');
      return NextResponse.json({ error: 'Transcription failed, no words found' }, { status: 422 });
    }
  } catch (e) {
    // Log the error for debugging purposes
    console.error('Error in transcription:', e.message || e);

    // Return a more descriptive error with a status code
    return NextResponse.json({ error: e.message || 'An error occurred during transcription' }, { status: 500 });
  }
}
