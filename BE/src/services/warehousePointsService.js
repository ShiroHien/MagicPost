import { warehousePointsModel } from '~/models/warehousePointsModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  // Xử lý logic dữ liệu tùy đặc thù dự án
  // eslint-disable-next-line no-useless-catch
  try {
    const newWarehousePoint = {
      ...reqBody,
      name: 'Điểm tập kết tại: ' + reqBody.streetAddress + ', ' + reqBody.city
    }

    // Gọi tới tầng Model để xử lý lưu bản ghi newWarehousePoint vào trong Database
    const createdWarehousePoint = await warehousePointsModel.createNew(newWarehousePoint)

    // Lấy bản ghi warehousePoint sau khi ghi (Tùy mục đích của dự án mà mình có thể thực hiện bước này hoặc không)
    const getNewWarehousePoint = await warehousePointsModel.findOneById(createdWarehousePoint.insertedId)

    // Trả kết quả về, trong tầng Service luôn phải có return
    return getNewWarehousePoint
  } catch (error) { throw error }
}

const getDetails = async (warehousePointId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const warehousePoint = await warehousePointsModel.getDetails(warehousePointId)
    if (!warehousePoint) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'WarehousePoint Not Found!')
    }

    return warehousePoint
  } catch (error) { throw error }
}

const update = async (warehousePointId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      name: 'Điểm tập kết tại: ' + reqBody.streetAddress + ', ' + reqBody.city
    }

    const updatedWarehousePoint = await warehousePointsModel.update(warehousePointId, updateData)
    if (!updatedWarehousePoint) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'WarehousePoint Not Found!')
    }

    return updatedWarehousePoint
  } catch (error) { throw error }
}

const deleteOne = async (warehousePointId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const deletedWarehousePoint = await warehousePointsModel.deleteOne(warehousePointId)
    return deletedWarehousePoint
  } catch (error) { throw error }
}

export const warehousePointsService = {
  createNew,
  getDetails,
  update,
  deleteOne
}
