"use client";
import { UserDetails } from "@/utils/typesUtils";
import { ChangeEvent, FC, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Input } from "./EditInput";
import { BLOOD_GROUPS, COUNTRIES, convertFileToBase64 } from "@/utils/utility";
import toast from "react-hot-toast";
import Link from "next/link";
import moment from "moment";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { authActions } from "@/redux_store/auth/authSlice";

import { ProtectedRoutes } from "@/constants/routes";
import { EditCitizenProfile, getProfile } from "@/redux_store/auth/authAPI";
import { tryCatch } from "@/config/try-catch";
import { FaSignature } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import { getImageUrl } from "@/config/get-image-url";
import Image from "next/image";

interface EditFormProps { }
const genders = ["male", "female", "others"];
const EDUCATIONS = ["10th Pass", "12th Pass", "Under Graduate", "Post Graduate", "P.H.D",];

const EditForm: FC<EditFormProps> = () => {
  const { userDetails, dropdownOptions } = cusSelector((st) => st.auth);
  const dispatch = cusDispatch();
  const [signature, setSignature] = useState("");
  const [signatureDoc, setSignatureDoc] = useState("");
  const { register, formState: { errors }, handleSubmit, setValue, watch } = useForm<UserDetails>({ mode: "onTouched" });
  const state_id = watch('stateid')
  const formSubmitHandler = async (data: UserDetails) => {
    const formData = new FormData();
    formData.append("citizenid", userDetails?.id || "");
    formData.append("name", data?.username || "");
    formData.append("email", data?.email || "");
    formData.append("mobile", data?.mobile || "");
    formData.append("image", userDetails?.image || "");
    formData.append("gender", data?.gender || "");
    formData.append("dob", data?.dob || "");
    formData.append("blood_group", data?.blood_group || "");
    formData.append("higher_education", data?.higher_education || "");
    formData.append("country", data?.country || "");
    formData.append("fb_link", data?.fb_link || "");
    formData.append("insta_link", data?.insta_link || "");
    formData.append("twitter_link", data?.twitter_link || "");
    formData.append("about_me", data?.about_me || "");
    formData.append("stateid", data?.stateid || "");
    formData.append("state_name", dropdownOptions?.states?.find((el) => el.id === data?.stateid)?.state || "");
    formData.append("address", data?.address || "");
    formData.append("pincode", data?.pincode || "");
    formData.append("parliamentaryid", data?.parliamentaryid || "");
    formData.append("assemblyid", data?.assemblyid || "");
    formData.append("assembly_name", dropdownOptions?.assemblies?.find((el) => el.id === data?.assemblyid)?.assembly_name || "");
    formData.append("parliamentary_name", dropdownOptions?.parliamentries?.find((el) => el.id === data?.parliamentaryid)?.parliamentary_name || "");
    if (signatureDoc) {
      formData.append("signature", signatureDoc);
    }

    tryCatch(
      async () => {
        const editData = await EditCitizenProfile(formData);
        if (editData?.success) {
          toast.success(editData?.message);
          const data = await getProfile(userDetails?.id, dispatch);
          dispatch(authActions.logIn(data));
        } else {
          toast.error(editData?.message);
        }
      })
  };

  useEffect(() => {
    setSignature(userDetails?.signature)
    setValue("username", userDetails?.username || "");
    setValue("email", userDetails?.email || "");
    setValue("mobile", userDetails?.mobile || "");
    setValue("gender", userDetails?.gender || "");
    setValue("dob", moment(userDetails?.dob).format("YYYY-MM-DD") || "");
    setValue("blood_group", userDetails?.blood_group || "");
    setValue("higher_education", userDetails?.higher_education || "");
    setValue("country", userDetails?.country || "");
    setValue("fb_link", userDetails?.fb_link || "");
    setValue("insta_link", userDetails?.insta_link || "");
    setValue("twitter_link", userDetails?.twitter_link || "");
    setValue("about_me", userDetails?.about_me || "");
    setValue("address", userDetails?.address || "");
    setValue("pincode", userDetails?.pincode || "");
    setValue("stateid", userDetails?.stateid || "");
    setValue("parliamentaryid", userDetails?.parliamentaryid || "");
    setValue("assemblyid", userDetails?.assemblyid || "");
  }, [userDetails?.username, dropdownOptions?.states]);

  useEffect(() => {
    setValue("parliamentaryid", userDetails?.parliamentaryid || "");
    setValue("assemblyid", userDetails?.assemblyid || "");
  }, [state_id]);

  return (
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      noValidate
      className="flex flex-col text-sky-950 gap-5"
    >
      <h2 className="text-3xl font-bold capitalize mb-10">edit profile</h2>

      <div className="grid grid-cols-2 gap-3 flex-1 ">
        <Input
          errors={errors}
          id="username"
          register={register}
          type="text"
          title="User Name"
          required
        />

        {/* <Input
          errors={errors}
          id="lastname"
          register={register}
          type="text"
          title="Last Name"
          required
        /> */}

        <Input
          errors={errors}
          id="gender"
          register={register}
          type="select"
          title="Gender"
          required
          selectField={{
            options: genders.map((el) => ({ id: el, value: el })),
            title: "Select Gender",
          }}
        />

        <Input
          errors={errors}
          id="dob"
          register={register}
          type="date"
          title="Date of Birth"
          required
          max={moment().format("YYYY-MM-DD")}
        />

        <Input
          errors={errors}
          id="blood_group"
          register={register}
          type="select"
          title="Blood Group"
          required
          selectField={{
            options: BLOOD_GROUPS.map((el) => ({ id: el, value: el })),
            title: "Select Blood Group",
          }}
        />

        <Input
          errors={errors}
          id="higher_education"
          register={register}
          type="select"
          title="Higher Education"
          required
          selectField={{
            options: EDUCATIONS.map((el) => ({ id: el, value: el })),
            title: "Select Higher Education",
          }}
        />

        <Input
          errors={errors}
          id="country"
          register={register}
          type="select"
          title="Country"
          required
          selectField={{
            options: COUNTRIES.map((el) => ({ id: el, value: el })),
            title: "Select Country",
          }}
        />

        <Input
          errors={errors}
          id="email"
          register={register}
          type="email"
          title="Email"
          required
        />

        <Input
          errors={errors}
          id="mobile"
          register={register}
          type="number"
          title="Phone No"
          required
          validations={{
            required: 'phone number is required',
            validate: {
              notAValidNo(val) {
                return (
                  val.toString().length === 10 ||
                  "please enter a valid phone no"
                );
              },
            },
          }}
        />
        <label
          htmlFor={`address`}
          className='col-span-full flex flex-col gap-2'>
          <span>
            Address <strong className='text-red-500'>*</strong>
          </span>
          <textarea
            {...register(`address`, {
              required: 'Address is required',
            })}
            placeholder=''
            id={"address"}
            className={`resize-none w-full h-full text-base py-2 px-3 rounded-md outline-none border bg-gray-100 focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'`}
            rows={4}></textarea>
        </label>

        <Input
          errors={errors}
          register={register}
          title='State'
          id='stateid'
          type='select'
          required
          validations={{
            required: 'State is required',
          }}
          selectField={{
            title: 'Select State',
            options: dropdownOptions?.states?.map((el) => ({
              id: el.id,
              value: el.state,
            })),
          }}
        />
        <Input
          errors={errors}
          register={register}
          title='Assembly Constituency'
          id='assemblyid'
          type='select'
          required={dropdownOptions?.assemblies
            .filter((el) => el.stateid === state_id)?.length > 0 ? true : false}
          validations={{
            required: 'Assembly Constituency is required',
          }}
          selectField={{
            title: 'Select Assembly Constituency',
            options: dropdownOptions?.assemblies
              .filter((el) => el.stateid === state_id)
              .map((el) => ({ id: el.id, value: el.assembly_name })),
          }}
        />
        <Input
          errors={errors}
          register={register}
          title='Parliament Constituency'
          id='parliamentaryid'
          type='select'
          required={dropdownOptions?.parliamentries
            .filter((el) => el.stateid === state_id)?.length > 0 ? true : false}
          validations={{
            required: 'Parliament Constituency is required',
          }}
          selectField={{
            title: 'Select Parliament Constituency',
            options: dropdownOptions?.parliamentries
              .filter((el) => el.stateid === state_id)
              .map((el) => ({ id: el.id, value: el.parliamentary_name })),
          }}
        />
        <Input
          errors={errors}
          register={register}
          title='Pincode'
          id='pincode'
          type='number'
          required
          validations={{
            validate: {
              notAValidNo(val) {
                return (
                  val.toString().length == 6 ||
                  "please enter a valid pincode"
                );
              },
            },
          }}
        />
      </div>

      <h3 className="text-2xl font-bold mt-5">Social Media Links</h3>

      <div className="grid grid-cols-3 gap-3">
        <Input
          errors={errors}
          id={"fb_link"}
          register={register}
          type="url"
          title="Facebook"
        />

        <Input
          errors={errors}
          id={"insta_link"}
          register={register}
          type="url"
          title="Instagram"
        />

        <Input
          errors={errors}
          id={"twitter_link"}
          register={register}
          type="url"
          title="Twitter / X"
        />
      </div>

      <Input
        errors={errors}
        id="about_me"
        register={register}
        type="textarea"
        rows={4}
        title="About Me"
        required
      />
      <div className="flex flex-col gap-2">
        <label
          htmlFor="signature"
          className={`flex flex-col gap-2 w-max cursor-pointer`}
        >
          <span className="capitalize font-[500] flex items-center gap-2">
            Upload Signature <FaSignature
              className="text-xl" />
          </span>
          <input
            type="file"
            id="signature"
            className="hidden"
            accept="image/*"
            {...register("signature" as any, {
              async onChange(e: ChangeEvent<HTMLInputElement>) {
                if (e.target.files) {
                  const file = (e.target.files as FileList)[0];

                  if (!file) return;

                  if (!file.type.includes("image")) return;

                  const signatureFile = await convertFileToBase64(file);

                  setSignature(signatureFile);
                  setValue("signature", signatureFile);

                  setSignatureDoc(file as any);
                }
              },
              validate: {

                notAImg(file) {
                  if (file) {
                    const type = (file as FileList)[0]?.type;

                    if (!type) return true;

                    return (
                      type.includes("image") ||
                      "Only Image files are allowed."
                    );
                  }

                },
              },
            })}
          />
        </label>
        {!signature && <span>No File selected</span>}
        {signature && (
          <div className="relative w-max">
            <Image
              src={signature?.includes('base64') ? signature : getImageUrl(signature)}
              alt=""
              width={1000}
              height={1000}
              className="w-20 aspect-square object-cover object-center bg-white"
            />

            <button
              type="button"
              onClick={() => {
                setSignature("");
                setValue("signature", "");
              }}
              className="absolute top-0 right-[-20%] rounded-full bg-gray-100 z-10 hover:scale-110 transition-all"
            >
              <BsX className="text-xl" />
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 mt-5">
        <Link
          href={ProtectedRoutes.userProfile}
          className="rounded px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50"
        >
          close
        </Link>
        <button
          className="rounded px-6 py-2 bg-orange-500 text-orange-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize"
          type="submit"
        >
          submit
        </button>
      </div>
    </form>
  );
};

export default EditForm;
