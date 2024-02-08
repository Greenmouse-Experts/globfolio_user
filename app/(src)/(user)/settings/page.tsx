"use client"
import React, { useState } from 'react'
import { GoPasskeyFill } from 'react-icons/go';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import ProfileAvatar from '@/lib/components/ui/ProfileAvatar';
import useAuth from '@/lib/hooks/authUser';
import useModal from '@/lib/hooks/useModal';
import { updateProfilePhoto } from '@/lib/service/api/authApi';
import { formatStatus } from '@/lib/utils/formatHelp';
import Button from '@/lib/components/ui/Button';
import ChangePassword from '@/lib/components/modules/settings/changePassword';

const SettingsPage = () => {
  const { user, saveUser } = useAuth();
  const [isUpdate, setIsUpdate] = useState(false);
  const {Modal:Password, setShowModal:ShowPassword} = useModal()
  const update = useMutation({
    mutationFn: updateProfilePhoto,
    mutationKey: ["update"],
    onSuccess: (data) => {
      toast.success(data.message)
      setIsUpdate(false)
      saveUser({
        ...user,
        image: data.data.image
      })
    },
    onError: (error:any) => {
      toast.error(error.response.data.message)
      setIsUpdate(false)
    }
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
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-5">
            <div className="relative">
              <ProfileAvatar
                url={user.image}
                name={user.name}
                size={155}
                font={38}
              />
            </div>
            <div>
              <p className="text-lg lg:text-3xl syne">{user.name}</p>
              <div className="mt-2">{formatStatus["active"]}</div>
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
          <div className="flex items-center gap-x-3">
            <div className="w-44">
            <Button title={'Edit Profile'}/>
            </div>
            <div className="w-12 h-12 place-center rounded-lg bg-primary text-white cursor-pointer" onClick={() => ShowPassword(true)}>
                <GoPasskeyFill className="text-xl"/>
            </div>
          </div>
        </div>
        <div className="mt-12 lg:px-6">
            <p className="syne text-lg lg:text-3xl fw-600">My Profile</p>
            <div className="mt-6 lg:grid gap-4">
                <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
                    <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">Registration Date:</p>
                    <p className="lg:text-xl syne">N/A</p>
                </div>
                <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
                    <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">Full Name:</p>
                    <p className="lg:text-xl syne">{user.name}</p>
                </div>
                <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
                    <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">Email:</p>
                    <p className="lg:text-xl syne">{user.email}</p>
                </div>
                <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
                    <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">Phone Number:</p>
                    <p className="lg:text-xl syne">{user.phone}</p>
                </div>
                <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
                    <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">Address:</p>
                    <p className="lg:text-xl syne">N/A</p>
                </div>
                <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
                    <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">Facebook Link:</p>
                    <p className="lg:text-xl syne">N/A</p>
                </div>
                <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
                    <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">Linkldn Link:</p>
                    <p className="lg:text-xl syne">N/A</p>
                </div>
                <div className="flex items-center gap-x-4 py-3 border-b border-gray-300">
                    <p className="w-3/12 lg:w-4/12 shrink-0 text-lg lg:text-2xl syne">X Link:</p>
                    <p className="lg:text-xl syne">N/A</p>
                </div>
            </div>
        </div>
      </div>
      <Password title="Change Password" size="md" type="withCancel">
        <ChangePassword close={() => ShowPassword(false)}/>
      </Password>
    </>
  );
}

export default SettingsPage