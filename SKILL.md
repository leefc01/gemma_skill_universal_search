---
name: universal_search
version: 2.3.2
description: Mandatory tool for live facts, company lookups, math, and news.
metadata:
  homepage: https://github.com/leefc01/gemma_skill_universal_search
---

# Universal Search Skill

## Tool Definition
```json
{
  "name": "universal_search",
  "description": "Searches the web for facts, news, and data.",
  "parameters": {
    "type": "object",
    "properties": {
      "query": { "type": "string", "description": "The search query" }
    },
    "required": ["query"]
  }
}
```

## Instructions

1. Use universal_search for factual or external queries.

2. Strict JSON: You must output perfectly formatted, valid JSON when calling this tool.

3. Wolfram Preference: If the query is a mathematical calculation, unit conversion, or a specific scientific fact, prioritize the wolfram provider.

4. Audio Clarity: Provide a conversational summary of the search results. Do not read out URLs or technical metadata.

5. Brevity: If the user is on mobile/voice, keep your final response under 60 words. Summarize the most important points from the search snippets provided.
