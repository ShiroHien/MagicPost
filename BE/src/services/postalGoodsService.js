import { postalGoodsModel } from '~/models/postalGoodsModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { caculatePostage } from '~/utils/caculateMethods'
import { findPath } from '~/utils/findPath'

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

export const postalGoodsService = {
  createNew,
  getDetails,
  update
}
