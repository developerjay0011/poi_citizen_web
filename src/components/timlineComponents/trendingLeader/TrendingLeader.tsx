import { TrendingLeaderBriefDetails } from "@/utils/typesUtils";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import NoImg from "@/assets/No_image_available.png";
import { cusSelector } from "@/redux_store/cusHooks";
import { getImageUrl } from "@/config/get-image-url";
import {
  fetchFollowLeader,
  fetchUnFollowLeader,
} from "@/redux_store/follow/followAPI";
import toast from "react-hot-toast";
import CustomImage from "@/utils/CustomImage";

interface TrendingLeaderProps extends TrendingLeaderBriefDetails {
  isfollowing: boolean;
}

export const TrendingLeader: FC<TrendingLeaderProps> = ({
  image,
  designation,
  username,
  id,
  following,
  unfollow,
  isfollowing,
}) => {
  const { userDetails } = cusSelector((st) => st.auth);
  const handleFollower = async (id: string) => {
    const postBody = {
      senderid: userDetails?.id,
      receiverid: id,
    };
    const followedLeader = await fetchFollowLeader(postBody);
    if (followedLeader?.success) {
      following();
    }
  };

  const handleUnFollower = async (id: string) => {
    const postBody = {
      senderid: userDetails?.id,
      receiverid: id,
    };
    const followedLeader = await fetchUnFollowLeader(postBody);
    if (followedLeader?.success) {
      following();
    }
  };

  return (
    <li className="flex gap-3 py-3 px-3 last_noti items-center transition-all hover:bg-slate-50">
      <CustomImage
        src={getImageUrl(image as string)}
        alt="trending user"
        width={1000}
        height={1000}
        className="rounded-full w-12 aspect-square object-cover object-center"
      />

      <Link href={`user/leader/about?id=${id}`}>
        <div className="flex flex-col">
          <h3 className="text-[14px] font-semibold capitalize">{username}</h3>
          <p className="text-[12px] capitalize">{designation}</p>
        </div>
      </Link>

      {isfollowing ? (
        <button
          type="button"
          className="text-orange-500 hover:underline ml-auto text-[15px]"
          onClick={() => handleUnFollower(id)}
        >
          Unfollow
        </button>
      ) : (
        <button
          type="button"
          className="text-orange-500 hover:underline ml-auto text-[15px]"
          onClick={() => handleFollower(id)}
        >
          Follow
        </button>
      )}
    </li>
  );
};
