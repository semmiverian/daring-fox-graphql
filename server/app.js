const express = require('express')
const app = express()
const Student = require('./models/Student')
const mongoose = require('mongoose')
const redis = require('redis')
const client = redis.createClient()
const graphqlHttp = require('express-graphql')
const schema = require('./schema')

mongoose.connect('mongodb://localhost/daring-fox', {useNewUrlParser: true});

app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use('/graphql', graphqlHttp({
  schema,
  graphiql: true
}))

app.post('/students', (req, res) => {
  Student.create({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender
  })
  .then(student => {
    // invalidate cache yang ada ( delete data )
    res.status(201).json(student)
  })
});


app.get('/students', (req, res) => {
  // 1. ngecek data students ada ga di cache?
  client.get('students', (err, replies) => {
    console.log(err, replies)

    if (replies) {
      // 2. kalau ada return langsung data yang ada di cachenya
      res.status(200).json(JSON.parse(replies))
    }  else {
      // 3. kalau ga baru akses datanya ke datbase
      Student.find({})
        .then(students => {
          // ketika masuk sini masukin datanya ke dalam cache
          client.set('students', JSON.stringify(students), 'EX', 10)
          res.status(200).json(students)
        })
        .catch(err => {
          res.status(500).json(err)
        })
    }
  })

});


function setTimeout1Detik() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
          data: 'waktunya habis'
        })
    }, 100);
  })
}

app.get('/async-await', async (req, res) => {
  // ambil student namanya kosasih dan nina
const pemenang = await Promise.race([Student.find({name: 'kosasih'}), Student.find({name: 'nina'}), setTimeout1Detik() ])
  // const kosasih = await Student.find({name: 'kosasih'})
  // const nina = await Student.find({name: 'nina'})
  res.status(200).json({pemenang})
  // res.status(200).json({kosasih, nina})

  // console.log('sebelum promise dipanggil')
  
  // hubungiAkusetelah1Detik()
  //   .then(data => res.status(200).json(data))
  // console.log('setelah promise dipanggil')
  // try {
  //   console.log('sebelum promise dipanggil')
  //   const data = await hubungiAkusetelah1Detik()
  
  //   console.log('setelah promise dipanggil')
  //   res.send(data)
  // } catch (err) {
  //   res.status(500).json(err)
  // }
});

function hubungiAkusetelah1Detik() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('aku sudah mau dipanggil ')
      resolve('KENAPA? aku dipanggil mas')
    }, 1000);
  })
}


app.listen(3000, () => {
  console.log('App listening on port 3000!');
});