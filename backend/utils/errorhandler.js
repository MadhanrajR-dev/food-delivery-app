/* 
class ErrorHandler extends Error{
    constructor(message,statusCode){
        SuppressedError(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this,this.constructor)
    }

    
    
}

export default ErrorHandler;/*  