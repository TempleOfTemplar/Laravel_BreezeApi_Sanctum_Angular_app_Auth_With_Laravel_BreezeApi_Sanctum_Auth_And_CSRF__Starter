export const environment = {
  APP_NAME:"Тестовое приложение",

  BACKEND_URL:"http://localhost:8000",
  API_URL:"http://localhost:8000/api",
  USER_URL:"http://localhost:8000/api/user",

  LOGIN_URL:"http://localhost:8000/login",
  REGISTER_URL:"http://localhost:8000/register",
  LOGOUT_URL:"http://localhost:8000/register",
  SEND_VERIFICATION_EMAIL_URL :"http://localhost:8000/email/verification-notification",
  VERIFY_EMAIL_BASE_URL:"http://localhost:8000/verify-email", // params required: /{id}/{hash}
  FORGOT_PASSWORD_URL:"http://localhost:8000/forgot-password",
  RESET_PASSWORD_URL:"http://localhost:8000/reset-password",

  XSRF_URL:"http://localhost:8000/sanctum/csrf-cookie",
  XSRF_HEADER_NAME: 'X-XSRF-TOKEN',
  XSRF_COOKIE_NAME: 'XSRF-TOKEN',
};
