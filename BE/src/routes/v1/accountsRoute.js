import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { accountsValidation } from '~/validations/accountsValidation'
import { accountsController } from '~/controllers/accountsController'

const Router = express.Router()

Router.route('/')
  .get(accountsController.getAccounts)

Router.route('/create')
  .post(accountsValidation.createNew, accountsController.createNew )

Router.route('/manage/:id')
  .get(accountsController.getDetails)
  .put(accountsValidation.update, accountsController.update)
  .delete(accountsController.deleteOne)

Router.route('/type')
  .post(accountsController.getAccoutListByType)

Router.route('/signin')
  .post(accountsController.signIn)

export const accountsRoute = Router