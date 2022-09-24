import Joi from "joi";

export const blackListSchema = Joi.object({
    list: Joi.array().items(Joi.number()).required(),
});
