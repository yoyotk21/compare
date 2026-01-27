from pathlib import Path 

def extract_prompt(name, **kwargs):
    pathname = f"app/prompts/{name}.prompt.md"
    
    template = Path(pathname).read_text(encoding="utf-8")
    return template.format(**kwargs)

