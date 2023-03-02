const express = require('express')
const { sequelize } = require('./data/index');
const articleRouter = require('./router/article');
const userRouter = require('./router/user')
const app = express()
const port = 3000;

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'cheikhoul',
  password: '09121968.',
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

app.use('/api/user', userRouter)
app.use('/api/article', articleRouter)

app.get('/', (req, res) => {
    res.json({ mess: "Bienvenue sur myShop" })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})