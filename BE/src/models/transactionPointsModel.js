import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'

// Define Collection (name & schema)
const TRANSACTION_POINT_COLLECTION_NAME = 'transaction_points'
const TRANSACTION_POINT_COLLECTION_SCHEMA = Joi.object({
  name: Joi.string().required().min(3).max(100).trim().strict(),
  streetAddress: Joi.string().required().min(3).max(50).trim().strict(),
  city: Joi.string().required().min(3).max(50).trim().strict(),
  province: Joi.string().required().min(3).max(50).trim().strict(),
  country: Joi.string().min(3).max(50).trim().strict().default('Viet Nam'),

  warehousePointId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  accountIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  orderIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([])
})

const INVALID_UPDATE_FIELD = ['_id']

const validateBeforeCreate = async (data) => {
  return await TRANSACTION_POINT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    // Chuyển về đúng kiểu ObjectId
    const newTransactionPointToCreate = {
      ...validData,
      warehousePointId: new ObjectId(validData.warehousePointId)
    }
    const createdTransactionPoint = await GET_DB().collection(TRANSACTION_POINT_COLLECTION_NAME).insertOne(newTransactionPointToCreate)
    return createdTransactionPoint
  } catch (error) { throw new Error(error) }
}

const findOneById = async(id) => {
  try {
    const result = await GET_DB().collection(TRANSACTION_POINT_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) { throw new Error(error) }
}

const getDetails = async(id) => {
  try {
    const result = await GET_DB().collection(TRANSACTION_POINT_COLLECTION_NAME).findOne({
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

    const result = await GET_DB().collection(TRANSACTION_POINT_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after' }
    )

    return result
  } catch (error) { throw new Error(error) }
}

const deleteOne = async(id) => {
  try {
    const result = await GET_DB().collection(TRANSACTION_POINT_COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) { throw new Error(error) }
}

export const transactionPointsModel = {
  TRANSACTION_POINT_COLLECTION_NAME,
  TRANSACTION_POINT_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  update,
  deleteOne
}
