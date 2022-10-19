import axios from "axios";

const URI_QUESTION_SVC =  process.env.URI_QUESTION_SVC || "http://localhost:8081";

export const getQuestion = (difficulty) => axios.post(`${URI_QUESTION_SVC}/api/question/getQuestionByDifficulty`, { difficulty: difficulty })
  .then(response => {
    return response;
  })
  .catch(error => {
    console.log(error);
  });

  export const getQuestionWithBlacklist = (difficulty, list) => axios.post(`${URI_QUESTION_SVC}/api/question/getQuestionWithBlackList`, { difficulty, list })
  .then(response => {
    return response;
  })
  .catch(error => {
    console.log(error);
  });