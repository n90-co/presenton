"""
Brand-specific system prompt loader.

When a presentation uses a branded template (e.g., n90-brand), this module
loads the SYSTEM_PROMPT.md from that template's directory and injects it
into the LLM system prompt. This ensures AI-generated content follows
brand rules, approved copy guidelines, and design constraints.

The SYSTEM_PROMPT.md is the single source of truth for how content should
be generated for each brand.
"""

import os
from functools import lru_cache


# Path to the Next.js presentation-templates directory
# In the monolith container, this is at /app/servers/nextjs/app/presentation-templates/
TEMPLATES_BASE = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))),
    "servers", "nextjs", "app", "presentation-templates"
)

# Fallback: try the Docker container path
if not os.path.exists(TEMPLATES_BASE):
    TEMPLATES_BASE = "/app/servers/nextjs/app/presentation-templates"


@lru_cache(maxsize=16)
def load_brand_prompt(template_id: str) -> str:
    """
    Load the SYSTEM_PROMPT.md for a given template brand.
    Returns empty string if no brand prompt exists.
    Cached to avoid repeated file reads.
    """
    prompt_path = os.path.join(TEMPLATES_BASE, template_id, "SYSTEM_PROMPT.md")

    if os.path.exists(prompt_path):
        with open(prompt_path, "r") as f:
            return f.read()

    return ""


def get_brand_instructions(template_id: str, user_instructions: str = None) -> str:
    """
    Combine brand-specific rules with user instructions.
    Brand rules take precedence and are prepended.
    """
    brand_prompt = load_brand_prompt(template_id)

    if brand_prompt and user_instructions:
        return f"{brand_prompt}\n\n# Additional User Instructions:\n{user_instructions}"
    elif brand_prompt:
        return brand_prompt
    elif user_instructions:
        return user_instructions
    else:
        return ""
