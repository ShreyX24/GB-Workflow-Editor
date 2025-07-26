import { Gpu } from "lucide-react";
import { Button } from "./components/buttons/button";
import { CC } from "./command-center";
import { open } from "@tauri-apps/plugin-dialog";
import ImageQue from "./components/image-comp/image-que";
import { useState } from "react";

const App = () => {
  const [imagePreviewPath, setImagePreviewPath] = useState();
  const handleAttachFile = async () => {
    try {
      const fileToImage = await open({
        multiple: false,
        directory: false,
      });
      console.log(fileToImage);
      setImagePreviewPath(fileToImage);
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

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
          <img
            src="/images/test-image.jpeg"
            alt=""
            className="object-fit rounded-md"
          />
        </div>
        {/* Upload  Image + Image Queue*/}
        <div className="flex flex-col gap-4">
          {/* Upload Image */}
          <div className="flex w-fit flex-col items-start justify-center">
            <Button
              className="flex items-center justify-center px-10 text-xl"
              btn_color="orange"
              placeholder="Annotate"
              icon_comp={<Gpu className="w-[20px]" />}
              onClick={handleAttachFile}
            />
            <span className="text-secondary pt-1 font-sans text-sm">
              To start processing, hit <strong>Annotate</strong>.
            </span>
            {/* <span className="text-secondary pt-1 font-sans text-sm">
              To start, upload image(s)
            </span> */}
          </div>

          {/* Image queue */}
          <div className="relative flex gap-6">
            <ImageQue image_path="test-image-path.exe" />
            <ImageQue image_path="test-image-path.exe" />
            <ImageQue image_path="test-image-path.exe" />
            <ImageQue image_path="test-image-path.exe" />
            <ImageQue image_path="test-image-path.exe" />
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
