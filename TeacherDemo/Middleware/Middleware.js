let jwt=require('jsonwebtoken');
let checkToken = (req, res, next) => {
    const token = req.headers.token;
    const tid= req.body.tid;
    if (token) {
      jwt.verify(token, "secretkey", (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Token is not valid",
          });
        } else {
          req.user = decoded;
          console.log(decoded.tid);
          // if(decoded.tid!=tid)
          // { return res.status(401).json({
          //   message: "Unauthorized attempt!",
          // });
          // }else{
            next();
          // }
        }
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Auth token is not supplied",
      });
    }
  };
  
  module.exports = {
    checkToken:checkToken
  };
  