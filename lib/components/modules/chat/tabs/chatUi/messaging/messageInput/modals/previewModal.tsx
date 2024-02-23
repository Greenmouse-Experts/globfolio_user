import React, { FC, useState } from "react";
import Image from "next/image";
import { RiSendPlane2Fill } from "react-icons/ri";

interface Props {
  image: string;
  proceed: (item: string) => void;
  close: () => void;
  file: boolean
}
const PreviewModal: FC<Props> = ({ image, proceed, close, file }) => {
  const [photoMessage, setPhotoMessage] = useState("");
  const handleProceed = () => {
    proceed(photoMessage);
    close();
  };
  return (
    <div>
      <div className="w-full">
        {!file ? (
          <Image
            src={image}
            alt="image"
            width={500}
            height={500}
            className="w-10/12 mx-auto"
          />
        ) : (
          <Image
            src={
              "https://res.cloudinary.com/greenmouse-tech/image/upload/v1693837622/globfolio/file-removebg-preview_stj9w1.png"
            }
            alt="image"
            width={500}
            height={500}
            className="w-6/12 mx-auto"
          />
        )}
      </div>
      <div className="w-full mt-4 rounded-[8px] flex justify-end shadow-lg p-2">
        <input
          type="text"
          value={photoMessage}
          onChange={(e) => setPhotoMessage(e.target.value)}
          placeholder="Enter Your Message..."
          className="w-full outline-none"
        />
        <RiSendPlane2Fill
          className="text-2xl text-primary"
          onClick={handleProceed}
        />
      </div>
    </div>
  );
};

export default PreviewModal;