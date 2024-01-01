import { accountsService } from '~/services/accountsService'
import { StatusCodes } from 'http-status-codes'
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

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

const getAccoutTruongDiem = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service (là tầng ở giữa controller và model để xử lý dữ liệu)
    const account = await accountsService.getAccoutTruongDiem(req.body)

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

const signIn = async (req, res, next) => {
  try {
    const account = await accountsService.signIn(req.body)
    const secretKey = 'MYserCRETKey'
    const email = account.email
    const token = jwt.sign({ email }, secretKey, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly: true })
    const result = {
      ...account,
      token: token,
      success: true
    }
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

const getAccounts = async (req, res, next) => {
  try {
    const result = await accountsService.getAccounts(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

const getAccountsGDVDGD = async (req, res, next) => {
  try {
    const result = await accountsService.getAccountsGDVDGD(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

const getAccountsNVDTK = async (req, res, next) => {
  try {
    const result = await accountsService.getAccountsNVDTK(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}
export const accountsController = {
  createNew,
  getDetails,
  update,
  deleteOne,
  getAccoutTruongDiem,
  signIn,
  getAccounts,
  getAccountsGDVDGD,
  getAccountsNVDTK
}