import { useState } from "react";
import { BtnBgShadow } from "../buttons/btn-bg-shadow";
import { CircleX } from "lucide-react";

interface ImageQueProps {
  image_path: string;
}

const ImageQue = ({ image_path }: ImageQueProps) => {
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);
  const handleImageMSEnter = () => {
    setIsImageHovered(true);
  };
  const handleImageMSLeave = () => {
    setIsImageHovered(false);
  };

  const image_name = "" + image_path;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* image */}
      <div className="relative flex flex-col items-center justify-center gap-1">
        <BtnBgShadow translate="6" />
        <div
          className="relative flex size-[110px] overflow-hidden bg-white"
          onMouseEnter={handleImageMSEnter}
          onMouseLeave={handleImageMSLeave}
        >
          <img
            src="/images/test-image.jpeg"
            alt=""
            className="w-full object-cover"
          />

          {isImageHovered ? (
            <>
              {/* Remove Image Button */}
              <div
                className="absolute top-0 right-0 flex size-7 cursor-pointer items-center justify-center rounded-full"
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
      <div className="w-[100px] text-ellipsis whitespace-nowrap overflow-hidden">
        {/* image name should be in test-im... .jpeg/.png/jpg */}
        <span className="">{image_name}</span>
      </div>
    </div>
  );
};

export default ImageQue;
