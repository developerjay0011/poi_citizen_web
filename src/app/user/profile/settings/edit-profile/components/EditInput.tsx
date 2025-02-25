import { UserDetails } from '@/utils/typesUtils'
import { ErrorMessage } from '@hookform/error-message'
import { FC, HTMLInputTypeAttribute, useState } from 'react'
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'

interface InputProps {
  errors: FieldErrors<UserDetails>
  id: keyof UserDetails
  register: UseFormRegister<UserDetails>
  validations?: RegisterOptions<UserDetails, keyof UserDetails>
  title: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  type: HTMLInputTypeAttribute | 'select' | 'textarea'
  selectField?: {
    options: { id: string; value: string }[]
    title: string
  }
  rows?: number
  readOnly?: boolean
  min?: any
  max?: any
}

export const Input: FC<InputProps> = ({
  errors,
  id,
  register,
  validations,
  required,
  placeholder,
  title,
  type,
  selectField,
  rows,
  readOnly,
  min,
  max
}) => {
  const [isPassword, setIsPassword] = useState(type === 'password')
  const mins = min ? { min: min } : {}
  const maxs = max ? { max: max } : {}
  const InputFieldType =
    type === 'select' || type === 'textarea' ? type : 'normal'
  let listdata = type === 'select' && Array.isArray(selectField?.options) ? Shortarray(selectField?.options) : []

  const INPUT = {
    textarea: (
      <textarea
        readOnly={readOnly || false}
        id={id}
        {...register(id, {
          ...validations,
          required: {
            value: required ? true : false,
            message: 'Field is required',
          },
        })}
        rows={rows || 3}
        placeholder={placeholder}
        className={`w-full num_inp text-base py-3 px-3 rounded-md outline-none border resize-none ${errors[id]
          ? 'bg-red-100 text-red-500 border-red-400'
          : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
          }`}
      />
    ),
    normal: (
      <div className='relative'>
        <input
          readOnly={readOnly || false}
          id={id}
          {...mins}
          {...maxs}
          type={type === 'password' ? (isPassword ? 'password' : 'text') : type} // conditionaly setting type of input field and then also consitionally setting type in case of password.
          {...register(id, {
            ...validations,
            required: {
              value: required ? true : false,
              message: 'Field is required',
            },
          })}
          placeholder={placeholder}
          className={`w-full num_inp py-2 text-base px-3 rounded-md outline-none border ${errors[id]
            ? 'bg-red-100 text-red-500 border-red-400'
            : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
            }`}
        />

        {type === 'password' && (
          <span
            onClick={() => setIsPassword((lst) => !lst)}
            className={`cursor-pointer absolute top-1/2 translate-y-[-50%] right-3 ${errors[id] ? 'text-red-500' : ''
              }`}>
            {isPassword ? <HiEyeOff /> : <HiEye />}
          </span>
        )}
      </div>
    ),
    select:
      type === 'select' && selectField ? (
        <select
          id={id}
          {...register(id, {
            ...validations,
            required: {
              value: required ? true : false,
              message: 'Field is required',
            },
          })}
          className={`w-full capitalize num_inp text-base py-2 px-3 rounded-md outline-none border ${errors[id]
            ? 'bg-red-100 text-red-500 border-red-400'
            : 'focus:border-gray-300 focus:bg-gray-100 border-gray-200 text-gray-700 bg-gray-50'
            }`}>
          <option value=''>
            {listdata?.length > 0
              ? selectField.title
              : `No ${selectField.title.split(' ').at(-1)} Found !!`}
          </option>
          {listdata?.map((el) => (
            <option value={el.id} key={el.id}>
              {el.value}
            </option>
          ))}
        </select>
      ) : (
        <></>
      ),
  }

  return (
    <label htmlFor={id} className={`flex flex-col gap-1 w-full`}>
      <span className='font-semibold'>
        {title} {required && <strong className='text-red-500'>*</strong>}
      </span>

      {INPUT[InputFieldType as keyof typeof INPUT]}

      <ErrorMessage
        as={'span'}
        errors={errors}
        name={id}
        className='text-sm text-red-500'
      />
    </label>
  )
}
export const Shortarray = (selectOptions: any, key = "value") => {
  const clonedOptions = Array.isArray(selectOptions) ? [...selectOptions] : []
  const sortedOptions = clonedOptions?.sort((a: any, b: any) => { return a[key].toLowerCase().localeCompare(b[key].toLowerCase()); });
  return sortedOptions;
}