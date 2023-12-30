import { postalGoodsService } from '~/services/postalGoodsService'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service (là tầng ở giữa controller và model để xử lý dữ liệu)
    const createdPostalGood = await postalGoodsService.createNew(req.params.transactionId, req.body)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createdPostalGood)
  } catch (error) { next(error) }
}

const getDetails = async (req, res, next) => {
  try {
    const postalGood = await postalGoodsService.getDetails(req.params.id)
    res.status(StatusCodes.OK).json(postalGood)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    const updatedPostalGood = await postalGoodsService.update(req.params.id, req.body)
    res.status(StatusCodes.OK).json(updatedPostalGood)
  } catch (error) { next(error) }
}

const statisticsToanQuoc = async (req, res, next) => {
  try {
    const result = await postalGoodsService.statisticsToanQuoc(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

const statisticsGD = async (req, res, next) => {
  try {
    const result = await postalGoodsService.statisticsGD(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

const statisticsTK = async (req, res, next) => {
  try {
    const result = await postalGoodsService.statisticsTK(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}
const findOneByCode = async (req, res, next) => {
  try {
    const result = await postalGoodsService.findOneByCode(req.body)
    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}


export const postalGoodsController = {
  createNew,
  getDetails,
  update,
  statisticsToanQuoc,
  statisticsGD,
  statisticsTK,
  findOneByCode
}