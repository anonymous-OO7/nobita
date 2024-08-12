import { useState } from "react";
import useToast from "./useToast";

const usePreviewImg = () => {
  const { showToast } = useToast();

  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>(null);

  /* eslint-disable-next-line */
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImgUrl(reader?.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast("Please select an image file!!", { type: "error" });

      setImgUrl(null);
    }
  };
  return { handleImageChange, imgUrl, setImgUrl };
};

export default usePreviewImg;
