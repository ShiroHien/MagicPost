import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE, PHONE_RULE, PHONE_RULE_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'
import { TYPE_GOOD, SIZE_GOOD, STATUS } from '~/utils/constants'

// Define Collection (name & schema)
const POSTAL_GOOD_COLLECTION_NAME = 'postal_goods'
const POSTAL_GOOD_COLLECTION_SCHEMA = Joi.object({
  pointIds: Joi.array().items(
    Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  senderName: Joi.string().required().min(3).max(50).trim().strict(),
  senderPhone: Joi.string().required().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),

  senderStreetAddress: Joi.string().required().min(3).max(50).trim().strict(),
  senderCity: Joi.string().required().min(3).max(50).trim().strict(),
  senderProvince: Joi.string().required().min(3).max(50).trim().strict(),
  senderCountry: Joi.string().min(3).max(50).trim().strict().default('Viet Nam'),

  receiverName: Joi.string().required().min(3).max(50).trim().strict(),
  receiverPhone: Joi.string().required().pattern(PHONE_RULE).message(PHONE_RULE_MESSAGE),

  receiverStreetAddress: Joi.string().required().min(3).max(50).trim().strict(),
  receiverCity: Joi.string().required().min(3).max(50).trim().strict(),
  receiverProvince: Joi.string().required().min(3).max(50).trim().strict(),
  receiverCountry: Joi.string().min(3).max(50).trim().strict().default('Viet Nam'),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.array().items(
    Joi.date().timestamp('javascript')
  ).default([]),

  status: Joi.string().valid(
    STATUS.pending,
    STATUS.shipped,
    STATUS.delivered,
    STATUS.canceled
  ).default(STATUS.pending),

  type: Joi.string().valid(
    TYPE_GOOD.type1,
    TYPE_GOOD.type2
  ),
  weight: Joi.number().required(),
  size: Joi.string().valid(
    SIZE_GOOD.size1,
    SIZE_GOOD.size2,
    SIZE_GOOD.size3
  ),
  postage: Joi.number().required()

  // proofListForCost
})

const INVALID_UPDATE_FIELD = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await POSTAL_GOOD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    // Chuyển về đúng kiểu ObjectId
    const newPostalGoodToCreate = {
      ...validData,
      pointIds: [
        new ObjectId(validData.pointIds[0]),
        new ObjectId(validData.pointIds[1]),
        new ObjectId(validData.pointIds[2]),
        new ObjectId(validData.pointIds[3])
      ]
    }
    // console.log('validata pointids', validData.pointIds)
    const createdPostalGood = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).insertOne(newPostalGoodToCreate)
    return createdPostalGood
  } catch (error) { throw new Error(error) }
}

const findOneById = async(id) => {
  try {
    const result = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
    return result
  } catch (error) { throw new Error(error) }
}

const getDetails = async(id) => {
  try {
    const result = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).findOne({
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

    const result = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after' }
    )

    return result
  } catch (error) { throw new Error(error) }
}

export const postalGoodsModel = {
  POSTAL_GOOD_COLLECTION_NAME,
  POSTAL_GOOD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  update
}
