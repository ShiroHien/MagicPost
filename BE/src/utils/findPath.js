import { transactionPointsModel } from '~/models/transactionPointsModel'
import { warehousePointsModel } from '~/models/warehousePointsModel'

export let findPath = async (transactionId, receiverCity, receiverProvince) => {
  let idArr = new Array(4)

  idArr[0] = transactionId

  // Tìm điểm giao dịch gửi hàng để tìm  điểm tập kết tương ứng.
  let transactionA = await transactionPointsModel.findOneById(transactionId)
  idArr[1] = transactionA.warehousePointId.toString()

  // Tìm điểm tập kết gần với địa chỉ người nhận
  let warehouseC = await warehousePointsModel.findOneByAddress(receiverProvince)
  idArr[2] = warehouseC._id.toString()


  // Tìm điểm giao dịch liên kết với điểm tập kết trên và gần với địa chỉ người nhận
  let transactionD = await transactionPointsModel.findOneByAddress(idArr[2], receiverCity, receiverProvince)
  idArr[3] = transactionD._id.toString()

  // console.log('point Id Array', idArr)
  return idArr
}