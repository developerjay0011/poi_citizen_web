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
interface StoriesBoxProps {}




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

  // const mediaChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
  //   setStoryMedia([]);
  //   const data = e.target.files as FileList;
  //   if (!data || data.length === 0) return;
  //   const newMedia: Media[] = [];

  //   for (let i = 0; i < data.length; i++) {
  //     const uploadData = data[i];

  //     // checking for media type
  //     const type = uploadData.type.split("/")[0];

  //     // converting data into base 64
  //     const convertedData = await convertFileToBase64(uploadData);

  //     newMedia.push({
  //       type: type,
  //       media: uploadData,
  //       id: GenerateId(),
  //     });
  //   }

  //   setStoryMedia((oldMedia) => [...oldMedia, ...newMedia]);

  //   const token = userDetails?.token;

  //   const formData = new FormData();

  //   formData.append("leaderid", userDetails?.id || "");
  //   formData.append("written_text", textPost || "");
  //   formData.append("access_type", "open");

  //   for (let i = 0; i < data.length; i++) {
  //     const item: any = data[i];
  //     formData.append("media", item);
  //   }
  //   try {
  //     const data = await fetchAddStory(formData, token);
  //     if (data?.success) {
  //       setUpdateStory(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const citizenid = userDetails?.id;

  useEffect(() => {
  (async () => {
      try {
        if(citizenid){
          const data = await GetStoriesForCitizen(citizenid);
          if (data?.length > 0) {
            setGetStories(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userData, updateStory,citizenid]);

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
    <>
      <CommonBox
        title="My Stories"
        cusJSX={[
          <Link
            key={id}
            href={ProtectedRoutes.leader}
            className="text-sm font-normal hover:underline text-orange-500"
          >
            see all
          </Link>,
        ]}
      >
        <div className="w-[660px]  ">
          <ul className="flex gap-2 py-5  w-full overflow-x-auto ">
            {/* <li className=" w-44 h-[300px] aspect-[9/16] rounded-lg relative  ">
              <label htmlFor="media">
                <input
                  type="file"
                  className="hidden"
                  id="media"
                  multiple
                  onChange={mediaChangeHandler}
                />
                <BsPlusCircle className="absolute top-3 left-3 z-10 text-white text-[38px] shadow" />

                <figure className="absolute top-0 left-0 w-full h-full object-cover object-center story_img">
                  <CustomImage
                    src={
                      storyMedia?.length > 0
                        ? URL.createObjectURL(storyMedia[0]?.media)
                        : ""
                    }
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-0 left-0 w-full bg-black bg-opacity-25 h-full"></div>
                </figure>
              </label>
            </li> */}

            {getStories.map(
              (
                el: { posts?: any; id: string; image: string } | undefined,
                index
              ) => {
                return (
                  <Story
                    key={index}
                    userImage={getImageUrl(el?.image)}
                    img={getImageUrl(el?.posts[0]?.media[0]?.media)}
                    stories={el?.posts}
                    id={el?.id || ""}
                    // handleDelete={handleDelete}
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
    </>
  );
};

interface StoryProps {
  img: string;
  self?: boolean;
  id: string;
  handleDelete: any;
  userImage: string;
  stories: Array<any>;
}

interface Media {
  type: string;
  media: File;
  id: string;
}

const Story: FC<StoryProps> = ({
  img,
  id,
  handleDelete,
  userImage,
  stories,
}) => {
  const [showMorePostOptions, setShowMorePostOptions] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { userDetails } = cusSelector((st) => st.auth);
  const leaderid = userDetails?.id;
  const deletePostHandler = async (leaderid: string, id: string) => {
    handleDelete(leaderid, id);
    setShowMorePostOptions(false);
  };

  return (
    <>
      <li
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {/* User Img */}
        <Image
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
                url:getImageUrl(item.media[0].media),
                type: item.media[0].type == "video/mp4" ? "video" : "image",
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
