import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { postalGoodsValidation } from '~/validations/postalGoodsValidation'
import { postalGoodsController } from '~/controllers/postalGoodsController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get postal goods' })
  })
  .post(postalGoodsValidation.createNew, postalGoodsController.createNew )

// Xét một biến id vào trong trong param của postal goods để lấy data
Router.route('/:id')
  .get(postalGoodsController.getDetails)
  .put(postalGoodsValidation.update, postalGoodsController.update)

export const postalGoodsRoute = Router