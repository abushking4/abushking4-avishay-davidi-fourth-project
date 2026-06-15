from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError


def register_exception_handlers(server: FastAPI) -> None:
    @server.exception_handler(HTTPException)
    def http_exception_handler(request: Request, err: HTTPException) -> JSONResponse:
        print("HTTP Error: ", str(err))
        message = err.detail
        return JSONResponse(status_code=err.status_code, content={"Message": message})
        
    @server.exception_handler(RequestValidationError)
    def validation_exception_handler(request: Request, err: RequestValidationError) -> JSONResponse:
        try:
            loc = err._errors[0]["loc"][1]
        except:
            loc = "Something"

        message = err._errors[0]["msg"]
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"Message": f"Invalid {loc}: {message}"})

    @server.exception_handler(Exception)
    def general_exception_handler(request: Request, err: HTTPException) -> JSONResponse:
        print("General Error: ", str(err))
        message = str(err)
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={ "Message": message })