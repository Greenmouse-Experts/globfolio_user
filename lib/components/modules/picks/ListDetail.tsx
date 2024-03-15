import dayjs from "dayjs";
import React, { FC } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "@/lib/hooks/authUser";
import { fetchSinglePick, saveUserPick } from "@/lib/service/api/picksApi";
import { toast } from "react-toastify";
import useRoutine from "@/lib/hooks/useRoutine";
import Image from "next/image";
import oops from "../../../assets/images/oops.png"
import Button from "../../ui/Button";
import { useRouter } from "next/navigation";
import CubeLoader from "../../ui/Loaders/CubeLoader/CubeLoader";

interface Props {
  id: string;
  close: () => void;
}
const ListDetail: FC<Props> = ({ id, close }) => {
  const { userId } = useAuth();
  const {isFree} = useRoutine()
  const router = useRouter()
  const {data, isLoading} = useQuery({
    queryKey: ['singlePick'],
    queryFn: () => fetchSinglePick(id)
  })
  const mutate = useMutation({
    mutationFn: saveUserPick,
    mutationKey: ["saveUserPick"],
  });
  const addToFavorite = () => {
    const payload = {
      userId: userId,
      stockId: id,
    };
    mutate.mutateAsync(payload, {
      onSuccess: () => {
        toast.success("Picks has been added to favorites");
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  };
  if(isFree()){
    return (
      <div>
        <FaTimes
        className="text-xl absolute -top-8 right-3 lg:right-7"
        onClick={close}
      />
        <div className="flex justify-center">
        <Image src={oops} alt="oops" width={300} height={200} className=""/>
        </div>
        <div className="flex justify-center mt-8">
          <p className="text-center lg:w-8/12 text-black">Only users on paid plans can access premium contents. Subscribe to enjoy unlimited access</p>
        </div>
        <div className="w-8/12 lg:w-5/12 mx-auto mt-12">
          <Button title={'Continue'} onClick={() => router.push('/subscription')}/>
        </div>
      </div>
    )
  }
  return (
    <div>
      {isLoading && (
          <div className="place-center py-12">
            <CubeLoader size={1.1} />
          </div>
        )}
      {!isLoading && data && (<div>
        <div>
      <FaTimes
        className="text-xl absolute -top-8 right-3 lg:right-7"
        onClick={close}
      />
      <div className="py-2 text-black max-h-[550px] overflow-y-auto">
        <div className="item-body px-2 text-wrap">
          <div className="lg:flex justify-between items-center">
            <p className="fs-300 mb-2 fw-500">
              {dayjs(data?.data?.createdAt).format("dddd DD, MMMM YYYY")}
            </p>
            <div onClick={(e) => e.stopPropagation()}>
              <div
                className="flex gap-x-2 cursor-pointer items-center mb-2 lg:mb-0"
                onClick={() => addToFavorite()}
              >
                <FaHeart />
                <p className="fs-300 fw-600">Add to Favorites</p>
              </div>
            </div>
          </div>
          <p className="fw-600 syne">{data?.data?.industry}</p>
          <p className="fw-600 lg:text-lg">{data?.data?.intro}</p>
          <div dangerouslySetInnerHTML={{ __html: data?.data?.description }} />
        </div>
      </div>
    </div>
      </div>)}
    </div>
  );
};

export default ListDetail;
