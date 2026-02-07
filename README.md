# Equilibrium.ai | Maximize Human Potential

**Equilibrium** is a generative financial conviction engine built for the **UI Strikes Back Hackathon** conducted by *WeMakeDevs*. It moves beyond static spreadsheets to provide a behavioral coaching interface that helps users visualize their financial future with certainty and resilience.

## 🚀 The Vision
Most people suffer from financial anxiety due to complexity and short-term market noise. Equilibrium uses **Generative UI** to bridge the gap between abstract market data and personal life goals, empowering users to reach their maximum potential through three key psychological triggers:
- **Loss Aversion:** Visualizing the "Procrastination Tax" (The cost of waiting 5 years).
- **Resilience:** Stress-testing goals against 30% market crashes via the "Panic Mode" simulator.
- **Clarity:** Mapping specific life milestones (e.g., "Retirement" or "Dream Home") directly onto the wealth vector.

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **AI Orchestration:** [Tambo SDK](https://tambo.co)
- **Data Visualization:** Recharts (Customized for interactive simulation)
- **Styling:** Tailwind CSS

## 🧩 How We Used Tambo
Equilibrium leverages the Tambo SDK as its foundational Generative UI layer:
- **Dynamic Component Projection:** We registered a custom `WealthSandbox` component in `src/lib/tambo.ts`. The AI agent analyzes user intent and projects this stateful, interactive tool directly into the chat.
- **Contextual Tooling:** We used Tambo's tool registration to allow the AI to perform complex financial math (inflation adjustments, real-rate returns) before rendering the UI.
- **Guided Interaction:** We customized the Tambo suggestion engine to provide "High-Potential" prompts, reducing friction for users who don't know where to start.

## 🏃 Quick Start

1. **Clone & Install:**
   ```bash
   git clone [YOUR_REPO_LINK]
   cd equilibrium-ai
   npm install

2. **Environment Variable:** Create a `.env.local` file and add:
   ```bash
   NEXT_PUBLIC_TAMBO_API_KEY=your_key_here

3. **Run Dev:**
   ```bash
    npm run dev