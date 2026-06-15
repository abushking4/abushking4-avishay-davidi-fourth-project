from fastapi import FastAPI
from middlewares.cors_middleware import register_cors
from controllers.gpt_controller import router as gpt_router
from uvicorn import run
from middlewares.exception_handler import register_exception_handlers


server = FastAPI()

register_cors(server)


server.include_router(gpt_router)
register_exception_handlers(server)



if __name__ == "__main__":
    run("app:server", port=4000, reload=True)