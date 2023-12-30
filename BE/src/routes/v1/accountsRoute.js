import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { accountsValidation } from '~/validations/accountsValidation'
import { accountsController } from '~/controllers/accountsController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get account' })
  })

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