"use client";
import { FC, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import { RequestComplaintData } from "@/utils/typesUtils";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { RequestComplaintForm } from "../forms/RequestComplaintForm";
import {
  DeleteSuggestion,
  SaveSuggestion,
  addNewSuggestions,
  deleteSuggestion,
  fetchAllSuggestions,
} from "@/redux_store/suggestions/suggestionAPI";
import { RequestsAndComplaints } from "../RequestComplaints/RequestsAndComplaints";
import toast from "react-hot-toast";


interface UserDetails {
  token: string;
  id: string;
  displayPic: string;
}

export const SuggestionPage: FC = () => {
  const [searchString, setSearchString] = useState("");
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    token: "",
    id: "",
    displayPic: "",
  });
  const dispatch = cusDispatch();
  const { err, submitting, suggestions } = cusSelector((st) => st.suggestions);

  const showForm = () => setShowSuggestionForm(true);
  const closeForm = () => setShowSuggestionForm(false);

  useEffect(() => {
    var storedUserString = sessionStorage.getItem("user");
    if (storedUserString !== null) {
      var storedUser = JSON.parse(storedUserString);

      setUserDetails(storedUser);
    } else {
      console.log("User data not found in session storage");
    }
  }, []);

  const addNewSuggestionHandler = async (suggestion: RequestComplaintData) => {

    console.log(suggestion, "complaint");

    const formData = new FormData();

    formData.append("id", "");
    formData.append("citizenid", userDetails?.id || "");
    formData.append("subject", suggestion.subject || "");
    formData.append("description", suggestion?.description || "");
    formData.append("deletedDocs", "");

    // Check if signatureDoc is a string or a FileList
    if (typeof suggestion.signatureDoc === "string") {
      formData.append("signature", suggestion.signatureDoc);
    } else if (suggestion.signatureDoc instanceof FileList) {
      for (const file of Array.from(suggestion.signatureDoc)) {
        formData.append("signature", file);
      }
    }

    for (let i = 0; i < suggestion.attachmentsDoc.length; i++) {
      const item: any = suggestion.attachmentsDoc[i];

      formData.append("attachments", item?.file);
    }
    for (let i = 0; i < suggestion.to.length; i++) {
      const item: any = suggestion.to[i];

      formData.append("to", item.name);
    }

    try {
      const data = await SaveSuggestion(formData);
      console.log(data);

      if (data?.success) {
        console.log(data);

        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    closeForm();


    dispatch(addNewSuggestions(suggestion));
  };

  useEffect(() => {
    dispatch(fetchAllSuggestions());
  }, [dispatch]);

  const searchFilteredSuggestions = suggestions.filter((el) =>
    searchString ? el.subject.toLowerCase().includes(searchString) : el
  );

  const handleDetele = async (id: string) => {
    try {
      const data = await DeleteSuggestion(id);
      if (data?.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="flex flex-col border rounded-md bg-white flex-grow self-start">
        <h2 className="flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-4 text-[22px] font-semibold capitalize border-b">
          my suggestions
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
                  new suggestion
                </button>
              </div>

              {/* FILTERS */}
              <div className="flex items-center gap-3 justify-end">
                {/* SEARCH FILTER */}
                <label className="relative">
                  <input
                    type="search"
                    className="py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md outline-none capitalize focus:bg-gray-50 focus:border-gray-400 transition-all"
                    placeholder="search suggestion"
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
            requestOrComplaints={searchFilteredSuggestions}
            type="suggestion"
            submitting={submitting}
            // deleteHandler={(id: string) => dispatch(deleteSuggestion(id))}
            deleteHandler={(id: string) => handleDetele(id)}
          />
        </section>
      </section>

      {/* Using Requestion complaint as Suggestion form is also same */}
      <AnimatePresence mode="wait">
        {showSuggestionForm && (
          <RequestComplaintForm
            onClose={closeForm}
            type="suggestion"
            submitHandler={addNewSuggestionHandler}
            err={err}
            submitting={submitting}
          />
        )}
      </AnimatePresence>
      {/* cdegfbreyb */}
    </>
  );
};
