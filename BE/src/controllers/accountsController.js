import { accountsService } from '~/services/accountsService'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service (là tầng ở giữa controller và model để xử lý dữ liệu)
    const createdAccount = await accountsService.createNew(req.body)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdAccount)
  } catch (error) { next(error) }
}

const getDetails = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service (là tầng ở giữa controller và model để xử lý dữ liệu)
    const account = await accountsService.getDetails(req.params.id)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(account)
  } catch (error) { next(error) }
}

const getAccoutListByType = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service (là tầng ở giữa controller và model để xử lý dữ liệu)
    const account = await accountsService.getAccoutListByType(req.body)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(account)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const updatedAccount = await accountsService.update(req.params.id, req.body)
    res.status(StatusCodes.OK).json(updatedAccount)
  } catch (error) { next(error) }
}

const deleteOne = async (req, res, next) => {
  try {
    const deletedAccount = await accountsService.deleteOne(req.params.id)
    res.status(StatusCodes.OK).json(deletedAccount)
  } catch (error) { next(error) }
}

export const accountsController = {
  createNew,
  getDetails,
  update,
  deleteOne,
  getAccoutListByType
}