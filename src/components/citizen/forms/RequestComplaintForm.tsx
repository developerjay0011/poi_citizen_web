"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { AnimatePresence, motion as m } from "framer-motion";
import { BiX } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { BsFolderFill, BsX } from "react-icons/bs";
import { PDFPreviewCP } from "@/utils/PDFPreviewCP";
import { GenerateId, convertFileToBase64 } from "@/utils/utility";
import { ImageMultiSelectIP } from "@/utils/ImageMultiSelectIP";
import Image, { StaticImageData } from "next/image";
import { Attachments, ErrObj, RequestComplaintData } from "@/utils/typesUtils";
import { cusSelector } from "@/redux_store/cusHooks";
import { Input } from "@/app/user/profile/settings/edit-profile/components/EditInput";
import { getImageUrl } from "@/config/get-image-url";

const FORM_HEADINGS = {
  request: "Raise a Request",
  complaint: "Raise a Complaint",
  suggestion: "Create a Suggestion",
};

interface RequestComplaintFormProps {
  onClose: () => void;
  submitHandler: (requestComplaint: RequestComplaintData) => void;
  submitting: boolean;
  err: ErrObj;
  type: keyof typeof FORM_HEADINGS;
  isEdit: boolean,
  selectedValue: any
}

export interface RequestComplaintFormFields {
  subject: string;
  description: string;
  to: BriefLeaderDetails[] | "";
  signature: string | FileList;
  signatureDoc: string | FileList;
  attachments: Attachments[];
  attachmentsDoc: Attachments[];
  category: any
}

export interface BriefLeaderDetails {
  leaderId: string;
  name: string;
  leaderProfilePic: string | StaticImageData;
  designation: string;
  dislike: string;
  requestComplaintStatus: string;
  isSeen: string;
  requestComplaintSeenDate: string;
  state: string
  consituency: string
}

let firstTime = true;


