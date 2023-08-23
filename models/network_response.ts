class NetworkResponse {

    public code: STATUS_CODE;
    public message: string;
    public data;

    static fromErrors: (code: STATUS_CODE, error: string) => NetworkResponse;
    static success: (data:any, message: string) => NetworkResponse;

    constructor(code: STATUS_CODE, message: string, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

NetworkResponse.fromErrors = function (code: STATUS_CODE, error: string) {
    return new NetworkResponse(
        code,
        error,
        null,
    );
}

NetworkResponse.success = function (data, message) {
    return new NetworkResponse(
        STATUS_CODE.success,
        message,
        data,
    );
}

enum STATUS_CODE {
    success = 200,
    bad_request = 400,
    unauthorized = 401,
    forbidden = 403,
    not_found = 404,
    request_entity_too_large = 413,
    unsupported_media_type = 415,
}

export { NetworkResponse, STATUS_CODE }