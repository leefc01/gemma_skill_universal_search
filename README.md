# 🌐 Universal Voice Search for Gemma

### Why I Built This
I was tired of having conversations like:
```
Me:  Siri, tell me about [x]?
Siri:  I found this on the web.
Me:  I'm driving.  Can you read this aloud?
Siri:  I found this on the web...
```
This skill was born out of a personal need for a "hands-free, eyes-free" information layer. Whether you are on a morning run, navigating local trails, or commuting, this skill transforms your local Gemma model into a live-updating oracle. It is designed to filter the "noise" of the web into punchy, audio-friendly answers that are perfect for text-to-speech.

### ✨ Features
* **Waterfall Fallback:** If your primary search engine hits a rate limit or has an expired key, the skill automatically cascades to the next available provider.
* **Voice-Optimized (TTS Ready):** Specifically strips citations, navigation links, and SEO fluff to provide clean, conversational text.
* **Multi-Engine Support:** Includes specialized support for Google (via Serper), Tavily, Brave Search, and WolframAlpha.

### 🛠 User Configurable Fields
You can customize the behavior of the skill in `skill.md`:
* **DEFAULT_ENGINE:** Set your preferred starting point (e.g., `google`, `tavily`).
* **FALLBACK_ORDER:** Define the sequence of engines to try if the first one fails.
* **VOICE_CONCISE_MODE:** Toggle to force shorter, 60-word-max responses.

### 🔑 How To Obtain API Keys
| Provider | Use Case | Free Tier |
| :--- | :--- | :--- |
| **Serper (Google)** | General & Local Search | 2,500 free searches |
| **Tavily** | AI-Optimized Summaries | 1,000 searches / Month |
| **Brave** | Privacy-focused Results | ~$5 Credit / Month |
| **WolframAlpha** | Facts & Calculations | 2,000 requests / Month |

### How To Obtain API Keys - URLs
| Provider | Where to get it | Free Tier |
| :--- | :--- | :--- |
| **Serper (Google)** | [serper.dev](https://serper.dev) | 2,500 free searches (One-time) |
| **Tavily** | [tavily.com](https://tavily.com) | 1,000 searches / Month |
| **Brave** | [brave.com/search/api](https://brave.com/search/api) | $5 Credit / Month |
| **WolframAlpha** | [developer.wolframalpha.com](https://developer.wolframalpha.com) | 2,000 requests / Month |
---

### 🚀 Deployment Instructions

#### 1. Prepare your Configuration
For security, this repository does not include API keys. You must create your own local configuration file:
1.  Locate `config.example.js` in the project root.
2.  Duplicate or rename it to `config.js`.
3.  Open `config.js` in a text editor and paste your API keys into the corresponding fields. 
    *(Note: `config.js` is included in `.gitignore` to prevent accidental public leaks of your keys).*

#### 2. Deploying to your Device

**💻 Laptop / Desktop (Mac, Windows, Linux)**
1.  Ensure your `config.js` is saved inside the skill folder.
2.  Open your **AI Edge Gallery** or local LLM environment.
3.  Navigate to **Agent Skills** and select **"Load Custom Skill"** or **"Import Folder."**
4.  Select the project directory.

**📱 Mobile (iOS & Android)**
1.  On your computer, compress the project folder (containing `skill.md`, `index.js`, `config.js`, and `manifest.json`) into a `.zip` file.
2.  Transfer the `.zip` to your mobile device (via AirDrop, iCloud, Google Drive, or USB).
3.  Open the **AI Edge Gallery** app on your phone.
4.  Go to **Agent Skills** > **Add (+)** > **Import from File**.
5.  Select your `.zip` file and ensure the skill is toggled **ON**.

---

### 🤝 Contributing
Community contributions are welcome! If you have a suggestion for a new search provider or a way to improve the voice-cleaning logic, please:
1. Fork the repo.
2. Create a feature branch.
3. Submit a Pull Request.

### 📄 License
Distributed under the MIT License. See `LICENSE` for more information.


### Files in this Package
* `SKILL.md`: Behavioral instructions and configuration.
* `index.js`: The JavaScript logic for search and fallback.
* `manifest.json`: Permission and entry-point metadata.
* `config.example.js`: Put your API Keys here.  Rename this to config.js.
