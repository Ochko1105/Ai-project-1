import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
export async function GET(req: NextRequest) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });

  return NextResponse.json({
    text: response.text,
  });
}
export async function POST(req: NextRequest) {
  const { text } = await req.json();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: text,
  });

  return NextResponse.json({
    text: response.text,
  });
}
