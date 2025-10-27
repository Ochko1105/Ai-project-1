import { InferenceClient } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

const hf = new InferenceClient(process.env.HF_TOKEN);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    console.log({ file });

    const bytes = await file.arrayBuffer();
    console.log({ bytes });
    const result = await hf.imageToText({
      model: "Salesforce/blip-image-captioning-base",

      data: bytes,
      parameters: {
        prompt:
          "Analyze the food items visible in this image and list the ingredients by category.",
      },
    });

    return NextResponse.json({ text: result.generated_text });
  } catch (error) {
    console.error("Error generating caption:", error);
    return NextResponse.json(
      { error: "Failed to generate caption" },
      { status: 500 }
    );
  }
}
