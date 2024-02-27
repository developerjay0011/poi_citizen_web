"use client";
import { UserDetails } from "@/utils/typesUtils";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./EditInput";
import { BLOOD_GROUPS, COUNTRIES } from "@/utils/utility";
import toast from 'react-hot-toast';
import Link from "next/link";
import moment from "moment";
import {
  fetchEditCitizenProfile,
  fetchGetSingleCitizen,
} from "@/components/api/profile";
import { cusDispatch, cusSelector } from "@/redux_store/cusHooks";
import { authActions } from "@/redux_store/auth/authSlice"

import { RootState } from "@/redux_store";
interface EditFormProps {}

const genders = ["male", "female", "others"];

const EDUCATIONS = [
  "10th Pass",
  "12th Pass",
  "Under Graduate",
  "Post Graduate",
  "P.H.D",
];

interface UserDetail {
  token: string;
  id: string;
}

const EditForm: FC<EditFormProps> = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserDetails>({ mode: 'onTouched' })

  const formSubmitHandler = (data: UserDetails) => {
    console.log(data)
  }

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

      <div className="flex justify-end gap-2 mt-5">
        <Link
          href={'/user/profile'}
          className='rounded px-6 py-2 bg-orange-200 text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] capitalize hover:bg-orange-500 hover:text-orange-50'>
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
