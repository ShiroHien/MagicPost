import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { warehousePointsValidation } from '~/validations/warehousePointsValidation'
import { warehousePointsController } from '~/controllers/warehousePointsController'

const Router = express.Router()

// ______________________________General API________________________________________
Router.route('/')
  .get(warehousePointsController.getWHs)

Router.route('/create')
  .post(warehousePointsValidation.createNew, warehousePointsController.createNew )


Router.route('/manage/:id')
  .get(warehousePointsController.getDetails) // API lấy dữ liệu từ id
  .put(warehousePointsValidation.update, warehousePointsController.update) // API sửa dữ liệu
  .delete(warehousePointsController.deleteOne) // API xóa dữ liệu

Router.route('/findbyprovincity')
  .post(warehousePointsController.findOnebyProvinceCity)

export const warehousePointsRoute = Router