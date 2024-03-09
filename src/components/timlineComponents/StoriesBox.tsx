import { RootState } from "@/redux_store";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { CommonBox } from "@/utils/CommonBox";
import { GenerateId } from "@/utils/utility";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import Stories from "react-insta-stories";
import Modal from "react-modal";
import { ProtectedRoutes } from "@/constants/routes";
import { getImageUrl } from "@/config/get-image-url";
import { GetStoriesForCitizen } from "@/redux_store/post/postApi";
import { postActions } from "@/redux_store/post/postSlice";
interface StoriesBoxProps { }

export const StoriesBox: FC<StoriesBoxProps> = () => {
  const { userDetails } = cusSelector((st) => st.auth);
  const id = GenerateId();
  const { stories } = cusSelector((state) => state.post);
  const dispatch = cusDispatch();
  const citizenid = userDetails?.id;
  const fetchStories = async () => {
    if (citizenid) {
      const data = await GetStoriesForCitizen(citizenid);
      dispatch(postActions.storeStories(data as any));
    }
  };

  useEffect(() => {
    fetchStories()
  }, [citizenid]);



  return (
    <div style={{ display: stories?.length > 0 ? "flex" : "none" }}>
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
            {stories?.map((el: | { media?: any[]; index?: number, leaderid: string; image: string; name: string; } | undefined) => {
              return (
                <Story
                  userImage={getImageUrl(el?.image as string)}
                  key={el?.index}
                  stories={el?.media as any}
                  name={el?.name as string}
                />
              );
            })}
          </ul>
        </div>
      </CommonBox>
    </div>
  );
};

interface StoryProps {
  userImage: string;
  stories: Array<any>;
  name: string
}


const Story: FC<StoryProps> = ({ userImage, stories, name }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const storyContent = { width: 'auto', maxWidth: '100%', maxHeight: '100%', margin: 'auto', }
  const [storiesdata, setStoriesdata] = useState({}) as any

  return (
    <>
      <li onClick={() => { setIsOpen(true); }} className="item-center flex flex-col gap-1">
        <Image
          priority={true}
          src={userImage}
          width={1000}
          height={1000}
          alt="user display pic"
          className="border-4 border-blue w-20 aspect-square rounded-full object-cover object-center shadow"
        />
        <figcaption className='text-[14px] mt-[1px]'> {name}</figcaption>
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
            overlay: {
              background: "rgb(0,0,0,0.5)"
            }
          }}
          contentLabel="Example Modal"
        >
          <div className="object-center">
            <div className="object-center relative">
              <Stories
                stories={stories as any}
                storyContainerStyles={{ borderRadius: 8, overflow: "hidden" }}
                defaultInterval={1500}
               
                width={432}
                height={768}
                storyStyles={storyContent}
                onAllStoriesEnd={(s: any, st: any) => { setIsOpen(false) }}
                onStoryStart={(s: any, st: any) => { setStoriesdata(st) }}
                keyboardNavigation={true}
              />
            </div>
          </div>
          <i className="ti-close"></i>
        </Modal>
      }
    </>
  );
};
