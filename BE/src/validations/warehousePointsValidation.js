import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    streetAddress: Joi.string().required().min(3).max(50).trim().strict(),
    city: Joi.string().required().min(3).max(50).trim().strict(),
    province: Joi.string().required().min(3).max(50).trim().strict(),
    country: Joi.string().min(3).max(50).trim().strict().default('Viet Nam')
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    streetAddress: Joi.string().required().min(3).max(50).trim().strict(),
    city: Joi.string().required().min(3).max(50).trim().strict(),
    province: Joi.string().required().min(3).max(50).trim().strict(),
    country: Joi.string().min(3).max(50).trim().strict().default('Viet Nam')
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const warehousePointsValidation = {
  createNew,
  update
}
