import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Khởi tạo database ban đầu bằng null khi chưa kết nối với database trên mongoDB
let db = null

// Khởi tạo mongoClient để kết nối tới MongoDB
let mongoClient = new MongoClient(env.URI, {
  // serverApi có thế không khai báo mà nó sẽ có sẵn và mặc định Strict và deprecationErrors bằng false nghĩa là nó sẽ không hỗ trợ những cái không thuộc trong gói API version và những cái đã cũ đã không còn dùng ở API version mới
  // Có khai báo ta sẽ chỉ định một cái Stable API version của MongoDB
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//Kết nối tới Database
export const CONNECT_DB = async () => {
  //Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClient.connect()
  //Kết nối thành công thì lấy database theo tên và gán ngược nó lại vào biến databaseInstance
  db = mongoClient.db(env.DATABASE_NAME)
}

// Function GET_DB (không async) này có nhiệm vụ export ra db sau khi đã connect thành công tới MongoDB
// Lưu ý đảm bảo chỉ luôn gọi cái GET_DB sau khi kết nối thành công đến Database trên MongoDB.
export const GET_DB = () => {
  if (!db) throw new Error('Must connect to Database first!')
  return db
}


// Đóng kết nối tới database khi cần
export const CLOSE_DB = async () => {
  await mongoClient.close()
}