/* eslint-disable no-undef */
const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8000";
const URI_QUESTION_SVC = process.env.URI_QUESTION_SVC || "http://localhost:8081";

export const URI_MATCHING_SVC = process.env.URI_MATCHING_SVC || "http://localhost:8001";
export const URI_SESSION_SVC = process.env.URI_SESSION_SVC || "http://localhost:8088";
export const URI_CHAT_SVC = process.env.URI_CHAT_SVC || "http://localhost:9000"; 

const PREFIX_USER_SVC = "/api/user";

const CREATE_USER_SVC = "/createUser";
const LOGIN_SVC = "/login";
const UNIQUE_USERNAME_SVC = "/uniqueUsername";

const PREFIX_QUESTION_SVC = "/api/question";

const GET_QUESTION = "/getQuestion";
const GET_QUESTION_WITH_BLACKLIST = "/getQuestionWithBlackList";
const GET_QUESTION_BY_ID = "/getQuestionById";
const GET_QUESTION_BY_DIFFICULTY = "/getQuestionByDifficulty";

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_CREATE_USER_SVC =  URI_USER_SVC + PREFIX_USER_SVC + CREATE_USER_SVC;
export const URL_LOGIN_SVC = URI_USER_SVC + PREFIX_USER_SVC + LOGIN_SVC;
export const URL_UNIQUE_USERNAME_SVC = URI_USER_SVC + PREFIX_USER_SVC + UNIQUE_USERNAME_SVC;
export const URL_GET_QUESTION_SVC = URI_QUESTION_SVC + PREFIX_QUESTION_SVC + GET_QUESTION;
export const URL_GET_QUESTION_WITH_BLACKLIST_SVC = URI_QUESTION_SVC + PREFIX_QUESTION_SVC + GET_QUESTION_WITH_BLACKLIST;
export const URL_GET_QUESTION_BY_ID_SVC = URI_QUESTION_SVC + PREFIX_QUESTION_SVC + GET_QUESTION_BY_ID;
export const URL_GET_QUESTION_BY_DIFFICULTY_SVC = URI_QUESTION_SVC + PREFIX_QUESTION_SVC + GET_QUESTION_BY_DIFFICULTY;