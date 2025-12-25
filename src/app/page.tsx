"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ImageToText from "@/components/Home/imageToText";

import TextToImage from "@/components/Home/textToImage";
import TextToText from "@/components/Home/TextToText";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Project() {
  const [text, setText] = useState("");
  const [resdata, setResdata] = useState("");
  // const getText = async () => {
  //   const result = await fetch("/api/chatbot");
  //   const responseData = await result.json();
  //   const { text } = responseData;
  //   setText(text);
  // };
  const HandleOnPost = async () => {
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    console.log({ response });
    const data = await response.json();
    console.log({ data });
    setResdata(data.text);
  };
  return (
    <div className="flex w-[580px] h-fit max-w-sm flex-col gap-6 ml-100 mt-50">
      <Tabs defaultValue="account">
        <TabsList>
          {/* TAB TRIGER */}
          <TabsTrigger value="Image analysis">Image analysis</TabsTrigger>
          {/* TAB TRIGER */}
          <TabsTrigger value="ingredient recognition">
            Ingredient recognition
          </TabsTrigger>
          {/* TAB TRIGER */}
          <TabsTrigger value="Image creator">Image creator</TabsTrigger>
        </TabsList>

        <TabsContent value="Image analysis" className="w-[580px]">
          {/* TAB CONTENT */}
          <ImageToText />
        </TabsContent>
        <TabsContent value="ingredient recognition" className="w-[580px]">
          {/* TAB CONTENT */}
          <TextToText />
        </TabsContent>
        <TabsContent value="Image creator" className="w-[580px]">
          {/* TAB CONTENT */}
          <TextToImage />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Project;
