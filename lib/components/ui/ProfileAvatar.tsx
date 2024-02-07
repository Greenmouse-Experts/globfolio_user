import React from "react";

interface Props {
  url?: string;
  name?: string;
  size?: number;
  font?: number;
}
const ProfileAvatar: React.FC<Props> = ({ url, name, size, font }) => {
  const nameRow = name?.split(" ");
  const firstLetter = nameRow && nameRow[0]?.charAt(0);
  const lastLetter = nameRow && nameRow?.length > 1 && nameRow[1]?.charAt(0);
  if (url) {
    return (
      <img
        src={url}
        alt="profile"
        width={size}
        height={size}
        className="circle"
      />
    );
  } else
    return (
      <div
        className="circle flex gap-x-[1px] justify-center items-center fw-600 bg-primary text-white"
        style={{ width: size, height: size }}
      >
        <p style={{ fontSize: font }} className="uppercase">
          {firstLetter}
        </p>
        <p style={{ fontSize: font }} className="uppercase">
          {lastLetter}
        </p>
      </div>
    );
};

export default ProfileAvatar;
