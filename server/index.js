const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')

// const mongoose = require('mongoose')
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log('DB connected'))
//   .catch(err => console.error(err))

const mongoose = require('mongoose')
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.use(cors())

// 어플리케이션의 데이터를 분석해서 가져오기
app.use(bodyParser.urlencoded({ extended: true }))

// 어플리케이션의 json 데이터를 분석해서 가져오기
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/users', require('./routes/users'))

// 서버가 프로덕션 상태일 때
if (process.env.NODE_ENV === 'production') {

  // 파일들을 불러오는 폴더 지정
  app.use(express.static('client/build'))

  // index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
})