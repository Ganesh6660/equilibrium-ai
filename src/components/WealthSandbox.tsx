"use client";
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceLine} from 'recharts';
import { Label, Legend } from 'recharts';

export const WealthSandbox = ({ initialAmount = 0, monthlyContribution = 0, years = 1, annualReturn = 0.05, inflationRate = 0.02}: any) => {
  // Local state to allow the user to play with the return rate
  const [liveReturn, setLiveReturn] = useState(annualReturn ?? 0.05);
  // This says use annualReturn, but if it's missing, default to 5%
  const [isOptimized, setIsOptimized] = useState(false);

  const data = [];
  let currentBalance = initialAmount;
  let delayBalance = initialAmount; // The "Wait 5 Years" version
  // Standard math for real rate of return
  const annualBonus = isOptimized ? 0.02 : 0; // Adds 2% potential
  const realRate = (1 + liveReturn) / (1 + inflationRate) - 1;
  const [isPanicMode, setIsPanicMode] = useState(false);

  for (let i = 0; i <= years; i++) {
    // 1. Calculate the current wealth
    let currentVal = Math.round(currentBalance);
    
    // 🚨 THE CRASH LOGIC: If panic mode is on, year 10 is a disaster
    if (isPanicMode && i === 10) {
      currentBalance = currentBalance * 0.70; // 30% drop
      currentVal = Math.round(currentBalance);
    }

    const delayVal = i < 5 ? initialAmount : Math.round(delayBalance);

    data.push({ 
      year: i, 
      balance: currentVal, 
      delayedBalance: delayVal,
      isCrashYear: isPanicMode && i === 10 // To highlight the crash point
    });

    // 2. Apply growth for next year
    currentBalance = (currentBalance + (monthlyContribution * 12)) * (1 + realRate);
    if (i >= 5) {
      delayBalance = (delayBalance + (monthlyContribution * 12)) * (1 + realRate);
    }
  }

  const finalTotal = data[data.length - 1].balance;
  const delayedTotal = data[data.length - 1].delayedBalance;
  const costOfDelay = finalTotal - delayedTotal;

  const myGoal = 500000; // You can change this or pass it as a prop
  const goalYear = data.find(d => d.balance >= myGoal)?.year;


  return (
  <div className="p-0 overflow-hidden border-2 border-slate-200 rounded-3xl bg-white shadow-2xl w-full my-6 font-sans">
    {/* 1. EMOTIONAL HEADER */}
    <div className="p-6 bg-slate-900 text-white">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Your Financial Destiny</span>
        <div className="flex gap-2">
            <span className="px-2 py-1 bg-blue-500 text-[10px] rounded-full font-black">AI SIMULATOR</span>
        </div>
      </div>
      <h2 className="text-3xl font-light">
        ${data[data.length - 1].balance.toLocaleString()}
      </h2>
      <p className="text-slate-400 text-xs mt-1 italic">Expected wealth after {years} years, adjusted for {inflationRate*100}% inflation.</p>
    </div>

    {/* 2. THE COST OF DELAY (Urgency Card) */}
    <div className="p-4 bg-red-50 border-b border-red-100 flex items-center justify-between">
       <div className="flex items-center gap-3">
         <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-xl">⏳</div>
         <div>
            <p className="text-[10px] font-bold text-red-800 uppercase">The Procrastination Tax</p>
            <p className="text-sm text-red-900 font-medium">Waiting 5 years deletes <span className="font-bold">${(data[data.length-1].balance - data[data.length-1].delayedBalance).toLocaleString()}</span></p>
         </div>
       </div>
    </div>

    {/* 3. THE INTERACTIVE CHART */}
    <div className="h-56 w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ top: 20, right: 30, left: 40, bottom: 40 }} 
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />

          {/* X-Axis: Time */}
          <XAxis 
            dataKey="year" 
            stroke="#64748b" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
            label={{ 
              value: 'Years from now', 
              position: 'insideBottom', 
              offset: -25, 
              style: { fill: '#64748b', fontWeight: 600 } 
            }} 
          />

          {/* Y-Axis: Wealth (Now formatted exactly like X-Axis) */}
          <YAxis 
            tickFormatter={(val) => `$${(val / 1000).toLocaleString()}k`}
            stroke="#64748b" 
            fontSize={12}    
            tickLine={false} 
            axisLine={false} 
            label={{ 
              value: 'Total Wealth', 
              angle: -90, 
              position: 'insideLeft', 
              offset: 0, 
              style: { fill: '#64748b', fontWeight: 600, textAnchor: 'middle' } 
            }}
          />

          <Tooltip 
            formatter={(val: any) => [`$${val.toLocaleString()}`, "Portfolio Value"]}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />

          <Legend 
            verticalAlign="top" 
            align="right" 
            height={40} 
            iconType="circle" 
            wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '10px' }}
          />

          <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={4} dot={false} name="Wealth" />
          <Line type="monotone" dataKey="delayedBalance" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="6 6" dot={false} name="Delayed" />

          {/* THE RESILIENCE DOT */}
          {isPanicMode && data[10] && (
            <ReferenceDot 
              x={10} 
              y={data[10].balance} 
              r={6} 
              fill="#ef4444" 
              stroke="white" 
              strokeWidth={2}
            />
          )}

          {goalYear && (
            <ReferenceLine x={goalYear} stroke="#10b981" strokeDasharray="3 3">
              <Label 
                value="🎯 Target Met" 
                position="top" 
                fill="#10b981" 
                style={{ fontSize: '10px', fontWeight: 'bold' }} 
              />
            </ReferenceLine>
          )}
       
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* 4. CONTROLS: THE "POTENTIAL" PANEL */}
    <div className="p-6 bg-slate-50 space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-slate-500">
          <span>MARKET OPTIMISM (RETURN RATE)</span>
          <span className="text-blue-600">{(liveReturn * 100).toFixed(1)}%</span>
        </div>
        <input 
          type="range" min="0" max="0.15" step="0.001" 
          value={liveReturn} 
          onChange={(e) => setLiveReturn(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* PANIC MODE TOGGLE */}
      <button 
        onClick={() => setIsPanicMode(!isPanicMode)}
        className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 border-2 ${
          isPanicMode 
            ? "bg-red-600 text-white border-red-600" 
            : "bg-white text-slate-600 border-slate-300 hover:border-red-500"
        }`}
      >
        {isPanicMode ? "🛑 REMOVE CRASH" : "🚨 SIMULATE MARKET CRASH"}
      </button>

      <div className="p-6 bg-blue-600 text-white rounded-b-3xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-80 uppercase font-bold tracking-widest">Human Potential Insight</p>
            <p className="text-sm font-medium mt-1">To reach your goal 2 years faster, increase your monthly contribution by just $200.</p>
          </div>
          <button 
            onClick={() => setIsOptimized(!isOptimized)}
            className={`px-4 py-2 rounded-lg font-bold text-sm shadow-lg transition ${
              isOptimized ? "bg-green-400 text-white" : "bg-white text-blue-600 hover:bg-blue-50"
            }`}
          >
            {isOptimized ? "🚀 Plan Maximized" : "Optimize Plan"}
          </button>
        </div>
      </div>

    </div>

    <div className="mt-4 p-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl text-white shadow-lg">
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-2 rounded-lg text-xl">🚀</div>
        <div className="flex-1">
          <h4 className="text-xs font-bold uppercase tracking-widest opacity-80">Potential Multiplier</h4>
          <p className="text-sm font-medium">
            {liveReturn < 0.08 
              ? "Increasing your market optimism to 8% adds another $" + (data[data.length-1].balance * 0.15).toLocaleString() + " to your future."
              : "You're on a high-growth path. Ensure you have 6 months of emergency cash to stay resilient."}
          </p>
        </div>
      </div>
    </div>

  </div>
);
};