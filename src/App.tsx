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

  // Helper to check if we have images
  const hasImages = imagePreviewPath && imagePreviewPath.length > 0;

  // Initialize store and load cached data
  useEffect(() => {
    const initStore = async () => {
      try {
        const storeInstance = await load("workflow-editor-store.json", {
          autoSave: true,
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
        pathToImage.map((item) => {
          imageUrl.push(convertFileSrc(item));
        });

        setImagePreviewPath((prev) => {
          const existing = prev || [];
          const combined = [...existing, ...imageUrl];
          return Array.from(new Set(combined));
        });
      }
    } catch (error) {
      console.error("Error selecting file:", error);
    }
  };

  const handleProcessImage = () => {
    console.log("Processing images:", imagePreviewPath);
  };

  const handleRemoveImage = (imageToRemove: string) => {
    setImagePreviewPath((prev) => {
      if (!prev) return prev;
      const filtered = prev.filter((img) => img !== imageToRemove);
      return filtered.length > 0 ? filtered : null;
    });

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
          <div className="flex h-1/2 w-full items-end justify-end pr-4 text-5xl">
            Hello, X
          </div>
          <div className="flex h-1/2 w-full items-end justify-end pr-4">
            <div className="flex h-full items-center gap-2">
              <Button placeholder="Image" />
              <Button placeholder="YamGen" />
              <Button placeholder="YAML" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative flex max-h-[calc(100%-170px)] w-full flex-col p-4">
        {/* Preview Area - Only show when there's a preview image */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            previewImgPath
              ? "mb-6 h-[calc(100%-260px)] opacity-100"
              : "mb-0 h-0 opacity-0"
          } overflow-hidden`}
        >
          {previewImgPath && (
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={previewImgPath}
                alt=""
                className="h-full w-full rounded-md object-contain"
              />
            </div>
          )}
        </div>

        {/* Button and Queue Container */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            hasImages
              ? "flex flex-col gap-4"
              : "flex flex-1 items-center justify-center"
          }`}
        >
          {/* Buttons Container */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              hasImages
                ? "flex w-fit flex-col items-start justify-center"
                : "flex flex-col items-center justify-center"
            }`}
          >
            {/* Buttons Row */}
            <div className="flex items-center gap-4">
              {/* Annotate Button - Only show when images exist */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  hasImages && previewImgPath
                    ? "translate-x-0 scale-100 opacity-100"
                    : "-translate-x-4 scale-0 opacity-0"
                }`}
              >
                <Button
                  className="flex items-center justify-center px-10 text-xl"
                  btn_color="orange"
                  placeholder="Annotate"
                  icon_comp={<Gpu className="w-[20px]" />}
                  onClick={handleProcessImage}
                  disabled={!hasImages}
                />
              </div>

              {/* Add Images Button */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  hasImages
                    ? "translate-y-0 transform"
                    : "translate-y-0 scale-110 transform"
                }`}
              >
                <Button
                  className="flex items-center justify-center px-10 text-xl"
                  btn_color="blue"
                  placeholder="Add Images"
                  icon_comp={<Upload className="w-[20px]" />}
                  onClick={handleAttachFile}
                />
              </div>
            </div>

            {/* Instructions Text */}
            <div
              className={`transition-all duration-500 ease-in-out ${
                hasImages
                  ? "mt-2 translate-y-0 opacity-100"
                  : "mt-8 translate-y-4 text-center opacity-100"
              }`}
            >
              <span className="text-secondary pt-1 font-sans text-sm">
                {hasImages ? (
                  <>
                    To start processing, hit <strong>Annotate</strong>.
                    <span className="ml-2 text-green-600">
                      ({imagePreviewPath!.length} image
                      {imagePreviewPath!.length !== 1 ? "s" : ""} loaded)
                    </span>
                  </>
                ) : (
                  <>
                    Welcome! Start by uploading your workflow images.
                    <br />
                    <span className="text-xs opacity-75">
                      Supports PNG, JPG, JPEG, GIF, BMP, and WebP formats
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Image Queue - Only show when images exist */}
          <div
            className={`transition-all duration-700 ease-in-out ${
              hasImages
                ? "max-h-96 translate-y-0 opacity-100"
                : "max-h-0 translate-y-8 opacity-0"
            } overflow-hidden`}
          >
            <div className="relative flex flex-wrap gap-6">
              {imagePreviewPath?.map((image_path, index) => (
                <div
                  key={`${image_path}-${index}`}
                  className="animate-in slide-in-from-bottom-4 duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <ImageQue
                    setPreviewImgPath={setPreviewImgPath}
                    image_path={image_path}
                    onRemove={() => handleRemoveImage(image_path)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="text-secondary flex h-[20px] w-full items-center justify-center">
        {CC.footer_info_author}
      </footer>

      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: slideInFromBottom 0.3s ease-out forwards;
        }
        
        .slide-in-from-bottom-4 {
          transform: translateY(16px);
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default App;
