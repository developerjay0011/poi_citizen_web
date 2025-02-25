import { BriefLeaderDetails } from '@/components/citizen/forms/RequestComplaintForm'
import { getImageUrl } from '@/config/get-image-url'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'
import { BiX } from 'react-icons/bi'
import { MdArrowDropDown } from 'react-icons/md'
import { LeaderDetails } from './typesUtils'
import CustomImage from './CustomImage'
import toast from 'react-hot-toast'
import { Shortarray } from '@/app/user/profile/settings/edit-profile/components/EditInput'

interface ImageMultiSelectIPProps {
  options: LeaderDetails[] | any[]
  placeholder: string
  setValue: (val: LeaderDetails[] | '') => void
  title: string
  svalue: LeaderDetails[]
}

export const ImageMultiSelectIP: FC<ImageMultiSelectIPProps> = ({
  options,
  placeholder,
  setValue,
  title,
  svalue
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const [filterStr, setFilterStr] = useState('')
  const [selectedLeaders, setSelectedLeaders] = useState<LeaderDetails[]>(
    []
  )

  const filteredOptions = options?.map((i) => ({ ...i, id: i?.leaderid })).filter((el: any) => filterStr ? el.name.toLowerCase().includes(filterStr) : el)
  const listdata = Shortarray(filteredOptions, "name")

  useEffect(() => {
    const showOptionsEventListener = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('#multiSelectImgField'))
        setShowOptions(false)
    }
    setSelectedLeaders(svalue)
    document.addEventListener('click', showOptionsEventListener)

    return () => {
      document.removeEventListener('click', showOptionsEventListener)
    }
  }, [])

  useEffect(() => {
    selectedLeaders.length > 0 ? setValue(selectedLeaders) : setValue('')
  }, [selectedLeaders, setValue])


  return (
    <>
      <section className='flex flex-col gap-2'>
        <span className='capitalize font-[500]'>
          {title}
          {<strong className='text-rose-500'>*</strong>}
        </span>
        <section
          id='multiSelectImgField'
          className={`flex items-center border border-slate-300 bg-slate-100 py-[.5rem] pr-[.4rem] rounded-md gap-2 cursor-pointer relative ${selectedLeaders.length > 0 ? 'pl-3' : 'pl-4'
            }`}>
          <div className='flex flex-wrap items-center gap-1 flex-1'>
            {selectedLeaders.map((el: any) => (
              <span
                key={el.id}
                className='flex capitalize pl-3 pr-1 w-max bg-white items-center gap-1 border border-slate-300 rounded text-[14px]'>
                {el.name}
                <BiX
                  className='text-lg cursor-pointer'
                  onClick={() =>
                    // Removing fields on user demand
                    setSelectedLeaders((lst) => {
                      const oldData = [...lst]

                      const index = oldData.findIndex((val) => val === el)

                      oldData.splice(index, 1)

                      return oldData
                    })
                  }
                />
              </span>
            ))}
            <input
              type='search'
              value={filterStr}
              onChange={(e) => {
                setFilterStr(e.target.value.toLowerCase())

                if (e.target.value.length !== 0) setShowOptions(true)
                else setShowOptions(false)
              }}
              className='flex-1 capitalize bg-transparent outline-none'
              placeholder={placeholder}
            />
          </div>

          <MdArrowDropDown
            className='text-3xl'
            onClick={() => {
              setShowOptions((lst) => !lst)
            }}
          />

          <ul
            className={`absolute top-full z-[100] bg-white left-0 w-full border-gray-600 shadow-md rounded overflow-hidden flex flex-col`}>
            {showOptions && (
              <>
                {listdata?.length > 0 ? (
                  listdata?.map((el: any) => (
                    <li
                      key={el.id}
                      onClick={() => {
                        if (selectedLeaders?.length > 3) {
                          toast.error("you can only select 3 leader")
                        } else {
                          setSelectedLeaders((lst) => {
                            const leaders = [...lst]

                            const index = leaders.findIndex(
                              (leader) => leader.id === el.id
                            )

                            if (index === -1) leaders.push({ ...el })

                            return leaders
                          })
                          setShowOptions(false)
                          setFilterStr('')
                        }



                      }}
                      className='flex items-center hover:bg-slate-100 p-3 gap-3 last_noti border-slate-200'>
                      <CustomImage
                        src={getImageUrl(el.image)}
                        alt="trending user"
                        width={1000}
                        height={1000}
                        className="rounded-full w-12 aspect-square object-cover object-center"
                      />
                      <div className='flex flex-col text-sm'>
                        <h6 className='font-medium capitalize'>{el.name}</h6>
                        <p className='text-gray-500 capitalize text-align-left'>
                          {el.designation}{el.state ? `(${el.state})` : ''}{el.consituency ? `(${el.consituency})` : ''}{el.political_party ? `(${el.political_party})` : ""}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className='py-3  text-center'>No Data Found❗</li>
                )}
              </>
            )}
          </ul>
        </section>
      </section>
    </>
  )
}
