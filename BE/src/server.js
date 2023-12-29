import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  // Enable req.body json data
  app.use(express.json())

  // Use APIs_V1
  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  app.get('/', (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hi, ${env.AUTHOR}. Backend server is running successfully at host http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

  // Thực hiện đóng database khi dừng server
  exitHook(() => {
    console.log('4.Closing database...')
    CLOSE_DB()
  })
}
// Chỉ khi kết nối đến Database thành công thì mới Start Server Back-end lên.
// Immediately Invoked Function Expression IIFE
(async () => {
  try {
    console.log('1. Start connecting MongoDB Atlas Cloud...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Atlas Cloud!')

    // Khởi động server Back-end sau khi connect database thành công
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()