export const BASE_URL = 'https://api.globfolio.com/api'
export const BASE_UPLOAD = 'https://api.globfolio.com'

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