'use client'
import { FC, useEffect, useRef, useState } from 'react'
import { BsCalendarDate } from 'react-icons/bs'
import { Attachments, ToDetails } from '@/utils/typesUtils'
import { AnimatePresence } from 'framer-motion'
import { ToDetailsBox } from './ToDetailsBox'
import Image from 'next/image'
import { MdDelete } from 'react-icons/md'
import { ConfirmDialogBox } from '@/utils/ConfirmDialogBox'
import { dateConverter } from '@/utils/utility'
import { getImageUrl } from '@/config/get-image-url'

interface ComplaintRequestValProps {
  subject: string
  to: ToDetails[]
  description: string
  requestComplaintNo: string
  type: 'complaint' | 'request' | 'suggestion'
  requestComplaintDeleteFn: () => void
  submitting: boolean
  createdDate: string
  signature: string
  attachments: Attachments[]
}

const TOClasses = [
  'z-[10]',
  'absolute top-0 left-[15px] z-[9]',
  'absolute top-0 left-[30px] z-[8]',
  'absolute top-0 left-[45px] z-[7]',
  'absolute top-0 left-[60px] z-[6]',
]

export const ComplaintRequestVal: FC<ComplaintRequestValProps> = ({
  subject,
  to,
  description,
  requestComplaintNo,
  type,
  requestComplaintDeleteFn,
  submitting,
  createdDate,
  signature,
  attachments,
}) => {
  const descRef = useRef<HTMLParagraphElement>(null)
  const [showConfirmBox, setShowConfirmBox] = useState(false)
  const [showToDetails, setShowToDetails] = useState(false)
  const [showExpandBtn, setShowExpandBtn] = useState(false)
  const [showFullDesc, setShowFullDesc] = useState(false)

  useEffect(() => {
    if (
      descRef.current &&
      Number.parseInt(getComputedStyle(descRef.current).height) === 164
    ) {
      setShowExpandBtn(true)
    }
  }, [])

  return (
    <>
      <li className='border self-start rounded-md flex flex-col p-3 gap-3 bg-gray-50 border-gray-300'>
        <div className='flex justify-between py-2 font-medium'>
          {/* ID no */}
          {type !== 'suggestion' && (
            <p className='capitalize'>
              <strong className='text-orange-500'># </strong> {type[0]}-
              {requestComplaintNo}
            </p>
          )}

          {/* created date */}
          <p className='flex items-center gap-2 ml-auto'>
            <BsCalendarDate className='text-orange-500' />{' '}
            {dateConverter(createdDate)}
          </p>
        </div>

        <h4 className='text-xl font-medium capitalize'>{subject}</h4>

        {/* TO Box */}
        <div className='text-sm flex items-center gap-2'>
          <p>To:</p>

          <section
            className='flex flex-col'
            onClick={() => setShowToDetails(true)}>
            <div className='flex relative'>
              {to.slice(0, 5).map((el, i) => (
                <div
                  key={i}
                  className={`cursor-pointer toList w-10 aspect-square bg-red-100 object-cover object-center rounded-full border-2 border-gray-50 ${TOClasses[i]}`}>
                  <Image
                    src={getImageUrl(el.leaderProfilePic)}
                    alt='leader img'
                    width={1000}
                    height={1000}
                    className={`object-cover object-center w-full h-full rounded-full`}
                  />

                  <p className='absolute border-orange-500 border top-[110%] translate-x-[-50%] hidden left-1/2 px-2 text-[12px] w-max bg-orange-100 text-orange-500 font-medium rounded capitalize'>
                    {el.name}
                  </p>
                </div>
              ))}
            </div>
            {to.length > 5 && (
              <p className='text-[11px] font-medium'>+{to.length - 5} more</p>
            )}
          </section>
        </div>

        <div className='flex flex-col gap-1'>
          <p
            ref={descRef}
            className={`text-gray-600 text-sm overflow-hidden ${
              showFullDesc ? '' : 'text_wrap'
            }`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {showExpandBtn && (
            <button
              type='button'
              onClick={() => setShowFullDesc((lst) => !lst)}
              className='w-max outline-none hover:text-orange-500'>
              <strong className='text-sm underline w-max cursor-pointer'>
                {!showFullDesc ? 'Read More' : 'Read Less'}
              </strong>
            </button>
          )}
        </div>

        <div className='flex self-end gap-2'>
          <button type='button' className='pdf_hover'>
            <span>download pdf</span>
          </button>

          <button
            type='button'
            onClick={() => setShowConfirmBox(true)}
            className='outline-none hover:scale-110 active:scale-100 hover:text-orange-500'>
            <MdDelete className='text-3xl' />
          </button>
        </div>
      </li>
      <AnimatePresence mode='wait'>
        {showToDetails && (
          <ToDetailsBox onClose={() => setShowToDetails(false)} toList={to} />
        )}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {showConfirmBox && (
          <ConfirmDialogBox
            noAllowed={submitting}
            onCancel={() => setShowConfirmBox(false)}
            onOk={requestComplaintDeleteFn}
          />
        )}
      </AnimatePresence>
    </>
  )
}
