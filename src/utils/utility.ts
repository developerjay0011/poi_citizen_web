import { v4 } from 'uuid'
import { store } from '@/redux_store'
import { AES, mode, pad, enc } from 'crypto-js'
import ARVIND from '@/assets/politicians-images/ARVIND_KEJRIWAL.jpg'
import MODI from '@/assets/politicians-images/narendar_modi.jpg'
import RAHUL from '@/assets/politicians-images/Rahul-Gandhi.jpg'
import SUNNY from '@/assets/politicians-images/sunny_deol.jpg'
import AMIT from '@/assets/politicians-images/amit_shah.jpg'
import MAHUA from '@/assets/politicians-images/mahua_moitra.jpg'
import { TrendingLeaderBriefDetails } from './typesUtils'
import { authActions } from '@/redux_store/auth/authSlice'

// UTILITY FUNCTION to Connect to API
export const ConnectToAPI = async (
  enpointORurl: string,
  body: string,
  jwt?: string
) => {
  const guid = '121212'
  const userType = 'citizen'
  const Authorization = jwt ? jwt : ''

  // if we are getting a proper url then we perform API call on that URL otherwise we will use URL defined above followed by endpoint provied
  // const url = enpointORurl.includes('/')
  //   ? enpointORurl
  //   : API_URL + '/' + enpointORurl

  // FOR DEV

  let response

  // Calling Dotnet API
  if (enpointORurl.includes('/'))
    response = await fetch(enpointORurl, {
      method: 'POST',
      body,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type,*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,DELETE',
        'Content-Type': 'application/json',
        Authorization,
        guid,
      },
    })
  // Calling my custom Next.JS API (build using API routes)
  else
    response = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({
        token: Authorization,
        guid,
        endpoint: enpointORurl,
        body: JSON.parse(body),
        userType,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

  // to handle expired JWT error
  if (response.status === 401) store.dispatch(authActions.logOut())

  // RESPONSE
  const data = await response.json()

  // FOR DEV

  // Handling Error
  if (data.rStatus !== 0) throw new Error(data.rData.rMessage)

  // returning data if no error occured
  return data.rData
}

// Function to convert date in easy to read format
export const dateConverter = (date: string) =>
  new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date(date))

// Convert file to base64
export const convertFileToBase64: (u: File) => Promise<string> = (
  userInpFile: File
) =>
  new Promise((resolve) => {
    const reader = new FileReader()

    reader.readAsDataURL(userInpFile)

    reader.onload = () => {
      resolve(reader.result as string)
    }
  })

// FUNCTION TO CALCULATE CURRENT DATE
export const calCurrentDate = (userInpDate: string) => {
  const curDate = new Date()
  const userDate = new Date(userInpDate as string)

  let day = curDate.getDate() - userDate.getDate()
  let month = curDate.getMonth() - userDate.getMonth()
  let year = curDate.getFullYear() - userDate.getFullYear()

  const daysInCurMonth = new Date(
    curDate.getFullYear(),
    curDate.getMonth() - 1,
    0
  ).getDate()

  if (day < 0) {
    month -= 1
    day = daysInCurMonth - -day
  }

  if (month < 0) {
    month = 12 - -month
    year -= 1
  }

  return year
}

// utility function to convert date into date and time string to set it as default value in html input field
export const dateTimeConverter = (inp: string, extraTime: number) => {
  const date = new Date(inp)

  return (
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    date.getDate().toString().padStart(2, '0') +
    'T' +
    (date.getHours() + extraTime).toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0')
  )
}

export const dateConverterNumeric = (date: string) =>
  new Intl.DateTimeFormat('en-IN', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
    .format(new Date(date))
    .split('/')
    .join('-')

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export const GenerateId = () => v4().split('-').join('') // Function to generate Random and Unique ID

export type PRIORITY = 'high' | 'moderate' | 'low'

export const PRIORITIES = {
  low: { classes: 'bg-green-600 text-green-50 border-green-600', name: 'low' },
  moderate: {
    classes: 'bg-yellow-600 text-yellow-100 border-yellow-600',
    name: 'moderate',
  },
  high: { classes: 'bg-rose-600 text-rose-100 border-rose-600', name: 'high' },
}

export type AGENDA_VAL = '0' | '1' | '2'

export const AGENDA_STATUS = {
  '0': {
    name: 'completed',
    classes: 'bg-green-100 text-green-600 border-green-600',
  },
  '1': {
    name: 'in progress',
    classes: 'bg-yellow-100 text-yellow-600 border-yellow-600 ',
  },
  '2': {
    name: 'not started yet',
    classes: 'bg-orange-100 text-orange-600 border-orange-600',
  },
}

export const SECRET_KEY =
  '6691b1c1238c724c1ee20a00b2f8c09da9a1f25f73985ed33a1a0b298c057951'

export const userImg = ''

export const bgIMG = ''

export const friendImg = ''

export const user2Img = ''

// AES Encrypt
export const AESEncrypt = (addInfoString: string, encryptionKey: string) => {
  const options = {
    mode: mode.CBC,
    padding: pad.Pkcs7,
    iv: enc.Utf8.parse(encryptionKey.substring(0, 16)),
  }

  const encryptedData = AES.encrypt(
    encryptionKey.substring(0, 16) + addInfoString,
    enc.Utf8.parse(encryptionKey.substring(0, 16)),
    options
  ).toString()
  return encryptedData
}

/* export const LEADERS: TrendingLeaderBriefDetails[] = [
  {
    id: '11',
    designation: 'Prime Minister',
    leaderImg: MODI,
    leaderName: 'Narendar Modi',
  },
  {
    id: '22',
    designation: 'Youth Minister',
    leaderImg: RAHUL,
    leaderName: 'Rahul Gandhi',
  },
  {
    id: '33',
    designation: 'Chief Minister',
    leaderImg: ARVIND,
    leaderName: 'Arvind Kejriwal',
  },
  {
    id: '44',
    designation: 'Member of the Lok Sabha',
    leaderImg: SUNNY,
    leaderName: 'Sunny Deol',
  },
  {
    id: '55',
    designation: 'Member of the Lok Sabha',
    leaderImg: MAHUA,
    leaderName: 'Mahua Moitra',
  },
  {
    id: '66',
    designation: 'Minister of Home Affairs of India',
    leaderImg: AMIT,
    leaderName: 'Amit Shah',
  },
] */

export const COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor (Timor-Leste)',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea, North',
  'Korea, South',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
]