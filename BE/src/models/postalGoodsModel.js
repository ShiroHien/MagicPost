import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE, PHONE_RULE, PHONE_RULE_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'
import { TYPE_GOOD, SIZE_GOOD, STATUS } from '~/utils/constants'
import { transactionPointsModel } from './transactionPointsModel'
import { warehousePointsModel } from './warehousePointsModel'
import { validateStatus } from '~/utils/validateStatus'

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
  updatedAtArray: Joi.array().items(
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
  ).default(TYPE_GOOD.type1),
  weight: Joi.number().required(),
  size: Joi.string().valid(
    SIZE_GOOD.size1,
    SIZE_GOOD.size2,
    SIZE_GOOD.size3
  ).default(SIZE_GOOD.size1),
  postage: Joi.number().required(),

  // Từ 0 -> 3
  // 0 đơn từ Transaction A -> Warehouse B
  // 1 đơn từ Warehouse B -> Warehouse C
  // 2 đơn từ Warehouse C -> Transaction D
  // 3 đơn từ Transaction D -> Customer Hand
  orderNo: Joi.number().default(0)
  // proofListForCost ver 2 update later
})

const INVALID_UPDATE_FIELD = ['_id']

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

const statisticsToanQuoc = async(reqBody) => {
  try {
    if (reqBody.statisticType == 'total' && reqBody.filterType == 'monthOfYear') {
      const filterValue = reqBody.filterValue
      const pipeline = [
        {
          '$match': { // Chỉ chọn ra các đơn hàng đã giao thành công hoặc thất bại
            'status': { '$in': ['Delivered', 'Canceled'] },
            '$expr': {
              '$eq': [
                { '$year': { '$toDate': { $arrayElemAt: ['$updatedAtArray', 7] } } }, // Lấy gía trị thứ 7 từ trường updatedAtArray
                filterValue
              ]
            }
          }
        },
        {
          '$group': { // Tính tống số đơn hàng
            '_id': null,
            'count': { '$sum': 1 }
          }
        },
        {
          '$project': { // chọn ra các trường quan trọng từ kết quả
            '_id': 0,
            'count': 1
          }
        }
      ]
      const result = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).aggregate(pipeline).toArray()
      return result || null

    } else if (reqBody.filterType == 'monthOfYear') {
      const filterValue = reqBody.filterValue

      // Tính toán ngày bắt đầu và kết thúc dựa trên năm cho trước
      const pipeline = [
        {
          '$match': { // Chỉ chọn ra các đơn hàng đã giao thành công hoặc thất bại
            'status': { '$in': ['Delivered', 'Canceled'] },
            '$expr': {
              '$eq': [
                { '$year': { '$toDate': { $arrayElemAt: ['$updatedAtArray', 7] } } }, // Lấy gía trị thứ 7 từ trường updatedAtArray
                filterValue
              ]
            }
          }
        },
        {
          '$group': { // nhóm các bản ghi theo cặp khóa status và month và đếm số lượng trong mỗi nhóm
            '_id': {
              'status': '$status',
              'month': { '$month': { '$toDate': { $arrayElemAt: ['$updatedAtArray', 7] } } }
            },
            'count': { '$sum': 1 }
          }
        },
        {
          '$project': { // chọn ra các trường quan trọng từ kết quả
            '_id': 0,
            'status': '$_id.status',
            'month': '$_id.month',
            'count': 1
          }
        },
        {
          '$sort': { 'month': 1, 'status': 1 } // Sắp xếp tăng dần theo tháng và status
        }
      ]
      const result = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).aggregate(pipeline).toArray()
      return result || null
    }
  } catch (error) { throw new Error(error) }
}

