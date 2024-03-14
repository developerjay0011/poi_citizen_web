import { FC, useState } from 'react'
import { BiX } from 'react-icons/bi'
import { AnimatePresence, motion as m } from 'framer-motion'
import moment from 'moment'
import { FaFileAlt } from "react-icons/fa";
import { getImageUrl } from '@/config/get-image-url';
import { FaThumbsDown } from "react-icons/fa";
import { ThumbsDown } from '@/redux_store/complaints/complaintsApi';
import toast from 'react-hot-toast';

interface TicketTimeLineProps {
  onClose: () => void
  onAddMileStone: () => void
  timeline: any
  ticketdata: any
  type: any
  el: any
  updatedata: () => void
}

export const TicketTimeLine: FC<TicketTimeLineProps> = ({ onClose, onAddMileStone, timeline, ticketdata, type, el, updatedata }) => {
  console.log(timeline)
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

            <ul className='py-8 px-10 flex flex-col'>
              {timeline?.map((el: any, index: number) => (
                <TimeLineData
                  id={el.id}
                  key={el.milestone}
                  status={el?.status}
                  created_by_name={el?.created_by_name}
                  details={el?.description}
                  title={el?.milestone}
                  created_date={el?.created_date}
                  attachments={el?.attachments}
                  ticketdata={ticketdata}
                  edithandler={() => { }}
                  timeline={timeline}
                  index={index}
                />
              ))}
              {timeline?.length == 0 && <h3 className="col-span-full text-center py-5 capitalize text-2xl">Status Found!!</h3>}

              {timeline?.length > 0 &&
                <button
                  disabled={ticketdata?.isthumbsdown}
                  className="py-2 px-5 self-end rounded-full capitalize border border-orange-500 text-orange-50 bg-orange-500 hover:bg-orange-100 hover:text-orange-500 
                  disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] disabled:border-none"
                  onClick={async () => {
                    const data: any = await ThumbsDown({
                      "ticketid": el?.id,
                      "category": type,
                      "leaderid": ticketdata?.leaderid
                    })
                    if (data?.success) {
                      toast.success(data?.message)
                      updatedata()
                      onClose()
                    } else {
                      toast.error(data?.message)
                    }
                  }}
                >
                  <FaThumbsDown />
                </button>
              }
            </ul>

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
  created_by_name:string
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

const TimeLineData: FC<TimeLineDataProps> = ({ timeline, details, title, index, status, created_date, attachments, id, created_by_name, ticketdata, edithandler }) => {
  return (
    <>
      <li className={`${timeline?.length - 1 > index && colors[status == "completed" ? 1 : 0].line} ${timeline?.length - 1 > index ? 'last_timeline' : 'last_timeline border-white'}`}>
        <div id='dot' className={`w-4 aspect-square rounded-full ${colors[status == "completed" ? 1 : 0].dot} absolute top-0 left-0 translate-x-[-62%]`} />
        <div className='flex items-start gap-3 ml-5 flex-row-reverse'>
          {attachments?.map((el) => (
            <a key={el} href={getImageUrl(el)} target="_blank" rel="noopener noreferrer" download><FaFileAlt /></a>
          ))}
          <div className='flex flex-col w-full'>
            <h4 className='font-medium capitalize'>{status} by { created_by_name}</h4>
            <p className='text-[15px] text-gray-600'>{moment(created_date).format('DD MMM, yyyy hh:mm:ss a')}</p>
            <p className='text-[15px] text-gray-600'>{details}</p>
          </div>
        </div>
      </li>
    </>
  )
}
