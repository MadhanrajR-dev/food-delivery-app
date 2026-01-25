/* import ErrorHandler from "../utils/errorhandler";

const middleware = (err,req,res,next)=>{

    message = err.message || "server isuue"
    statusCode = err.statusCode

    if(err.message==="CasteError"){
        return next(new ErrorHandler("MongoDB caste Error",400))
    }

    if(err.message==="TokenExpired"){
        return next(new ErrorHandler("Invalid Token",401))
    }

    res.status(statusCode:err.statusCode).json({message:err.message})
} */