//Vd chuyển code từ '12345, 12346, 12347' -> codes thành['12345', '12346', '12347']
export const validateStatus = (code) => {
  let codes = code.split(', ')
  return codes
}