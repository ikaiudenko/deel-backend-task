import Joi from 'joi'

export const depositReq = Joi.object<{ amount: number }>({
    amount: Joi.number().required().min(1),
})
