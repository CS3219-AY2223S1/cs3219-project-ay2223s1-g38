import Joi from "joi";

export const qidSchema = Joi.object({
	questionId: Joi.number().required(),
});
