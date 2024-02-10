import { LoginFormFields, RegisterFormFields } from '@/utils/typesUtils'
import { AESEncrypt, ConnectToAPI, GenerateId } from '@/utils/utility'

// Register User
type Register = (obj: { data: RegisterFormFields }) => () => Promise<string>

export const registerUser: Register =
  ({ data }) =>
  async () => {
    const id = GenerateId().substring(0, 16)

    // Converting AddInfo object in JSON string
    const addInfo = JSON.stringify({
      full_name: data.fullName,
      email_id: data.email,
      mobile_no: data.phoneNo,
      pass: data.password,
      userType: data.userType,
    })

    // Encrypting above data with a unique/random id
    const encData = AESEncrypt(addInfo, id)

    const body = JSON.stringify({
      eventID: '1',
      addInfo: {
        encData,
        id,
      },
    })

    const res = await ConnectToAPI('http://210.210.210.31:30702/login', body)

    return res
  }

// Verify OTP
type VerifyOTP = (
  data: RegisterFormFields,
  otp: string
) => () => Promise<string>

export const verifyRegisterOTP: VerifyOTP = (data, otp) => async () => {
  const id = GenerateId().substring(0, 16)

  const addInfo = JSON.stringify({
    mobile_no: data.phoneNo,
    otp,
    email_id: data.email,
    userType: data.userType,
  })

  const encData = AESEncrypt(addInfo, id)

  const body = JSON.stringify({
    eventID: '2',
    addInfo: {
      encData,
      id,
    },
  })

  const res = await ConnectToAPI('http://210.210.210.31:30702/login', body)

  return res
}

// Log user in
export const userLogin = (data: LoginFormFields) => async () => {
  const id = GenerateId().substring(0, 16)

  const addInfo = JSON.stringify({
    userId: data.userId,
    pass: data.password,
    userType: 'citizen',
  })

  const encData = AESEncrypt(addInfo, id)

  const body = JSON.stringify({
    eventID: '3',
    addInfo: {
      encData,
      id,
    },
  })

  const res = await ConnectToAPI('http://210.210.210.31:30702/login', body)

  return res
}

//
export const verifyUserId = (phoneNo: string, guid: string) => async () => {
  const body = JSON.stringify({
    eventID: '8',
    addInfo: {
      country_code: '91',
      mobile_no: phoneNo,
      guid,
      email_id: '',
    },
  })

  const res = await ConnectToAPI('http://210.210.210.31:30702/login', body)

  return res
}

export const verifyForgetOTP =
  (phoneNo: string, otp: string, guid: string) => async () => {
    const body = JSON.stringify({
      eventID: '9',
      addInfo: {
        country_code: '91',
        mobile_no: phoneNo,
        otp,
        email_otp: '',
        guid,
        email_id: '',
      },
    })

    const res = await ConnectToAPI('http://210.210.210.31:30702/login', body)

    return res
  }

export const changePassword =
  (userId: string, password: string) => async () => {
    const body = JSON.stringify({
      eventID: '10',
      addInfo: {
        userId,
        pass: password,
        privateKey: '',
      },
    })

    const res = await ConnectToAPI('http://210.210.210.31:30702/login', body)

    return res
  }
