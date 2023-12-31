import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE, PHONE_RULE, PHONE_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { TYPE_ACCOUNT } from '~/utils/constants'

const createNew = async (req, res, next) => {
  /**
   * Tạo Object json chứa điều kiện validate
   */
  const correctCondition = Joi.object({
    email: Joi.string().email(),
    username: Joi.string().alphanum().min(3).max(30).trim().strict(),
    password: Joi.string().required(),
    phone: Joi.string().required().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),
    fullname: Joi.string().min(3).max(50).trim().strict(),
    typeAccount: Joi.string().valid(
      TYPE_ACCOUNT.admin,
      TYPE_ACCOUNT.leaderOfTransaction,
      TYPE_ACCOUNT.leaderOfWarehouse,
      TYPE_ACCOUNT.staffOfTransaction,
      TYPE_ACCOUNT.staffOfWarehouse
    )
  })

  try {
    // Set abortEarly = false để khi có nhiều lỗi thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true})
    // Validate dữ liệu hợp lệ thì cho request sang tầng Controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    password: Joi.string(),
    phone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),
    fullname: Joi.string().max(50).trim().strict(),
    TYPE_ACCOUNT: Joi.string().valid(
      TYPE_ACCOUNT.admin,
      TYPE_ACCOUNT.leaderOfTransaction,
      TYPE_ACCOUNT.leaderOfWarehouse,
      TYPE_ACCOUNT.staffOfTransaction,
      TYPE_ACCOUNT.staffOfWarehouse
    )
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    // Validate dữ liệu hợp lệ thì cho request sang tầng Controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const accountsValidation = {
  createNew,
  update
}
