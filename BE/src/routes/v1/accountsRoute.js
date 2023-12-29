import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { accountsValidation } from '~/validations/accountsValidation'
import { accountsController } from '~/controllers/accountsController'

const accountsRoute = express.Router()

accountsRoute.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get account' })
  })
  .post(accountsValidation.createNew, accountsController.createNew )

// Xét một biến id vào trong trong param của account để lấy data
accountsRoute.route('/:id')
  .get(accountsController.getDetails)
  .put(accountsValidation.update, accountsController.update)
  .delete(accountsController.deleteOne)


//
accountsRoute.route('/:id/type')
  .get(accountsController.getAccoutListByType)

module.exports = accountsRoute