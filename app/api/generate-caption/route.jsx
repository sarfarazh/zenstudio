import { AssemblyAI } from 'assemblyai';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json();

    const client = new AssemblyAI({
      apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_API_KEY,
    });

    const config = {
      audio_url: audioFileUrl,
    };

    // Transcribe the audio
    const transcript = await client.transcripts.transcribe(config);

    // Check if transcript and words are present
    if (transcript && transcript.words) {
      console.log('Transcription words:', transcript.words);

      // Return the transcription words with a key 'result'
      return NextResponse.json({ result: transcript.words });
    } else {
      console.error('Transcription failed, no words found');
      return NextResponse.json({ error: 'Transcription failed, no words found' });
    }
  } catch (e) {
    // Log the error for debugging purposes
    console.error('Error in transcription:', e.message || e);

    // Return a more descriptive error
    return NextResponse.json({ error: e.message || 'An error occurred during transcription' });
  }
}
