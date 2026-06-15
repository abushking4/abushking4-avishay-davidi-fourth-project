from typing import Callable
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response


class LoggerMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        print("Method:", request.method)
        print("Route:", request.url.path)

        #   הדפסת המידע שהלקוח שלח - אם שלח
        bytes = await request.body()
        body = bytes.decode("utf-8")
        if body:
            print("Body: ", body)

        response = await call_next(request)
        return response
