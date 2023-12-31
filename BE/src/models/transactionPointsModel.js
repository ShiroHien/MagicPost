import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'

// Define Collection (name & schema)
const TRANSACTION_POINT_COLLECTION_NAME = 'transaction_points'
const TRANSACTION_POINT_COLLECTION_SCHEMA = Joi.object({
  leaderId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null),

  name: Joi.string().required().min(3).max(256).trim().strict(),
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

const findOneByAddress = async(warehouseId, receiverCity, receiverProvince) => {
  try {
    const result = await GET_DB().collection(TRANSACTION_POINT_COLLECTION_NAME).findOne({
      province: receiverProvince,
      city: receiverCity,
      warehousePointId: new ObjectId(warehouseId)
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

const setLeaderId = async(account) => {
  try {
    const result = await GET_DB().collection(TRANSACTION_POINT_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(account.pointId) },
      { $set: { leaderId: new ObjectId(account._id) } },
      { returnDocument: 'after' }
    )
    // console.log('transaction with new leaderId', result)
    return result
  } catch (error) { throw new Error(error) }
}

const pushAccountIds = async(account) => {
  try {
    const result = await GET_DB().collection(TRANSACTION_POINT_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(account.pointId) },
      { $push: { accountIds: new ObjectId(account._id) } },
      { returnDocument: 'after' }
    )
    // console.log('transaction with new accountIds', result)
    return result
  } catch (error) { throw new Error(error) }
}

const findOnebyProvinceCity = async(reqBody) => {
  try {
    const result = await GET_DB().collection(TRANSACTION_POINT_COLLECTION_NAME).findOne({
      province: reqBody.province,
      city: reqBody.city
    })
    return result
  } catch (error) { throw new Error(error) }
}
const findDistrictByProvince = async(reqBody) => {
  try {
    const pipeline = [
      {
        '$match': {
          '$expr': {
            '$eq': ['$province', reqBody.selectedprovince]
          }
        }
      },
      {
        '$group': {
          // '_id': '$district', // Sử dụng trường 'district' để nhóm theo quận/huyện
          _id: '$city',
          'label': { '$first': '$city' }
        }
      },
      {
        '$project': {
          '_id': 0,
          'label': 1
        }
      }
    ]
    
    const result = await GET_DB().collection(TRANSACTION_POINT_COLLECTION_NAME).aggregate(pipeline).toArray()
    console.log(result)
    return result
  } catch (error) { throw new Error(error) }
}

const getTPs = async(redBody) => {
  try {
    const result = await GET_DB().collection(TRANSACTION_POINT_COLLECTION_NAME).find({}).toArray()
    return result
  } catch (error) { throw new Error(error) }
}

export const transactionPointsModel = {
  TRANSACTION_POINT_COLLECTION_NAME,
  TRANSACTION_POINT_COLLECTION_SCHEMA,
  getTPs,
  createNew,
  findOneById,
  getDetails,
  update,
  deleteOne,
  findOneByAddress,
  setLeaderId,
  pushAccountIds,
  findOnebyProvinceCity,
  findDistrictByProvince
}
