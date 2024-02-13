"use client";
import React, { useState } from "react";
import { GoPasskeyFill } from "react-icons/go";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import ProfileAvatar from "@/lib/components/ui/ProfileAvatar";
import useAuth from "@/lib/hooks/authUser";
import useModal from "@/lib/hooks/useModal";
import { updateProfilePhoto } from "@/lib/service/api/authApi";
import { formatStatus } from "@/lib/utils/formatHelp";
import Button from "@/lib/components/ui/Button";
import ChangePassword from "@/lib/components/modules/settings/changePassword";
import dayjs from "dayjs";
import EditProfile from "@/lib/components/modules/settings/editProfile";

const SettingsPage = () => {
  const { user, saveUser } = useAuth();
  const [isUpdate, setIsUpdate] = useState(false);
  const { Modal: Password, setShowModal: ShowPassword } = useModal();
  const { Modal: Edit, setShowModal: ShowEdit } = useModal();
  const update = useMutation({
    mutationFn: updateProfilePhoto,
    mutationKey: ["update"],
    onSuccess: (data) => {
      toast.success(data.message);
      setIsUpdate(false);
      saveUser({
        ...user,
        image: data.data.picture.secure_url,
      });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
      setIsUpdate(false);
    },
  });
  const handleChangePicture = async (e: any) => {
    setIsUpdate(true);
    if (!e.target.files) return;
    const files = e.target.files[0];
    const fd = new FormData();
    fd.append("image", files);
    update.mutate(fd);
  };
  return (
    <>
      <div>
        <div className="lg:flex justify-between items-center">
          <div className="lg:flex items-center gap-x-5">
            <div className="relative flex justify-center lg:block">
              <ProfileAvatar
                url={user.image}
                name={user.name}
                size={155}
                font={38}
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-lg lg:text-3xl syne">{user.name}</p>
              <div className="mt-2 flex lg:block justify-center">{formatStatus["active"]}</div>
              <button className="bg-primary mt-6 relative px-6 py-2 rounded-lg shades text-white overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChangePicture}
                  className="absolute top-0 left-0 w-full opacity-0"
                />
                {isUpdate ? "..." : "Update Photo"}
              </button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end items-center gap-x-3 mt-4 lg:mt-0">
            <div className="w-44">
              <Button title={"Edit Profile"} onClick={() => ShowEdit(true)}/>
            </div>
            <div
              className="w-12 h-12 place-center rounded-lg bg-primary text-white cursor-pointer"
              onClick={() => ShowPassword(true)}
            >
              <GoPasskeyFill className="text-xl" />
            </div>
          </div>
        </div>
        <div className="mt-12 lg:px-6">
          <p className="syne text-lg lg:text-3xl fw-600">My Profile</p>
          <div className="mt-6 lg:grid gap-4">
            <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
              <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">
                Registration Date:
              </p>
              <p className="lg:text-xl syne">
                {dayjs(user.joined).format("dddd DD, MMMM YYYY")}
              </p>
            </div>
            <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
              <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">
                Full Name:
              </p>
              <p className="lg:text-xl syne">{user.name}</p>
            </div>
            {/* <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
              <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">
                User Name:
              </p>
              <p className="lg:text-xl syne">{user.username}</p>
            </div> */}
            <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
              <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">
                Email:
              </p>
              <p className="lg:text-xl syne">{user.email}</p>
            </div>
            <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
              <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">
                Phone Number:
              </p>
              <p className="lg:text-xl syne">{user.phone}</p>
            </div>
            <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
              <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">
                Gender:
              </p>
              <p className="lg:text-xl syne">{user.gender}</p>
            </div>
            <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
              <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">
                Email Status:
              </p>
              <div className="lg:text-xl syne">
                {user.email_verify ? (
                  <p className="flex items-center gap-x-2 fw-600 text-green-600">
                    <span className="w-3 h-3 bg-green-400 circle block"></span>
                    Verified
                  </p>
                ) : (
                  <p className="flex items-center gap-x-2 text-orange-600 fw-600">
                    <span className="w-3 h-3 bg-orange-600 circle block"></span>
                    Pending
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
              <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">
                Country:
              </p>
              <p className="lg:text-xl syne">
                {user.country ? user?.country : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Password title="Change Password" size="md" type="withCancel">
        <ChangePassword close={() => ShowPassword(false)} />
      </Password>
      <Edit title="Edit Profile" size="lg" type="withCancel">
        <EditProfile close={() => ShowEdit(false)}/>
      </Edit>
    </>
  );
};

export default SettingsPage;
