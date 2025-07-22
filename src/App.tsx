import { Image } from "lucide-react";
import { Button } from "./components/buttons/button";
import { CC } from "./command-center";

const App = () => {
  return (
    <div className="font-tenorite bg-background text-foreground h-screen w-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex h-[120px] w-full items-center justify-start p-6">
        <img src={CC.app_logo_path} alt="" width={90} />
        <div className="flex flex-col items-center">
          <span className="text-5xl">{CC.app_name_upper}</span>
          <span className="font-sans text-2xl font-bold">
            {CC.app_name_lower}
          </span>
        </div>
      </div>

      {/* Upload Image Button */}
      <div className="flex h-[calc(100%-60px)] w-full flex-col items-center justify-center">
        <Button
          className="flex items-center justify-center px-10 text-xl"
          btn_color="orange"
          placeholder="Upload Image"
          icon_comp={<Image className="w-[20px]" />}
        />
        <span className="text-secondary pt-1 font-sans text-sm">
          To start, upload image(s)
        </span>
      </div>


      <footer className="flex h-[20px] w-full text-secondary items-center justify-center">{CC.footer_info_author}</footer>
    </div>
  );
};

export default App;
