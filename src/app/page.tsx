"use client";

import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";
import "./globals.css"; // Ensure styles are imported

const languages = {
  JavaScript: {
    extension: javascript(),
    starterCode: `console.log("Hello, JavaScript!");`,
  },
  Python: { extension: python(), starterCode: `print("Hello, Python!")` },
  Java: {
    extension: java(),
    starterCode: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}`,
  },
};

export default function Page() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] =
    useState<keyof typeof languages>("JavaScript");
  const [code, setCode] = useState(languages["JavaScript"].starterCode);
  const [extensions, setExtensions] = useState([
    languages["JavaScript"].extension,
  ]);

  // Detect system theme on load
  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(systemTheme);
  }, []);

  // Update extensions and code when language changes
  useEffect(() => {
    setExtensions([languages[language].extension]);
    setCode(languages[language].starterCode); // Set starter code for the selected language
  }, [language]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: theme === "dark" ? "#121212" : "#f4f4f4",
        color: theme === "dark" ? "#ffffff" : "#000000",
        minHeight: "100vh",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Online Code Editor</h1>
        <button
          onClick={handleThemeToggle}
          style={{
            padding: "10px 20px",
            backgroundColor: theme === "dark" ? "#0070f3" : "#000",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {theme === "dark" ? <>light mode</> : <>dark mode</>}
        </button>
      </header>

      <div style={{ marginBottom: "10px" }}>
        <select
          onChange={(e) =>
            setLanguage(e.target.value as keyof typeof languages)
          }
          value={language}
          style={{ padding: "10px", fontSize: "16px" }}
        >
          {Object.keys(languages).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <CodeMirror
        value={code}
        height="400px"
        theme={theme === "dark" ? oneDark : undefined} // Default theme for light mode
        extensions={extensions} // Dynamically updated extensions
        onChange={(value) => setCode(value)}
      />

      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <h2>Output</h2>
        <pre>{code}</pre>
      </div>
    </div>
  );
}
