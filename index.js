/**
 * Universal Search with Waterfall Fallback
 */


import API_KEYS from './config.js';

const PROVIDER_ORDER = ["google", "tavily", "brave"];

async function universal_search({ query, provider }) {
  const searchQueue = provider ? [provider, ...PROVIDER_ORDER.filter(p => p !== provider)] : PROVIDER_ORDER;

  for (const currentProvider of searchQueue) {
    try {
      const data = await executeSearch(currentProvider, query);
      if (data) return data; 
    } catch (e) {
      console.log(`Provider ${currentProvider} failed: ${e.message}. Trying next...`);
      continue; 
    }
  }
  return "Error: All search engines failed or keys are invalid.";
}

async function executeSearch(engine, query) {
  let response;
  
  switch (engine) {
    case "google":
      response = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: { "X-API-KEY": API_KEYS.google, "Content-Type": "application/json" },
        body: JSON.stringify({ q: query })
      });
      if (!response.ok) throw new Error(response.status);
      const sData = await response.json();
      return sData.organic.map(o => o.snippet).join(" ");

    case "tavily":
      response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: API_KEYS.tavily, query })
      });
      if (!response.ok) throw new Error(response.status);
      const tData = await response.json();
      return tData.results.map(r => r.content).join(" ");

    case "brave":
      response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}`, {
        headers: { "X-Subscription-Token": API_KEYS.brave }
      });
      if (!response.ok) throw new Error(response.status);
      const bData = await response.json();
      return bData.web.results.map(r => r.description).join(" ");

    default:
      return null;
  }
}
