import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define Message Type
interface Message {
    role: 'user' | 'assistant';
    content: string;
}

// Ensure correct runtime
export const runtime = 'nodejs';

// Initialize Google Generative AI
const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ Missing GOOGLE_GEMINI_API_KEY in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || '');

export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const { messages }: { messages: Message[] } = await req.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Invalid request: No messages provided.");
        }

        // Ensure the first message is from the user
        if (messages[0].role !== 'user') {
            throw new Error("First message must be from the user.");
        }

        // Format messages for Google Gemini API
        const formattedMessages = messages.map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Initialize the Gemini model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Create a chat session
        const chat = model.startChat({
            history: formattedMessages.slice(0, -1),
            generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 1024,
            },
        });

        // Get the last message (must be user input)
        const lastMessage = messages[messages.length - 1].content;

        console.log("🟢 Sending user message:", lastMessage);

        // Generate response
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;

        if (!response || !response.candidates || response.candidates.length === 0) {
            throw new Error("No valid response from Gemini API.");
        }

        // Extract AI response text while handling potential undefined values
        const aiResponseText = response.candidates[0]?.content?.parts
            ?.map((part) => ('text' in part && typeof part.text === 'string' ? part.text : ''))
            .join(' ') || "I'm sorry, I couldn't generate a response.";

        console.log("🤖 AI Response:", aiResponseText);

        return NextResponse.json({ response: aiResponseText });

    } catch (error) {
        console.error("❌ Chat API Error:", error);

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to process your request" },
            { status: 500 }
        );
    }
}
