import { FC, useRef } from 'react'
import { motion as m } from 'framer-motion'
import Image from 'next/image'
import { cusSelector } from '@/redux_store/cusHooks'
import { BriefLeaderDetails } from '@/components/citizen/forms/RequestComplaintForm'
import { dateConverterNumeric } from './utility'
import ReactToPrint from 'react-to-print'

interface PDFPreviewCPProps {
  onClose: () => void
  heading: string
  to: BriefLeaderDetails | null
  subject: string
  description: string
  signature: string
  attachments: number
}

export const PDFPreviewCP: FC<PDFPreviewCPProps> = ({
  onClose,
  heading,
  description,
  subject,
  to,
  signature,
  attachments,
}) => {
  const { userDetails } = cusSelector((st) => st.auth)
  const letterDiv = useRef<HTMLDivElement>(null)

  const PrintHandler = async () => {
    if (!letterDiv.current) return
  }
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 flex items-center z-[200] justify-center w-full h-[100dvh]'>
        <section className='absolute top-0 left-0 z-[205] main_scrollbar w-full h-full flex justify-center py-5 bg-black bg-opacity-30 backdrop-blur-[4px]'>
          <m.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className='bg-white relative h-max flex flex-col gap-5'>
            {/* <div className='flex justify-between items-start'>
              <h4 className='text-3xl font-semibold'>{heading} Preview</h4>

              <button type='button' onClick={onClose}>
                <BiX className='text-4xl' />
              </button>
            </div> */}

            {/* PDF Preview */}
            <div className='letter_preview'>
              <div ref={letterDiv} className='flex flex-col w-full h-full overflow-hidden gap-[1cm] p-[1cm]'>
                {/* Date and Req/comp no */}
                <p className='self-end'>
                  req/comp no/{dateConverterNumeric(new Date().toDateString())}
                </p>

                {/* To */}
                <div className='flex flex-col capitalize'>
                  <strong>To</strong>
                  {to && (
                    <>
                      <strong>{to.name}</strong>
                      <strong>{to.designation}</strong>
                    </>
                  )}
                </div>

                {/* Subject */}
                <p className='flex gap-2'>
                  <strong>Subject:</strong>
                  <span>{subject}</span>
                </p>

                {/* Description */}
                <div className='text-justify'>
                  <p>
                    <strong className=''>Dear Sir/{"Ma'am"},</strong>
                  </p>
                  <div
                    className='mt-[.25cm]'
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>

                {/* Regards */}
                {/* <strong className='block'>With Regards,</strong> */}

                {/* Signature */}
                <div className='self-end'>
                  <strong className='block'>Your Sincerely,</strong>
                  {signature.length > 0 && (
                    <Image
                      src={signature}
                      width={1000}
                      priority={true}
                      height={1000}
                      alt='signature'
                      className='w-full h-[4cm] object-contain'
                    />
                  )}
                  <p>{userDetails?.firstname}</p>
                </div>

                {attachments !== 0 && (
                  <p className='mt-auto text-center'>
                    {attachments} attachments
                  </p>
                )}
              </div>
            </div>

            {/* CTA's */}
            <div className='flex items-center gap-3 justify-end px-3 border-t py-4'>
              <button
                type='button'
                onClick={onClose}
                className='rounded-full capitalize px-6 py-2 bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-orange-50 font-[500]'>
                Close
              </button>

              <ReactToPrint
                trigger={() => (
                  <button
                    type='button'
                    className='rounded-full capitalize px-6 py-2 bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-orange-50 font-[500]'>
                    print
                  </button>
                )}
                content={() => letterDiv.current}
              />

              <button
                type='button'
                onClick={PrintHandler}
                className='rounded-full capitalize px-6 py-2 bg-orange-100 text-orange-500 hover:bg-orange-500 hover:text-orange-50 font-[500]'>
                save/experiment
              </button>
            </div>
          </m.div>
        </section>
      </m.div>
    </>
  )
}
