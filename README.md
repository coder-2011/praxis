# Praxis

Always-on Codex plugin infrastructure for praxis prompts.

The hook scripts inject the praxis prompt at:

- `SessionStart`
- `UserPromptSubmit`
- `PreToolUse` for write/edit/remove-capable tools targeting code/config files

Only the hook infrastructure is included.
