// export const BASE_URL = 'https://api.globfolio.com/api'
// export const BASE_UPLOAD = 'https://api.globfolio.com'
export const BASE_URL = 'https://server.globfolio.com/api'
export const BASE_UPLOAD = 'https://server.globfolio.com'

export enum HTTP_METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
  }

  export const REGISTER_USER = `/register-user`
  export const LOGIN_USER = `/signin-user`
  export const REGISTER_WITH_GOOGLE = `/auth/google`
  export const LOGIN_WITH_GOOGLE = `/auth/google-signin`
  export const VERIFY_MAIL = `/verifyemail`
  export const RESEND_VERIFY_MAIL = `/resendCode`
  export const FORGET_PASSWORD = `/forgot-password`
  export const RESET_PASSWORD = `/reset-password`
  export const UPDATE_AVATAR = `/user/profile/update-pic`
  export const UPDATE_PROFILE = `/user/update-account`
  export const UPDATE_PASSWORD = `/users/change-password`

  // subscription
  export const GET_SUBSCRIPTIONS = `/subscription/plans`
  export const VERIFY_SUB_PAYMENT = `/subscription/verifySubscription`
  export const VERIFY_UPGRADE_SUB = `/subscription/upgradeVerify`
  export const UPGRADE_SUB = `/subscription/upgrade`

  // picks
  export const GET_FREE_PICKS = `/stockAdvisory/stockAdvisorysFree`
  export const GET_ALL_PICKS = `/stockAdvisory/stockAdvisorys`
  export const GET_SINGLE_SAVED_PICK = `/user/stockAdvisory/singleStockAdvisorySave`
  export const SAVE_PICK =`/user/stockAdvisory/save`
  export const GET_SAVED_PICK =`/user/stockAdvisory`
  export const DELETE_SAVED_PICK = `/user/stockAdvisory/delete`

  // notify
  export const GET_NOTIFY = `/notifications/user`
  export const MARK_READ = `/notifications/mark-read`
  export const DELETE_NOTIFY = `/notifications/delete`

  // chats routes
  export const GET_MY_GROUPS = `/chat/rooms`
  export const GET_CHAT_HISTORY = `/chat/history`
  export const GET_ROOM_MEMBERS = `/chat/room/`
  export const JOIN_GROUP = `chat/room`
  export const DELETE_MESSAGES = `/chat/room/message`