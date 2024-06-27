import { FC, useEffect, useRef, useState } from 'react'
import { motion as m } from 'framer-motion'
import Image from 'next/image'
import { cusSelector } from '@/redux_store/cusHooks'
import { BriefLeaderDetails } from '@/components/citizen/forms/RequestComplaintForm'
import { dateConverterNumeric } from './utility'
import ReactToPrint from 'react-to-print'
import dynamic from 'next/dynamic';
import moment from 'moment'
import { getImageUrl } from '@/config/get-image-url'
const Editor = dynamic(() => import('./Editor'), {
  ssr: false
})

interface PDFPreviewCPProps {
  onClose: () => void
  heading: string
  to: BriefLeaderDetails[] | null
  subject: string
  description: string
  signature: string
  attachments: number
  ticket_code: string
}

export const PDFPreviewCP: FC<PDFPreviewCPProps> = ({
  onClose,
  heading,
  description,
  subject,
  to,
  signature,
  ticket_code,
  attachments,
}) => {
  const { userDetails } = cusSelector((st) => st.auth)
  const letterDiv = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState('')

  const PrintHandler = async () => {
    if (!letterDiv.current) return
  }
  useEffect(() => {
    const temp = `<div style=" width:20cm; margin: 20px 20px 20px 20px;height: 29.7cm;   justify-content: 'center';align-items: 'center';">
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">reg/comp no :${ticket_code}&nbsp;</span></strong></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">Date : ${moment().format('DD/MM/YYYY')}&nbsp;</span></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><br></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><span style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><strong>To&nbsp;</strong></span></p>
    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><span style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><strong>{$TO}&nbsp;</strong></span></p>
    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><span style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><strong>{$DESIGNATION}&nbsp;</strong></span></p>
     <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><span style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><strong>{$CONSITUENCY}&nbsp;</strong></span></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">Subject: ${subject}&nbsp;</span></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: justify;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">Dear Sir/Ma'am,</span></strong></p>

    <p dir="ltr" style="line-height:1.7999999999999998;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">${description}&nbsp;</span></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: justify;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><br></p>
    <p style="text-align: right;"><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">Your Sincerely,</span></strong></p>

    <p><img src="signature (2).png" alt="" width="300"></p>
    ${userDetails?.signature ? `<div dir="ltr" style="background-color: #ffffff; margin-top: 0pt; margin-bottom: 0pt; text-align: right;display:flex;align-self:flex-end">
    <img src="${getImageUrl(userDetails?.signature)}" alt="" width="138" style="margin-left: auto; margin-right: 0; display:flex;align-self:flex-end">
</div>` : ""} 

    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:0pt;padding:0pt 0pt 3pt 0pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><span style="font-family: Merriweather, serif; color: rgb(0, 0, 0); background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; font-size: 12pt;">${userDetails?.username}&nbsp;</span></strong></p>
    <p style="text-align: right;">${userDetails?.address}&nbsp;</p>
    <p style="text-align: right;">${userDetails?.state_name}(${userDetails?.pincode})&nbsp;</p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><br></strong></p>
    <p><br></p>
    <p dir="ltr" style="line-height:1.7999999999999998;text-align: right;background-color:#ffffff;margin-top:0pt;margin-bottom:3pt;"><strong style="font-weight:normal;" id="docs-internal-guid-bb773bb7-7fff-688e-1d9a-986638bf1984"><br></strong></p>

</div>`

    var preview = "";
    for (var i = 0; i < (to?.length || 0); i++) {
      var tempval = temp.replaceAll("{$TO}", to ? to[i]?.name : "").replaceAll("{$CONSITUENCY}", to ? to[i]?.consituency || "" : "").replaceAll("{$DESIGNATION}", to ? `${to[i]?.designation}${to[i]?.state ? `(${to[i]?.state})` : ""}` : "")
      preview = preview + tempval
    }
    setContent(preview)
  }, [])
  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 flex items-center z-[200] justify-center w-full h-[100dvh] '>
        {/* <section className='top-0 left-0 z-[205] main_scrollbar  h-[100dvh] py-5 bg-black bg-opacity-30 backdrop-blur-[4px] flex flex-col'>
        <div className='grid grid-cols-'>
            <Editor
              value={content}
              onChange={(val: any) => setContent(val)}
            />
          </div>
        </section> */}

        <section className='top-0 left-0 z-[205] main_scrollbar bg-color-red  h-[100dvh] py-5  bg-opacity-30 backdrop-blur-[4px] flex flex-col'>
          <div className='letter_template bg-white' ref={letterDiv}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          {/* CTA's */}
          <div className='flex bg-white items-center gap-3 justify-end px-3 border-t py-4'>
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


          </div>
        </section>



      </m.div>
    </>
  )
}