const statisticsGD = async(transactionId, reqBody) => {
  try {
    if (reqBody.filterType == 'dayOfWeek') {
      const filterValue = reqBody.filterValue

      const pipeline = [
        [
          // _______________________________pipeline 0________________________________________
          {
            '$match': {
              '$expr': {
                '$eq': [
                  [{ $arrayElemAt: ['$pointIds', 0] }, { '$week': { '$toDate': '$createdAt' } }],
                  [new ObjectId(transactionId), { '$week': { '$toDate': Date.now() } }] // instead of filterValue
                ]
              }
            }
          },
          {
            '$group': {
              '_id': {
                'day': { '$dayOfWeek': { '$toDate': '$createdAt' } }
              },
              'count': { '$sum': 1 }
            }
          },
          {
            '$project': {
              '_id': 0,
              'day': '$_id.day',
              'count': 1
            }
          },
          {
            '$sort': { 'day': 1 }
          }
        ],
        // _______________________________pipeline 1________________________________________
        [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  [{ $arrayElemAt: ['$pointIds', 3] }, { '$week': { '$toDate':{ $arrayElemAt: ['$updatedAtArray', 7] } } }],
                  [new ObjectId(transactionId), { '$week': { '$toDate': Date.now() } }] // instead of filterValue
                ]
              }
            }
          },
          {
            '$group': {
              '_id': {
                'day': { '$dayOfWeek': { '$toDate':{ $arrayElemAt: ['$updatedAtArray', 7] } } }
              },
              'count': { '$sum': 1 }
            }
          },
          {
            '$project': {
              '_id': 0,
              'day': '$_id.day',
              'count': 1
            }
          },
          {
            '$sort': { 'day': 1 }
          }
        ]
      ]
      const result1 = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).aggregate(pipeline[0]).toArray()
      const result2 = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).aggregate(pipeline[1]).toArray()

      // console.log("result1", result1)
      // console.log("result2", result2)
      const result = [result1, result2]
      return result
    }
  } catch (error) { throw new Error(error) }
}

