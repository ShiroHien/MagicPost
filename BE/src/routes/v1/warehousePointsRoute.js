import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { warehousePointsValidation } from '~/validations/warehousePointsValidation'
import { warehousePointsController } from '~/controllers/warehousePointsController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get warehouse point' })
  })
  .post(warehousePointsValidation.createNew, warehousePointsController.createNew )

// Xét một biến id vào trong trong param của warehouse point để lấy data
Router.route('/:id')
  .get(warehousePointsController.getDetails)
  .put(warehousePointsValidation.update, warehousePointsController.update)
  .delete(warehousePointsController.deleteOne)

export const warehousePointsRoute = Router