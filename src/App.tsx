import { Gpu, Upload } from "lucide-react";
import { Button } from "./components/buttons/button";
import { CC } from "./command-center";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import ImageQue from "./components/image-comp/image-que";
import { useState } from "react";

const App = () => {
  const [imagePreviewPath, setImagePreviewPath] = useState<string[] | null>();
  const [previewImgPath, setPreviewImgPath] = useState<string | null>();

  const handleAttachFile = async () => {
    try {
      const pathToImage = await open({
        multiple: true,
        directory: false,
      });
      console.log(pathToImage);

      if (pathToImage) {
        const imageUrl: string[] = [];
        // Convert the file path to a webview-compatible URL
        pathToImage.map((item) => {
          imageUrl.push(convertFileSrc(item));
        });

        setImagePreviewPath(imageUrl);
      }
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

  const handleProcessImage = () => {
    // Start Omniparser Annotations one by one on all the images (0, 30 -> Max limit)
  }

  return (
    <div className="font-tenorite bg-background text-foreground flex h-screen w-screen flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="flex h-[150px] w-full items-center justify-start">
        {/* Logo - App Name */}
        <div className="flex h-full w-[400px] items-center justify-center">
          <img src={CC.app_logo_path} alt="" width={140} />
          <div className="flex flex-col items-center">
            <span className="text-5xl">{CC.app_name_upper}</span>
            <span className="font-sans text-2xl font-bold">
              {CC.app_name_lower}
            </span>
          </div>
        </div>

        {/* Nav Items */}
        <div className="h-full w-[calc(100%-400px)]">
          {/* Route buttons */}
          <div className="flex h-1/2 w-full items-end justify-end pr-4 text-5xl">
            Hello, X
          </div>
          {/* Route buttons */}
          <div className="flex h-1/2 w-full items-end justify-end pr-4">
            <div className="flex h-full items-center gap-2">
              <Button placeholder="Image" />
              <Button placeholder="YamGen" />
              <Button placeholder="YAML" />
            </div>
          </div>
        </div>
      </nav>

      {/* Upload Image Button */}
      <div className="flex h-[calc(100%-60px)] w-full flex-col justify-center gap-6 p-4">
        {/* Preview - Image/Annotated | YamGen | generated YAML file */}
        <div className="flex h-[720px] justify-center">
          {previewImgPath ? (
            <img
              src={previewImgPath}
              alt=""
              className="w-full rounded-md object-contain"
            />
          ) : (
            <></>
          )}
        </div>
        {/* Upload  Image + Image Queue*/}
        <div className="flex flex-col gap-4">
          {/* Upload Image */}
          <div className="flex w-fit flex-col items-start justify-center">
            <div className="flex gap-4">
              <Button
                className="flex items-center justify-center px-10 text-xl"
                btn_color="orange"
                placeholder="Annotate"
                icon_comp={<Gpu className="w-[20px]" />}
                onClick={handleProcessImage}
              />
              <Button
                className="flex items-center justify-center px-10 text-xl"
                btn_color="blue"
                placeholder="Add Images"
                icon_comp={<Upload className="w-[20px]" />}
                onClick={handleAttachFile}
              />
            </div>
            <span className="text-secondary pt-1 font-sans text-sm">
              To start processing, hit <strong>Annotate</strong>.
            </span>
            {/* <span className="text-secondary pt-1 font-sans text-sm">
              To start, upload image(s)
            </span> */}
          </div>

          {/* Image queue */}
          <div className="relative flex gap-6">
            {imagePreviewPath?.map((image_path, index) => (
              <ImageQue
                setPreviewImgPath={setPreviewImgPath}
                image_path={image_path}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="text-secondary flex h-[20px] w-full items-center justify-center">
        {CC.footer_info_author}
      </footer>
    </div>
  );
};

export default App;
