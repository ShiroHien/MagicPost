import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { transactionPointsValidation } from '~/validations/transactionPointsValidation'
import { transactionPointsController } from '~/controllers/transactionPointsController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get transaction point' })
  })
  .post(transactionPointsValidation.createNew, transactionPointsController.createNew )

// Xét một biến id vào trong trong param của transaction point để lấy data
Router.route('/:id')
  .get(transactionPointsController.getDetails)
  .put(transactionPointsValidation.update, transactionPointsController.update)
  .delete(transactionPointsController.deleteOne)

export const transactionPointsRoute = Router