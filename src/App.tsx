import { Gpu, Upload } from "lucide-react";
import { Button } from "./components/buttons/button";
import { CC } from "./command-center";
import { open } from "@tauri-apps/plugin-dialog";
import { convertFileSrc } from "@tauri-apps/api/core";
import { load } from "@tauri-apps/plugin-store";
import ImageQue from "./components/image-comp/image-que";
import { useState, useEffect } from "react";

const App = () => {
  const [imagePreviewPath, setImagePreviewPath] = useState<string[] | null>();
  const [previewImgPath, setPreviewImgPath] = useState<string | null>();
  const [store, setStore] = useState<any>(null);

  // Initialize store and load cached data
  useEffect(() => {
    const initStore = async () => {
      try {
        const storeInstance = await load("workflow-editor-store.json", {
          autoSave: true, // Auto-save changes after 100ms delay
        });
        setStore(storeInstance);

        // Load cached image paths
        const cachedImages =
          await storeInstance.get<string[]>("imagePreviewPath");
        if (cachedImages && Array.isArray(cachedImages)) {
          console.log("Loaded cached images:", cachedImages);
          setImagePreviewPath(cachedImages);
        }

        // Load cached preview image
        const cachedPreview = await storeInstance.get<string>("previewImgPath");
        if (cachedPreview) {
          console.log("Loaded cached preview:", cachedPreview);
          setPreviewImgPath(cachedPreview);
        }
      } catch (error) {
        console.error("Failed to initialize store:", error);
      }
    };

    initStore();
  }, []);

  // Save imagePreviewPath to store whenever it changes
  useEffect(() => {
    const saveImagePaths = async () => {
      if (store && imagePreviewPath !== undefined) {
        try {
          await store.set("imagePreviewPath", imagePreviewPath);
          console.log("Saved image paths to store:", imagePreviewPath);
        } catch (error) {
          console.error("Failed to save image paths:", error);
        }
      }
    };

    saveImagePaths();
  }, [imagePreviewPath, store]);

  // Save previewImgPath to store whenever it changes
  useEffect(() => {
    const savePreviewPath = async () => {
      if (store && previewImgPath !== undefined) {
        try {
          await store.set("previewImgPath", previewImgPath);
          console.log("Saved preview path to store:", previewImgPath);
        } catch (error) {
          console.error("Failed to save preview path:", error);
        }
      }
    };

    savePreviewPath();
  }, [previewImgPath, store]);

  const handleAttachFile = async () => {
    try {
      const pathToImage = await open({
        multiple: true,
        directory: false,
        filters: [
          {
            name: "Images",
            extensions: ["png", "jpg", "jpeg", "gif", "bmp", "webp"],
          },
        ],
      });
      console.log(pathToImage);

      if (pathToImage) {
        const imageUrl: string[] = [];
        // Convert the file path to a webview-compatible URL
        pathToImage.map((item) => {
          imageUrl.push(convertFileSrc(item));
        });

        // Combine with existing images (if any)
        setImagePreviewPath((prev) => {
          const existing = prev || [];
          const combined = [...existing, ...imageUrl];
          // Remove duplicates
          return Array.from(new Set(combined));
        });
      }
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

  const handleProcessImage = () => {
    // Start Omniparser Annotations one by one on all the images (0, 30 -> Max limit)
    console.log("Processing images:", imagePreviewPath);
  };

  // Clear Cache for saved images
  // const handleClearCache = async () => {
  //   try {
  //     if (store) {
  //       await store.clear();
  //       setImagePreviewPath(null);
  //       setPreviewImgPath(null);
  //       console.log("Cache cleared successfully");
  //     }
  //   } catch (error) {
  //     console.error("Failed to clear cache:", error);
  //   }
  // };

  const handleRemoveImage = (imageToRemove: string) => {
    setImagePreviewPath((prev) => {
      if (!prev) return prev;
      const filtered = prev.filter((img) => img !== imageToRemove);
      return filtered.length > 0 ? filtered : null;
    });

    // If the removed image was the preview, clear the preview
    if (previewImgPath === imageToRemove) {
      setPreviewImgPath(null);
    }
  };

  return (
    <div className="font-tenorite bg-background text-foreground flex h-screen w-screen flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="flex h-[150px] w-full items-center justify-start">
        {/* Logo - App Name */}
        <div className="flex h-full w-[400px] items-center justify-center">
          <img src={CC.app_logo_path} alt="" width={95} />
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
      <div className="flex max-h-[calc(100%-170px)] w-full flex-col justify-center gap-6 p-4">
        {/* Preview - Image/Annotated | YamGen | generated YAML file */}
        <div className="flex h-[calc(100%-260px)] w-full items-center justify-center border border-white">
          {previewImgPath ? (
            <img
              src={previewImgPath}
              alt=""
              className="h-full w-full rounded-md object-contain"
            />
          ) : (
            <div className="flex items-center justify-center text-gray-500 md:h-[720px] xl:h-[820px]">
              {imagePreviewPath && imagePreviewPath.length > 0
                ? "Click on an image below to preview"
                : "No images loaded"}
            </div>
          )}
        </div>

        {/* Upload Image + Image Queue*/}
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
                disabled={!imagePreviewPath || imagePreviewPath.length === 0}
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
              {imagePreviewPath && imagePreviewPath.length > 0 && (
                <span className="ml-2 text-green-600">
                  ({imagePreviewPath.length} image
                  {imagePreviewPath.length !== 1 ? "s" : ""} loaded)
                </span>
              )}
            </span>
          </div>

          {/* Image queue */}
          <div className="relative flex flex-wrap gap-6">
            {imagePreviewPath?.map((image_path, index) => (
              <ImageQue
                setPreviewImgPath={setPreviewImgPath}
                image_path={image_path}
                key={`${image_path}-${index}`}
                onRemove={() => handleRemoveImage(image_path)}
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
