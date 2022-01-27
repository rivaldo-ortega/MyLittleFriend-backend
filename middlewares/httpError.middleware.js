module.exports = class ErrorHttp extends Error{
    constructor(message, errorCode) {
        super(message); 
        this.code = errorCode; 
      }
}