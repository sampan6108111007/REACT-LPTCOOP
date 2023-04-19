const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

app.get('/wcucfcoopbranch', async (req, res) => {
  try {
    const conn = await oracledb.getConnection({
      user: 'iscgcmt',
      password: 'iscgcmt',
      connectString: '192.168.7.221/gcoop'
    });

    const result = await conn.execute('SELECT * FROM wcucfcoopbranch');

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});