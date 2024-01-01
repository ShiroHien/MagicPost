import { transactionPointsModel } from '~/models/transactionPointsModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { warehousePointsModel } from '~/models/warehousePointsModel'

const createNew = async (reqBody) => {
  // Xử lý logic dữ liệu tùy đặc thù dự án
  // eslint-disable-next-line no-useless-catch
  try {
    const newTransactionPoint = {
      ...reqBody,
      name: 'Điểm giao dịch tại: ' + reqBody.streetAddress + ', ' + reqBody.city + ', ' + reqBody.province
    }

    // Gọi tới tầng Model để xử lý lưu bản ghi newTransactionPoint vào trong Database
    const createdTransactionPoint = await transactionPointsModel.createNew(newTransactionPoint)

    // Lấy bản ghi transactionPoint sau khi ghi (Tùy mục đích của dự án mà mình có thể thực hiện bước này hoặc không)
    const getNewTransactionPoint = await transactionPointsModel.findOneById(createdTransactionPoint.insertedId)

    if (getNewTransactionPoint) {
      await warehousePointsModel.pushTransactionPointIds(getNewTransactionPoint)
    }

    // Trả kết quả về, trong tầng Service luôn phải có return
    return getNewTransactionPoint
  } catch (error) { throw error }
}

const getDetails = async (transactionPointId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const transactionPoint = await transactionPointsModel.getDetails(transactionPointId)
    if (!transactionPoint) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'TransactionPoint Not Found!')
    }

    return transactionPoint
  } catch (error) { throw error }
}

const update = async (transactionPointId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      name: 'Điểm giao dịch tại: ' + reqBody.streetAddress + ', ' + reqBody.city + ', ' + reqBody.province
    }

    const updatedTransactionPoint = await transactionPointsModel.update(transactionPointId, updateData)
    if (!updatedTransactionPoint) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'TransactionPoint Not Found!')
    }

    return updatedTransactionPoint
  } catch (error) { throw error }
}

const deleteOne = async (transactionPointId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const deletedTransactionPoint = await transactionPointsModel.deleteOne(transactionPointId)
    return deletedTransactionPoint
  } catch (error) { throw error }
}

const findOnebyProvinceCity = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const transactionPoint = await transactionPointsModel.findOnebyProvinceCity(reqBody)
    if (!transactionPoint) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'TransactionPoint Not Found!')
    }

    return transactionPoint
  } catch (error) { throw error }
}

const findDistrictByProvince = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const transactionPoint = await transactionPointsModel.findDistrictByProvince(reqBody)
    if (!transactionPoint) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'TransactionPoint Not Found!')
    }

    return transactionPoint
  } catch (error) { throw error }
}

const getTPs = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const transactionPoint = await transactionPointsModel.getTPs(reqBody)
    if (!transactionPoint) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'TransactionPoint Not Found!')
    }
    return transactionPoint
  } catch (error) { throw error }
}

export const transactionPointsService = {
  createNew,
  getDetails,
  update,
  deleteOne,
  findOnebyProvinceCity,
  getTPs,
  findDistrictByProvince
}
