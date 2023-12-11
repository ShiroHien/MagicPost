import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { accountsRoute } from '~/routes/v1/accountsRoute'
import { transactionPointsRoute } from './transactionPointsRoute'

const Router = express.Router()

// check API v1/status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })
})

// account APIs
Router.use('/accounts', accountsRoute)

// transaction point APIs
Router.use('/transaction-points', transactionPointsRoute)


export const APIs_V1 = Router