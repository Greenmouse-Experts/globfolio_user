"use client"
import React from "react";
import SearchList from "./searchList";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@/lib/components/ui/TailwindComp";
import { IoBookmarks } from "react-icons/io5";
import GroupList from "./groupList";
import { MdPrivateConnectivity } from "react-icons/md";
import IndividualList from "./individualList";

const ChatMemberList = () => {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <div className="p-4">
      <div>
        <div>
          <p className="fw-600">Chats</p>
        </div>
        <div className="mt-3">
          <SearchList />
        </div>
        <div>
          <Accordion placeholder={""} open={open === 1}>
            <AccordionHeader placeholder={""} onClick={() => handleOpen(1)} className="border-none">
              <div className="flex text-gray-700 gap-x-2 items-center fw-600">
                <IoBookmarks/>
                <p className="fs-500">Group Chat</p>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <GroupList/>
            </AccordionBody>
          </Accordion>
          <Accordion placeholder={""} open={open === 2}>
            <AccordionHeader placeholder={""} onClick={() => handleOpen(2)} className="border-none py-2">
              <div className="flex text-gray-700 gap-x-2 items-center fw-600">
                <MdPrivateConnectivity className="text-2xl"/>
                <p className="fs-500">Private Chat</p>
              </div>
            </AccordionHeader>
            <AccordionBody>
             <IndividualList/>
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ChatMemberList;
