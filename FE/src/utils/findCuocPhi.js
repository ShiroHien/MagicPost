import { SIZE_GOOD, TYPE_GOOD } from './constants'

const VAT = 0.05
const ORTHER_POSTAGE = 3000
const MAIN_POSTAGE = 15000
const ADD_POSTAGE = 2750

const HESO = [0.25, 1, 1.5, 2, 3]
const CPWEIGHT = [500, 1000, 2000, 4000]

export const findCuocPhi = (w ,type, weight, size) => {
  let multi = 1
  if (type === TYPE_GOOD.type1) {
    multi = multi + HESO[1]
  } else {
    multi = multi + HESO[2]
  }

  if (weight <= CPWEIGHT[0]) {
    multi = multi + HESO[0]
  } else if (weight < CPWEIGHT[1]) {
    multi = multi + HESO[1]
  } else if (weight < CPWEIGHT[2]) {
    multi = multi + HESO[2]
  } else if (weight < CPWEIGHT[3]) {
    multi = multi + HESO[3]
  } else {
    multi = multi + HESO[4]
  }

  if (size === SIZE_GOOD.size1) {
    multi = multi + HESO[1]
  } else if (size === SIZE_GOOD.size2) {
    multi = multi + HESO[2]
  } else {
    multi = multi + HESO[3]
  }

  console.log(w)
  let postageWithoutVAT = MAIN_POSTAGE + ORTHER_POSTAGE + ADD_POSTAGE * multi
  return postageWithoutVAT * w + postageWithoutVAT * VAT
}