import { accountsModel } from '~/models/accountsModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  // Xử lý logic dữ liệu tùy đặc thù dự án
  // eslint-disable-next-line no-useless-catch
  try {
    const newAccount = {
      ...reqBody
    }

    // Gọi tới tầng Model để xử lý lưu bản ghi newAccount vào trong Database
    const createdAccount = await accountsModel.createNew(newAccount)

    // Lấy bản ghi account sau khi ghi (Tùy mục đích của dự án mà mình có thể thực hiện bước này hoặc không)
    const getNewAccount = await accountsModel.findOneById(createdAccount.insertedId)

    // Trả kết quả về, trong tầng Service luôn phải có return
    return getNewAccount
  } catch (error) { throw error }
}

const getDetails = async (accountId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const account = await accountsModel.getDetails(accountId)
    if (!account) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Account Not Found!')
    }

    return account
  } catch (error) { throw error }
}

const update = async (accountId, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody
    }

    const updatedAccount = await accountsModel.update(accountId, updateData)
    if (!updatedAccount) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Account Not Found!')
    }

    return updatedAccount
  } catch (error) { throw error }
}

const deleteOne = async (accountId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const deletedAccount = await accountsModel.deleteOne(accountId)
    return deletedAccount
  } catch (error) { throw error }
}

export const accountsService = {
  createNew,
  getDetails,
  update,
  deleteOne
}