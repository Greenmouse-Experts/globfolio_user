"use client"
import React, { useEffect } from "react";
import SidebarLayout from "./section/sidebar";
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@/lib/components/ui/TailwindComp";
import { BsGear } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import useAuth from "@/lib/hooks/authUser";
import useModal from "@/lib/hooks/useModal";
import ProfileAvatar from "../ui/ProfileAvatar";
import LogoutModal from "../modules/auth/LogoutModal";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/service/helpers";

interface Props {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<Props> = ({ children }) => {
  const {user} = useAuth()
  const {Modal, setShowModal} = useModal()
  const navigate = useRouter()
  const token = getToken();
  useEffect(() => {
    if(!token){
      navigate.push("/auth/login");
    }
  }, [])
  return (
    <>
      <div className="flex bg-light">
        <div className="lg:w-[250px]">
          <SidebarLayout />
        </div>
        <div className="w-full lg:w-[calc(100%_-_256px)] min-h-screen bg-light py-4 lg:py-9">
          <div className="">
            <div className="h-[60px] relative index-30">
              <div className="fixed top-0 w-full lg:w-[calc(100%_-_250px)] pl-9 pr-5 py-4 lg:py-[26px] bg-light flex items-center justify-between">
                <p className="fw-600 lg:text-lg">User Dashboard</p>
                <div className="flex gap-x-5 items-center">
                  {/* <NotifyDrop/> */}
                  <div className="flex gap-x-4 items-center">
                    <ProfileAvatar url={user.image} name={user.name} size={44} font={17}/>
                    <div className="hidden lg:flex gap-x-4 items-center cursor-pointer">
                      <p className="fw-500">{user.name}</p>
                      <Menu placement="bottom-start">
                        <MenuHandler>
                          <Button placeholder={''} className="p-0 m-0 bg-transparent !shadow-none">
                            <RiArrowDropDownLine className="cursor-pointer text-black text-3xl" />
                          </Button>
                        </MenuHandler>
                        <MenuList placeholder={''} className="index-30 text-black w-44">
                          <MenuItem placeholder={''} className="flex gap-x-2 items-center fw-500">
                            <BsGear className="text-2xl" />
                            Settings
                          </MenuItem>
                          <MenuItem
                          placeholder={''}
                            className="flex gap-x-2 items-center fw-500"
                            onClick={() => setShowModal(true)}
                          >
                            <IoLogOutOutline className="text-2xl" />
                            Logout
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 lg:px-9">{children}</div>
          </div>
        </div>
      </div>
      <Modal title="" size="xs">
        <LogoutModal CloseModal={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default DashboardLayout;
