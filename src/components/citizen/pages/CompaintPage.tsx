"use client";
import { FC, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import { RequestComplaintForm } from "@/components/citizen/forms/RequestComplaintForm";
import { RequestsAndComplaints } from "../RequestComplaints/RequestsAndComplaints";
import { LeaderDetails, RequestComplaintData } from "@/utils/typesUtils";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import {
  DeleteComplaint,
  getLeaderList,
  GetRaisedComplaints,
  RaiseComplaint,
} from "@/redux_store/complaints/complaintsApi";
import toast from "react-hot-toast";
import { complaintActions } from "@/redux_store/complaints/complaintSlice";
import { tryCatch } from "@/config/try-catch";
export const ComplaintPage: FC = () => {
  const [searchString, setSearchString] = useState("");
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>();

  const [isEdit, setIsEdit] = useState(false);

  const dispatch = cusDispatch();
  const { complaints, submitting, err } = cusSelector((st) => st.complaints);
  const { userDetails } = cusSelector((st) => st.auth);

  const showForm = () => setShowComplaintForm(true);
  const closeForm = () => setShowComplaintForm(false);

  const getComplaint = async () => {
    tryCatch(
      async () => {
      if (userDetails?.id) {
        const data = await GetRaisedComplaints(userDetails?.id);
          dispatch(complaintActions.storeComplaints(data));
      }
    })
  };
  const getLeader = async () => {
    tryCatch(
      async () => {
        if (userDetails?.id) {
          const data = await getLeaderList();
          dispatch(complaintActions.setLeader(data));
        }
      }
    )
  };
  const addNewComplaintHandler = async (complaint: any) => {
    const formData = new FormData();

    formData.append("id", isEdit ?  selectedValue?.id  : "");
    formData.append("citizenid", userDetails?.id || "");
    formData.append("subject", complaint.subject || "");
    formData.append("description", complaint?.description || "");
    formData.append("deletedDocs", "");

   
       
    if (complaint.attachmentsDoc) {
      for (let i = 0; i < complaint.attachmentsDoc.length; i++) {
        const item: any = complaint.attachmentsDoc[i];

        formData.append("attachments", item?.file);
      }
    }
   
    for (let i = 0; i < complaint.to.length; i++) {
      const item: any = complaint.to[i]?.id;

      formData.append("to", item);
    }
    if (complaint.signatureDoc) {
      formData.append("signature", complaint.signatureDoc);
    }
    tryCatch(
      async () => {
      const data = await RaiseComplaint(formData);
      if (data?.success) {
        toast.success(data.message);
        getComplaint()
      }
    })
    closeForm();
  };

  const searchFilteredComplaints = complaints.filter((el) =>
    searchString ? el.subject.toLowerCase().includes(searchString) : el
  );

  const handleDelete = async (id: string) => {
    tryCatch(
      async () => {
      const data = await DeleteComplaint(id);
      if (data?.success) {
        toast.success(data.message);
        getComplaint()
      }
    })
  };

  useEffect(() => {
    getComplaint()
    getLeader();
  }, []);

  return (
    <>
      <section className="flex flex-col border rounded-md bg-white w-full">
        <h2 className="flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-4 text-[22px] font-semibold capitalize border-b">
          my complaints
        </h2>

        <section className="flex flex-col gap-5 p-5 mt-5">
          <div className="flex justify-between items-end max-[550px]:flex-col max-[550px]:items-start">
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold">Filters</h2>

              <div className="flex items-center gap-3 max-[700px]:flex-col max-[700px]:items-start">
                <label htmlFor="filter" className="flex items-center gap-2">
                  <span>Sort by</span>
                  <select
                    id="filter"
                    className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                  </select>
                </label>
              </div>
            </section>

            <section className="flex flex-col gap-5 max-[550px]:ml-auto max-[460px]:mt-4">
              {/* CTA'S */}
              <div className="flex items-center justify-end gap-3">
                {/* ADD OR EDIT Button */}
                <button
                  className="px-5 py-2 bg-orange-500 text-orange-50 rounded-md text-sm capitalize transition-all hover:bg-orange-600"
                  onClick={() => { showForm(), setIsEdit(false) }}
                >
                  raise a complaint
                </button>
              </div>

              {/* FILTERS */}
              <div className="flex items-center gap-3 justify-end">
                {/* SEARCH FILTER */}
                <label className="relative">
                  <input
                    type="search"
                    className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md outline-none capitalize focus:bg-gray-50 focus:border-gray-400 transition-all"
                    placeholder="search complaint"
                    value={searchString}
                    onChange={(e) =>
                      setSearchString(e.target.value.toLowerCase())
                    }
                  />
                  {searchString.length === 0 && (
                    <button className="absolute top-[8px] right-2">
                      <FiSearch className="stroke-gray-400" />
                    </button>
                  )}
                </label>
              </div>
            </section>
          </div>

          <RequestsAndComplaints
            requestOrComplaints={searchFilteredComplaints}
            type="complaint"
            submitting={submitting}
            deleteHandler={(id: string) => handleDelete(id)}
            editHandler={(id: any) => { showForm(), setIsEdit(true), setSelectedValue(id)}}
          />
        </section>
      </section>

      <AnimatePresence mode="wait">
        {showComplaintForm && (
          <RequestComplaintForm
            submitHandler={addNewComplaintHandler}
            type="complaint"
            isEdit={isEdit}
            selectedValue={selectedValue}
            onClose={closeForm}
            err={err}
            submitting={submitting}
          />
        )}
      </AnimatePresence>
    </>
  );
};
