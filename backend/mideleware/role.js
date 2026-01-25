/* 
const role = (...alowed)=>{
return  (req,res,next)=>{
if(!req.user){
    res.status(res.status || 500).json({success:false,message:"permission denied"})
}
if(!alowed.includes(req.user.role)){
    res.status(500).json({success:false,message:"access denied"})
}
next();
}
}
export default role; */