const statisticsTK = async(warehouseId, reqBody) => {
  try {
    if (reqBody.statisticType == 'total' && reqBody.filterType == 'dayOfWeek') {
      const filterValue = reqBody.filterValue
      const pipeline = [
        [
          // _______________________________pipeline 0________________________________________
          {
            '$match': {
              '$expr': {
                '$eq': [
                  [{ $arrayElemAt: ['$pointIds', 1] }, { '$week': { '$toDate':{ $arrayElemAt: ['$updatedAtArray', 1] } } }],
                  [new ObjectId(warehouseId), { '$week': { '$toDate': Date.now() } }] // instead of filterValue
                ]
              }
            }
          },
          {
            '$group': {
              '_id': null,
              'count': { '$sum': 1 }
            }
          },
          {
            '$project': {
              '_id': 0,
              'count': 1
            }
          }
        ],
        // _______________________________pipeline 1________________________________________
        [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  [{ $arrayElemAt: ['$pointIds', 2] }, { '$week': { '$toDate':{ $arrayElemAt: ['$updatedAtArray', 3] } } }],
                  [new ObjectId(warehouseId), { '$week': { '$toDate': Date.now() } }] // instead of filterValue
                ]
              }
            }
          },
          {
            '$group': {
              '_id': null,
              'count': { '$sum': 1 }
            }
          },
          {
            '$project': {
              '_id': 0,
              'count': 1
            }
          }
        ]
      ]
      const result0 = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).aggregate(pipeline[0]).toArray()
      const result1 = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).aggregate(pipeline[1]).toArray()
      // console.log("result0", result0)
      // console.log("result1", result1)
      const result = {
        count: result0[0].count + result1[0].count
      }
      // console.log(result)
      return result
    } else if (reqBody.filterType == 'dayOfWeek') {
      const filterValue = reqBody.filterValue

      const pipeline = [
        [
          // _______________________________pipeline 0________________________________________
          {
            '$match': {
              '$expr': {
                '$eq': [
                  [{ $arrayElemAt: ['$pointIds', 1] }, { '$week': { '$toDate':{ $arrayElemAt: ['$updatedAtArray', 1] } } }],
                  [new ObjectId(warehouseId), { '$week': { '$toDate': Date.now() } }] // instead of filterValue
                ]
              }
            }
          },
          {
            '$group': {
              '_id': {
                'day': { '$dayOfWeek': { '$toDate':{ $arrayElemAt: ['$updatedAtArray', 1] } } }
              },
              'count': { '$sum': 1 }
            }
          },
          {
            '$project': {
              '_id': 0,
              'day': '$_id.day',
              'count': 1
            }
          },
          {
            '$sort': { 'day': 1 }
          }
        ],
        // _______________________________pipeline 1________________________________________
        [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  [{ $arrayElemAt: ['$pointIds', 2] }, { '$week': { '$toDate':{ $arrayElemAt: ['$updatedAtArray', 3] } } }],
                  [new ObjectId(warehouseId), { '$week': { '$toDate': Date.now() } }] // instead of filterValue
                ]
              }
            }
          },
          {
            '$group': {
              '_id': {
                'day': { '$dayOfWeek': { '$toDate':{ $arrayElemAt: ['$updatedAtArray', 3] } } }
              },
              'count': { '$sum': 1 }
            }
          },
          {
            '$project': {
              '_id': 0,
              'day': '$_id.day',
              'count': 1
            }
          },
          {
            '$sort': { 'day': 1 }
          }
        ],
        [
          // _______________________________pipeline 2________________________________________
          {
            '$match': {
              '$expr': {
                '$eq': [
                  [{ $arrayElemAt: ['$pointIds', 1] }, { '$week': { '$toDate':{ $arrayElemAt: ['$updatedAtArray', 2] } } }],
                  [new ObjectId(warehouseId), { '$week': { '$toDate': Date.now() } }] // instead of filterValue
                ]
              }
            }
          },
          {
            '$group': {
              '_id': {
                'day': { '$dayOfWeek': { '$toDate':{ $arrayElemAt: ['$updatedAtArray', 2] } } }
              },
              'count': { '$sum': 1 }
            }
          },
          {
            '$project': {
              '_id': 0,
              'day': '$_id.day',
              'count': 1
            }
          },
          {
            '$sort': { 'day': 1 }
          }
        ],
        // _______________________________pipeline 3________________________________________
        [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  [{ $arrayElemAt: ['$pointIds', 2] }, { '$week': { '$toDate':{ $arrayElemAt: ['$updatedAtArray', 4] } } }],
                  [new ObjectId(warehouseId), { '$week': { '$toDate': Date.now() } }] // instead of filterValue
                ]
              }
            }
          },
          {
            '$group': {
              '_id': {
                'day': { '$dayOfWeek': { '$toDate':{ $arrayElemAt: ['$updatedAtArray', 4] } } }
              },
              'count': { '$sum': 1 }
            }
          },
          {
            '$project': {
              '_id': 0,
              'day': '$_id.day',
              'count': 1
            }
          },
          {
            '$sort': { 'day': 1 }
          }
        ]
      ]
      const result0 = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).aggregate(pipeline[0]).toArray()
      const result1 = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).aggregate(pipeline[1]).toArray()
      const result2 = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).aggregate(pipeline[2]).toArray()
      const result3 = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).aggregate(pipeline[3]).toArray()
      // console.log("result0", result0)
      // console.log("result1", result1)
      // console.log("result2", result2)
      // console.log("result3", result3)
      const result = [result0.concat(result1), result2.concat(result3)]
      // console.log(result)
      return result
    }
  } catch (error) { throw new Error(error) }
}

const findOneByCode = async(reqBody) => {
  try {
    const codes = validateStatus(reqBody.code)
    const result = await GET_DB().collection(POSTAL_GOOD_COLLECTION_NAME).find({
      code: {$in: codes}
    }).toArray()
    console.log('result', result)
    return result
  } catch (error) { throw new Error(error) }
}

export const postalGoodsModel = {
  POSTAL_GOOD_COLLECTION_NAME,
  POSTAL_GOOD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetails,
  update,
  statisticsToanQuoc,
  statisticsGD,
  statisticsTK,
  findOneByCode
}
