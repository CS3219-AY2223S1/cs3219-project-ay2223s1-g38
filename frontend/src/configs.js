// eslint-disable-next-line no-undef
const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8000";

// eslint-disable-next-line no-undef
export const URI_MATCHING_SVC = process.env.URI_MATCHING_SVC || "http://localhost:8001";

const PREFIX_USER_SVC = "/api/user";

const CREATE_USER_SVC = "/createUser";
const LOGIN_SVC = "/login";

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_CREATE_USER_SVC =  URI_USER_SVC + PREFIX_USER_SVC + CREATE_USER_SVC;
export const URL_LOGIN_SVC = URI_USER_SVC + PREFIX_USER_SVC + LOGIN_SVC;
