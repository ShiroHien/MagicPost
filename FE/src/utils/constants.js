export const API_ROOT = 'http://localhost:3377'


export const TYPE_ACCOUNT_OLD = {
  admin: 'admin',
  leaderOfTransaction: 'leader of transaction',
  leaderOfWarehouse: 'leader of warehouse',
  staffOfTransaction: 'staff of transaction',
  staffOfWarehouse: 'staff of warehouse'
}

export const TYPE_ACCOUNT = {
  admin: 'Lãnh đạo',
  leaderOfTransaction: 'Trưởng điểm giao dịch',
  leaderOfWarehouse: 'Trưởng điểm tập kết',
  staffOfTransaction: 'Giao dịch viên điểm giao dịch',
  staffOfWarehouse: 'Nhân viên điểm tập kết'
}

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