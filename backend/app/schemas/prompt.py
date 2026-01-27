class Prompt:
    """Represents a prompt that will be run by an LLM"""

    prompt_contents: str
    model_name: str
    llm_args: dict[str, str] 