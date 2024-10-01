/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

  export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "write a script to generate 30 seconds video on topic: Interesting Historical Story along with a detailed AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and contentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "## 30-Second Historical Story Script (JSON Format)\n\n```json\n[\n  {\n    \"imagePrompt\": \"A bustling medieval marketplace, crowded with people buying and selling goods. The sun shines brightly, casting long shadows. In the background, a towering cathedral.\",\n    \"contentText\": \"In the heart of medieval Europe, a bustling marketplace thrived. Merchants hawked their wares, the air filled with the clamor of bartering and the aroma of spices and fresh bread.\"\n  },\n  {\n    \"imagePrompt\": \"A young woman, dressed in simple clothes, stands in the marketplace, looking around with a mixture of excitement and apprehension.\",\n    \"contentText\": \"Amidst the throng, a young woman named Anya, her eyes wide with wonder, searched for a specific stall.\"\n  },\n  {\n    \"imagePrompt\": \"A close-up of a small, worn wooden sign that reads 'The Traveling Alchemist'.\",\n    \"contentText\": \"She finally found it - a small, unassuming stall with a sign reading 'The Traveling Alchemist'.\"\n  },\n  {\n    \"imagePrompt\": \"An old man, with a long white beard and twinkling eyes, sits behind the stall, surrounded by strange and intriguing objects. He smiles kindly at Anya.\",\n    \"contentText\": \"Behind the stall sat an old man with a long white beard, his eyes twinkling with wisdom. He greeted Anya with a warm smile.\"\n  },\n  {\n    \"imagePrompt\": \"Anya handing a small pouch of coins to the Alchemist, he in turn handing her a small glass vial filled with a shimmering liquid.\",\n    \"contentText\": \"Anya, nervous yet determined, handed him a pouch of coins. In return, the Alchemist placed a small vial filled with a shimmering liquid into her palm.\"\n  },\n  {\n    \"imagePrompt\": \"Anya walking away from the stall, clutching the vial tightly. The sunlight glints off the liquid inside.\",\n    \"contentText\": \"With a quick nod of thanks, Anya slipped away, clutching the vial tightly. The sunlight danced on the liquid inside, promising something extraordinary.\"\n  },\n  {\n    \"imagePrompt\": \"A panoramic view of the city at sunset. The sky is ablaze with fiery colors, casting an ethereal glow over the buildings.\",\n    \"contentText\": \"As the sun dipped below the horizon, Anya stood on a hill overlooking the city. The fiery sky reflected the promise held within the vial - a promise of adventure, magic, and a life forever changed.\"\n  }\n]\n```\n\n**Notes:**\n\n* This script provides a basic outline for a 30-second video. You can adjust the timings and content to fit your needs.\n* The image prompts are written for realistic AI image generation. You can adjust the details and specific prompts to your preference.\n* This script is a starting point, and you can add more scenes, characters, and details to enrich your story. \n* Remember to use high-quality AI image generators for the best results.\n\nBy combining these elements, you can create a visually stunning and captivating 30-second video about a fascinating historical story. \n"},
          ],
        },
      ],
    });
  
