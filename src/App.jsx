import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (key) => {
    if (key === "=" || key === "Enter") {
      try {
        setResult(eval(input.replace(/×/g, "*").replace(/÷/g, "/")));
      } catch {
        setResult("error");
      }
    } 
    else if (key === "↺" || key === "c" || key === "C") {
      setInput("");
      setResult("");
    } 
    else if (key === "Backspace") {
      setInput(input.slice(0, -1));
    } 
    else if ("0123456789.+-*/×÷".includes(key)) {
      setInput(input + key.replace("*", "×").replace("/", "÷"));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => handleClick(e.key);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const keys = [
    "7", "8", "9", "÷",
    "4", "5", "6", "×",
    "1", "2", "3", "-",
    "0", "↺", "=", "+"
  ];

  return (
    <div className="bg-[#ffffff] min-h-screen flex flex-col items-center justify-center">
      {/* Calculator */}
      <div className="p-4 bg-gray-800 rounded-2xl shadow-2xl">
        <div className="w-[280px] h-[100px] bg-[#d5dfd7] flex flex-col justify-center items-end p-3 rounded-md overflow-hidden">
          <div className="text-gray-700 text-3xl">{input}</div>
          <div className="text-black text-5xl font-bold">{result}</div>
        </div>

        <div className="grid grid-cols-4 gap-3 mt-4">
          {keys.map((k) => (
            <button
              key={k}
              onClick={() => handleClick(k)}
              className={`p-4 text-2xl rounded-xl font-semibold
                ${k === "="
                  ? "bg-red-800 text-white"
                  : k === "↺"
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : ["÷", "×", "-", "+"].includes(k)
                  ? "bg-blue-800 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-200"}`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
