import { FC } from "react";
import { ComplaintRequestVal } from "./ComplaintRequestVal";
import { RequestComplaintDetails, ToDetails } from "@/utils/typesUtils";

interface RequestsAndComplaintsProps {
  requestOrComplaints: RequestComplaintDetails[];
  type: "request" | "complaint" | "suggestion";
  deleteHandler: (id: string) => void;
  submitting: boolean;
}

export const RequestsAndComplaints: FC<RequestsAndComplaintsProps> = ({
  requestOrComplaints,
  type,
  deleteHandler,
  submitting,
}) => {
  const requestComplaintJsx =
    requestOrComplaints.length > 0 ? (
      requestOrComplaints.map((el) => (
        <ComplaintRequestVal
          subject={el.subject}
          to={JSON.parse(el.to) as ToDetails[]}
          key={el.id}
          description={el.description}
          requestComplaintNo={
            type === "complaint" ? el.complaintno : el.requestno
          }
          type={type}
          requestComplaintDeleteFn={() => deleteHandler(el.id)}
          submitting={submitting}
          createdDate={el.createdDate}
          attachments={JSON.parse(el.attachments)}
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
