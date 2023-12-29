import { SIZE_GOOD, TYPE_GOOD } from './constants'

const VAT = 0.05
const ORTHER_POSTAGE = 3000
const MAIN_POSTAGE = 15000
const ADD_POSTAGE = 2750

const HESO = [0, 1, 2, 3, 4, 5]

export const caculatePostage = (type, weight, size) => {
  let addCount = 0
  if (type === TYPE_GOOD.type2) {
    addCount = addCount + HESO[1]
  }

  if (weight > 1 && weight <= 3) {
    addCount = addCount + HESO[1]
  } else if (weight > 3 && weight <= 10) {
    addCount = addCount + HESO[2]
  } else if (weight > 10 && weight <= 20) {
    addCount = addCount + HESO[3]
  } else if (weight > 20 && weight <= 50) {
    addCount = addCount + HESO[4]
  } else if (weight > 50) {
    addCount = addCount + HESO[5]
  }

  if (size === SIZE_GOOD.size2) {
    addCount = addCount + HESO[1]
  } else if (size === SIZE_GOOD.size3) {
    addCount = addCount + HESO[2]
  }

  let postageWithoutVAT = MAIN_POSTAGE + ORTHER_POSTAGE + ADD_POSTAGE * addCount
  return postageWithoutVAT + postageWithoutVAT * VAT

}