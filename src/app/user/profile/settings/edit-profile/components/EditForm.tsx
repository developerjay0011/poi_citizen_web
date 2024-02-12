"use client";
import { UserDetails } from "@/utils/typesUtils";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./EditInput";
import { BLOOD_GROUPS, COUNTRIES } from "@/utils/utility";
import Link from "next/link";
import {
  fetchEditCitizenProfile,
  fetchGetSingleCitizen,
} from "@/components/api/profile";

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
  const [userData, setUserData] = useState<UserDetail>({
    token: "",
    id: "",
  });

  const [isEditProfile, setIsEditProfile] = useState({});

  useEffect(() => {
    var storedUserString = sessionStorage.getItem("user");
    if (storedUserString !== null) {
      var storedUser = JSON.parse(storedUserString);

      setUserData(storedUser);
    } else {
      console.log("User data not found in session storage");
    }
  }, []);

  console.log(userData);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue 
  } = useForm<UserDetails>({ mode: "onTouched" });

  const formSubmitHandler = async (data: UserDetails) => {
    console.log(data);

    const postBody = {
      citizenid: userData?.id,
      name: data?.firstname,
      email: data?.email,
      mobile: data?.phoneNo,
      image: "",
      gender: data?.gender,
      dob: data?.dob,
      blood_group: data?.bloodGroup,
      higher_education: data?.higherEducation,
      country: data?.country,
      fb_link: data?.socialMedia?.facebook,
      insta_link: data?.socialMedia?.instagram,
      twitter_link: data?.socialMedia?.twitter,
      about_me: data?.about,
    };

    console.log(postBody);

    const token = userData?.token;

    try {
      const editData = await fetchEditCitizenProfile(postBody, token);

      console.log(editData);

      if (editData?.success) {
        setIsEditProfile(editData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const citizenid = userData?.id;
      const token = userData?.token;

      console.log(citizenid?.length);
      console.log(token);

      if (citizenid?.length > 0) {
        try {
          const data = await fetchGetSingleCitizen(citizenid, token);

          console.log(data);


          setValue('firstname', data?.username || '');
          setValue('email', data?.email || '');
          setValue('phoneNo', data?.mobile || '');
          setValue('gender', data?.gender || '');
          setValue('dob', data?.dob || '');
          setValue('bloodGroup', data?.blood_group || '');
          setValue('higherEducation', data?.higher_education || '');
          setValue('country', data?.country || '');
          setValue('socialMedia', {
            facebook: data?.fb_link || '',
            instagram: data?.insta_link || '',
            twitter: data?.twitter_link || '',
          });
          
          setValue('about', data?.about_me || '');

        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [isEditProfile]);

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
          id="firstname"
          register={register}
          type="text"
          title="First Name"
          required
        />

        <Input
          errors={errors}
          id="lastname"
          register={register}
          type="text"
          title="Last Name"
          required
        />

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
          id="bloodGroup"
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
          id="higherEducation"
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
          id="phoneNo"
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
          id={"socialMedia.facebook" as keyof UserDetails}
          register={register}
          type="url"
          title="Facebook"
        />

        <Input
          errors={errors}
          id={"socialMedia.instagram" as keyof UserDetails}
          register={register}
          type="url"
          title="Instagram"
        />

        <Input
          errors={errors}
          id={"socialMedia.twitter" as keyof UserDetails}
          register={register}
          type="url"
          title="Twitter / X"
        />
      </div>

      <Input
        errors={errors}
        id="about"
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
