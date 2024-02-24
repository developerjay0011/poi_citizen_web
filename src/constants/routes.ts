export const ProtectedRoutes = {
  user: "/user",
  userProfile: "/user/profile",
  admin: '/admin',
  leader: '/leader',
  followers: "/user/profile/followers",
  feed: '/user/profile/feed',
  leaderProfile: "/leader/profile",
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
  /* getLeadersForDropdown: `${API_Prefix}/Common/GetAddLeadersDropdown`, */

  // Leader Endpoints
  login: `${API_Prefix}/Citizen/Login`,
  register: `${API_Prefix}/Citizen/Registration`,
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
  /* upsertLeaders: `${API_Prefix}/Leader/AddEditLeader`,
   getAccessTabs: `${API_Prefix}/Leader/GetAccessTabs/{{userId}}`,
   getProfile: `${API_Prefix}/Leader/GetSingleLeader/{{userId}}`,
   getFollowers: `${API_Prefix}/Leader/FollowerList/{{userId}}`, */
}       