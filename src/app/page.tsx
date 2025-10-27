import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ImageToText from "@/components/Home/imageToText";

import TextToImage from "@/components/Home/textToImage";
import TextToText from "@/components/Home/TextToText";

export function Project() {
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
