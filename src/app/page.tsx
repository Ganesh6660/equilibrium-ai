"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";

/**
 * Home page component that renders the Tambo chat interface.
 *
 * @remarks
 * The `NEXT_PUBLIC_TAMBO_URL` environment variable specifies the URL of the Tambo server.
 * You do not need to set it if you are using the default Tambo server.
 * It is only required if you are running the API server locally.
 *
 * @see {@link https://github.com/tambo-ai/tambo/blob/main/CONTRIBUTING.md} for instructions on running the API server locally.
 */

const SUGGESTIONS = [
  { label: "📈 Basic Growth", prompt: "What if I invest $10k at 7% for 20 years?" },
  { label: "🔥 Inflation Check", prompt: "What if I save $2k/month but inflation is 5%?" },
  { label: "🏝️ Early Retirement", prompt: "Can I retire in 15 years with $500k starting and $5k/month savings?" }
];

export default function Home() {
  // Load MCP server configurations
  const mcpServers = useMcpServers();

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      mcpServers={mcpServers}
    >
      <div className="h-screen flex flex-col bg-gray-50">
        {/* 1. BRANDING HEADER */}
        <header className="p-4 bg-white border-b shadow-sm">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">Equilibrium.ai</h1>
            <span className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded">Wealth Simulation Mode</span>
          </div>
        </header>

        {/* 2. SUGGESTION BAR */}
        <div className="max-w-4xl w-full mx-auto p-4 pb-0">
          <p className="text-sm text-gray-500 mb-2 font-medium">Try a scenario:</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                // Note: To make this button actually type into the chat, 
                // we usually need to pass the prompt into the state. 
                // For now, these act as "Copy to Clipboard" or "Click to Chat" guides.
                onClick={() => alert(`Copy and paste this: "${s.prompt}"`)}
                className="whitespace-nowrap px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg text-sm hover:bg-blue-50 transition shadow-sm"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. CHAT THREAD */}
        <div className="flex-1 overflow-hidden">
          <MessageThreadFull className="max-w-4xl mx-auto h-full"/>
        </div>
      </div>
    </TamboProvider>
  );
}
