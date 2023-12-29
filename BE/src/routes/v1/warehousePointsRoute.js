import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { warehousePointsValidation } from '~/validations/warehousePointsValidation'
import { warehousePointsController } from '~/controllers/warehousePointsController'

const warehousePointsRoute = express.Router()

// ______________________________General API________________________________________
warehousePointsRoute.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get transaction point' })
  })

warehousePointsRoute.route('/create')
  .post(warehousePointsValidation.createNew, warehousePointsController.createNew )


warehousePointsRoute.route('/manage/:id')
  .get(warehousePointsController.getDetails) // API lấy dữ liệu từ id
  .put(warehousePointsValidation.update, warehousePointsController.update) // API sửa dữ liệu
  .delete(warehousePointsController.deleteOne) // API xóa dữ liệu

warehousePointsRoute.route('/findid')
  .post(warehousePointsController.findOneByFilter)

module.exports = warehousePointsRoute
