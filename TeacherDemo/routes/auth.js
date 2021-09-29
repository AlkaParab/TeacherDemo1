var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const connection=require('../controller/mysql.connection');
/* GET home page. */
router.post('/login', (req, res, next)=> {
  let username=req.body.username;
  let password=req.body.Password;
  console.log(req.body);
  connection.query(`select * from teacher where Email='${username}'`,async(err,result)=> {
    if(err) {
     console.log(err)
    }else{
      const isSame = await bcrypt.compare(password, result[0].password); 
       console.log(isSame);
      if(isSame){
        const token= jwt.sign({
               tid:result[0].tid,
               tname: result[0].tname,
            }, 'secretkey', { expiresIn: 60 * 60 });
        res.send({
            error:false,
            token:token,
            message:"login Successfully"
        })    

    }else{
        res.send({
            error:true,
            message:"invalid details"
        }) 
    }
    
  }
})


});

module.exports=router;