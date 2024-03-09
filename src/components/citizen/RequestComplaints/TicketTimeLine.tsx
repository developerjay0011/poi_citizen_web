import { FC, useState } from 'react'
import { BiX } from 'react-icons/bi'
import { AnimatePresence, motion as m } from 'framer-motion'
import moment from 'moment'
import { FaFileAlt } from "react-icons/fa";
import { getImageUrl } from '@/config/get-image-url';
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";

interface TicketTimeLineProps {
  onClose: () => void
  onAddMileStone: () => void
  timeline: any
  ticketdata: any
}

export const TicketTimeLine: FC<TicketTimeLineProps> = ({
  onClose,
  onAddMileStone,
  timeline,
  ticketdata

}) => {
  const [editTimeLine, setEditTimeLine] = useState(false);
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 w-full h-[100dvh] z-[100]'>
        <div className='bg-black bg-opacity-20 backdrop-blur-[2px] w-full h-full main_scrollbar overflow-y-scroll'>
          <m.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className='m-auto my-5 bg-white relative overflow-hidden rounded shadow-md w-[40%] max-[1600px]:w-1/2 max-[1050px]:w-[70%] max-[750px]:w-[85%] max-[600px]:w-[95%] max-[600px]:my-3'>
            <button
              type='button'
              onClick={onClose}
              className='absolute top-3 right-3 z-40'>
              <BiX className='text-3xl' />
            </button>
            <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:rounded-full after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'>
              Status
            </h3>

            <ul className='py-8 px-10'>

              {timeline?.map((el: any, index: number) => (
                <TimeLineData
                  id={el.id}
                  key={el.milestone}
                  status={el?.status}
                  details={el?.description}
                  title={el?.milestone}
                  created_date={el?.created_date}
                  attachments={el?.attachments}
                  ticketdata={ticketdata}
                  edithandler={() => { setEditTimeLine(true) }}
                  timeline={timeline}
                  index={index}
                />
              ))}
              {timeline?.length == 0 && <h3 className="col-span-full text-center py-5 capitalize text-2xl">Status Found!!</h3>}
              {
                <AnimatePresence mode="wait">
                  {editTimeLine && (
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center backdrop-blur-[2px] ${false ? "cursor-not-allowed" : ""
                        }`}
                    >
                      <div
                        className="bg-gray-700 opacity-20 h-screen w-screen absolute top-0 left-0 z-20"
                        onClick={() => setEditTimeLine(false)}
                      />
                      <m.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        className="shadow-md border rounded-md border-gray-200 py-8 px-20 z-30 bg-white relative flex flex-col items-center"
                      >
                        <h2 className="mt-4 mb-8 text-3xl">Edit Status</h2>
                      </m.div>
                    </m.div>
                  )}

                </AnimatePresence>
              }
            </ul>

          </m.div>

        </div>
      </m.div>
    </>
  )
}
export const FileOpen: FC<TicketTimeLineProps> = ({
  onClose,
  timeline
}) => {
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 w-full h-[100dvh] z-[100]'>
        <div className='bg-black bg-opacity-20 backdrop-blur-[2px] w-full h-full main_scrollbar overflow-y-scroll'>
          <m.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className='m-auto my-5 bg-white relative overflow-hidden rounded shadow-md w-[40%] max-[1600px]:w-1/2 max-[1050px]:w-[70%] max-[750px]:w-[85%] max-[600px]:w-[95%] max-[600px]:my-3'>
            <button
              type='button'
              onClick={onClose}
              className='absolute top-3 right-3 z-40'>
              <BiX className='text-3xl' />
            </button>
            <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:rounded-full after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl capitalize'> timeline
            </h3>
          </m.div>
        </div>
      </m.div>
    </>
  )
}
interface TimeLineDataProps {
  details: string
  title: string
  status: string
  created_date: string
  attachments: string[]
  ticketdata: string
  id: string
  edithandler: () => void
  timeline: any
  index: number
}

const colors = {

  0: {
    line: 'border-zinc-400',
    dot: 'bg-zinc-400',
  },
  1: {
    line: 'border-green-500',
    dot: 'bg-green-500',
  },
}

const TimeLineData: FC<TimeLineDataProps> = ({ timeline, details, title, index, status, created_date, attachments, id, ticketdata, edithandler }) => {
  return (
    <>
      <li className={`${timeline?.length - 1 > index && colors[status == "completed" ? 1 : 0].line} ${timeline?.length - 1 > index ? 'last_timeline' : 'last_timeline border-white'}`}>
        <div
          id='dot'
          className={`w-4 aspect-square rounded-full ${colors[status == "completed" ? 1 : 0].dot} absolute top-0 left-0 translate-x-[-62%]`}
        />
        <div className='flex items-start gap-3 ml-5 flex-row-reverse'>
          {attachments?.map((el) => (
            <a key={el} href={getImageUrl(el)} target="_blank" rel="noopener noreferrer" download>
              <FaFileAlt />
            </a>
          ))}
          <div className='flex flex-col w-full'>
            <h4 className='font-medium capitalize'>{status} </h4>
            <p className='text-[15px] text-gray-600'>{moment(created_date).format('DD MMM, yyyy hh:mm:ss a')}</p>
            <p className='text-[15px] text-gray-600'>{details}</p>
          </div>
        </div>
      </li>
    </>
  )
}
