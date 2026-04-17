/**
 * Universal Search Skill
 * Version 2.3.2 - Fixed tool export shape for Edge AI Gallery
 */

const DEFAULT_API_KEYS = {
  google: "YOUR_SERPER_KEY",
  tavily: "YOUR_TAVILY_KEY",
  brave: "YOUR_BRAVE_KEY",
  wolfram: "YOUR_WOLFRAM_APP_ID"
};

const PROVIDER_ORDER = ["google", "tavily", "brave", "wolfram"];

let apiKeys = { ...DEFAULT_API_KEYS };

export function setApiKeys(nextKeys = {}) {
  apiKeys = { ...apiKeys, ...nextKeys };
}

// ---------- helpers ----------

function parseArgs(args) {
  if (typeof args === "string") {
    try {
      return JSON.parse(args);
    } catch {
      return { query: args };
    }
  }

  if (args && typeof args === "object") {
    return args;
  }

  return {};
}

function getSearchQueue(provider) {
  if (!provider || !PROVIDER_ORDER.includes(provider)) {
    return PROVIDER_ORDER;
  }

  return [provider, ...PROVIDER_ORDER.filter((p) => p !== provider)];
}

// ---------- core implementation ----------

async function universal_search_impl(rawArgs) {
  const args = parseArgs(rawArgs);

  const query =
    typeof args.query === "string" ? args.query.trim() : "";

  const provider =
    typeof args.provider === "string" ? args.provider.trim() : "";

  if (!query) {
    return "Please provide a search query.";
  }

  // ✅ Debug test hook
  if (query.toLowerCase() === "debug") {
    return `
    Debug Test Result:
    The universal_search tool is working correctly and responding to queries.
    This confirms that tool registration and execution are successful.
    `.trim();
  }

  for (const currentProvider of getSearchQueue(provider)) {
    try {
      const data = await executeSearch(currentProvider, query);
      if (data && data.length > 5) {
        return data;
      }
    } catch {
      // try next provider
    }
  }

  return "Search failed. Check network access and API keys.";
}

// ---------- provider execution ----------

async function executeSearch(engine, query) {
  let response;

  switch (engine) {
    case "google":
      response = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
          "X-API-KEY": apiKeys.google,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ q: query })
      });

      if (!response.ok) return null;

      return (
        (await response.json()).organic
          ?.slice(0, 2)
          .map((item) => item.snippet)
          .join("\n") || null
      );

    case "tavily":
      response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKeys.tavily,
          query
        })
      });

      if (!response.ok) return null;

      return (
        (await response.json()).results
          ?.slice(0, 2)
          .map((item) => item.content)
          .join("\n") || null
      );

    default:
      return null;
  }
}

// ✅ REQUIRED: direct export for runtime execution
export async function universal_search(rawArgs) {
  return universal_search_impl(rawArgs);
}

// ✅ REQUIRED: tools map for discovery
export const tools = {
  universal_search
}

// 🔴 REQUIRED: Edge result bridge shim
if (typeof globalThis !== "undefined") {
  globalThis.ai_edge_gallery_get_result = async (data) => {
    return data;
  };

  // (handle misspelling in runtime error just in case)
  globalThis.ai_edge_gasllery_get_result = async (data) => {
    return data;
  };
}

;