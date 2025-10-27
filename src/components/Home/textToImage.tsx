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
import { GrGallery } from "react-icons/gr";
const TextToImage = () => {
  const [prompt3, setPrompt3] = useState<string>();

  const [loading, setLoading] = useState(false);
  const [foodimage, setFoodimage] = useState("");
  const MakeFoodImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFoodimage("");

    try {
      const response = await fetch("/api/text-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt3 }),
      });

      const data = await response.json();

      if (data.image) {
        setFoodimage(data.image);
      } else {
        alert("Failed to generate image");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate image");
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
            <div>Food image creator</div>
          </div>
        </CardTitle>
        <CardDescription>
          What food image do you want? Describe it briefly.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Textarea
          placeholder="Hoolnii tailbar"
          value={prompt3}
          onChange={(e) => setPrompt3(e.target.value)}
        ></Textarea>
        <Button className="w-[92px] ml-[450px]" onClick={MakeFoodImage}>
          Generate
        </Button>
        <div className="flex flex-col">
          <div className="text-[20px] font-semibold flex gap-2 items-center">
            <GrGallery />
            Result
          </div>
          <div className="text-[#71717A] mt-3">
            First, enter your text to generate an image.
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-fit w-fit border-2">
          {foodimage && (
            <div className="mt-8 w-full max-w-2xl">
              <img
                src={foodimage}
                alt="Generated"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TextToImage;
