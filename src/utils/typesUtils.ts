import { RequestComplaintFormFields } from '@/components/citizen/forms/RequestComplaintForm'
import { StaticImageData } from 'next/image'


export interface LoginData {
  email: string;
  password: string
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  mobile: string;

}

export interface LoginFormFields {
  userId: string
  password: string
  remember: boolean
  fullName: string
  email: string
  phoneNo: string
}

export interface ErrObj {
  isErr: boolean
  errTxt: string
}

export interface RegisterFormFields {
  fullName: string
  email: string
  phoneNo: string
  password: string
  userType: string
  userId: string
}

export interface ErrObj {
  isErr: boolean
  errTxt: string
}

export interface UserDetails {
  id: string
  displayPic: string | FileList
  backgroundPic: string | FileList
  firstname: string
  lastname: string
  dob: string
  bloodGroup: string
  gender: string
  email: string
  phoneNo: string
  socialMedia: {
    facebook: string
    instagram: string
    twitter: string
  }
  higherEducation: string
  about: string
  country: string
}

export type UserType = 'leader' | 'citizen' | 'emerging-leader' | ''

export type PollType = 'text' | 'image'

export interface PollDetails {
  id: string
  title: string
  pollType: PollType
  options: { option: string; id: string; votes: number }[]
  imgOptions: { text: string; media: string; id: string; votes: number }[]
  publishDate: string
  access: string
  expiresAt: string
}

export type PostType = 'image' | 'video'

export interface MediaPost {
  type: PostType
  media: string
  id: string
  likes: Like[]
  comments: Comment[]
}

export type UserPostType = 'post' | 'agenda' | 'polls'

export interface Comment {
  id: string
  userId: string
  userImg: string
  username: string
  likes: Like[]
  commentText: string
  createdDate: string
  comments: NestedComment[]
  comment_text : string;
  created_date : string;
  userimg? : string | null;
}

export interface NestedComment {
  id: string
  userId: string
  userImg: string
  username: string
  likes: Like[]
  commentText: string
  createdDate: string
}

export interface Like {
  userId: string
}

export interface PostDetails {
  id: string
  writtenText: string
  userId: string
  type: UserPostType
  createdDatetime: string
  media: MediaPost[] | string
  comments: Comment[] | string
  likes: Like[] | string
  leaderid: string;
  updatePost: any;
  types: string
  name:string
  userimages:any
  allData:any
}

export interface NewPostFields {
  type: string
  id: string
  media: string
}

export interface NewPostData {
  writtenText: string
  type: UserPostType
  media: NewPostFields[]
}

export type RQ_VAL = '0' | '1' | '2' | '3'

export const REQUEST_STATUS = {
  '0': {
    name: 'recieved',
    classes: 'bg-sky-100 text-sky-500 border-sky-500',
  },
  '1': {
    name: 'processing',
    classes: 'bg-yellow-100 text-yellow-500 border-yellow-500',
  },
  '2': {
    name: 'approved',
    classes: 'bg-green-100 text-green-500 border-green-500',
  },
  '3': {
    name: 'rejected',
    classes: 'bg-rose-100 text-rose-500 border-rose-500',
  },
}

export interface Attachments {
  type: string
  file: string
  id: string
}

export interface RequestComplaintData extends RequestComplaintFormFields {
  attachments: Attachments[]
}

export interface RequestComplaintDetails {
  attachments: string
  complaintno: string
  description: string
  id: string
  isdeleted: string
  signature: string
  subject: string
  to: string
  requestno: string
  createdDate: string
}

export interface ToDetails {
  designation: string
  dislike: string
  isSeen: string
  leaderId: string
  leaderProfilePic: string | StaticImageData
  name: string
  requestComplaintSeenDate: string
  requestComplaintStatus: string
}

export interface TrendingLeaderBriefDetails {
  image: string | StaticImageData
  designation: string
  username: string
  id: string
  following:any
  unfollow:boolean
}
