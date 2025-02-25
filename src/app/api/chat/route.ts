import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define the expected message structure
interface Message {
    role: 'user' | 'assistant';
    content: string;
}

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        // Get messages from request
        const { messages }: { messages: Message[] } = await req.json();

        // Format conversation history for Gemini
        const formattedMessages = messages.map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Initialize the Gemini model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Create a chat session
        const chat = model.startChat({
            history: formattedMessages.slice(0, -1), // Send previous messages except the last one
            generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 1024,
            },
        });

        // Get the last message from the user
        const lastMessage = messages[messages.length - 1].content;

        // Generate a response
        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        const text = response?.candidates?.[0]?.content || "I'm sorry, I couldn't generate a response.";

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json(
            { error: "Failed to process your request" },
            { status: 500 }
        );
    }
}
