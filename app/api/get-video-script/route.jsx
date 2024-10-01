import { chatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();  // Parse the incoming request body
    console.log(prompt);

    // Send the prompt to the AI model (assumed `chatSession` usage here)
    const result = await chatSession.sendMessage(prompt);

    // Wait for the text response and parse it
    const textResponse = await result.response.text();
    console.log(textResponse);

    // Return the JSON-parsed result
    return NextResponse.json({ result: JSON.parse(textResponse) });
    
  } catch (e) {
    console.error('Error generating video script:', e); // Log error for debugging
    return NextResponse.json({ error: e.message }, { status: 500 });  // Return an error response with 500 status
  }
}
