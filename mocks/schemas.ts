import Joi from 'joi';

export const ANSWER_SCHEMA = Joi.object({
    questionId: Joi.number().required(),
    timestamp: Joi.number().required(),
    answer: [Joi.number(), Joi.array().items(Joi.number())],
});

export const FINISH_SCHEMA = Joi.object({
    timestamp: Joi.number().required(),
});

export const STATS_SCHEMA = Joi.object({
    event: Joi.string().required(),
    timestamp: Joi.number().required(),
    meta: Joi.any(),
});
