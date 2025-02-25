import { cusSelector } from "@/redux_store/cusHooks";
import { CommonBox } from "@/utils/CommonBox";
import Image from "next/image";
import { FC, useState } from "react";
import Stories from "react-insta-stories";
import Modal from "react-modal";
import { getImageUrl } from "@/config/get-image-url";
interface StoriesBoxProps { }

export const StoriesBox: FC<StoriesBoxProps> = () => {
  const { stories } = cusSelector((state) => state.post);

  return stories?.length > 0 && (
    <CommonBox title="Stories" cusJSX={[]}>
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
    </CommonBox>
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
