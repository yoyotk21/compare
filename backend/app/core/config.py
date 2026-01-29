from functools import lru_cache
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Compare API"
    api_v1_prefix: str = "/api"
    environment: str = "local"

    openrouter_api_key: str = Field(repr=False)
    database_url: str = Field(repr=False)
    local_database_url: str = Field(repr=False)

    models: list[str] = Field(default_factory=lambda: [
        "openai/gpt-5.2",
        "anthropic/claude-opus-4.5",
        "google/gemini-2.5-flash",
        "x-ai/grok-4",
        "deepseek/deepseek-v3.2",
        "moonshotai/kimi-k2-0905",
        "mistralai/ministral-14b-2512",
        # "google/gemma-3-27b-it:free", does not work for now
        "meta-llama/llama-4-maverick"
    ])

    summarization_model: str = "openai/gpt-5-chat-latest"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )

@lru_cache
def get_settings() -> Settings:
    return Settings()
