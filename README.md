# Metacognitive Coding

Always-on Codex plugin infrastructure for metacognitive coding prompts.

This is intentionally prompt-light for now. The hook scripts inject a filler
placeholder at:

- `SessionStart`
- `UserPromptSubmit`
- `PreToolUse` for write/edit/remove-capable tools

Only the hook infrastructure is included.
