from dotenv import load_dotenv
from os import getenv


load_dotenv()

class AppConfig:
    mysql_connection_string = str(getenv("MYSQL_CONNECTION_STRING"))
    api_key = str(getenv("API_KEY"))
    chat_mock_mode = getenv("CHAT_MOCK_MODE", "true").lower() == "true"
    mock_reply = str(getenv("MOCK_REPLY"))