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
  // const [userData, setUserData] = useState<UserDetail>({
  //   token: "",
  //   id: "",
  // });
  const userData: any = cusSelector(
    (state: RootState) => state.auth.userDetails
  );
  const [isEditProfile, setIsEditProfile] = useState({});
  const dispatch = cusDispatch();
  // useEffect(() => {
  //   var storedUserString = sessionStorage.getItem("user");
  //   if (storedUserString !== null) {
  //     var storedUser = JSON.parse(storedUserString);

  //     setUserData(storedUser);
  //   } else {
  //     console.log("User data not found in session storage");
  //   }
  // }, []);

  console.log(userData);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue 
  } = useForm<UserDetails>({ mode: "onTouched" });

  const formSubmitHandler = async (data: UserDetails) => {
    console.log(data);
    var storedUserString = sessionStorage.getItem("user");
    var storedUser = JSON.parse(storedUserString as string);
    const citizenid = storedUser?.id;
   
    const postBody = {
      citizenid: citizenid,
      name: data?.username,
      email: data?.email,
      mobile: data?.mobile,
      image: userData?.image,
      gender: data?.gender,
      dob: data?.dob,
      blood_group: data?.blood_group,
      higher_education: data?.higher_education,
      country: data?.country,
      fb_link: data?.fb_link || "",
      insta_link: data?.insta_link || "",
      twitter_link: data?.twitter_link || "",
      about_me: data?.about_me,
    };

    console.log(postBody);

    const token = storedUser?.token;
    try {
      const editData = await fetchEditCitizenProfile(postBody, token);

     

      if (editData?.success) {
        const data = await fetchGetSingleCitizen(citizenid, token);
        console.log("fetchGetSingleCitizen",data);
        toast.success(editData?.message)
        dispatch(authActions.logIn(data));
        setIsEditProfile(editData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      // const citizenid = userData?.id;
      // const token = userData?.token;

      // console.log(citizenid?.length);
      // console.log(token);

      // if (citizenid?.length > 0) {
      //   try {
      var storedUserString = sessionStorage.getItem("user");
      var storedUser = JSON.parse(storedUserString as string);
      const citizenid = storedUser?.id;
      const token = storedUser?.token;
          const data = await fetchGetSingleCitizen(citizenid, token);

      dispatch(authActions.logIn(data));

      setValue('username', data?.username || '');
      setValue('email', data?.email || '');
      setValue('mobile', data?.mobile || '');
      setValue('gender', data?.gender || '');
      setValue('dob', moment(data?.dob).format("YYYY-MM-DD")  || '');
      setValue('blood_group', data?.blood_group || '');
      setValue('higher_education', data?.higher_education || '');
      setValue('country', data?.country || '');
      setValue('fb_link', data?.fb_link || '');
      setValue('insta_link', data?.insta_link || '');
      setValue('twitter_link', data?.twitter_link || '');    
      setValue('about_me', data?.about_me || '');

      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
    })();
  }, []);

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
          href={"/user/profile"}
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
