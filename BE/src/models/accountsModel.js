import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { PASSWORD_RULE, PASSWORD_RULE_MESSAGE, PHONE_RULE, PHONE_RULE_MESSAGE, OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { TYPE_ACCOUNT } from '~/utils/constants'
import { ObjectId } from 'mongodb'

// Define Collection (name & schema)
const ACCOUNT_COLLECTION_NAME = 'accounts'
const ACCOUNT_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().required().email(),
  username: Joi.string().required().alphanum().min(3).max(30).trim().strict(),
  password: Joi.string().required().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE),
  phone: Joi.string().required().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),
  fullname: Joi.string().required().min(3).max(50).trim().strict(),
  typeAccount: Joi.string().valid(
    TYPE_ACCOUNT.leaderOfTransaction,
    TYPE_ACCOUNT.leaderOfWarehouse,
    TYPE_ACCOUNT.staffOfTransaction,
    TYPE_ACCOUNT.staffOfWarehouse
  ),
  pointId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
})

const INVALID_UPDATE_FIELD = ['_id', 'username']

const validateBeforeCreate = async (data) => {
  return await ACCOUNT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    // Chuyển về đúng kiểu ObjectId
    const newAccountToCreate = {
      ...validData,
      pointId: new ObjectId(validData.pointId)
    }
    const createdAccount = await GET_DB().collection(ACCOUNT_COLLECTION_NAME).insertOne(newAccountToCreate)
    return createdAccount
  } catch (error) { throw new Error(error) }
}

const findOneById = async(id) => {
  try {
    const result = await GET_DB().collection(ACCOUNT_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) { throw new Error(error) }
}

const getDetails = async(id) => {
  try {
    const result = await GET_DB().collection(ACCOUNT_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) { throw new Error(error) }
}

const update = async(id, data) => {
  try {
    Object.keys(data).forEach(fieldName => {
      if (INVALID_UPDATE_FIELD.includes(fieldName)) {
        delete data[fieldName]
      }
    })

    const result = await GET_DB().collection(ACCOUNT_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after' }
    )

    return result
  } catch (error) { throw new Error(error) }
}

const deleteOne = async(id) => {
  try {
    const result = await GET_DB().collection(ACCOUNT_COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) { throw new Error(error) }
}

export const accountsModel = {
  ACCOUNT_COLLECTION_NAME,
  ACCOUNT_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  update,
  deleteOne
}
