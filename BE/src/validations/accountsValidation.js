import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE, PHONE_RULE, PHONE_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { typeAccount } from '~/utils/constants'

const createNew = async (req, res, next) => {
  /**
   * Tạo Object json chứa điều kiện validate
   */
  const correctCondition = Joi.object({
    email: Joi.string().required().email(),
    username: Joi.string().required().alphanum().min(3).max(30).trim().strict(),
    password: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE),
    phone: Joi.string().required().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),
    fullname: Joi.string().required().min(3).max(50).trim().strict(),
    typeAccount: Joi.string().valid(
      typeAccount.leaderOfTransaction,
      typeAccount.leaderOfWarehouse,
      typeAccount.staffOfTransaction,
      typeAccount.staffOfWarehouse
    ),
    pointId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })

  try {
    // Set abortEarly = false để khi có nhiều lỗi thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu hợp lệ thì cho request sang tầng Controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE),
    phone: Joi.string().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),
    fullname: Joi.string().min(3).max(50).trim().strict(),
    typeAccount: Joi.string().valid(
      typeAccount.leaderOfTransaction,
      typeAccount.leaderOfWarehouse,
      typeAccount.staffOfTransaction,
      typeAccount.staffOfWarehouse
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
