"use client";
import { RiAiGenerate2 } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { SiGoogledocs } from "react-icons/si";
import { GrGallery } from "react-icons/gr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useEffect, useState } from "react";

export function Project() {
  const [prompt, setPrompt] = useState<File | undefined>();
  const [prompt2, setPrompt2] = useState<string>();
  const [prompt3, setPrompt3] = useState<string>();
  const [ingredients, setIngredients] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File>();
  const [foodimage, setFoodimage] = useState("");
  const [pev, setPev] = useState("");
  const HandleonImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      const file = e.target.files[0];
      const filepev = URL.createObjectURL(file);
      setPev(filepev);
      setText(filepev);
      setPrompt(file);
    }
  };
  console.log({ prompt });

  const formData = new FormData();
  formData.append("file", prompt as File); // input type="file" сонгосон зураг

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
    <div className="flex w-[580px] h-fit max-w-sm flex-col gap-6 ml-100 mt-50">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="Image analysis">Image analysis</TabsTrigger>
          <TabsTrigger value="ingredient recognition">
            Ingredient recognition
          </TabsTrigger>
          <TabsTrigger value="Image creator">Image creator</TabsTrigger>
        </TabsList>
        <TabsContent value="Image analysis" className="w-[580px]">
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
              <Button
                className="w-[92px] ml-[450px]"
                onClick={() => generateText()}
              >
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
        </TabsContent>
        <TabsContent value="ingredient recognition" className="w-[580px]">
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
              ></Textarea>
              <Button
                className="w-[92px] ml-[450px]"
                onClick={extractIngredients}
              >
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
                      <p className="text-lg whitespace-pre-wrap">
                        {ingredients}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-fit w-fit"></div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Image creator" className="w-[580px]">
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
                value={prompt2}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Project;
