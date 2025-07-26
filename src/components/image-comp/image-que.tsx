import { useEffect, useState } from "react";
import { BtnBgShadow } from "../buttons/btn-bg-shadow";
import { CircleX } from "lucide-react";

interface ImageQueProps {
  image_path: string | undefined | null;
  setPreviewImgPath: React.Dispatch<
    React.SetStateAction<string | undefined | null>
  >;
}

const ImageQue = ({ image_path, setPreviewImgPath }: ImageQueProps) => {
  const [isImageInQueClicked, setIsImageInQueClicked] = useState<boolean>();
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false); // sets the image in que to display in the preview window

  // Mouse hover over actions in image ques
  const handleImageMSEnter = () => {
    setIsImageHovered(true);
  };
  const handleImageMSLeave = () => {
    setIsImageHovered(false);
  };

  useEffect(() => {
    if (isImageInQueClicked) {
      console.log("Image Path in image_que: " + image_path)
      setPreviewImgPath(image_path);
    }
  }, [isImageInQueClicked, image_path, setPreviewImgPath]);

  // To set the file name with extension : test.jpg
  const image_name = "" + image_path;

  return (
    <div
      className="flex flex-col items-center justify-center gap-2"
      onClick={() => setIsImageInQueClicked(true)} // sets the image in que to display in the preview window
    >
      {/* image */}
      <div className="relative flex flex-col items-center justify-center gap-1">
        <BtnBgShadow translate="6" />
        <div
          className="relative flex size-[110px] overflow-hidden bg-white"
          onMouseEnter={handleImageMSEnter}
          onMouseLeave={handleImageMSLeave}
        >
          {image_path ? (
            <img src={image_path} alt="" className="w-full object-cover select-none" />
          ) : (
            <></>
          )}

          {isImageHovered ? (
            <>
              {/* Remove Image Button */}
              <div
                className="absolute top-0 right-0 flex size-7 cursor-pointer items-center justify-center rounded-full bg-black"
                onMouseEnter={handleImageMSEnter}
                onClick={() => {
                  // Remove the image from que
                }}
              >
                <CircleX />
              </div>

              {/* Select Image Button */}
              <div
                className="absolute bottom-0 left-0 flex size-7 items-center justify-center rounded-full"
                onMouseEnter={handleImageMSEnter}
                onClick={() => {
                  // select the image in que
                }}
              >
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="bg-tertiary size-4"
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* image name */}
      <div className="w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
        {/* image name should be in test-im... .jpeg/.png/jpg */}
        <span className="">{image_name}</span>
      </div>
    </div>
  );
};

export default ImageQue;
