import { useState } from "react";
import { BtnBgShadow } from "../buttons/btn-bg-shadow";
import { Trash } from "lucide-react";

interface ImageQueProps {
  image_path: string | undefined | null;
  setPreviewImgPath: React.Dispatch<
    React.SetStateAction<string | undefined | null>
  >;
  onRemove?: () => void; // New prop for remove functionality
}

const ImageQue = ({
  image_path,
  setPreviewImgPath,
  onRemove,
}: ImageQueProps) => {
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);

  // Mouse hover over actions in image ques
  const handleImageMSEnter = () => {
    setIsImageHovered(true);
  };
  const handleImageMSLeave = () => {
    setIsImageHovered(false);
  };

  // Handle image click to set preview
  const handleImageClick = () => {
    console.log("Image Path in image_que: " + image_path);
    setPreviewImgPath(image_path);
  };

  // Handle remove image
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    if (onRemove) {
      onRemove();
    }
  };

  // Extract filename from path for display
  const getImageName = () => {
    if (!image_path) return "";

    // Extract filename from file path or URL
    const parts = image_path.split("/");
    const filename = parts[parts.length - 1];

    // Remove any query parameters or URL fragments
    const cleanFilename = filename.split("?")[0].split("#")[0];

    return cleanFilename || "Unknown";
  };

  const image_name = getImageName();

  return (
    <div
      className="flex flex-col items-center justify-center gap-2"
      onClick={handleImageClick} // sets the image in que to display in the preview window
    >
      {/* image */}
      <div className="relative flex flex-col items-center justify-center gap-1">
        <BtnBgShadow translate="4" />
        <div
          className="relative flex size-[110px] cursor-pointer overflow-hidden transition-opacity hover:opacity-90 border-[3px] border-black"
          onMouseEnter={handleImageMSEnter}
          onMouseLeave={handleImageMSLeave}
        >
          {image_path ? (
            <img
              src={image_path}
              alt={image_name}
              className="w-full object-cover select-none "
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
              No Image
            </div>
          )}

          {isImageHovered && (
            <>
              {/* Remove Image Button */}
              <div
                className="absolute top-1 right-1 flex size-6 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600"
                onMouseEnter={handleImageMSEnter}
                onClick={handleRemoveImage}
                title="Remove image"
              >
                <Trash className="h-4 w-4" />
              </div>

              {/* Select Image Button */}
              <div
                className="absolute bottom-1 left-1 flex size-6 items-center justify-center rounded-full bg-blue-500 transition-colors hover:bg-blue-600"
                onMouseEnter={handleImageMSEnter}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onClick
                  // select the image in que - you can implement multi-select logic here
                  console.log("Select image clicked");
                }}
                title="Select image"
              >
                <input
                  type="checkbox"
                  className="size-3 cursor-pointer accent-white"
                  onChange={(e) => {
                    e.stopPropagation();
                    // Handle checkbox change
                    console.log("Checkbox changed:", e.target.checked);
                  }}
                />
              </div>

              {/* Image info overlay */}
              {/* <div className="bg-opacity-20 pointer-events-none absolute inset-0 flex items-center justify-center bg-black">
                <div className="bg-opacity-60 rounded bg-black px-2 py-1 text-xs text-white">
                  Click to preview
                </div>
              </div> */}
            </>
          )}
        </div>
      </div>

      {/* image name */}
      <div className="w-[100px] overflow-hidden text-center text-ellipsis whitespace-nowrap">
        <span className="text-xs" title={image_name}>
          {image_name}
        </span>
      </div>
    </div>
  );
};

export default ImageQue;
