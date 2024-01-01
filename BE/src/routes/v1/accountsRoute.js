import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { accountsValidation } from '~/validations/accountsValidation'
import { accountsController } from '~/controllers/accountsController'
import { authenticateToken } from '~/middlewares/authenticateToken'

const Router = express.Router()

Router.route('/')
  .post(accountsController.getAccounts)

Router.route('/create')
  .post(accountsValidation.createNew, accountsController.createNew)

Router.route('/manage/:id')
  .get(accountsController.getDetails)
  .put(accountsController.update)
  .delete(accountsController.deleteOne)

Router.route('/truongdiem')
  .get(accountsController.getAccoutTruongDiem)
Router.route('/gdvdgd')
  .get(accountsController.getAccountsGDVDGD)
Router.route('/nvdtk/')
  .get(accountsController.getAccountsNVDTK)
Router.route('/signin', authenticateToken)
  .post(accountsController.signIn)


export const accountsRoute = Router