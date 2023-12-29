import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { accountsRoute } from '~/routes/v1/accountsRoute'
import { transactionPointsRoute } from './transactionPointsRoute'
import { warehousePointsRoute } from './warehousePointsRoute'
import { postalGoodsRoute } from './postalGoodsRoute'

const APIs_V1 = express.Router()

// check API v1/status
APIs_V1.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })
})

// account APIs
APIs_V1.use('/accounts', accountsRoute)

// transaction point APIs
APIs_V1.use('/transaction-points', transactionPointsRoute)

// warehouse point APIs
APIs_V1.use('/warehouse-points', warehousePointsRoute)

// postal good APIs
APIs_V1.use('/postal-goods', postalGoodsRoute)

// order APIs
// APIs_V1.use('/orders', ordersRoute)

module.exports = APIs_V1