import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { transactionPointsValidation } from '~/validations/transactionPointsValidation'
import { transactionPointsController } from '~/controllers/transactionPointsController'

const Router = express.Router()

// ______________________________General API________________________________________
Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get transaction point' })
  })

Router.route('/create')
  .post(transactionPointsValidation.createNew, transactionPointsController.createNew )


Router.route('/manage/:id')
  .get(transactionPointsController.getDetails) // API lấy dữ liệu từ id
  .put(transactionPointsValidation.update, transactionPointsController.update) // API sửa dữ liệu
  .delete(transactionPointsController.deleteOne) // API xóa dữ liệu

Router.route('/findid')
  .post(transactionPointsController.findOneByFilter)

export const transactionPointsRoute = Router