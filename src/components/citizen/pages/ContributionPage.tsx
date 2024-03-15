'use client'
import { AnimatePresence } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { ContributionForm } from '../forms/ContributionsForm'
import { cusDispatch, cusSelector } from '@/redux_store/cusHooks'
import { tryCatch } from '@/config/try-catch'
import { DeleteContribution, GetContributions } from '@/redux_store/contributions/contributionAPI'
import { contributionsActions } from '@/redux_store/contributions/contributionsSlice'
import { MdDelete, MdEdit } from 'react-icons/md'
import { ConfirmDialogBox } from '@/utils/ConfirmDialogBox'
import toast from 'react-hot-toast'

export const ContributionPage: FC = () => {
  const [searchString, setSearchString] = useState('')
  const [showContributionForm, setShowContributionForm] = useState(false)
  const [isEdit, setEdit] = useState(false)
  const [contributionid, setcontributionid] = useState()
  const [sort, setSort] = useState<any>(5);
  const { contributions } = cusSelector((st) => st.contribution);
  const [showConfirmBox, setShowConfirmBox] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const showForm = () => setShowContributionForm(true)
  const closeForm = () => setShowContributionForm(false)
  const dispatch = cusDispatch();
  const { userDetails } = cusSelector((st) => st.auth);
  const searchFilteredRequests = contributions.filter((el) =>
    searchString ? el.id.toLowerCase().includes(searchString) : el
  ).slice(0, sort == "All" ? contributions?.length : sort);
  const getContributions = async () => {
    tryCatch(
      async () => {
        if (userDetails?.id) {
          const data = await GetContributions(userDetails?.id);
          dispatch(contributionsActions.storeContributions(data));
        }
      }
    )
  };
  useEffect(() => {
    getContributions()
  }, [dispatch, userDetails]);

  const requestDeleteFn = async () => {
    tryCatch(
      async () => {
        if (userDetails?.id) {
          const data = await DeleteContribution(contributionid || "");
          if (data?.success) {
            toast.success(data.message);
            getContributions()
            setShowConfirmBox(false)
          }
        }
      }
    )
  };

  return (
    <>
      <section className='flex flex-col border rounded-md bg-white flex-grow self-start'>
        <h2 className='flex items-center after:h-1/2 after:w-[3px] after:bg-orange-600 after:rounded-full after:absolute after:top-1/2 after:translate-y-[-50%] after:left-0 relative px-7 py-4 text-[22px] font-semibold capitalize border-b'>
          my contributions
        </h2>

        <section className='flex flex-col gap-5 p-5 mt-5'>
          <div className='flex justify-between items-end max-[550px]:flex-col max-[550px]:items-start'>
            <section className='flex flex-col gap-3'>
              <h2 className='text-lg font-semibold'>Filters</h2>

              <div className='flex items-center gap-3 max-[700px]:flex-col max-[700px]:items-start'>
                <label htmlFor='filter' className='flex items-center gap-2'>
                  <span>Sort by</span>
                  <select
                    id='filter'
                    value={sort}
                    onChange={(e) =>
                      setSort(e.target.value)
                    }
                    className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md cursor-pointer'>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                     <option value="All">All</option>
                  </select>
                </label>
              </div>
            </section>

            <section className='flex flex-col gap-5 max-[550px]:ml-auto max-[460px]:mt-4'>
              {/* CTA'S */}
              <div className='flex items-center justify-end gap-3'>
                {/* ADD OR EDIT Button */}
                <button
                  className='px-5 py-2 bg-orange-500 text-orange-50 rounded-md text-sm capitalize transition-all hover:bg-orange-600'
                  onClick={() => { showForm(), setEdit(false) }}>
                  add new contribution
                </button>
              </div>

              {/* FILTERS */}
              <div className='flex items-center gap-3 justify-end'>
                {/* SEARCH FILTER */}
                <label className='relative'>
                  <input
                    type='search'
                    className='py-1 px-3 text-md border border-gray-300 text-gray-900 bg-white rounded-md outline-none capitalize focus:bg-gray-50 focus:border-gray-400 transition-all'
                    placeholder='search contribution'
                    value={searchString}
                    onChange={(e) =>
                      setSearchString(e.target.value.toLowerCase())
                    }
                  />
                  {searchString.length === 0 && (
                    <button className='absolute top-[8px] right-2'>
                      <FiSearch className='stroke-gray-400' />
                    </button>
                  )}
                </label>
              </div>


            </section>

          </div>
          <div className="overflow-y-scroll flex-1 main_scrollbar">
            <ul className='grid grid-cols-3 max-[1160px]:grid-cols-2 max-[670px]:grid-cols-1 gap-5'>
              {searchFilteredRequests.length > 0 &&
                searchFilteredRequests.map((item: any, index: number) => {
                  return (
                    <li key={index} className='border rounded-md overflow-hidden w-full bg-gray-50 shadow-sm py-3 px-3 flex flex-col'>
                      <p className='capitalize flex items-center gap-3 text-[14px]'>
                        <span className='font-[600]'>ID : </span>
                        <span className='text-[13px]'>{item?.id}</span>
                      </p>
                      {item?.contributor && <p className='capitalize flex items-center gap-3 text-[14px]'>
                        <span className='font-[600]'>Contributor : </span>
                        <span className='text-[13px]'>{item?.contributor}</span>
                      </p>}
                      {item?.contribution_type && <p className='capitalize flex items-center gap-3 text-[14px]'>
                        <span className='font-[600]'>Type : </span>
                        <span className='text-[13px]'>{item?.contribution_type}</span>
                      </p>}
                      {item?.contributor_mobile && <p className='capitalize flex items-center gap-3 text-[14px]'>
                        <span className='font-[600]'>Mobile : </span>
                        <span className='text-[13px]'>{item?.contributor_mobile}</span>
                      </p>}
                      {item?.mode ? <p className='capitalize flex items-center gap-3 text-[14px]'>
                        <span className='font-[600]'>Mode : </span>
                        <span className='text-[13px]'>{item?.mode}</span>
                      </p> : null}
                      {item?.amount ? <p className='capitalize flex items-center gap-3 text-[14px]'>
                        <span className='font-[600]'>Amount : </span>
                        <span className='text-[13px]'>{item?.amount}</span>
                      </p> : null}
                      {item?.quantity ? <p className='capitalize flex items-center gap-3 text-[14px]'>
                        <span className='font-[600]'>Quantity : </span>
                        <span className='text-[13px]'>{item?.quantity}</span>
                      </p> : null}
                      {item?.description && <p className='capitalize flex items-center gap-3 text-[14px]'>
                        <span className='font-[600]'>Description : </span>
                        <span className='text-[13px]'>{item?.description}</span>
                      </p>}
                      <div className='flex items-end justify-end' >
                        <button
                          type="button"
                          onClick={() => { showForm(), setEdit(true), setSelectedValue(item) }}
                          className="outline-none hover:scale-110 active:scale-100 hover:text-orange-500"
                        >
                          <MdEdit className="text-2xl" />
                        </button>
                        <button
                          type="button"
                          onClick={() => { setShowConfirmBox(true), setcontributionid(item.id) }}
                          className="outline-none hover:scale-110 active:scale-100 hover:text-orange-500"
                        >
                          <MdDelete className="text-2xl" />
                        </button>

                      </div>
                    </li>
                  )
                })}
            </ul>
            {contributions?.length == 0 &&
              <h3 className="col-span-full text-center py-10 capitalize text-3xl">
                No Contributions Found!!
              </h3>
            }
          </div>
        </section>
      </section>
      <AnimatePresence mode="wait">
        {showConfirmBox && (
          <ConfirmDialogBox
            noAllowed={false}
            onCancel={() => setShowConfirmBox(false)}
            onOk={requestDeleteFn}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showContributionForm && <ContributionForm isEdit={isEdit} selectedValue={selectedValue} handleAdd={() => getContributions()} onClose={closeForm} />}
      </AnimatePresence>
    </>
  )
}
