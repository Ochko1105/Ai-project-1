"use client";
import React, { ChangeEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RiAiGenerate2 } from "react-icons/ri";

import { Button } from "../ui/button";
import { SiGoogledocs } from "react-icons/si";
import { Textarea } from "../ui/textarea";
const TextToText = () => {
  const [loading, setLoading] = useState(false);
  const [prompt2, setPrompt2] = useState<string>();
  const [ingredients, setIngredients] = useState("");
  const extractIngredients = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIngredients("");

    try {
      const response = await fetch("/api/text-to-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt2 }),
      });

      const data = await response.json();

      if (data.text) {
        setIngredients(data.text);
      } else {
        alert("Failed to extract ingredients");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to extract ingredients");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex gap-2 text-xl items-center">
            <RiAiGenerate2 />
            <div> Ingredient recognition</div>
          </div>
        </CardTitle>
        <CardDescription>
          Describe the food, and AI will detect the ingredients.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Textarea
          placeholder="Orts todorhoiloh"
          value={prompt2}
          onChange={(e) => setPrompt2(e.target.value)}
        />
        <Button className="w-[92px] ml-[450px]" onClick={extractIngredients}>
          Generate
        </Button>
        <div className="flex flex-col">
          <div className="text-[20px] font-semibold flex gap-2 items-center">
            <SiGoogledocs /> itedify ingredients
          </div>

          {ingredients && (
            <div className="mt-8 w-full max-w-2xl">
              <h2 className="text-2xl font-semibold mb-4">
                Extracted Ingredients:
              </h2>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <p className="text-lg whitespace-pre-wrap">{ingredients}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-fit w-fit"></div>
      </CardFooter>
    </Card>
  );
};

export default TextToText;
