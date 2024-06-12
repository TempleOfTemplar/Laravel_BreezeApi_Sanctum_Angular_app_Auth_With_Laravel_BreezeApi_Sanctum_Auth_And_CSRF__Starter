export const environment = {
  // common
  APP_NAME:"Тестовое приложение",
  BACKEND_URL:"", // TODO не забыть заполнить когда будет реальный бэк
  API_URL:"${BACKEND_URL}/api", // TODO ${BACKEND_URL} тут очевидно не сработает. надо сделать самовызывающуюся фабрику.
  USER_URL:"${BACKEND_URL}/api/user",

  // sanctum auth
  LOGIN_URL:"${BACKEND_URL}/login",
  REGISTER_URL:"${BACKEND_URL}/register",
  LOGOUT_URL:"${BACKEND_URL}/register",
  SEND_VERIFICATION_EMAIL_URL :"${BACKEND_URL}/email/verification-notification",
  VERIFY_EMAIL_BASE_URL:"${BACKEND_URL}/verify-email", // params required: /{id}/{hash}
  FORGOT_PASSWORD_URL:"${BACKEND_URL}/forgot-password",
  RESET_PASSWORD_URL:"${BACKEND_URL}/reset-password",

  // XSRF
  XSRF_URL:"${BACKEND_URL}/sanctum/csrf-cookie",
  XSRF_HEADER_NAME: 'X-XSRF-TOKEN',
  XSRF_COOKIE_NAME: 'XSRF-TOKEN',

};
