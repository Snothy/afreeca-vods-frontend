export function errorHandler(err) {
    const statusCode = err.status;
    if(statusCode === 404) {
        return [false];
    }
    const error = true;
    let errMsg;
    //just to avoid repeat code
    if(statusCode === 400) {
        errMsg = '400 Internal Server Error';
    } else if (statusCode === 401) {
        errMsg = '401 Unauthorized';
    } else if (statusCode === 403) {
        errMsg = '403 Forbidden';
    } else if (statusCode === 406) {
        errMsg = '406 Not Acceptable';
    }
    return [true,{error: error, errorMsg: errMsg}];
}