'use client'
import { FC, useState } from 'react'
import { motion as m } from 'framer-motion'
import { BiX } from 'react-icons/bi'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md'
import { cusDispatch } from '@/redux_store/cusHooks'
import { addNewContribution } from '@/redux_store/contributions/contributionAPI'

interface ContributionFormProps {
  onClose: () => void
}

export interface ContributionFormFields {
  leaderId: string
  contributionType: string
  contributorName: string
  contributorMobileNo: string
  money: {
    mode: string
    amount: number
  }
  ration: {
    quantity: number
    description: string
  }
  clothes: {
    quantity: number
    description: string
  }
  others: {
    description: string
  }
}

interface Attachment {
  type: string
  file: string
}

type DESC_VALS = 'others' | 'ration' | 'clothes'

const CONTRIBUTION_TYPE = ['money', 'ration', 'clothes', 'others']
const MONEY_MODE = ['cash', 'cheque']

export const ContributionForm: FC<ContributionFormProps> = ({ onClose }) => {
  const [attachments, setAttachments] = useState<Attachment | null>(null)
  const [selfContributor, setSelfContributor] = useState(true)
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContributionFormFields>()

  const dispatch = cusDispatch()

  const formSubmitHandler = (data: ContributionFormFields) => {
    console.log(data)

    dispatch(addNewContribution({ ...data }))
  }

  return (
    <>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed top-0 left-0 w-full h-[100dvh] z-10 '>
        <div
          className={`w-full h-full backdrop-blur-[3px] bg-sky-950 bg-opacity-40 z-20 overflow-y-scroll flex justify-center`}>
          <m.section
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className='z-30 border self-start bg-white mt-10 relative mb-5 w-1/2 rounded-md shadow-md max-[1450px]:w-[65%] max-[950px]:w-[80%] max-[700px]:w-[90%] max-[600px]:w-[95%] max-[650px]:mt-5'>
            <button
              type='button'
              onClick={onClose}
              className='absolute top-3 right-3 z-40'>
              <BiX className='text-3xl' />
            </button>
            <h3 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-5 border-b font-semibold text-3xl'>
              Add a Contribution
            </h3>

            <form
              className='flex flex-col px-7 py-5 mt-5 gap-5 max-[550px]:px-4'
              noValidate
              onSubmit={handleSubmit(formSubmitHandler)}>
              <section className='grid gap-4 grid-cols-2 max-[650px]:grid-cols-1 max-[650px]:gap-y-4'>
                <label
                  htmlFor='contributor'
                  className={`flex items-center gap-8 col-span-full mb-3`}>
                  <span className='capitalize font-[500]'>
                    contributor
                    {<strong className='text-rose-500'>*</strong>}
                  </span>

                  <div className='flex items-center gap-5'>
                    <label
                      htmlFor='self'
                      className='flex items-center cursor-pointer gap-2 w-full'>
                      <input
                        type='radio'
                        id='self'
                        name='type'
                        className='permission_checkbox hidden'
                        defaultChecked={selfContributor}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelfContributor(true)
                            setValue('contributorName', '')
                            setValue('contributorMobileNo', '')
                          }
                        }}
                      />
                      <span className='un_checked_box'>
                        <MdOutlineCheckBoxOutlineBlank className='text-2xl text-orange-600' />
                      </span>
                      <span className='checked_box hidden'>
                        <MdOutlineCheckBox className='text-2xl text-orange-600' />
                      </span>

                      <p className='capitalize text-md font-medium'>self</p>
                    </label>
                    <label
                      htmlFor='others'
                      className='flex items-center cursor-pointer gap-2 w-full'>
                      <input
                        type='radio'
                        id='others'
                        name='type'
                        className='permission_checkbox hidden'
                        onChange={(e) => {
                          if (e.target.checked) setSelfContributor(false)
                        }}
                      />
                      <span className='un_checked_box'>
                        <MdOutlineCheckBoxOutlineBlank className='text-2xl text-orange-600' />
                      </span>
                      <span className='checked_box hidden'>
                        <MdOutlineCheckBox className='text-2xl text-orange-600' />
                      </span>

                      <p className='capitalize text-md font-medium'>others</p>
                    </label>
                  </div>
                </label>

                {!selfContributor && (
                  <>
                    <label
                      htmlFor='contributorName'
                      className={`flex flex-col gap-2`}>
                      <span className='capitalize font-[500]'>
                        contributor name
                        {<strong className='text-rose-500'>*</strong>}
                      </span>

                      <input
                        type='text'
                        {...register('contributorName', {
                          required: 'contributor name is requried',
                        })}
                        className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all capitalize focus:bg-slate-200 focus:border-slate-400'
                      />
                      <ErrorMessage
                        name={'contributorName'}
                        errors={errors}
                        as={'span'}
                        className='text-red-500 text-sm first-letter:capitalize lowercase'
                      />
                    </label>

                    <label
                      htmlFor='contributorMobileNo'
                      className={`flex flex-col gap-2`}>
                      <span className='capitalize font-[500]'>
                        contributor Mobile no
                        {<strong className='text-rose-500'>*</strong>}
                      </span>
                      <input
                        type='number'
                        placeholder='XXXXXXXXXX'
                        {...register('contributorMobileNo', {
                          required: 'Mobile no is required',
                          validate: {
                            validNo(val) {
                              return (
                                val.length === 10 ||
                                'please enter a 10 digit number'
                              )
                            },
                          },
                        })}
                        className='border num_inp border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all capitalize focus:bg-slate-200 focus:border-slate-400'
                      />
                      <ErrorMessage
                        name={'contributorMobileNo'}
                        errors={errors}
                        as={'span'}
                        className='text-red-500 text-sm first-letter:capitalize lowercase'
                      />
                    </label>
                  </>
                )}

                <label
                  htmlFor='contributionType'
                  className={`flex flex-col gap-2`}>
                  <span className='capitalize font-[500]'>
                    contribution Type
                    {<strong className='text-rose-500'>*</strong>}
                  </span>
                  <select
                    id='contributionType'
                    className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all capitalize'
                    {...register('contributionType', {
                      required: 'contributionType is required',
                      onChange(e) {
                        if (e.target.value === 'others' || !e.target.value) {
                          setValue('clothes', { description: '', quantity: 0 })
                          setValue('ration', { description: '', quantity: 0 })
                          setValue('money', { mode: '', amount: 0 })
                        }

                        if (e.target.value === 'ration') {
                          setValue('clothes', { description: '', quantity: 0 })
                          setValue('money', { mode: '', amount: 0 })
                        }

                        if (e.target.value === 'money') {
                          setValue('clothes', { description: '', quantity: 0 })
                          setValue('ration', { description: '', quantity: 0 })
                        }
                      },
                    })}>
                    <option value=''>select type</option>
                    {CONTRIBUTION_TYPE.map((el) => (
                      <option value={el} key={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name={'contributionType'}
                    errors={errors}
                    as={'span'}
                    className='text-red-500 text-sm first-letter:capitalize lowercase'
                  />
                </label>

                <label htmlFor='leader' className={`flex flex-col gap-2`}>
                  <span className='capitalize font-[500]'>
                    select leader
                    {<strong className='text-rose-500'>*</strong>}
                  </span>
                  <select
                    id='leader'
                    className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all capitalize'
                    {...register('leaderId', {
                      required: 'leader is required',
                    })}>
                    <option value=''>select leader</option>
                    <option value='narender-modi'>narender modi</option>
                    <option value='r.k.singh'>r.k singh</option>
                  </select>
                  <ErrorMessage
                    name={'leader'}
                    errors={errors}
                    as={'span'}
                    className='text-red-500 text-sm first-letter:capitalize lowercase'
                  />
                </label>

                {watch('contributionType') === 'money' && (
                  <label htmlFor='moneyMode' className={`flex flex-col gap-2`}>
                    <span className='capitalize font-[500]'>
                      select mode
                      {<strong className='text-rose-500'>*</strong>}
                    </span>
                    <select
                      id='moneyMode'
                      className='border border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all capitalize'
                      {...register('money.mode', {
                        required: 'money mode is required',
                        onChange(e) {
                          if (e.target.value !== 'cash') {
                            setValue('money.amount', 0)
                          }
                        },
                      })}>
                      <option value=''>select mode</option>
                      {MONEY_MODE.map((el) => (
                        <option value={el} key={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      name={'money.mode'}
                      errors={errors}
                      as={'span'}
                      className='text-red-500 text-sm first-letter:capitalize lowercase'
                    />
                  </label>
                )}

                {watch('contributionType') === 'money' &&
                  watch('money.mode') === 'cash' && (
                    <label htmlFor='moneyQty' className={`flex flex-col gap-2`}>
                      <span className='font-[500]'>
                        Enter Amount (in INR)
                        <strong className='text-rose-500'>*</strong>
                      </span>
                      <input
                        type='number'
                        id='moneyQty'
                        placeholder=''
                        {...register('money.amount', {
                          required: 'amount is required',
                          valueAsNumber: true,
                          validate: {
                            validAmount(val) {
                              return (
                                (+val > 0 && +val <= 2000) ||
                                'amount must greater than 0 and less than 2000'
                              )
                            },
                          },
                        })}
                        className='border num_inp border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all capitalize focus:bg-slate-200 focus:border-slate-400'
                      />
                      <ErrorMessage
                        name={'money.amount'}
                        errors={errors}
                        as={'span'}
                        className='text-red-500 text-sm first-letter:capitalize lowercase'
                      />
                    </label>
                  )}

                {(watch('contributionType') === 'ration' ||
                  watch('contributionType') === 'clothes') && (
                  <label htmlFor='clothesQty' className={`flex flex-col gap-2`}>
                    <span className='font-[500]'>
                      Enter Quantity
                      <strong className='text-rose-500'>*</strong>
                    </span>
                    <input
                      type='number'
                      id='clothesQty'
                      placeholder=''
                      {...register(
                        `${
                          watch('contributionType') === 'food/ration'
                            ? 'ration.quantity'
                            : 'clothes.quantity'
                        }`,
                        {
                          required: 'quantity is required',
                          valueAsNumber: true,
                        }
                      )}
                      className='border num_inp border-slate-300 bg-slate-100 py-[.7rem] px-4 outline-none rounded-md text-base transition-all capitalize focus:bg-slate-200 focus:border-slate-400'
                    />
                    <ErrorMessage
                      name={`${
                        watch('contributionType') === 'food/ration'
                          ? 'ration.quantity'
                          : 'clothes.quantity'
                      }`}
                      errors={errors}
                      as={'span'}
                      className='text-red-500 text-sm first-letter:capitalize lowercase'
                    />
                  </label>
                )}

                {watch('contributionType') &&
                  watch('contributionType') !== 'money' && (
                    <label
                      htmlFor='description'
                      className={`flex flex-col gap-2 col-span-full`}>
                      <span className='font-[500]'>
                        Description
                        {watch('contributionType') === 'others' && (
                          <strong className='text-rose-500'>*</strong>
                        )}
                      </span>
                      <textarea
                        rows={5}
                        // conditionally assigning register function value
                        {...register(
                          `${
                            watch('contributionType') as DESC_VALS
                          }.description`
                        )}
                        className='border num_inp border-slate-300 bg-slate-100 py-[.9rem] px-4 outline-none rounded-md text-base transition-all capitalize focus:bg-slate-200 focus:border-slate-400 resize-none'></textarea>
                      <ErrorMessage
                        name={'money.amount'}
                        errors={errors}
                        as={'span'}
                        className='text-red-500 text-sm first-letter:capitalize lowercase'
                      />
                    </label>
                  )}
              </section>

              <div className='w-full bg-zinc-200 h-[1px] mt-3' />

              <div className='flex flex-row-reverse self-end gap-2 max-[580px]:self-stretch max-[580px]:flex-wrap'>
                <button
                  onClick={onClose}
                  className='py-2 px-5 bg-orange-200 text-orange-500 rounded-full capitalize'
                  type='button'>
                  close
                </button>
                <button
                  className='py-2 px-5 rounded-full capitalize border border-orange-500 text-orange-50 bg-orange-500 hover:bg-orange-100 hover:text-orange-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 font-[500] disabled:border-none'
                  type='submit'>
                  add contribution
                </button>
              </div>
            </form>
          </m.section>
        </div>
      </m.div>
    </>
  )
}
