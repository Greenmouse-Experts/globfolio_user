import React, { FC } from "react";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
} from "@/lib/components/ui/TailwindComp";
import useDialog from "@/lib/hooks/useDialog";
import ViewUsersModal from "./headModals/viewUsersModal";

interface Props {
  item: any;
}
const MessageHead: FC<Props> = ({ item }) => {
  const { Dialog: ViewUser, setShowModal: setViewUser } = useDialog();
  const { Dialog: ViewFiles, setShowModal: setViewFiles } = useDialog();
  return (
    <div>
      <div className="px-6 py-2 flex justify-between">
        <div className="flex gap-x-2 items-center">
          <Image
            src={
              item.img
                ? item.img : item?.banner? item?.banner
                : "https://res.cloudinary.com/greenmouse-tech/image/upload/v1693229127/globfolio/Group_48368_1_y0m8ah.png"
            }
            alt="profile"
            width={80}
            height={80}
            className="w-9 circle aspect-square"
          />
          <div>
            <p className="fw-600 fs-500">
              {item?.name
                ? item.name
                : item.fullname
                ? item.fullname
                : item.title
                ? item.title
                : ""}
            </p>
          </div>
        </div>
        <Menu placement="bottom-end">
          <MenuHandler>
            <Button
              placeholder={""}
              className="p-3 bg-transparent !shadow-none"
            >
              <BsThreeDotsVertical className="cursor-pointer text-black" />
            </Button>
          </MenuHandler>
          <MenuList placeholder={""} className="p-2">
            <MenuItem placeholder={""} onClick={() => setViewUser(true)}>View Users</MenuItem>
            <MenuItem placeholder={""} onClick={() => setViewFiles(true)}>View Files</MenuItem>
          </MenuList>
        </Menu>
      </div>
      <ViewUser title="Chat Room Users" size="lg" type="">
          <ViewUsersModal id={item.id}/>
      </ViewUser>
      <ViewFiles title="Chat Room Users" size="lg" type="">
          <></>
      </ViewFiles>
    </div>
  );
};

export default MessageHead;
