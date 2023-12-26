export const WHITELIST_DOMAINS = [
  'http'
]

export const TYPE_ACCOUNT = {
  admin: 'admin',
  leaderOfTransaction: 'leader of transaction',
  leaderOfWarehouse: 'leader of warehouse',
  staffOfTransaction: 'staff of transaction',
  staffOfWarehouse: 'staff of warehouse'
}

// export const status = {
//   pendingT1: 'Pending transaction1',
//   pendingW1: 'Pending warehouse1',
//   pendingT2: 'Pending transaction2',
//   pendingW2: 'Pending warehouse2',
//   Shipped1: 'Shipped1',
//   Shipped2: 'Shipped2',
//   w2wShipped: 'w2wShipped',
//   cShipped: 'Customer Shipped',
//   delivered: 'Delivered',
//   canceled: 'Canceled'
// }

export const STATUS = {
  pending: 'Pending',
  shipped: 'Shipped',
  delivered: 'Delivered',
  canceled: 'Canceled'
}

export const TYPE_GOOD = {
  type1: 'Letter',
  type2: 'Parcel'
}

export const SIZE_GOOD = {
  size1: 'Small',
  size2: 'Medium',
  size3: 'Large'
}