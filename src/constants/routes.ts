export const ProtectedRoutes = {
  user: "/user",
  userProfile: "/user/profile",
  admin: '/admin',
  leader: '/leader',
  followers: "/user/profile/followers",
  feed: '/user/profile/feed',
  leaderProfile: "/user/leader/about",
  leaderFeed: '/user/leader/feed',
  edit_profile: "/user/profile/settings/edit-profile",
  analytics: '/admin/analytics',
  profile: '/admin/profile',
  polls: '/admin/profile/polls',
  networks: '/admin/profile/networks',
  notifications: '/admin/profile/notifications',
  manage_staff: '/admin/profile/settings/manage-staff',
  complaints: '/user/profile/complaints',
  requests: '/user/profile/requests',
  suggestions: '/user/profile/suggestions',
  contributions: '/user/profile/contributions',
  following: '/user/profile/following',
};

export const AuthRoutes = {
  login: "/",
  register: "/register"
}



export const API_Prefix = "/api";

export const APIRoutes = {
  // Common ENdpoints
  sendOTP: `${API_Prefix}/Common/SendOtp`,
  verifyOTP: `${API_Prefix}/Common/VerifyOtp`,
  getLeadersForDropdown: `${API_Prefix}/common/getAddLeadersDropdown`,


  // Leader Endpoints
  login: `${API_Prefix}/Citizen/Login`,
  GetLoginScreenCount: `${API_Prefix}/Leader/GetLoginScreenCount`,
  register: `${API_Prefix}/Citizen/Registration`,
  ForgotPassword: `${API_Prefix}/Citizen/ForgotPassword`,
  getSingleCitizen: `${API_Prefix}/Citizen/getSingleCitizen/{{citizenid}}`,
  EditCitizenProfile: `${API_Prefix}/Citizen/EditCitizenProfile`,
  UploadCitizenProfileImge: `${API_Prefix}/Citizen/UploadCitizenProfileImge`,
  CheckCitizenRegExists: `${API_Prefix}/Citizen/CheckCitizenRegExists`,
  CheckCitizenExists: `${API_Prefix}/Citizen/CheckCitizenExists/{{email}}`,
  AddStory: `${API_Prefix}/Post/AddStory`,
  GetStoriesForCitizen: `${API_Prefix}/Post/GetStoriesForCitizen/{{citizenid}}`,
  DeleteStory: `${API_Prefix}/Post/DeleteStory`,
  AddPost: `${API_Prefix}/Post/AddPost`,
  GetPostsForCitizen: `${API_Prefix}/Post/GetPostsForCitizen/{{citizenid}}`,
  DeletePost: `${API_Prefix}/Post/DeletePost`,
  LikePost: `${API_Prefix}/Post/LikePost`,
  UnlikePostorStory: `${API_Prefix}/Post/UnlikePostorStory`,
  CommentPost: `${API_Prefix}/Post/CommentPost`,
  LikeComment: `${API_Prefix}/Post/LikeComment`,
  UnLikeComment: `${API_Prefix}/Post/UnLikeComment`,
  ReplyToComment: `${API_Prefix}/Post/ReplyToComment`,
  AddVoteOfPOll: `${API_Prefix}/Citizen/AddVoteOfPOll`,
  getLeaderList: `${API_Prefix}/Citizen/LeaderListForCitizen/{{citizenid}}`,
  GetBirthdayList: `${API_Prefix}/Leader/GetBirthdayList`,
  ThumbsDown: `${API_Prefix}/Leader/ThumbsDown`,
  ThumbsUp: `${API_Prefix}/Leader/ThumbsUp`,
  ReminderStatus: `${API_Prefix}/Leader/ReminderStatus`,

  GetLeaderList: `${API_Prefix}/Leader/GetLeaderList`,
  TrendingLeaderList: `${API_Prefix}/Leader/TrendingLeaderList`,
  FollowLeader: `${API_Prefix}/Citizen/FollowLeaderByCitizen`,
  UnFollowLeader: `${API_Prefix}/Citizen/UnFollowLeaderByCitizen`,
  CitizenFollowingList: `${API_Prefix}/Citizen/CitizenFollowingList/{{citizenid}}`,

  DeactiveAccount: `${API_Prefix}/Citizen/DeactiveAccount/{{citizenid}}`,
  CloseAccount: `${API_Prefix}/Citizen/CloseAccount/{{citizenid}}`,


  GetRaisedComplaints: `${API_Prefix}/Citizen/GetRaisedComplaints/{{citizenid}}`,
  RaiseComplaint: `${API_Prefix}/Citizen/RaiseComplaint`,
  DeleteComplaint: `${API_Prefix}/Citizen/DeleteComplaint/{{complaintid}}`,

  GetRaisedRequests: `${API_Prefix}/Citizen/GetRaisedRequests/{{citizenid}}`,
  RaiseRequest: `${API_Prefix}/Citizen/RaiseRequest`,
  DeleteRequest: `${API_Prefix}/Citizen/DeleteRequest/{{requestid}}`,

  GetSuggestions: `${API_Prefix}/Citizen/GetSuggestions/{{citizenid}}`,
  SaveSuggestion: `${API_Prefix}/Citizen/SaveSuggestion`,
  DeleteSuggestion: `${API_Prefix}/Citizen/DeleteSuggestion/{{suggestionid}}`,

  GetContributions: `${API_Prefix}/Citizen/GetContributions/{{citizenid}}`,
  SaveContribution: `${API_Prefix}/Citizen/SaveContribution`,
  DeleteContribution: `${API_Prefix}/Citizen/DeleteContribution/{{contributionid}}`,

  getSingleLeader: `${API_Prefix}/Leader/getLeaderProfileAllInfo/{{leaderid}}`,

  getDropdownOption: `${API_Prefix}/common/getAddLeadersDropdown`,

  getFollowers: `${API_Prefix}/leader/followerList/{{leaderId}}`,
  getFollowering: `${API_Prefix}/leader/followingList/{{leaderId}}`,
  getLeaderAddedStories: `${API_Prefix}/post/getLeaderAddedStories/{{leaderId}}`,
  GetLeaderAddedPosts: `${API_Prefix}/post/GetLeaderAddedPosts/{{leaderId}}`,
}       