import { transactionPointsService } from '~/services/transactionPointsService'
import { StatusCodes } from 'http-status-codes'


const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service (là tầng ở giữa controller và model để xử lý dữ liệu)
    const createdTransactionPoint = await transactionPointsService.createNew(req.body)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdTransactionPoint)
  } catch (error) { next(error) }
}

const getDetails = async (req, res, next) => {
  try {
    const transactionPoint = await transactionPointsService.getDetails(req.params.id)
    res.status(StatusCodes.OK).json(transactionPoint)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const updatedTransactionPoint = await transactionPointsService.update(req.params.id, req.body)
    res.status(StatusCodes.OK).json(updatedTransactionPoint)
  } catch (error) { next(error) }
}

const deleteOne = async (req, res, next) => {
  try {
    const deletedTransactionPoint = await transactionPointsService.deleteOne(req.params.id)
    res.status(StatusCodes.OK).json(deletedTransactionPoint)
  } catch (error) { next(error) }
}

const findOneByFilter = async (req, res, next) => {
  try {
    const result = await transactionPointsService.findOneByFilter(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

export const transactionPointsController = {
  createNew,
  getDetails,
  update,
  deleteOne,
  findOneByFilter
}