export const RequestComplaintForm: FC<RequestComplaintFormProps> = ({ onClose, submitHandler, err, submitting, type, isEdit, selectedValue }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [attachments, setAttachments] = useState<Attachments[]>([]);
  const [attachmentsDoc, setAttachmentsDoc] = useState<Attachments[]>([]);
  const { leaderlist } = cusSelector((st) => st.complaints);
  const { userDetails, dropdownOptions } = cusSelector((st) => st.auth);

  const { handleSubmit, register, setValue, trigger, getValues, formState: { errors }, } = useForm<RequestComplaintFormFields>();
  const formSubmitHandler = (data: any) => {
    submitHandler({ ...data, attachmentsDoc, category_name: dropdownOptions?.categories?.find((el) => el.id === data?.category)?.category, });
    firstTime = false;
  };

  useEffect(() => {
    if (!firstTime && !err.isErr && !submitting) {
      firstTime = true;
      onClose();
    }
  }, [onClose, err, submitting]);
  useEffect(() => {
    if (isEdit) {
      setValue("subject", selectedValue?.subject);
      setValue("description", selectedValue?.description);
      setValue("category" as any, selectedValue?.categoryid);
      setValue("to", selectedValue?.to.map((item: any) => ({ ...item, id: item?.leaderid, username: item?.name })));
      // setSignature(selectedValue?.signature)
      setAttachments(selectedValue?.attachments)
    }
  }, []);
  const setToFieldValue = (val: any[] | "") => setValue("to", val);
  const addAttachmentsHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;

    if (!files) return;

    // Converting data into base64
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileData = await convertFileToBase64(file);

      setAttachments((lst) => {
        const oldData = [...lst];

        oldData.push({
          file: fileData,
          id: GenerateId(),
          type: file.type,
        });

        return oldData;
      });

      setAttachmentsDoc((lst) => {
        const oldData = [...lst];

        oldData.push({
          file: file as any,
          id: GenerateId(),
          type: file.type,
        });

        return oldData;
      });
    }
  };


  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed top-0 left-0 w-full h-[100dvh] z-10 "
      >
        <div
          className={`w-full h-full backdrop-blur-[3px] bg-sky-950 bg-opacity-40 absolute top-0 left-0 z-20 main_scrollbar flex justify-center`}
        >
          <m.section
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="z-30 border self-start my-10 bg-white relative w-1/2 rounded-md shadow-md max-[1450px]:w-[65%] max-[950px]:w-[80%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-40"
            >
              <BiX className="text-3xl" />
            </button>
            <h3 className="flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-3 border-b font-semibold text-2xl">
              {isEdit ? FORM_HEADINGS[type].replace("Create", 'Edit').replace("Raise", 'Edit') : FORM_HEADINGS[type]}
            </h3>

            <form
              className="flex flex-col px-7 py-5 gap-5 max-[550px]:px-4"
              noValidate
              onSubmit={handleSubmit(formSubmitHandler)}
            >

              <section className="grid gap-5 col-span-2 max-[650px]:gap-y-4">
                <label htmlFor="category" className={`flex flex-col gap-2`}>
                  <span className="capitalize font-[500]">
                    Category
                    {<strong className="text-rose-500">*</strong>}
                  </span>
                  <select
                    id="category"
                    autoComplete="off"
                    placeholder="category"
                    className="border border-slate-300 bg-slate-100 py-[.7rem] px-2 outline-none w-full rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400 placeholder:capitalize"
                    {...register("category", {
                      required: "category is required",
                    })}
                  >
                    <option value=''>
                      {dropdownOptions?.categories.length > 0
                        ? "Select Category"
                        : `No Category Found !!`}
                    </option>
                    {dropdownOptions?.categories?.map((el) => ({ id: el?.id, value: el.category })).map((el) => (
                      <option value={el.id} key={el.id}>
                        {el.value}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name={"category"}
                    errors={errors}
                    as={"span"}
                    className="text-red-500 text-sm first-letter:capitalize lowercase"
                  />
                </label>
              </section>

              {/* <Input
                errors={errors}
                id={"category" as any}
                selectField={{
                  title: "Category",
                  options: dropdownOptions?.categories?.map((el) => ({ id: el?.id, value: el.category })),
                }}
                register={register as any}
                title="Category"
                type="select"
                required
                validations={{
                  required: "Category is required",
                }}
              /> */}
              <section className="grid gap-5 grid-cols-2 gap-y-7 max-[650px]:grid-cols-1 max-[650px]:gap-y-4">
                <label htmlFor="subject" className={`flex flex-col gap-2`}>
                  <span className="capitalize font-[500]">
                    subject
                    {<strong className="text-rose-500">*</strong>}
                  </span>
                  <input
                    id="subject"
                    autoComplete="off"
                    type="text"
                    placeholder="subject"
                    className="border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400 placeholder:capitalize"
                    {...register("subject", {
                      required: "subject is required",
                    })}
                  />
                  <ErrorMessage
                    name={"subject"}
                    errors={errors}
                    as={"span"}
                    className="text-red-500 text-sm first-letter:capitalize lowercase"
                  />
                </label>

                <ImageMultiSelectIP
                  title={"to"}
                  svalue={isEdit ? selectedValue?.to.map((item: any) => ({ ...item, id: item?.leaderid, username: item?.name })) : []}
                  placeholder="select leader"
                  options={leaderlist.map((el: any) => el)}
                  setValue={(value: any) => { setToFieldValue(value) }}
                />

                <section className="col-span-2 flex flex-col gap-1 ">
                  <span className="capitalize font-[500]">
                    description
                    {<strong className="text-rose-500">*</strong>}
                  </span>
                  <textarea
                    rows={5}
                    {...register("description", {
                      // required: 'Description is required',
                    })}
                    className="border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all focus:bg-slate-200 focus:border-slate-400 placeholder:capitalize"
                  />

                  <div>{/* <CkEditor onChange={onChange} /> */}</div>

                  <ErrorMessage
                    name={"description"}
                    errors={errors}
                    as={"span"}
                    className="text-red-500 text-sm first-letter:capitalize lowercase"
                  />
                </section>

                <label
                  htmlFor="attachment"
                  className={`flex flex-col gap-2 w-max`}
                >
                  <span className="capitalize font-[500]">Attachment</span>
                  <input
                    type="file"
                    id="attachment"
                    multiple
                    onChange={addAttachmentsHandler}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 capitalize">
                    <BsFolderFill className="text-2xl" />{" "}
                    {attachments.length === 0
                      ? "No file selected"
                      : `${attachments.length} file selected`}
                  </div>
                </label>


              </section>

              <div className="w-full bg-zinc-200 h-[1px] mt-3" />

              <div className="flex self-end gap-2 max-[580px]:self-stretch max-[580px]:flex-wrap">
                <button
                  disabled={submitting}
                  className="py-2 px-5 rounded-full capitalize text-orange-50 bg-orange-500 transition-all hover:bg-orange-600 hover:text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] disabled:border-none"
                  type="submit"
                >
                  {submitting ? "submitting..." : (isEdit ? FORM_HEADINGS[type].replace("Create", 'Edit').replace("Raise", 'Edit') : FORM_HEADINGS[type])}
                </button>

                <button
                  onClick={() => setShowPreview(true)}
                  className="py-2 px-5 bg-orange-200 text-orange-500 rounded-full capitalize hover:bg-orange-500 hover:text-orange-50"
                  type="button"
                >
                  preview
                </button>

                <button
                  onClick={onClose}
                  className="py-2 px-5 bg-orange-200 text-orange-500 rounded-full capitalize"
                  type="button"
                >
                  close
                </button>
              </div>
            </form>
          </m.section>
        </div>
      </m.div>

      <AnimatePresence mode="wait">
        {showPreview && (
          <PDFPreviewCP
            onClose={() => setShowPreview(false)}
            heading={FORM_HEADINGS[type].split(" ").at(-1) as string}
            to={getValues("to") as BriefLeaderDetails[]}
            description={getValues("description")}
            signature={getImageUrl(userDetails?.signature) as string}
            subject={getValues("subject")}
            attachments={attachments.length}
            ticket_code={selectedValue?.ticket_code}
          />
        )}
      </AnimatePresence>
    </>
  );
};
