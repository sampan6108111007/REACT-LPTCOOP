const oracledb = require("oracledb");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

app.get('/data', (req, res) => {
    async function fetchDatalptCoop(){
        try{
            const connection = await oracledb.getConnection({
                user : "iscgcmt",
                password : "iscgcmt",
                connectString : "192.168.7.221/gcoop"
            });

            const result = await connection.execute(`SELECT * FROM wcucfcoopbranch `); //wcdeptmaster where branch_Id ='00008601" + branchId + "' and deptaccount_no= wcucfcoopbranch //where branch_Id ='1001' and deptaccount_no='00008601'
            return result;
        }catch (error) {
                return error;
        }
    }

    fetchDatalptCoop().then(dbRes =>{
        res.send(dbRes.rows);
    })
    .catch(err=>{
        res.send(err)
    })

});
app.listen(PORT, () => {  
    console.log(`Server is running on port : ${PORT}`)
})

module.exports = app