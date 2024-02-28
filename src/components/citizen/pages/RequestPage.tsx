"use client";
import { FC, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import { RequestComplaintForm } from "@/components/citizen/forms/RequestComplaintForm";
import { RequestsAndComplaints } from "../RequestComplaints/RequestsAndComplaints";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import {
  DeleteRequest,
  GetRaisedRequests,
  RaiseRequest,
} from "@/redux_store/requests/requestAPI";
import toast from "react-hot-toast";
import { requestActions } from "@/redux_store/requests/requestSlice";
import { tryCatch } from "@/config/try-catch";

interface UserDetails {
  token: string;
  id: string;
  displayPic: string;
}

export const RequestPage: FC = () => {
  const [searchString, setSearchString] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    token: "",
    id: "",
    displayPic: "",
  });
  const dispatch = cusDispatch();
  const { requests, submitting, err } = cusSelector((st) => st.requests);
  // const { submitting, err } = cusSelector((st) => st.requests);

  const showForm = () => setShowRequestForm(true);
  const closeForm = () => setShowRequestForm(false);



  useEffect(() => {
    var storedUserString = sessionStorage.getItem("user");
    if (storedUserString !== null) {
      var storedUser = JSON.parse(storedUserString);

      setUserDetails(storedUser);
    } else {
      console.log("User data not found in session storage");
    }
  }, []);

  const getRequests = async () => {
    tryCatch(
      async () => {
      if (userDetails?.id) {
        const data = await GetRaisedRequests(userDetails?.id);

        if (data.length >= 0) {
          dispatch(requestActions.storeRequest(data));
        }
      }
    })
  };

  const addNewRequestHandler = async (request: any) => {
    const formData = new FormData();

    formData.append("id", "");
    formData.append("citizenid", userDetails?.id || "");
    formData.append("subject", request.subject || "");
    formData.append("description", request?.description || "");
    formData.append("deletedDocs", "");

    formData.append("signature", request?.signatureDoc || "");
    for (let i = 0; i < request.attachmentsDoc.length; i++) {
      const item: any = request.attachmentsDoc[i];

      formData.append("attachments", item?.file);
    }
    for (let i = 0; i < request.to.length; i++) {
      const item: any = request.to[i].id;

      formData.append("to", item);
    }

    tryCatch(
      async () => {
      const data = await RaiseRequest(formData);
      if (data?.success) {
        getRequests();
        toast.success(data.message);
      }
    })
    closeForm();

  };

   useEffect(() => {
    getRequests()
  }, [dispatch,userDetails]) 

  const searchFilteredRequests = requests.filter((el) =>
    searchString ? el.subject.toLowerCase().includes(searchString) : el
  );

  const handleDetele = async (id: string) => {
    tryCatch(
      async () => {
      const data = await DeleteRequest(id);
      if (data?.success) {
        toast.success(data.message);
        getRequests();
      }
    })
  };

  return (
    <>
      <section className="flex flex-col border rounded-md bg-white w-full">
        <h2 className="flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-4 text-[22px] font-semibold capitalize border-b">
          my requests
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
                  onClick={showForm}
                >
                  raise a request
                </button>
              </div>

              {/* FILTERS */}
              <div className="flex items-center gap-3 justify-end">
                {/* SEARCH FILTER */}
                <label className="relative">
                  <input
                    type="search"
                    className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md outline-none capitalize focus:bg-gray-50 focus:border-gray-400 transition-all"
                    placeholder="search request"
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
          {/* Request Table */}
          <RequestsAndComplaints
            requestOrComplaints={searchFilteredRequests}
            type="request"
            submitting={submitting}
            // deleteHandler={(id: string) => dispatch(deleteRequest(id))}
            deleteHandler={(id: string) => handleDetele(id)}
          />
        </section>
      </section>

      <AnimatePresence mode="wait">
        {showRequestForm && (
          <RequestComplaintForm
            onClose={closeForm}
            type="request"
            submitHandler={addNewRequestHandler}
            err={err}
            submitting={submitting}
          />
        )}
      </AnimatePresence>
    </>
  );
};
