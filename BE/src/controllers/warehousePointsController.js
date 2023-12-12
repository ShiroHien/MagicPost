import { warehousePointsService } from '~/services/warehousePointsService'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service (là tầng ở giữa controller và model để xử lý dữ liệu)
    const createdwarehousePoint = await warehousePointsService.createNew(req.body)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdwarehousePoint)
  } catch (error) { next(error) }
}

const getDetails = async (req, res, next) => {
  try {
    const warehousePoint = await warehousePointsService.getDetails(req.params.id)
    res.status(StatusCodes.OK).json(warehousePoint)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const updatedwarehousePoint = await warehousePointsService.update(req.params.id, req.body)
    res.status(StatusCodes.OK).json(updatedwarehousePoint)
  } catch (error) { next(error) }
}

const deleteOne = async (req, res, next) => {
  try {
    const deletedwarehousePoint = await warehousePointsService.deleteOne(req.params.id)
    res.status(StatusCodes.OK).json(deletedwarehousePoint)
  } catch (error) { next(error) }
}

export const warehousePointsController = {
  createNew,
  getDetails,
  update,
  deleteOne
}