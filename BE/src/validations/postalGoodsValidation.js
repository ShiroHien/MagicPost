import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { PHONE_RULE, PHONE_RULE_MESSAGE } from '~/utils/validators'
import { SIZE_GOOD, TYPE_GOOD } from '~/utils/constants'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    senderName: Joi.string().required().min(3).max(50).trim().strict(),
    senderPhone: Joi.string().required().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),

    senderStreetAddress: Joi.string().required().min(3).max(50).trim().strict(),
    senderCity: Joi.string().required().min(3).max(50).trim().strict(),
    senderProvince: Joi.string().required().min(3).max(50).trim().strict(),

    receiverName: Joi.string().required().min(3).max(50).trim().strict(),
    receiverPhone: Joi.string().required().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),

    receiverStreetAddress: Joi.string().required().min(3).max(50).trim().strict(),
    receiverCity: Joi.string().required().min(3).max(50).trim().strict(),
    receiverProvince: Joi.string().required().min(3).max(50).trim().strict(),

    type: Joi.string().valid(
      TYPE_GOOD.type1,
      TYPE_GOOD.type2
    ),
    weight: Joi.number().required(),
    size: Joi.string().valid(
      SIZE_GOOD.size1,
      SIZE_GOOD.size2,
      SIZE_GOOD.size3
    )
    // proofListForCost
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

//Không cần hàm update status bởi vì khi mà mình update 1 order thì sẽ xử lý tự động update Goods chứ không update riêng lẻ.
const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    orderNo: Joi.number(),
    senderName: Joi.string().min(3).max(50).trim().strict(),
    senderPhone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),

    senderStreetAddress: Joi.string().min(3).max(50).trim().strict(),
    senderCity: Joi.string().min(3).max(50).trim().strict(),
    senderProvince: Joi.string().min(3).max(50).trim().strict(),

    receiverName: Joi.string().min(3).max(50).trim().strict(),
    receiverPhone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),

    receiverStreetAddress: Joi.string().min(3).max(50).trim().strict(),
    receiverCity: Joi.string().min(3).max(50).trim().strict(),
    receiverProvince: Joi.string().min(3).max(50).trim().strict(),

    type: Joi.string().valid(
      TYPE_GOOD.type1,
      TYPE_GOOD.type2
    ),
    weight: Joi.number(),
    size: Joi.string().valid(
      SIZE_GOOD.size1,
      SIZE_GOOD.size2,
      SIZE_GOOD.size3
    )
    // proofListForCost
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

export const postalGoodsValidation = {
  createNew,
  update
}
