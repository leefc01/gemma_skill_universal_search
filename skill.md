---
name: universal_search
version: 1.2.0
---

# Universal Search Skill

## User Configuration
- **DEFAULT_ENGINE:** "google" 
- **FALLBACK_ORDER:** ["google", "tavily", "brave"]
- **VOICE_CONCISE_MODE:** true

## Tool Definition
```json
{
  "name": "universal_search",
  "description": "Searches the live web. Uses a waterfall fallback if the primary engine fails.",
  "parameters": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "The search query" },
      "provider": { 
        "type": "string", 
        "description": "Optional override. Defaults to user config." 
      }
    },
    "required": ["query"]
  }
}
```

## Instructions

1. **Audio Clarity:** When providing answers based on search results, use a natural, conversational tone. Avoid reading URLs or long lists of numbers.

2. **Waterfall Logic:** The logic handles API failures internally. If you receive data from a fallback engine, simply provide the answer; do not apologize for the engine switch unless specifically asked.

3. **On the Go:** Prioritize speed. If the user is asking via voice, keep the final spoken response under 60 words.