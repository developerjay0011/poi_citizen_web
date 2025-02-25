"use client";
import { FC, useEffect, useRef, useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { Attachments, ToDetails } from "@/utils/typesUtils";
import { AnimatePresence } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { ConfirmDialogBox } from "@/utils/ConfirmDialogBox";
import { getImageUrl } from "@/config/get-image-url";
import CustomImage from "@/utils/CustomImage";
import moment from "moment";
import { TicketTimeLine } from "./TicketTimeLine";
import { useRouter, useSearchParams } from "next/navigation";
import { ProtectedRoutes } from "@/constants/routes";

interface ComplaintRequestValProps {
  subject: string;
  to: ToDetails[];
  description: string;
  ticket_code: string;
  type: "complaint" | "request" | "suggestion";
  requestComplaintDeleteFn: () => void;
  requestComplaintEditFn: () => void;
  submitting: boolean;
  createdDate: string;
  signature: string;
  attachments: Attachments[];
  el: any
  updatedata: () => void;
  id: any
}

const TOClasses = [
  "z-[10]",
  "absolute top-0 left-[15px] z-[9]",
  "absolute top-0 left-[30px] z-[8]",
  "absolute top-0 left-[45px] z-[7]",
  "absolute top-0 left-[60px] z-[6]",
];

export const ComplaintRequestVal: FC<ComplaintRequestValProps> = ({
  subject,
  to,
  description,
  ticket_code,
  type,
  requestComplaintDeleteFn,
  submitting,
  createdDate,
  el,
  updatedata,
  id
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const types = searchParams.get('type');
  const referenceid = searchParams.get('referenceid');
  const leaderid = searchParams.get('leaderid');

  const descRef = useRef<HTMLParagraphElement>(null);
  const [showStatus, setShowStatus] = useState((types == "complaint_status" || types == "suggestion_status" || types == "request_status") && referenceid == id ? true : false)
  const [ticketdata, setticketdata] = useState<any>((to?.find((item: any) => item?.leaderid === leaderid) as any)?.leaderid ? to?.find((item: any) => item?.leaderid === leaderid) : null)
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [showExpandBtn, setShowExpandBtn] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    if ((types == "complaint_status" || types == "suggestion_status" || types == "request_status") && referenceid == id) {
      if (referenceid == id && referenceid && showStatus == false) {
        if (type == "complaint") {
          router.replace(ProtectedRoutes.complaints);
        }
        if (type == "request") {
          router.replace(ProtectedRoutes.requests);
        }
        if (type == "suggestion") {
          router.replace(ProtectedRoutes.suggestions);
        }
        setticketdata({})
      }
    }
  }, [(types == "complaint_status" || types == "suggestion_status" || types == "request_status") && referenceid == id, showStatus, leaderid])

  useEffect(() => {
    if (descRef.current && Number.parseInt(getComputedStyle(descRef.current).height) === 164) { setShowExpandBtn(true) }
  }, []);

  return (
    <>
      <li className="border self-start rounded-md flex flex-col p-3 gap-3 bg-gray-50 border-gray-300">
        <div className="flex justify-between py-2 font-medium">
          {/* ID no */}

          <p className="capitalize">
            <strong className="text-orange-500"># </strong>
            {ticket_code}
          </p>


          {/* created date */}
          <p className="flex items-center gap-2 ml-auto">
            <BsCalendarDate className="text-orange-500" />{" "}
            {moment(createdDate).format('DD, MMM YYYY')}
          </p>
        </div>

        <h4 className="text-xl font-medium capitalize">{subject}</h4>

        {/* TO Box */}
        <div className="text-sm flex items-center gap-2">
          <p>Leader Status:</p>

          <section className="flex flex-col">
            <div className="flex relative">
              {to.map((el, i) => (
                <div
                  key={i}
                  onClick={() => { setticketdata(el), setShowStatus(true) }}
                  className={`cursor-pointer toList w-10 aspect-square bg-red-100 object-cover object-center rounded-full border-2 border-gray-50 ${TOClasses[i]}`}
                >
                  <CustomImage
                    src={getImageUrl(el.image as string)}
                    alt="leader img"
                    width={1000}
                    height={1000}
                    className={`object-cover object-center w-full h-full rounded-full`}
                  />

                  <p className="absolute border-orange-500 border top-[110%] translate-x-[-50%] hidden left-1/2 px-2 text-[12px] w-max bg-orange-100 text-orange-500 font-medium rounded capitalize">
                    {el.name}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-1">
          <p
            ref={descRef}
            className={`text-gray-600 text-sm overflow-hidden ${showFullDesc ? "" : "text_wrap"
              }`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {showExpandBtn && (
            <button
              type="button"
              onClick={() => setShowFullDesc((lst) => !lst)}
              className="w-max outline-none hover:text-orange-500"
            >
              <strong className="text-sm underline w-max cursor-pointer">
                {!showFullDesc ? "Read More" : "Read Less"}
              </strong>
            </button>
          )}
        </div>

        <div className="flex self-end gap-2">
          {/* <button type="button" className="outline-none hover:scale-110 active:scale-100 hover:text-orange-500">
            <MdDownload className="text-3xl" />
          </button> */}
          {/* <button
            type="button"
            onClick={() => requestComplaintEditFn()}
            className="outline-none hover:scale-110 active:scale-100 hover:text-orange-500"
          >
            <MdEdit className="text-2xl" />
          </button> */}
          <button
            type="button"
            onClick={() => setShowConfirmBox(true)}
            className="outline-none hover:scale-110 active:scale-100 hover:text-orange-500"
          >
            <MdDelete className="text-2xl" />
          </button>
        </div>
      </li>
      <AnimatePresence mode="wait">
        {showConfirmBox && (
          <ConfirmDialogBox
            noAllowed={submitting}
            onCancel={() => setShowConfirmBox(false)}
            onOk={requestComplaintDeleteFn}
          />
        )}
        {showStatus && (
          <TicketTimeLine
            timeline={ticketdata?.status}
            onClose={() => setShowStatus(false)}
            onAddMileStone={() => { }}
            ticketdata={ticketdata}
            type={type}
            el={el}
            updatedata={updatedata}
          />
        )}
      </AnimatePresence>
    </>
  );
};
