import express from 'express';
const router  = express.Router();

router.get('/profiles',(req,res,next)=>{
  res.render('profiles');
  next();
})


module.exports = router;
