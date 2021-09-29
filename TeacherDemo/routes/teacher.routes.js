var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const { body, check,validationResult } = require('express-validator');
const connection=require('../controller/mysql.connection');

/* GET home page. */
router.get('/', function(req, res, next) {
    try{
        connection.query('select * from teacher',(err,result) => {
            res.send( {error:false, data:result });
        })
    }catch(err){
        res.send( {error:true, data:[],err:err});
    }
    
});
router.post('/find',
body('id').notEmpty().withMessage("Id required for search").isNumeric().withMessage('id should be a number'),
function(req, res, next) {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }else{
            let id=req.body.id;
            connection.query(`select * from teacher where tid=${id}`,(err,result) => {
                res.send( {error:false, data:result });
            })
        }
      }catch(err){
        res.send( {error:true, data:[],err:err});
    }
  
});
// your task do update api 
router.put('/update', function(req, res, next) {
  res.send( { title: 'Express' });
});
router.delete('/delete/:id', function(req, res, next) {
    try{
        let id=req.params.id;
        connection.query(`delete from teacher where tid=${id}`,(err,result) => {
           if(result.affectedRows>0){
            res.send( {error:false, message:"deleted" });
           }else{
            res.send( {error:false, message:"record not found" }); 
           }
            
        })
    }catch(err){
        res.send( {error:true, data:[],err:err});
    }
  
});
router.post('/create', 
body('tname').notEmpty().withMessage("Name required").isAlpha().withMessage('Name should be in char'),
body('Email').notEmpty().withMessage("Email required").isEmail().withMessage('Email not valid'),
body('mobile_no').notEmpty().withMessage("Mobile required").isLength({min:10,max:10}).withMessage('Mobile number should have 10 digits').isNumeric().withMessage('Mobile number should in number format'),
body('password').notEmpty().withMessage('Password required'),
//check("Password", "password required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
async(req, res, next) =>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }else{
        let data=req.body;
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.Password, salt);
        console.log(password);
        connection.query(`INSERT INTO teacher(tid, tname, Email, mobile_no,password) VALUES (0,'${data.tname}','${data.Email}','${data.mobile_no}','${password}')`,(err,result) => {
           console.log(result);
            if(result.affectedRows>0){
            res.send( {error:false, message:"added" });
           }else{
            res.send( {error:false, message:" not added" }); 
           }
            
        })
    }
    }catch(err){
        res.send( {error:true, data:[],err:err});
    }
  
});



module.exports = router;
