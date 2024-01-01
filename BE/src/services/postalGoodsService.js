import { postalGoodsModel } from '~/models/postalGoodsModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { caculatePostage } from '~/utils/caculateMethods'
import { findPath } from '~/utils/findPath'
import { transactionPointsModel } from '~/models/transactionPointsModel'
import { warehousePointsModel } from '~/models/warehousePointsModel'
import { STATUS } from '~/utils/constants'

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

const getListGoodbyPid = async (postalGoodId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const postalGood = await postalGoodsModel.getListGoodbyPid(postalGoodId)
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
    const result = await postalGoodsModel.statisticsGD(reqBody._id, reqBody)
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'PostalGood Not Found!')
    }
    return result
  }
  catch (error) { throw error }
}


const findOneByCode = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await postalGoodsModel.findOneByCode(reqBody)
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'PostalGood Not Found!')
    } else {
      let statuses = []
      for (let time = 0; time< result.length; time++) {
        const data1 = await transactionPointsModel.getDetails(result[time].pointIds[0])
        const data2 = await warehousePointsModel.getDetails(result[time].pointIds[1])
        const data3 = await warehousePointsModel.getDetails(result[time].pointIds[2])
        const data4 = await transactionPointsModel.getDetails(result[time].pointIds[3])

        let status = [[result[time].createdAt, 'Đã gửi hàng thành công tại ' + data1.name]]
        const names = ['Đang trên đường đến ' + data2.name, 'Đã đến ' + data2.name, 'Đang trên đường đến ' + data3.name,
          'Đã đến ' + data3.name, 'Đang trên đường đến ' + data4.name, 'Đã đến ' + data4.name, 'Đang giao hàng', 'Đã đến tay người nhận']
        let cnt = result[time].orderNo * 2
        if (result[time].status != STATUS.pending) {
          if (result[time].status != STATUS.shipped) {
            cnt = cnt + 2
          } else cnt++
        }
        console.log('cnt', cnt)
        for (let i = 0; i < cnt; i++) {
          status.push([result[time].updatedAtArray[i], names[i]])
        }
        statuses.push(status)
      }
      console.log('ds', statuses)
      return statuses
    }
  } catch (error) { throw error }
}

const statisticsTK = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = await postalGoodsModel.statisticsTK(reqBody._id, reqBody)
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'PostalGood Not Found!')
    }
    return result
  }
  catch (error) { throw error }
}

export const postalGoodsService = {
  createNew,
  getListGoodbyPid,
  update,
  statisticsToanQuoc,
  statisticsGD,
  statisticsTK,
  findOneByCode
}
