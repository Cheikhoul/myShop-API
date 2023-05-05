const express = require('express')
const { sequelize } = require('./data/index');
const articleRouter = require('./router/article');
const userRouter = require('./router/user')
const app = express()
const { port } = require('./config');
const cors = require('cors')
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'myShop'
});

connection.query('CREATE DATABASE IF NOT EXISTS myShop', function(err, results) {
    if (err) {
      console.error(err);
    } else {
      console.log('Database created successfully.');
    }
  });
  connection.end();

(async () => {
    await sequelize.sync({ force: false });
})();
app.use(express.json())
app.use(cors())
app.use('/api/user', userRouter)
app.use('/api/article', articleRouter)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ mess: "Bienvenue sur myShop" })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app;
