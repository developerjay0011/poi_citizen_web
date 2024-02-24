'use client'
import { sendOtp } from '@/redux_store/auth/authAPI';
import { motion as m } from 'framer-motion'
import { FC, FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

interface ForgetUserIdFieldProps {
  proceedFn: () => void,
  setUserINP: () => void,
  userINP: () => string,
}

export const ForgetUserIdField: FC<ForgetUserIdFieldProps> = ({
  proceedFn,setUserINP,userINP
}) => {
  const [registering, setRegistering] = useState(false);

  const resendOTP = async () => {
    try {
      if (userINP.length !== 0){
        setRegistering(true)
         const body = { mobile: userINP || "" };
        const sandOtp = await sendOtp(body);
          setRegistering(false)
          if (sandOtp?.success) {
          proceedFn()
         } else {
          toast.success(sandOtp.message);
        }
      }
      }catch (err) {
        setRegistering(false)
      }
  };
  const userIdSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    resendOTP()
  }

  return (
    <>
      <m.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='flex flex-col gap-8 w-full'
        onSubmit={userIdSubmitHandler}>
        <label htmlFor='userId' className='flex flex-col gap-4'>
          <span className='max-[500px]:text-[14px]'>
            Enter your phone number
          </span>

          <input
            value={userINP}
            onChange={(e) => setUserINP(e.target.value)}
            type='text'
            id='userId'
            className='bg-sky-100 border border-sky-400 py-2 px-3 w-full rounded-md outline-none text-sky-600'
          />
        </label>

        <div className='flex items-center self-center gap-2'>
          <button
            type='submit'
            disabled={registering}
            className='bg-sky-800 text-sky-50 py-2 px-5 rounded-full'>
            {registering?"Proceed...":"Proceed"}
          </button>
        </div>
      </m.form>
    </>
  )
}
