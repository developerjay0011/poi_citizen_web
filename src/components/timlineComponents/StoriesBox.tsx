import { RootState } from "@/redux_store";
import { cusSelector } from "@/redux_store/cusHooks";
import { CommonBox } from "@/utils/CommonBox";
import { PostType } from "@/utils/typesUtils";
import { GenerateId, convertFileToBase64 } from "@/utils/utility";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { BsPlusCircle, BsThreeDots } from "react-icons/bs";
import Stories from "react-insta-stories";
import { PostOptions } from "../posts/PostOptions";
import Modal from "react-modal";
import { ProtectedRoutes } from "@/constants/routes";
import CustomImage from "@/utils/CustomImage";
import {
  AddStory,
  DeleteStory,
  GetStoriesForCitizen,
} from "@/redux_store/story/storyApi";
import { getImageUrl } from "@/config/get-image-url";
interface StoriesBoxProps { }

export const StoriesBox: FC<StoriesBoxProps> = () => {
  const [storyMedia, setStoryMedia] = useState<Media[]>([]);
  const [textPost, setTextPost] = useState("");
  const [getStories, setGetStories] = useState([]);
  const [updateStory, setUpdateStory] = useState({});
  const { userDetails } = cusSelector((st) => st.auth);
  const id = GenerateId();
  const userData: any = cusSelector(
    (state: RootState) => state.auth?.userDetails
  );

 
  const citizenid = userDetails?.id;

  useEffect(() => {
    (async () => {
      try {
        if (citizenid) {
          const data = await GetStoriesForCitizen(citizenid);
          if (data?.length > 0) {
            setGetStories(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userData, updateStory, citizenid]);

  // const handleDelete = async (leaderid: string, id: string) => {
  //   const token = userData?.token;

  //   const postBody = {
  //     id: id,
  //     leaderid: leaderid,
  //   };

  //   try {
  //     // const data = await fetchDeleteStory(postBody, token);
  //     const data = await DeleteStory(postBody);
  //     if (data) {
  //       setUpdateStory(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div style={{ display: getStories?.length > 0 ? "flex" : "none" }}>
      <CommonBox
        title="My Stories"
      
      >
        <div className="w-[660px]  ">
          <ul className="flex gap-2 py-5  w-full overflow-x-auto ">
           

            {getStories.map(
              (
                el: { posts?: any; id: string; image: string } | undefined,
                index
              ) => {
                return (
                  <Story
                    key={index}
                    data={el}
                    userImage={getImageUrl(el?.image)}
                    img={getImageUrl(el?.posts[0]?.media[0]?.media)}
                    stories={el?.posts}
                    id={el?.id || ""}
                    handleDelete={() => { }}
                  />
                );
              }
            )}

            {/* {IMAGES.slice(0, 5).map((el, index) => {
              return <Story key={index} img={el} id="" handleDelete="" />;
            })} */}
          </ul>
        </div>
      </CommonBox>
    </div>
  );
};

interface StoryProps {
  img: string;
  self?: boolean;
  id: string;
  handleDelete: any;
  userImage: string;
  stories: Array<any>;
  data: any
}

interface Media {
  type: string;
  media: File;
  id: string;
}

const Story: FC<StoryProps> = ({
  // img,
  // id,
  // handleDelete,
  userImage,
  stories,
  data
}) => {
  const [showMorePostOptions, setShowMorePostOptions] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { userDetails } = cusSelector((st) => st.auth);
  const leaderid = userDetails?.id;
  const heading = {
    heading: data.name,
    subheading: data.written_text,
    profileImage: userImage
  }
  // const deletePostHandler = async (leaderid: string, id: string) => {
  //   handleDelete(leaderid, id);
  //   setShowMorePostOptions(false);
  // };

  return (
    <>
      <li
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {/* User Img */}
        <Image
          priority={true}
          src={userImage}
          width={1000}
          height={1000}
          alt="user display pic"
          className=" top-3 left-3 border-4 border-blue z-20 w-20 aspect-square rounded-full object-cover object-center shadow"
        />

        {/* Story Image */}
        {/* <figure className="absolute top-0 left-0 w-full h-full object-cover object-center story_img">
          <Image
            src={img}
            alt=""
            width={1000}
            height={1000}
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute top-0 left-0 w-full bg-black bg-opacity-25 h-full"></div>
        </figure> */}
        {/* <div className="ml-auto relative" id="moreOptions">
          <button
            onClick={() => setShowMorePostOptions((lst) => !lst)}
            className="absolute right-0 rotate-90 top-6"
          >
            <BsThreeDots className="text-2xl" />
          </button>

          {showMorePostOptions && (
            <PostOptions
              deletePostHandler={() => deletePostHandler(leaderid, id)}
              userId={leaderid}
              onClose={() => setShowMorePostOptions(false)}
            />
          )}
        </div> */}
      </li>
      {
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={() => setIsOpen(false)}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
          contentLabel="Example Modal"
        >
          <div className="object-center">
            <Stories
              stories={stories?.map((item) => ({
                url: getImageUrl(item.media[0].media),
                type: item.media[0].type == "video/mp4" ? "video" : "image",
                header: heading
              }))}
              defaultInterval={1500}
              width={432}
              height={768}
            />
          </div>
          <i className="ti-close"></i>
        </Modal>
      }
    </>
  );
};
