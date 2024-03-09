import { FC } from "react";
import { ComplaintRequestVal } from "./ComplaintRequestVal";
import { RequestComplaintDetails, ToDetails } from "@/utils/typesUtils";

interface RequestsAndComplaintsProps {
  requestOrComplaints: RequestComplaintDetails[];
  type: "request" | "complaint" | "suggestion";
  deleteHandler: (id: string) => void;
  submitting: boolean;
  editHandler: (id: string) => void;
}

export const RequestsAndComplaints: FC<RequestsAndComplaintsProps> = ({
  requestOrComplaints,
  type,
  deleteHandler,
  submitting,
  editHandler
}) => {
  const requestComplaintJsx =
    requestOrComplaints.length > 0 ? (
      requestOrComplaints.map((el:any) => (
        <ComplaintRequestVal
          subject={el.subject}
          to={el.to}
          key={el.id}
          description={el.description}
          ticket_code={el.ticket_code}
          type={type}
          requestComplaintEditFn={() => editHandler(el)}
          requestComplaintDeleteFn={() => deleteHandler(el.id)}
          submitting={submitting}
          createdDate={el.createdDate}
          attachments={el.attachments}
          signature={el.signature}
        />
      ))
    ) : (
      <h3 className="col-span-full text-center py-10 capitalize text-3xl">
        No {type}s Found!!
      </h3>
    );
  return (
    <>
      <ul className="grid grid-cols-3 gap-2  text-sky-950 max-[1440px]:grid-cols-2 max-[1080px]:grid-cols-1 max-[800px]:grid-cols-2 max-[680px]:grid-cols-1">
        {requestComplaintJsx}
      </ul>
    </>
  );
};
