import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { accountsRoute } from '~/routes/v1/accountsRoute'
import { transactionPointsRoute } from './transactionPointsRoute'
import { warehousePointsRoute } from './warehousePointsRoute'
import { postalGoodsRoute } from './postalGoodsRoute'
import { ordersRoute } from './ordersRoute'

const Router = express.Router()

// check API v1/status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })
})

// account APIs
Router.use('/accounts', accountsRoute)

// transaction point APIs
Router.use('/transaction-points', transactionPointsRoute)

// warehouse point APIs
Router.use('/warehouse-points', warehousePointsRoute)

// postal good APIs
Router.use('/postal-goods', postalGoodsRoute)

// order APIs
// Router.use('/orders', ordersRoute)

export const APIs_V1 = Router