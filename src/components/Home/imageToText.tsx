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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SiGoogledocs } from "react-icons/si";

const ImageToText = () => {
  const [prompt, setPrompt] = useState<File | undefined>();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [pev, setPev] = useState("");
  const formData = new FormData();
  formData.append("file", prompt as File); // input type="file" сонгосон зураг

  const HandleonImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const filepev = URL.createObjectURL(file);
      setPev(filepev);
      setPrompt(file);
    }
  };
  const generateText = async () => {
    // HandleonImage();
    setLoading(true);
    setText("");
    console.log({ prompt });

    try {
      const response = await fetch("/api/imagetotext", {
        method: "POST",

        body: formData,
      });

      const data = await response.json();

      if (data.text) {
        setText(data.text);
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
            <div> Image analysis</div>
          </div>
        </CardTitle>
        <CardDescription>
          Upload a food photo, and AI will detect the ingredients.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-3">
          <Input
            type="File"
            placeholder="JPG,PNG"
            onChange={(e) => HandleonImage(e)}
            //   onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <div>{pev && <img src={pev}></img>}</div>
        <Button className="w-[92px] ml-[450px]" onClick={() => generateText()}>
          Generate
        </Button>
        <div className="flex flex-col">
          <div className="text-[20px] font-semibold flex gap-2 items-center">
            <SiGoogledocs /> Here is the summary
          </div>
          <div className="text-[#71717A] mt-3">
            First, enter your image to recognize an ingredients.
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-fit w-fit">{text && <div>{text}</div>}</div>
      </CardFooter>
    </Card>
  );
};

export default ImageToText;
