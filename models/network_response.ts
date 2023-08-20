class NetworkResponse{
    
    constructor(code, message, data){
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

NetworkResponse.fromErrors = function(code, error){
    return new NetworkResponse(
        code = code,
        message = error,
        data = null,
    );
}

NetworkResponse.success = function(data, message){
    return new NetworkResponse(
        code = 200,
        message = message,
        data = data,
    );
}

module.exports = NetworkResponse;

enum STATUS_CODE{
    BAD_REQUEST = 401,
}