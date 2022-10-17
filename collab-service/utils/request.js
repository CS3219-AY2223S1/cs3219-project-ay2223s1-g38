import axios from "axios";

const URI_QUESTION_SVC =  process.env.URI_QUESTION_SVC || "http://localhost:8081";

// TODO: Pass in question difficulty to new QuestionService endpoint.
export const getQuestion = (difficulty) => axios.get(`${URI_QUESTION_SVC}/api/question/getQuestion`)
  .then(response => {
    return response;
  })
  .catch(error => {
    console.log(error);
  });
