import {
  fetchFollowLeader,
  fetchUnFollowLeader,
} from "@/components/api/followCitixen";
import { TrendingLeaderBriefDetails } from "@/utils/typesUtils";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import NoImg from "@/assets/No_image_available.png";

interface TrendingLeaderProps extends TrendingLeaderBriefDetails {}

interface UserDetails {
  token: string;
  id: string;
}

export const TrendingLeader: FC<TrendingLeaderProps> = ({
  image,
  designation,
  username,
  id,
  following,
  unfollow,
}) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    token: "",
    id: "",
  });

  useEffect(() => {
    var storedUserString = sessionStorage.getItem("user");
    if (storedUserString !== null) {
      var storedUser = JSON.parse(storedUserString);

      setUserDetails(storedUser);
    } else {
      console.log("User data not found in session storage");
    }
  }, []);

  const handleFollower = async (id: string) => {
    const token = userDetails?.token;
    const postBody = {
      senderid: userDetails?.id,
      receiverid: id,
    };

    const followedLeader = await fetchFollowLeader(postBody, token);

    if (followedLeader?.success) {
      following(followedLeader);
    }
  };

  const handleUnFollower = async (id: string) => {
    const token = userDetails?.token;
    const postBody = {
      senderid: userDetails?.id,
      receiverid: id,
    };

    const followedLeader = await fetchUnFollowLeader(postBody, token);

    if (followedLeader?.success) {
      following(followedLeader);
    }
  };

  return (
    <li className="flex gap-3 py-3 px-3 last_noti items-center transition-all hover:bg-slate-50">
      <Image
        src={image ? `${process.env.NEXT_PUBLIC_BASE_URL}${image}` : NoImg}
        alt="trending user"
        width={1000}
        height={1000}
        className="rounded-full w-12 aspect-square object-cover object-center"
      />

      <Link href={`ProtectedRoutes.leader/${id}`}>
        <div className="flex flex-col">
          <h3 className="text-[14px] font-semibold capitalize">{username}</h3>
          <p className="text-[12px] capitalize">{designation}</p>
        </div>
      </Link>

      {unfollow ? (
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
