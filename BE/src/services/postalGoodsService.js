import { postalGoodsModel } from '~/models/postalGoodsModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { caculatePostage } from '~/utils/caculateMethods'
import { findPath } from '~/utils/findPath'
import { transactionPointsModel } from '~/models/transactionPointsModel'
import { warehousePointsModel } from '~/models/warehousePointsModel'

const createNew = async (transactionId, reqBody) => {
  // Xử lý logic dữ liệu tùy đặc thù dự án
  // eslint-disable-next-line no-useless-catch
  try {
    const newPostalGood = {
      ...reqBody,
      postage: caculatePostage(reqBody.type, reqBody.weight, reqBody.size),
      pointIds: await findPath(transactionId, reqBody.receiverCity, reqBody.receiverProvince)
    }
    // Gọi tới tầng Model để xử lý lưu bản ghi newPostalGood vào trong Database
    const createdPostalGood = await postalGoodsModel.createNew(newPostalGood)

    // Lấy bản ghi postalGood sau khi ghi (Tùy mục đích của dự án mà mình có thể thực hiện bước này hoặc không)
    const getNewPostalGood = await postalGoodsModel.findOneById(createdPostalGood.insertedId)

    // Trả kết quả về, trong tầng Service luôn phải có return
    return getNewPostalGood
  } catch (error) { throw error }
}

const getDetails = async (postalGoodId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const postalGood = await postalGoodsModel.getDetails(postalGoodId)
    if (!postalGood) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'PostalGood Not Found!')
    }

    return postalGood
  } catch (error) { throw error }
}

const update = async (postalGoodId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      postage: caculatePostage(reqBody.type, reqBody.weight, reqBody.size)
    }

    const updatedPostalGood = await postalGoodsModel.update(postalGoodId, updateData)
    if (!updatedPostalGood) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'PostalGood Not Found!')
    }

    return updatedPostalGood
  } catch (error) { throw error }
}

const statisticsToanQuoc = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await postalGoodsModel.statisticsToanQuoc(reqBody)
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'PostalGood Not Found!')
    }

    return result
  } catch (error) { throw error }
}

const statisticsGD = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const transactionPoint = await transactionPointsModel.findOneByFilter(reqBody)
    if (!transactionPoint) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'TransactionPoint Not Found!')
    } else {
      const result = await postalGoodsModel.statisticsGD(transactionPoint._id, reqBody)
      if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'PostalGood Not Found!')
      }
      return result
    }
  } catch (error) { throw error }
}


const statisticsTK = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const warehousePoint = await warehousePointsModel.findOneByFilter(reqBody)
    if (!warehousePoint) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'WarehousePoint Not Found!')
    } else {
      const result = await postalGoodsModel.statisticsTK(warehousePoint._id, reqBody)
      if (!result) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'PostalGood Not Found!')
      }
      return result
    }
  } catch (error) { throw error }
}

export const postalGoodsService = {
  createNew,
  getDetails,
  update,
  statisticsToanQuoc,
  statisticsGD,
  statisticsTK
}
