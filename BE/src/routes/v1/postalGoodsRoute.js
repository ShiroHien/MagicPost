import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { postalGoodsValidation } from '~/validations/postalGoodsValidation'
import { postalGoodsController } from '~/controllers/postalGoodsController'

const postalGoodsRoute = express.Router()


// ______________________________General API________________________________________
postalGoodsRoute.route('/')
  .get((req, res) => { 
    res.status(StatusCodes.OK).json({ message: 'GET: API get postal goods' })
  })

postalGoodsRoute.route('/create/:transactionId')
  .get((req, res) => { 
    res.status(StatusCodes.OK).json({ message: 'GET: API get postal goods' })
  })
  .post(postalGoodsValidation.createNew, postalGoodsController.createNew ) // API tạo dữ liệu hàng hóa tại điểm giao dịch qua id


postalGoodsRoute.route('/manage/:id')
  .get(postalGoodsController.getDetails) // API Lấy dữ liệu từ id & API chỉnh sửa dữ liệu từ id
  .put(postalGoodsValidation.update, postalGoodsController.update) // API sửa dữ liệu hàng hóa tại điểm giao dịch qua id


// ______________________________Statistics API________________________________________
// API Thống kê toàn quốc
postalGoodsRoute.route('/statisticsTQ')
  .post(postalGoodsController.statisticsToanQuoc)

// API Thống kê hàng khách gửi và hàng đã gửi tại điểm giao dịch với id
postalGoodsRoute.route('/statisticsGD')
  .post(postalGoodsController.statisticsGD)

// API Thống kê tại điểm tập kết về hàng đã gửi và nhận theo thời gian
postalGoodsRoute.route('/statisticsTK')
  .post(postalGoodsController.statisticsTK)

module.exports = postalGoodsRoute
