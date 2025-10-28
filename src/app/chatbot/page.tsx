"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

const page = () => {
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

  useEffect(() => {
    // getText();
  }, []);
  return (
    <div>
      <Input
        type="text"
        className="border w-70 border-black mt-20 ml-10"
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={HandleOnPost}>Messageiig ilgeeh</Button>
      <div className="text-4xl mt-30 ml-20 ">{resdata}</div>
    </div>
  );
};

export default page;
