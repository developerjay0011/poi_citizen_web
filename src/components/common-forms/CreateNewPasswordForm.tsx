'use client'
import { FC, FormEvent } from 'react'
import { motion as m } from 'framer-motion'

interface CreateNewPasswordFormProps {
  proceedFn: () => void
}

export const CreateNewPasswordForm: FC<CreateNewPasswordFormProps> = ({
  proceedFn,
}) => {
  const newPasswordSubmitHandler = (e: FormEvent) => {
    e.preventDefault()

    proceedFn()
  }

  return (
    <>
      <m.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='flex flex-col gap-5 w-full'
        onSubmit={newPasswordSubmitHandler}>
        <label htmlFor='userId' className='flex flex-col gap-2'>
          <span className='max-[500px]:text-[14px]'>Create New password</span>

          <input
            type='password'
            className='bg-sky-100 border border-sky-400 py-2 px-3 w-full rounded-md outline-none text-sky-600'
          />
        </label>

        <label htmlFor='userId' className='flex flex-col gap-2'>
          <span className='max-[500px]:text-[14px]'>Confirm New password</span>

          <input
            type='text'
            className='bg-sky-100 border border-sky-400 py-2 px-3 w-full rounded-md outline-none text-sky-600'
          />
        </label>

        <div className='flex items-center self-center gap-2 mt-4'>
          <button
            type='submit'
            className='bg-sky-800 text-sky-50 py-2 px-5 rounded-full capitalize'>
            submit
          </button>
        </div>
      </m.form>
    </>
  )
}
